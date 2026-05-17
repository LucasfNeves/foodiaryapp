import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { GoalStats } from '@ui/components/GoalSteps';
import { useAccount } from '@app/hooks/queries/useAccount';

export function CurrentGoal() {
    const { account } = useAccount();
    return (
        <View style={styles.container}>
            <GoalStats
                calories={{ goal: account?.goal.calories }}
                proteins={{ goal: account?.goal.proteins }}
                carbohydrates={{ goal: account?.goal.carbohydrates }}
                fats={{ goal: account?.goal.fats }}
            />
        </View>
    );
}
