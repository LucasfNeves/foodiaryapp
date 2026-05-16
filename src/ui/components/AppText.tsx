import { TextProps, Text, TextStyle } from 'react-native';
import { theme } from '@ui/styles/theme';

interface IAppTextProps extends TextProps {
    size?: keyof typeof theme.fontSize;
    color?: string;
    family?: keyof typeof theme.fontFamily;
    weight?: keyof typeof theme.weight;
    align?: TextStyle['textAlign'];
}

export function AppText({
    size = 'base',
    color = theme.colors.black[700],
    family = 'sans',
    weight = 'regular',
    align = 'left',
    style,
    ...props
}: IAppTextProps) {
    return (
        <Text
            style={[
                {
                    fontSize: theme.fontSize[size],
                    fontFamily: theme.fontFamily[family][theme.weight[weight]],
                    color: color,
                    textAlign: align,
                },
                style,
            ]}
            {...props}
        />
    );
}
