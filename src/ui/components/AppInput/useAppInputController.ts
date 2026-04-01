import { useState } from 'react';
import { inputStyles } from './styles';
import { VariantProps } from '@ui/styles/utils/createVariants';
import { BlurEvent, FocusEvent } from 'react-native';

interface IAppInputControllerProps {
    error?: boolean;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: BlurEvent) => void;
}

export function useAppInputController({
    error,
    onFocus,
    onBlur,
}: IAppInputControllerProps) {
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus(event: FocusEvent) {
        setIsFocused(true);
        onFocus?.(event);
    }

    function handleBlur(event: BlurEvent) {
        setIsFocused(false);
        onBlur?.(event);
    }

    function getInputStatus(): NonNullable<
        VariantProps<typeof inputStyles>
    >['status'] {
        if (error) {
            return 'error';
        }

        return isFocused ? 'focus' : 'default';
    }
    return {
        handleFocus,
        handleBlur,
        getInputStatus,
    };
}
