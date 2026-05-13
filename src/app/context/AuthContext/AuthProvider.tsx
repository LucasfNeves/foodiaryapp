import { useCallback, useState } from 'react';
import { AuthContext } from '.';
import { AuthService } from '@app/services/AuthService';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signedIn, setSignedIn] = useState(false);

    const sigIn = useCallback(async (payload: AuthService.SignInPayload) => {
        await AuthService.signIn(payload);
    }, []);

    const sigUp = useCallback(async (payload: AuthService.SignUpPayload) => {
        await AuthService.signUp(payload);
    }, []);

    return (
        <AuthContext value={{ signedIn, signIn: sigIn, signUp: sigUp }}>
            {children}
        </AuthContext>
    );
}
