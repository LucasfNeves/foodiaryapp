import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '../AppText';
import { createContext, use, useState } from 'react';

interface IRadioGroupItemProps {
    value: string;
    children: React.ReactNode;
}

interface IRadioGroupContextValue {
    value: string | null;
    onValueChange: (value: string | null) => void;
    isHorizontal: boolean;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue);

interface IRadioGroupProps {
    children: React.ReactNode;
    initialValue?: string;
    orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
    children,
    initialValue,
    orientation = 'vertical',
}: IRadioGroupProps) {
    const [value, setValue] = useState<string | null>(initialValue ?? null);

    const isHorizontal = orientation === 'horizontal';

    function onValueChange(newValue: string | null) {
        setValue(newValue);
    }

    return (
        <RadioGroupContext value={{ value, onValueChange, isHorizontal }}>
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
        onValueChange,
        isHorizontal,
    } = use(RadioGroupContext);

    const isSelected = selectedValue === value;

    return (
        <RadioGroupItemContext.Provider value={{ isSelected }}>
            <TouchableOpacity
                onPress={() => onValueChange(value)}
                style={[
                    styles.item,
                    isHorizontal && styles.horizontalItem,
                    isSelected && styles.selectedItem,
                ]}
            >
                {children}
            </TouchableOpacity>
        </RadioGroupItemContext.Provider>
    );
}

export function RadioGroupIcon({ children }: { children: string }) {
    const { isSelected } = use(RadioGroupItemContext);

    return (
        <View style={[styles.icon, isSelected && styles.selectedIcon]}>
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
