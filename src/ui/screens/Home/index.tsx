import { WelcomeModal } from '@ui/components/WelcomeModal';
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { Header } from './components/Header';

export function Home() {
    return (
        <View style={styles.container}>
            <WelcomeModal />

            <FlatList
                data={[1, 2, 3, 4, 5]}
                ListHeaderComponent={Header}
                renderItem={({ item }) => <AppText>Item {item}</AppText>}
            />
        </View>
    );
}
