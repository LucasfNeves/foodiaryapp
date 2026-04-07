import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubtitle,
    StepTitle,
} from '../components/Step';
import { AppButton } from '@ui/components/Button';
import { ArrowRightIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import {
    RadioGroup,
    RadioGroupIcon,
    RadioGroupItem,
    RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { useOnboarding } from '../context/useOnboarding';
import { Goal } from '@app/types/Goal';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';

export function GoalStep() {
    const { goToNextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();

    async function handleNextStep() {
        const isValid = await form.trigger('goal');
        if (isValid) {
            goToNextStep();
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é seu objetivo?</StepTitle>
                <StepSubtitle>
                    O que você pretende alcançar com a dieta?
                </StepSubtitle>
            </StepHeader>
            <StepContent>
                <Controller
                    name="goal"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            value={field.value}
                            onChangeValue={field.onChange}
                            error={!!fieldState.error && !fieldState.isDirty}
                        >
                            <RadioGroupItem value={Goal.LOSE}>
                                <RadioGroupIcon>🥦</RadioGroupIcon>
                                <RadioGroupLabel>Perder peso</RadioGroupLabel>
                            </RadioGroupItem>
                            <RadioGroupItem value={Goal.MAINTAIN}>
                                <RadioGroupIcon>🍍</RadioGroupIcon>
                                <RadioGroupLabel>Manter peso</RadioGroupLabel>
                            </RadioGroupItem>
                            <RadioGroupItem value={Goal.GAIN}>
                                <RadioGroupIcon>🥩</RadioGroupIcon>
                                <RadioGroupLabel>Ganhar peso</RadioGroupLabel>
                            </RadioGroupItem>
                        </RadioGroup>
                    )}
                />
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={handleNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}
