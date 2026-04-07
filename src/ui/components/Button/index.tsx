import {
    ActivityIndicator,
    Platform,
    Pressable,
    PressableProps,
} from 'react-native';
import { AppText } from '../AppText';
import { buttonStyles, ButtonVariants } from './styles';
import { theme } from '@ui/styles/theme';

type IAppButtonProps = Omit<PressableProps, 'disabled'> &
    Omit<NonNullable<ButtonVariants>, 'disabled'> & {
        disabledProp?: boolean;
        isLoading?: boolean;
    };

export function AppButton({
    children,
    variant,
    size,
    disabledProp,
    style,
    isLoading,
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
            android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}
            {...props}
        >
            {!isLoading ? (
                childElement
            ) : (
                <ActivityIndicator size={24} color={theme.colors.black[700]} />
            )}
        </Pressable>
    );
}
