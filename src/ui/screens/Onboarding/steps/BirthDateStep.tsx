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
import { OnboardingSchema } from '../schema';
import { Controller, useFormContext } from 'react-hook-form';

export function BirthDateStep() {
    const { goToNextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
        if (!newDate) return;
        form.setValue('birthDate', newDate);
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
                <Controller
                    name="birthDate"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            {isDatePickerVisible && (
                                <DateTimePicker
                                    mode="date"
                                    display={
                                        Platform.OS === 'ios'
                                            ? 'spinner'
                                            : 'default'
                                    }
                                    value={field.value}
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
                                        {formatDate(field.value)}
                                    </AppText>
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                />
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={goToNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}
