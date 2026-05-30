import { Modal, View, Image } from 'react-native';
import { styles } from './styles';
import { AppButton } from '@ui/components/Button';
import {
    CameraIcon,
    CheckIcon,
    Trash2Icon,
    UnlockIcon,
    XIcon,
} from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@ui/styles/theme';
import { AppText } from '@ui/components/AppText';
import { usePictureModalController } from './usePictureModalController';
import { CreateMealLoader } from '@ui/components/CreateMealLoader';
import { CameraView } from 'expo-camera';

interface IPictureModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate?: () => void;
}

export function PictureModal({
    visible,
    onClose,
    onCreate,
}: IPictureModalProps) {
    const {
        isLoading,
        permission,
        cameraRef,
        photoUri,
        handleTryAgain,
        handleConfirm,
        handleTakePicture,
        requestPermission,
    } = usePictureModalController({ onClose, onCreate });

    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType="slide"
            transparent
            statusBarTranslucent
        >
            <StatusBar animated translucent style="light" />
            {isLoading && <CreateMealLoader type="picture" />}

            {!isLoading && permission && (
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

                            {!permission.granted && (
                                <View style={styles.body}>
                                    <View style={styles.permissionContainer}>
                                        <CameraIcon
                                            color={theme.colors.gray[500]}
                                            size={32}
                                        />
                                        <AppText
                                            color={theme.colors.gray[500]}
                                            align="center"
                                            style={styles.permissionLabel}
                                        >
                                            Para registrar uma refeição com
                                            foto, precisamos de acesso à sua
                                            câmera.
                                        </AppText>
                                    </View>
                                    <AppButton
                                        onPress={requestPermission}
                                        leftIcon={UnlockIcon}
                                    >
                                        Conceder acesso
                                    </AppButton>
                                </View>
                            )}

                            {permission.granted && (
                                <>
                                    <View style={styles.body}>
                                        {!photoUri && (
                                            <CameraView
                                                style={styles.camera}
                                                facing="back"
                                                ref={cameraRef}
                                            />
                                        )}

                                        {photoUri && (
                                            <Image
                                                source={{ uri: photoUri }}
                                                style={styles.picture}
                                            />
                                        )}
                                    </View>

                                    <View style={styles.footer}>
                                        <View style={styles.actionsContainer}>
                                            {!photoUri && (
                                                <>
                                                    <AppButton
                                                        variant="neutral"
                                                        size="icon"
                                                        rippleStyle="light"
                                                        onPress={
                                                            handleTakePicture
                                                        }
                                                    >
                                                        <CameraIcon
                                                            color={
                                                                theme.colors
                                                                    .lime[600]
                                                            }
                                                            size={20}
                                                        />
                                                    </AppButton>

                                                    <AppText
                                                        color={
                                                            theme.colors
                                                                .gray[500]
                                                        }
                                                        align="center"
                                                        style={
                                                            styles.actionLabel
                                                        }
                                                    >
                                                        Tirar foto
                                                    </AppText>
                                                </>
                                            )}

                                            {photoUri && (
                                                <View
                                                    style={styles.actionsGroup}
                                                >
                                                    <AppButton
                                                        size="icon"
                                                        variant="neutral"
                                                        rippleStyle="light"
                                                        onPress={handleTryAgain}
                                                    >
                                                        <Trash2Icon
                                                            color={
                                                                theme.colors
                                                                    .gray[500]
                                                            }
                                                            size={20}
                                                        />
                                                    </AppButton>

                                                    <AppButton
                                                        size="icon"
                                                        variant="primary"
                                                        onPress={handleConfirm}
                                                    >
                                                        <CheckIcon
                                                            color={
                                                                theme.colors
                                                                    .black[700]
                                                            }
                                                            size={20}
                                                        />
                                                    </AppButton>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </>
                            )}
                        </SafeAreaView>
                    </SafeAreaProvider>
                </View>
            )}
        </Modal>
    );
}
