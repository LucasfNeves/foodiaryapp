import { AccountService } from '@app/services/AccountService';
import { useQuery } from '@tanstack/react-query';

interface IUseAccountParams {
    enabled?: boolean;
}

export function useAccount(params?: IUseAccountParams) {
    const { data, refetch } = useQuery({
        queryKey: ['account'],
        queryFn: () => AccountService.getMe(),
        staleTime: Infinity,
        enabled: params?.enabled ?? true,
    });

    return {
        account: data,
        refetchAccount: refetch,
    };
}
