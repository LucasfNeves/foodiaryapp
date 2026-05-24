import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { AudioModalState } from './useAudioModalController';
import { AppButton } from '@ui/components/Button';
import { MicIcon, SquareIcon } from 'lucide-react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { formatSeconds } from '@ui/utils/formatSeconds';
import { AudioPlayer } from './AudioPlayer';

interface IActionsProps {
    state: AudioModalState;
    onStartRecording: () => void;
    onStopRecording?: () => void;
    audioUri: string | null;
}

export function Actions({
    state,
    onStartRecording,
    onStopRecording,
    audioUri,
}: IActionsProps) {
    const [recordingTimeInSeconds, setRecordingTimeInSeconds] = useState(0);

    useEffect(() => {
        if (state !== 'recording') {
            return;
        }

        const intervalId = setInterval(() => {
            setRecordingTimeInSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [state]);

    if (state === 'idle') {
        return (
            <>
                <AppButton
                    size="icon"
                    variant="neutral"
                    rippleStyle="light"
                    onPress={onStartRecording}
                >
                    <MicIcon color={theme.colors.lime[600]} size={20} />
                </AppButton>

                <AppText
                    color={theme.colors.gray[500]}
                    align="center"
                    style={styles.actionLabel}
                >
                    Clique no microfone para começar a gravar
                </AppText>
            </>
        );
    }

    if (state === 'recording') {
        return (
            <>
                <AppButton
                    size="icon"
                    variant="neutral"
                    rippleStyle="light"
                    onPress={onStopRecording}
                >
                    <SquareIcon
                        color={theme.colors.lime[600]}
                        fill={theme.colors.lime[600]}
                        size={20}
                    />
                </AppButton>

                <AppText
                    color={theme.colors.gray[500]}
                    align="center"
                    style={styles.actionLabel}
                >
                    {formatSeconds(recordingTimeInSeconds)}
                </AppText>
            </>
        );
    }

    if (state === 'recorded' && audioUri) {
        return <AudioPlayer audioUri={audioUri} />;
    }

    return null;
}
