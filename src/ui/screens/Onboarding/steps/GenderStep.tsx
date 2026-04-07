import { AppButton } from '@ui/components/Button';
import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubtitle,
    StepTitle,
} from '../components/Step';
import {
    RadioGroup,
    RadioGroupIcon,
    RadioGroupItem,
    RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { ArrowRightIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { useOnboarding } from '../context/useOnboarding';
import { Gender } from '@app/types/Gender';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';

export function GenderStep() {
    const { goToNextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();

    async function handleNextStep() {
        const isValid = await form.trigger('gender');
        if (isValid) {
            goToNextStep();
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é o seu gênero?</StepTitle>
                <StepSubtitle>
                    Seu gênero influencia no tipo de dieta
                </StepSubtitle>
            </StepHeader>
            <StepContent>
                <Controller
                    name="gender"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            orientation="horizontal"
                            value={field.value}
                            onChangeValue={field.onChange}
                            error={!!fieldState.error && !fieldState.isDirty}
                        >
                            <RadioGroupItem value={Gender.MALE}>
                                <RadioGroupIcon>🧔‍♂️</RadioGroupIcon>
                                <RadioGroupLabel>Masculino</RadioGroupLabel>
                            </RadioGroupItem>
                            <RadioGroupItem value={Gender.FEMALE}>
                                <RadioGroupIcon>👩</RadioGroupIcon>
                                <RadioGroupLabel>Feminino</RadioGroupLabel>
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
