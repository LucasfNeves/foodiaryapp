import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { AudioModalState } from './useAudioModalController';
import { AppButton } from '@ui/components/Button';
import { MicIcon } from 'lucide-react-native';
import { styles } from './styles';

interface IActionsProps {
    state: AudioModalState;
    onStartRecording: () => void;
}

export function Actions({ state, onStartRecording }: IActionsProps) {
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
            <AppText color={theme.colors.gray[500]} align="center">
                Gravando... Fale agora!
            </AppText>
        );
    }

    if (state === 'recorded') {
        return (
            <AppText color={theme.colors.gray[500]} align="center">
                Gravação concluída! Processando os dados...
            </AppText>
        );
    }

    return null;
}
