import { createContext, use, cloneElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
    Controller,
    ControllerProps,
    ControllerRenderProps,
    ControllerFieldState,
    FieldPath,
    FieldValues,
    UseFormStateReturn,
} from 'react-hook-form';
import { AppText } from '../AppText';
import { theme } from '@ui/styles/theme';

// ─── Context ──────────────────────────────────────────────────────────────────

interface IFormFieldContextValue {
    name: string;
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
}

const FormFieldContext = createContext<IFormFieldContextValue>(
    {} as IFormFieldContextValue,
);

export function useFormField() {
    const context = use(FormFieldContext);
    if (!context?.name) {
        throw new Error('useFormField must be used inside <FormField>');
    }
    return context;
}

// ─── FormField ─────────────────────────────────────────────────────────────────
// Replaces the <Controller> boilerplate and provides context downstream.

type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

export function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ render, ...props }: FormFieldProps<TFieldValues, TName>) {
    return (
        <Controller
            {...props}
            render={(renderProps) => (
                <FormFieldContext.Provider
                    value={renderProps as unknown as IFormFieldContextValue}
                >
                    {render(renderProps)}
                </FormFieldContext.Provider>
            )}
        />
    );
}

// ─── FormItem ──────────────────────────────────────────────────────────────────
// Replaces <FormGroup> — reads the error from context automatically.

interface IFormItemProps {
    label: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export function FormItem({ label, children, style }: IFormItemProps) {
    const { fieldState } = useFormField();
    const errorMessage = fieldState.error?.message;

    return (
        <View style={[styles.container, style]}>
            <AppText weight="medium" size="base">
                {label}
            </AppText>
            {children}
            {errorMessage ? (
                <AppText size="sm" color={theme.colors.support.red}>
                    {errorMessage}
                </AppText>
            ) : null}
        </View>
    );
}

// ─── FormControl ───────────────────────────────────────────────────────────────
// Clones the child element and injects the `error` boolean from context,
// so the primitive (AppInput, RadioGroup, etc.) shows its error style automatically.

interface IFormControlProps {
    children: React.ReactElement<{ error?: boolean }>;
}

export function FormControl({ children }: IFormControlProps) {
    const { fieldState } = useFormField();
    return cloneElement(children, { error: !!fieldState.error });
}

// ─── FormMessage ───────────────────────────────────────────────────────────────
// Standalone error message — use when FormItem is not enough (e.g. custom layouts).

interface IFormMessageProps {
    children?: React.ReactNode;
}

export function FormMessage({ children }: IFormMessageProps) {
    const { fieldState } = useFormField();
    const message = fieldState.error?.message;
    if (!message) return null;
    return (
        <AppText size="sm" color={theme.colors.support.red}>
            {children}
        </AppText>
    );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
});
