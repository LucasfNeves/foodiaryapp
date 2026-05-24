import { Logo } from '@ui/assets/Logo';
import { View } from 'react-native';
import { AppText } from '../AppText';
import { theme } from '@ui/styles/theme';
import { styles } from './styles';
import video from './ai-animation.mp4';
import { useVideoPlayer } from 'expo-video/build/VideoPlayer';
import { VideoView } from 'expo-video/build/VideoView';

interface ICreateMealInterface {
    type: 'audio' | 'picture';
}

export function CreateMealLoader({ type }: ICreateMealInterface) {
    const player = useVideoPlayer(video, (player) => {
        player.loop = true;
        player.play();
    });

    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                nativeControls={false}
                style={styles.video}
            />
            <View style={styles.content}>
                <Logo width={75} height={24} />

                <AppText color={theme.colors.gray[300]} align="center">
                    {type === 'audio' && 'Estou ouvindo o seu áudio...'}
                    {type === 'picture' && 'Estou analisando a sua foto...'}
                </AppText>
            </View>
        </View>
    );
}
