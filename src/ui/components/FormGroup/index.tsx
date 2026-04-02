import { View } from 'react-native';
import { styles } from './styles';
import { AppText } from '../AppText';
import { theme } from '@ui/styles/theme';
import { cloneElement } from 'react';

interface IFormGroupProps {
    label: string;
    children: React.ReactElement<{ error?: boolean }>;
    error?: string;
}

export function FormGroup({ label, children, error }: IFormGroupProps) {
    return (
        <View style={styles.container}>
            <AppText weight="medium" size="base">
                {label}
            </AppText>
            {cloneElement(children, { error: !!error })}
            {error && (
                <AppText size="sm" color={theme.colors.support.red}>
                    {error}
                </AppText>
            )}
        </View>
    );
}
