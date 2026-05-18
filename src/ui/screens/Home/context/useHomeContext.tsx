import { use } from 'react';
import { HomeContext } from '.';

export function useHomeContext() {
    const context = use(HomeContext);

    if (!context) {
        throw new Error(
            'useHomeContext must be used within a HomeContext.Provider',
        );
    }

    return context;
}
