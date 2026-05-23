import { Platform, Pressable, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { AudioModal } from '../AudioModal';
import { useState } from 'react';

interface ICreateMealOptionsProps {
    disabled?: boolean;
}

export function CreateMealOptions({
    disabled = false,
}: ICreateMealOptionsProps) {
    const [currentVisibleModal, setCurrentVisibleModal] = useState<
        'audio' | 'picture' | null
    >(null);

    function handleOpenModal(type: 'audio' | 'picture') {
        setCurrentVisibleModal(type);
    }

    function handleCloseModal() {
        setCurrentVisibleModal(null);
    }

    return (
        <View style={styles.container}>
            <AudioModal
                visible={currentVisibleModal === 'audio'}
                onClose={handleCloseModal}
            />
            <OptionButton
                icon={MicIcon}
                label="Áudio"
                disabled={disabled}
                onPress={() => handleOpenModal('audio')}
            />

            <OptionButton
                icon={CameraIcon}
                label="Foto"
                disabled={disabled}
                onPress={() => handleOpenModal('picture')}
            />
        </View>
    );
}

interface IOptionButtonProps {
    icon: LucideIcon;
    label: string;
    disabled?: boolean;
    onPress: () => void;
}

export function OptionButton({
    icon: Icon,
    label,
    disabled = false,
    onPress,
}: IOptionButtonProps) {
    return (
        <View style={styles.buttonWrapper}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && Platform.OS === 'ios' && { opacity: 0.7 },
                    disabled && { opacity: 0.5 },
                ]}
                android_ripple={{
                    color: 'rgba(0, 0, 0, 0.1)',
                    foreground: true,
                }}
                onPress={onPress}
            >
                <View style={styles.icon}>
                    <Icon color={theme.colors.black[700]} size={24} />
                </View>

                <AppText style={styles.buttonLabel}>{label}</AppText>
            </Pressable>
        </View>
    );
}
