import { AuthService } from '@app/services/AuthService';
import { createContext } from 'react';

interface IAuthContext {
    signedIn: boolean;
    signIn: (payload: AuthService.SignInPayload) => Promise<void>;
    signUp: (payload: AuthService.SignUpPayload) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
