import { Platform, Pressable, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';

interface ICreateMealOptionsProps {
    disabled?: boolean;
}

export function CreateMealOptions({
    disabled = false,
}: ICreateMealOptionsProps) {
    return (
        <View style={styles.container}>
            <OptionButton icon={MicIcon} label="Áudio" disabled={disabled} />

            <OptionButton icon={CameraIcon} label="Foto" disabled={disabled} />
        </View>
    );
}

interface IOptionButtonProps {
    icon: LucideIcon;
    label: string;
    disabled?: boolean;
}

export function OptionButton({
    icon: Icon,
    label,
    disabled = false,
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
            >
                <View style={styles.icon}>
                    <Icon color={theme.colors.black[700]} size={24} />
                </View>

                <AppText style={styles.buttonLabel}>{label}</AppText>
            </Pressable>
        </View>
    );
}
