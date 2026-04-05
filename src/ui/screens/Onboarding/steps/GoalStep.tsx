import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { OnboadrdingStackScreenProps } from '../OnboardingStack';

export function GoalStep({ navigation }: OnboadrdingStackScreenProps<'Goal'>) {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Objetivo
            </AppText>
            <AppButton onPress={() => navigation.navigate('Gender')}>
                Próximo
            </AppButton>
        </View>
    );
}
