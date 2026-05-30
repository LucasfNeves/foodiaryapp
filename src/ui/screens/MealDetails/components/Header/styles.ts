import { theme } from '@ui/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.black[700],
    },
    image: {
        width: '100%',
        height: 211,
    },
    overlay: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 12,
    },
    blurView: {
        width: 48,
        height: 48,
        borderRadius: 12,
        overflow: 'hidden',
    },

    content: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 16,
    },

    pageTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    caloriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    macrosContainer: { flexDirection: 'row' },

    macro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        padding: 20,
    },
    macrosProgressContainer: {
        marginTop: 4,
        marginHorizontal: 20,
    },

    macroProgress: {
        height: 4,
        flexDirection: 'row',
        marginTop: 4,
    },
    proteinProgress: {
        backgroundColor: theme.colors.support.teal,
        height: '100%',
    },
    carbohydrateProgress: {
        backgroundColor: theme.colors.support.yellow,
        height: '100%',
    },
    fatProgress: {
        backgroundColor: theme.colors.support.orange,
        height: '100%',
    },
    divider: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[400],
        borderStyle: Platform.select({
            ios: 'solid',
            android: 'dashed',
        }),
    },
    mealName: {
        letterSpacing: -0.24,
    },

    mealNameContainer: {
        margin: 20,
        marginBottom: 24,
    },

    mealItemsHeader: {
        marginHorizontal: 20,
        marginBottom: 8,
    },
});
