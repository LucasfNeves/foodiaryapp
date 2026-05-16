import { View } from 'react-native';
import { UserHeader } from '../UserHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Header() {
    const { top } = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: top, flex: 1 }}>
            <UserHeader />
        </View>
    );
}
