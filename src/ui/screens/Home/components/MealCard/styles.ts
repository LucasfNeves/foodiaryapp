import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 8,
    },
    wrapper: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    card: {
        borderRadius: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: theme.colors.gray[700],
    },

    header: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    body: {
        borderRadius: 8,
        backgroundColor: theme.colors.gray[100],
        padding: 16,
        gap: 16,
    },
    mealDetails: {
        gap: 2,
        flexShrink: 1,
    },
    icon: {
        width: 48,
        height: 48,
        backgroundColor: theme.colors.gray[200],
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mealDetailsRow: {
        flexDirection: 'row',
    },
    mealStat: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
});
