import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.lime[900],
        gap: 32,
    },

    content: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    video: {
        width: 136,
        height: 136,
        borderRadius: 68,
    },
});
