import { WelcomeModal } from '@ui/components/WelcomeModal';
import { FlatList, RefreshControl, View } from 'react-native';
import { styles } from './styles';
import { Header } from './components/Header';
import { theme } from '@ui/styles/theme';
import { EmptyState } from './components/EmptyState';
import { MealCard } from './components/MealCard';
import { ItemSeparatorComponent } from './components/ItemSepaeratorComponent';
import { FullScreenLoader } from './components/FullScreenLoader';
import { useHomeController } from './useHomeController';
import { Fab } from './components/Fab';
import { HomeProvider } from './context/HeaderProvider';

export function Home() {
    const {
        top,
        bottom,
        date,
        meals,
        isInitialLoading,
        isRefreshing,
        handleRefresh,
        previousDate,
        nextDate,
        isLoading,
    } = useHomeController();

    if (isInitialLoading) {
        return <FullScreenLoader />;
    }

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <WelcomeModal />

            <HomeProvider
                date={date}
                isLoading={isLoading}
                meals={meals}
                nextDate={nextDate}
                previousDate={previousDate}
            >
                <FlatList
                    style={{ flex: 1 }}
                    data={meals}
                    ListHeaderComponent={Header}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            tintColor={theme.colors.lime[900]}
                            colors={[theme.colors.lime[900]]}
                        />
                    }
                    ListEmptyComponent={EmptyState}
                    contentContainerStyle={[
                        styles.content,
                        { paddingBottom: bottom + 24 },
                    ]}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    renderItem={({ item: meal }) => <MealCard meal={meal} />}
                />
            </HomeProvider>
            {meals.length > 0 && <Fab />}
        </View>
    );
}
