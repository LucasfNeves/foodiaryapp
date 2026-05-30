import { MealsService } from '@app/services/MealsService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import mockMeals from '@app/mocks/meals.json';

export function useMeals(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];

    const { data, isLoading, isFetching, refetch, isRefetching } = useQuery({
        staleTime: Infinity,
        queryKey: ['meals', formattedDate],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            // TODO: remover mock
            return mockMeals.map((meal) => ({
                ...meal,
                createdAt: new Date(meal.createdAt),
            }));

            const { meals } = await MealsService.getMealsByDate(formattedDate);
            return meals;
        },
    });

    return {
        meals: data ?? [],
        isInitialLoading: isLoading && !isRefetching,
        isLoading: isFetching,
        reloadMeals: refetch,
    };
}
