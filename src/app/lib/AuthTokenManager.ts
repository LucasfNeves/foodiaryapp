import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthTokenManager {
    private static STORAGE_KEY = '@foodiary:auth_tokens';

    static async save(tokens: AuthTokenManager.Tokens) {
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokens));
    }

    static async load(): Promise<AuthTokenManager.Tokens | null> {
        try {
            const tokensString = await AsyncStorage.getItem(this.STORAGE_KEY);

            if (!tokensString) {
                return null;
            }

            return JSON.parse(tokensString);
        } catch {
            return null;
        }
    }

    static async clear() {
        await AsyncStorage.removeItem(this.STORAGE_KEY);
    }
}

export namespace AuthTokenManager {
    export type Tokens = {
        accessToken: string;
        refreshToken: string;
    };
}
