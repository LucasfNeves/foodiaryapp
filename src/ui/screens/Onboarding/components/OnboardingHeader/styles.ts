import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    progressBarBackground: {
        backgroundColor: theme.colors.gray[200],
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    progressBarForeground: {
        backgroundColor: theme.colors.lime[700],
        flex: 1,
        height: '100%',
        borderRadius: 2,
        width: '60%',
    },
    rightActionPlaceholder: {
        width: 40,
        height: 40,
    },
});
