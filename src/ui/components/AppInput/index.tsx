import { TextInput, TextInputProps } from 'react-native';
import { inputStyles } from './styles';
import { theme } from '@ui/styles/theme';
import { useAppInputController } from './useAppInputController';
import React from 'react';

type BaseTextInputProps = Omit<TextInputProps, 'readonly'>;

export interface IInputProps extends BaseTextInputProps {
    error?: boolean;
    disabled?: boolean;
    InputComponent?: React.ComponentType<BaseTextInputProps>;
    ref?: React.Ref<TextInput>;
}

export function AppInput({
    onFocus,
    onBlur,
    error,
    disabled,
    InputComponent = TextInput,
    ...props
}: IInputProps) {
    const { getInputStatus, handleBlur, handleFocus } = useAppInputController({
        error,
        onFocus,
        onBlur,
    });

    return (
        <InputComponent
            style={inputStyles({
                status: getInputStatus(),
                disabled: disabled ? 'true' : 'false',
            })}
            placeholderTextColor={theme.colors.gray[700]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={disabled}
            {...props}
        />
    );
}
