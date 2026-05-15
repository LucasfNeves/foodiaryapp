import { useAuthContext } from '@app/context/AuthContext/useAuthContext';
import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { View } from 'react-native';

export function Home() {
    const { signOut } = useAuthContext();
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <AppText>Home</AppText>
            <AppButton onPress={signOut}>Sair</AppButton>
        </View>
    );
}
