import {
    ActivityIndicator,
    Platform,
    Pressable,
    PressableProps,
    View,
} from 'react-native';
import { AppText } from '../AppText';
import { buttonStyles, ButtonVariants, styles } from './styles';
import { theme } from '@ui/styles/theme';
import { LucideIcon } from 'lucide-react-native';

type IAppButtonProps = Omit<PressableProps, 'disabled'> &
    Omit<NonNullable<ButtonVariants>, 'disabled'> & {
        disabledProp?: boolean;
        isLoading?: boolean;
        leftIcon?: LucideIcon;
        rippleStyle?: 'light' | 'dark';
    };

export function AppButton({
    children,
    variant,
    size,
    disabledProp,
    style,
    isLoading,
    leftIcon: LeftIcon,
    rippleStyle = 'dark',
    ...props
}: IAppButtonProps) {
    const childElement =
        typeof children === 'string' ? (
            <AppText weight="medium">{children}</AppText>
        ) : (
            children
        );

    const disabled = disabledProp || isLoading;

    return (
        <Pressable
            style={({ pressed }) => [
                buttonStyles({
                    size,
                    variant,
                    disabled: disabled ? 'true' : 'false',
                }),
                pressed && Platform.OS === 'ios' && { opacity: 0.7 },
                typeof style === 'function' ? style({ pressed }) : style,
            ]}
            disabled={disabled}
            android_ripple={{
                color:
                    rippleStyle === 'dark'
                        ? 'rgba(0, 0, 0, 0.1)'
                        : 'rgba(255, 255, 255, 0.1)',
                foreground: true,
            }}
            {...props}
        >
            {!isLoading ? (
                <View style={styles.content}>
                    {LeftIcon && (
                        <LeftIcon color={theme.colors.black[700]} size={20} />
                    )}
                    {childElement as React.ReactNode}
                </View>
            ) : (
                <ActivityIndicator size={24} color={theme.colors.black[700]} />
            )}
        </Pressable>
    );
}
