import { HomeContext, IHomeContextValue } from '.';

interface IHomeProviderProps extends IHomeContextValue {
    children: React.ReactNode;
}

export function HomeProvider({ children, ...ctxValue }: IHomeProviderProps) {
    return <HomeContext value={ctxValue}>{children}</HomeContext>;
}
