import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: theme.colors.lime[500],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
});
