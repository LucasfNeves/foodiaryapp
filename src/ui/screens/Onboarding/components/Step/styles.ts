import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        gap: 8,
        paddingHorizontal: 24,
    },
    title: {
        letterSpacing: -0.32,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
        justifyContent: 'flex-end',
    },
    contentCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    footer: {
        paddingHorizontal: 24,
        alignItems: 'flex-end',
    },
});
