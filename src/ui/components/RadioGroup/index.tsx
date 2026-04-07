import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '../AppText';
import { createContext, use } from 'react';

interface IRadioGroupItemProps {
    value: string;
    children: React.ReactNode;
}

interface IRadioGroupContextValue {
    value: string | null;
    onChangeValue: (value: string) => void;
    isHorizontal: boolean;
    error?: boolean;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue);

interface IRadioGroupProps {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    value: string | null;
    onChangeValue: (value: string) => void;
    error: boolean;
}

export function RadioGroup({
    children,
    orientation = 'vertical',
    value,
    onChangeValue,
    error = false,
}: IRadioGroupProps) {
    const isHorizontal = orientation === 'horizontal';

    return (
        <RadioGroupContext
            value={{ value, onChangeValue, isHorizontal, error }}
        >
            <View
                style={[
                    styles.container,
                    isHorizontal && styles.containerHorizontal,
                ]}
            >
                {children}
            </View>
        </RadioGroupContext>
    );
}

const RadioGroupItemContext = createContext({ isSelected: false });

export function RadioGroupItem({ children, value }: IRadioGroupItemProps) {
    const {
        value: selectedValue,
        onChangeValue,
        isHorizontal,
        error,
    } = use(RadioGroupContext);

    const isSelected = selectedValue === value;

    return (
        <RadioGroupItemContext.Provider value={{ isSelected }}>
            <TouchableOpacity
                onPress={() => onChangeValue(value)}
                style={[
                    styles.item,
                    isHorizontal && styles.horizontalItem,
                    isSelected && styles.selectedItem,
                    error && styles.errorItem,
                ]}
            >
                {children}
            </TouchableOpacity>
        </RadioGroupItemContext.Provider>
    );
}

export function RadioGroupIcon({ children }: { children: string }) {
    const { isSelected } = use(RadioGroupItemContext);
    const { error } = use(RadioGroupContext);

    return (
        <View
            style={[
                styles.icon,
                isSelected && styles.selectedIcon,
                error && styles.errorIcon,
            ]}
        >
            <AppText>{children}</AppText>
        </View>
    );
}

export function RadioGroupLabel({ children }: { children: string }) {
    const { isHorizontal } = use(RadioGroupContext);

    return (
        <AppText
            weight="semiBold"
            style={[styles.label, isHorizontal && styles.textCenter]}
        >
            {children}
        </AppText>
    );
}

export function RadioGroupDescription({ children }: { children: string }) {
    const { isHorizontal } = use(RadioGroupContext);

    return (
        <AppText
            size="sm"
            style={[styles.description, isHorizontal && styles.textCenter]}
        >
            {children}
        </AppText>
    );
}

export function RadioGroupItemInfo({
    children,
}: {
    children: React.ReactNode;
}) {
    return <View style={styles.info}>{children}</View>;
}
