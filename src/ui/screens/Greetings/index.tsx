import { ImageBackground } from 'react-native';
import { AppText } from '@ui/components/AppText';
import greetingsBg from '@ui/assets/greetings-bg/image.png';
import { styles } from './style';

export function Greetings() {
    return (
        <ImageBackground
            source={greetingsBg}
            resizeMode="cover"
            style={styles.container}
        >
            <AppText>Hello, World!</AppText>
        </ImageBackground>
    );
}
