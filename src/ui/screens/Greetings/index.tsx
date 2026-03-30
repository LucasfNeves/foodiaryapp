import { ImageBackground } from 'react-native';
import greetingsBg from '@ui/assets/greetings-bg/image.png';
import { styles } from './style';
import Logo from '@ui/assets/Logo';
import { AppButton } from '@ui/components/Button';

export function Greetings() {
    return (
        <ImageBackground
            source={greetingsBg}
            resizeMode="cover"
            style={styles.container}
        >
            <Logo width={187} height={60} />

            <AppButton>Criar minha conta</AppButton>
        </ImageBackground>
    );
}
