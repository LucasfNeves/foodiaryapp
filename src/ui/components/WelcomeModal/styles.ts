import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.lime[900],
        flex: 1,
        justifyContent: 'space-between',
    },
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 48,
    },
    header: {
        gap: 24,
        alignItems: 'center',
    },
    icon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.gray[200],
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContent: {
        gap: 8,
        alignItems: 'center',
        width: 327,
    },
    title: {
        maxWidth: 300,
        textAlign: 'center',
        letterSpacing: -0.32,
    },
    textHighLigth: {
        color: theme.colors.lime[500],
    },
    body: {
        alignItems: 'center',
    },
});
