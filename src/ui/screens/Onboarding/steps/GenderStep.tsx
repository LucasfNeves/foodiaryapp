import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { OnboadrdingStackScreenProps } from '../OnboardingStack';

export function GenderStep({
    navigation,
}: OnboadrdingStackScreenProps<'Gender'>) {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Gênero
            </AppText>
            <AppButton onPress={() => navigation.navigate('BirthDate')}>
                Próximo
            </AppButton>
        </View>
    );
}

