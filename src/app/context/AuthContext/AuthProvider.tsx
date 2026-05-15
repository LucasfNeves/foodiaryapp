import { useCallback, useLayoutEffect, useState } from 'react';
import { AuthContext } from '.';
import { AuthService } from '@app/services/AuthService';
import { AuthTokenManager } from '@app/lib/AuthTokenManager';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Service } from '@app/services/Service';
import * as SplashScreen from 'expo-splash-screen';
import { useQueryClient } from '@tanstack/react-query';
import { useForceRender } from '@app/hooks/useForceRerender';

SplashScreen.preventAutoHideAsync();

interface ISetupAuthParams {
    acessToken: string;
    refreshToken: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { account, refetchAccount } = useAccount();
    const [isReady, setIsReady] = useState(false);
    const queryClient = useQueryClient();
    const forceRender = useForceRender();

    const signOut = useCallback(async () => {
        Service.removeAccessToken();
        Service.removeAccessToken();

        queryClient.clear();
        forceRender();

        await AuthTokenManager.clear();
    }, [queryClient, forceRender]);

    const setupAuth = useCallback(
        async (params: ISetupAuthParams) => {
            Service.setAccessToken(params.acessToken);
            Service.setRefreshTokenHandler(async () => {
                try {
                    const storedTokens = await AuthTokenManager.load();

                    if (!storedTokens) {
                        throw new Error('Tokens not found');
                    }

                    const newTokens = await AuthService.refresh({
                        refreshToken: storedTokens.refreshToken,
                    });

                    Service.setAccessToken(newTokens.accessToken);
                    await AuthTokenManager.save(newTokens);
                } catch {
                    signOut();
                }
            });

            await refetchAccount();
            await SplashScreen.hideAsync();
            setIsReady(true);
        },
        [signOut],
    );

    useLayoutEffect(() => {
        async function load() {
            const tokens = await AuthTokenManager.load();

            if (!tokens) {
                setIsReady(true);
                await SplashScreen.hideAsync();
                return;
            }

            await setupAuth({
                acessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
        }

        load();
    });

    const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
        const tokens = await AuthService.signIn(payload);

        await AuthTokenManager.save(tokens);
        await setupAuth({
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }, []);

    const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
        const tokens = await AuthService.signUp(payload);

        await AuthTokenManager.save(tokens);
        await setupAuth({
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <AuthContext
            value={{
                signedIn: !!account,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext>
    );
}
