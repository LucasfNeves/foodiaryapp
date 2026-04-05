import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { OnboadrdingStackScreenProps } from '../OnboardingStack';

export function HeightStep({
    navigation,
}: OnboadrdingStackScreenProps<'Height'>) {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Altura
            </AppText>
            <AppButton onPress={() => navigation.navigate('Weight')}>
                Próximo
            </AppButton>
        </View>
    );
}
