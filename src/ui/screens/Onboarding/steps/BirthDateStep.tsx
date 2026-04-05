import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { OnboadrdingStackScreenProps } from '../OnboardingStack';

export function BirthDateStep({
    navigation,
}: OnboadrdingStackScreenProps<'BirthDate'>) {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Data de Nascimento
            </AppText>
            <AppButton onPress={() => navigation.navigate('Height')}>
                Próximo
            </AppButton>
        </View>
    );
}

