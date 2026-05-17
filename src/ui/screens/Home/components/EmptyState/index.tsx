import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { View } from 'react-native';
import { CreateMealOptions } from '../CreateMealOptions';
import { styles } from './styles';

export function EmptyState() {
    return (
        <View style={styles.container}>
            <AppText color={theme.colors.gray[700]}>
                Cadastre sua primeira refeição através das opções abaixo:
            </AppText>

            <CreateMealOptions />
        </View>
    );
}
