import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubtitle,
    StepTitle,
} from '../components/Step';
import { AppButton } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { ArrowRightIcon } from 'lucide-react-native';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Platform, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useOnboarding } from '../context/useOnboarding';
import { AppText } from '@ui/components/AppText';
import { formatDate } from '@ui/utils/formatDate';

export function BirthDateStep() {
    const { goToNextStep } = useOnboarding();
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
        if (!newDate) return;
        setDate(newDate);
        if (Platform.OS === 'android') {
            setDatePickerVisible(false);
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Que dia você nasceu?</StepTitle>
                <StepSubtitle>
                    Cada faixa etária responde de forma única
                </StepSubtitle>
            </StepHeader>
            <StepContent position="center">
                {isDatePickerVisible && (
                    <DateTimePicker
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        value={date}
                        onChange={handleSelectDate}
                    />
                )}
                {Platform.OS === 'android' && (
                    <TouchableOpacity
                        onPress={() => setDatePickerVisible(true)}
                    >
                        <AppText
                            weight="semiBold"
                            size="3xl"
                            color={theme.colors.gray[700]}
                        >
                            {formatDate(date)}
                        </AppText>
                    </TouchableOpacity>
                )}
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={goToNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}
