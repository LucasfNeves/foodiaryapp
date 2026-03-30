import { Platform, Pressable, PressableProps } from 'react-native';
import { AppText } from '../AppText';
import { styles } from './styles';

interface IAppButtonProps extends PressableProps {
    children: React.ReactNode;
}

export function AppButton({ children, ...props }: IAppButtonProps) {
    const childElement =
        typeof children === 'string' ? (
            <AppText weight="medium">{children}</AppText>
        ) : (
            children
        );
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && Platform.OS === 'ios' && { opacity: 0.7 },
            ]}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}
            {...props}
        >
            {childElement}
        </Pressable>
    );
}
