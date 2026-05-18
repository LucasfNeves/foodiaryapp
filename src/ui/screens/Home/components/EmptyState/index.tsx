import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { View } from 'react-native';
import { CreateMealOptions } from '../CreateMealOptions';
import { styles } from './styles';
import { useHomeContext } from '../../context/useHomeContext';

export function EmptyState() {
    const { isLoading } = useHomeContext();
    return (
        <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
            <AppText color={theme.colors.gray[700]}>
                Cadastre sua primeira refeição através das opções abaixo:
            </AppText>

            <CreateMealOptions disabled={isLoading} />
        </View>
    );
}
