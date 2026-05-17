import { WelcomeModal } from '@ui/components/WelcomeModal';
import { FlatList, RefreshControl, View } from 'react-native';
import { styles } from './styles';
import { Header } from './components/Header';
import { useState } from 'react';
import { theme } from '@ui/styles/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from './components/EmptyState';
import { MealCard } from './components/MealCard';
import { ItemSeparatorComponent } from './components/ItemSepaeratorComponent';

export function Home() {
    const { top, bottom } = useSafeAreaInsets();

    const [isRefreshing, setIsRefreshing] = useState(false);

    async function handleRefresh() {
        setIsRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsRefreshing(false);
    }

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <WelcomeModal />

            <FlatList
                data={[1, 2, 3, 4, 5]}
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
                renderItem={MealCard}
            />
        </View>
    );
}
