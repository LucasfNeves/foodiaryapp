import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { formatSeconds } from '@ui/utils/formatSeconds';
import { styles } from './styles';
import {
    CheckIcon,
    Trash2Icon,
    PlayIcon,
    PauseIcon,
} from 'lucide-react-native';
import { AppButton } from '@ui/components/Button';
import { View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

interface IAudioPlayerProps {
    audioUri: string;
    onTryAgain?: () => void;
}

export function AudioPlayer({ audioUri, onTryAgain }: IAudioPlayerProps) {
    const player = useAudioPlayer(audioUri);
    const { duration, currentTime, playing } = useAudioPlayerStatus(player);

    function handlePlayPause() {
        if (player.playing) {
            player.pause();

            return;
        }

        player.seekTo(0);
        player.play();
    }

    return (
        <>
            <View style={styles.actionsGroup}>
                <AppButton
                    size="icon"
                    variant="neutral"
                    rippleStyle="light"
                    onPress={onTryAgain}
                >
                    <Trash2Icon color={theme.colors.gray[500]} size={20} />
                </AppButton>

                <AppButton
                    size="icon"
                    variant="neutral"
                    rippleStyle="light"
                    onPress={handlePlayPause}
                >
                    {playing && (
                        <PauseIcon
                            color={theme.colors.gray[500]}
                            fill={theme.colors.gray[500]}
                            size={20}
                        />
                    )}

                    {!playing && (
                        <PlayIcon
                            color={theme.colors.gray[500]}
                            fill={theme.colors.gray[500]}
                            size={20}
                        />
                    )}
                </AppButton>

                <AppButton size="icon" variant="primary">
                    <CheckIcon color={theme.colors.black[700]} size={20} />
                </AppButton>
            </View>

            <AppText
                color={theme.colors.gray[500]}
                align="center"
                style={styles.actionLabel}
            >
                {`${formatSeconds(currentTime)} / ${formatSeconds(duration)}`}
            </AppText>
        </>
    );
}
