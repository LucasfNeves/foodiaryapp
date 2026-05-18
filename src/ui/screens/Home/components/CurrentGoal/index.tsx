import React, { useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { GoalStats } from '@ui/components/GoalSteps';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Meal } from '@app/types/Meal';
import { useHomeContext } from '../../context/useHomeContext';

export function CurrentGoal() {
    const { meals, isLoading } = useHomeContext();

    const summary = useMemo(() => {
        return meals
            .flatMap((meal) => meal.foods)
            .reduce(
                (acc, food) => ({
                    calories: acc.calories + food.calories,
                    carbohydrates: acc.carbohydrates + food.carbohydrates,
                    proteins: acc.proteins + food.proteins,
                    fats: acc.fats + food.fats,
                }),
                { calories: 0, carbohydrates: 0, proteins: 0, fats: 0 },
            );
    }, [meals]);

    const { account } = useAccount();
    return (
        <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
            <GoalStats
                calories={{
                    goal: account?.goal.calories,
                    current: summary.calories,
                }}
                proteins={{
                    goal: account?.goal.proteins,
                    current: summary.proteins,
                }}
                carbohydrates={{
                    goal: account?.goal.carbohydrates,
                    current: summary.carbohydrates,
                }}
                fats={{ goal: account?.goal.fats, current: summary.fats }}
            />
        </View>
    );
}
