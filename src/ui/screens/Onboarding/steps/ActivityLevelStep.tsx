import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { OnboadrdingStackScreenProps } from '../OnboardingStack';

export function ActivityLevelStep({
    navigation,
}: OnboadrdingStackScreenProps<'ActivityLevel'>) {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Nível de Atividade
            </AppText>
            <AppButton onPress={() => navigation.navigate('CreateAccount')}>
                Próximo
            </AppButton>
        </View>
    );
}
