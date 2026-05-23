import { Modal, View } from 'react-native';
import { styles } from './styles';
import { AppButton } from '@ui/components/Button';
import { XIcon } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@ui/styles/theme';
import { AppText } from '@ui/components/AppText';
import { useAudioModalController } from './useAudioModalController';
import { Actions } from './Actions';

interface IAudioModalProps {
    visible: boolean;
    onClose: () => void;
}

export function AudioModal({ visible, onClose }: IAudioModalProps) {
    const { state, isRecording, handleStartRecording } =
        useAudioModalController();

    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType="slide"
            transparent
            statusBarTranslucent
        >
            <StatusBar animated translucent style="light" />
            <View style={styles.container}>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.content}>
                        <View style={styles.header}>
                            <AppButton
                                size="icon"
                                variant="neutral"
                                onPress={onClose}
                                rippleStyle="light"
                            >
                                <XIcon
                                    color={theme.colors.gray[500]}
                                    size={20}
                                />
                            </AppButton>
                        </View>

                        <View style={styles.body}>
                            <View
                                style={[
                                    styles.circle1,
                                    isRecording && styles.circle1Recording,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.circle2,
                                        isRecording && styles.circle2Recording,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circle3,
                                            isRecording &&
                                                styles.circle3Recording,
                                        ]}
                                    ></View>
                                </View>
                            </View>

                            <AppText
                                color={theme.colors.gray[500]}
                                align="center"
                                style={styles.instructionLabel}
                            >
                                Tente dizer algo como: 100g de Arroz, 2 Ovos e
                                100g de Salada
                            </AppText>
                        </View>

                        <View style={styles.footer}>
                            <View style={styles.actionsContainer}>
                                <Actions
                                    state={state}
                                    onStartRecording={handleStartRecording}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </Modal>
    );
}
