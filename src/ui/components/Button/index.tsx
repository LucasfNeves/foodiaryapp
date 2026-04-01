import { Platform, Pressable, PressableProps } from 'react-native';
import { AppText } from '../AppText';
import { buttonStyles, ButtonVariants } from './styles';

type IAppButtonProps = Omit<PressableProps, 'disabled'> &
    Omit<NonNullable<ButtonVariants>, 'disabled'> & {
        children: React.ReactNode;
        disabled?: boolean;
    };

export function AppButton({
    children,
    variant,
    size,
    disabled,
    style,
    ...props
}: IAppButtonProps) {
    const childElement =
        typeof children === 'string' ? (
            <AppText weight="medium">{children}</AppText>
        ) : (
            children
        );
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
            {childElement}
        </Pressable>
    );
}
