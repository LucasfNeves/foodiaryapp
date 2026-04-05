import { View } from 'react-native';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';

export function GoalStep() {
    return (
        <View style={{ flex: 1 }}>
            <AppText size="3xl" weight="semiBold">
                Objetivo
            </AppText>
            <AppButton onPress={() => {}}>Próximo</AppButton>
        </View>
    );
}
