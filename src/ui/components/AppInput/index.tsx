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
    formatter?: (value: string) => string;
}

export function AppInput({
    onFocus,
    onBlur,
    error,
    disabled,
    InputComponent = TextInput,
    formatter,
    onChangeText,
    ...props
}: IInputProps) {
    const { getInputStatus, handleBlur, handleFocus, handleChangeText } =
        useAppInputController({
            error,
            onFocus,
            onBlur,
            onChangeText,
            formatter,
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
            onChangeText={handleChangeText}
            {...props}
        />
    );
}
