import { useMeals } from '@app/hooks/queries/useMeals';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useHomeController() {
    const { top, bottom } = useSafeAreaInsets();
    const [date, setDate] = useState(new Date());
    const { isInitialLoading, meals, isLoading, reloadMeals } = useMeals(date);

    const [isRefreshing, setIsRefreshing] = useState(false);

    async function handleRefresh() {
        setIsRefreshing(true);
        await reloadMeals();
        setIsRefreshing(false);
    }

    function previousDate() {
        setDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    }

    function nextDate() {
        setDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    }

    return {
        top,
        bottom,
        date,
        meals,
        isInitialLoading,
        isRefreshing,
        handleRefresh,
        previousDate,
        nextDate,
        isLoading,
    };
}
