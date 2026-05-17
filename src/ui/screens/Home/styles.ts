import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.lime[400],
    },
    content: {
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        flex: 1,
    },
});
