import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { OnboadrdingStackScreenProps } from '../OnboardingStack';

export function WeightStep({
    navigation,
}: OnboadrdingStackScreenProps<'Weight'>) {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Peso
            </AppText>
            <AppButton onPress={() => navigation.navigate('ActivityLevel')}>
                Próximo
            </AppButton>
        </View>
    );
}
