import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';

export function WeightStep() {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Peso
            </AppText>
            <AppButton onPress={() => {}}>Próximo</AppButton>
        </View>
    );
}
