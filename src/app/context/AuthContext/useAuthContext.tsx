import { use } from 'react';
import { AuthContext } from '.';

export function useAuthContext() {
    const context = use(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
}
