import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';

export function ActivityLevelStep() {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Nível de Atividade
            </AppText>
            <AppButton onPress={() => {}}>Próximo</AppButton>
        </View>
    );
}
