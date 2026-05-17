import { Platform, Pressable, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui/components/AppText';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';

export function CreateMealOptions() {
    return (
        <View style={styles.container}>
            <OptionButton icon={MicIcon} label="Áudio" />

            <OptionButton icon={CameraIcon} label="Foto" />
        </View>
    );
}

interface IOptionButtonProps {
    icon: LucideIcon;
    label: string;
}

export function OptionButton({ icon: Icon, label }: IOptionButtonProps) {
    return (
        <View style={styles.buttonWrapper}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && Platform.OS === 'ios' && { opacity: 0.7 },
                ]}
                android_ripple={{
                    color: 'rgba(0, 0, 0, 0.1)',
                    borderless: false,
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
