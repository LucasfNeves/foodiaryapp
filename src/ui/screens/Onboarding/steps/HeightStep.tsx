import { AppButton } from '@ui/components/Button';
import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubtitle,
    StepTitle,
} from '../components/Step';
import { theme } from '@ui/styles/theme';
import { ArrowRightIcon } from 'lucide-react-native';
import { useOnboarding } from '../context/useOnboarding';
import { FormGroup } from '@ui/components/FormGroup';
import { AppInput } from '@ui/components/AppInput';
import { formatDecimal } from '@ui/utils/formatDecimal';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';

export function HeightStep() {
    const { goToNextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();

    async function handleNextStep() {
        const isValid = await form.trigger('height');
        if (isValid) {
            goToNextStep();
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é a sua altura?</StepTitle>
                <StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
            </StepHeader>
            <StepContent position="center">
                <FormGroup
                    label="Altura"
                    style={{ width: '100%' }}
                    error={form.formState.errors.height?.message}
                >
                    <Controller
                        name="height"
                        control={form.control}
                        render={({ field }) => (
                            <AppInput
                                placeholder="Ex: 1.75"
                                keyboardType="numeric"
                                formatter={formatDecimal}
                                value={field.value}
                                onChangeText={field.onChange}
                                autoFocus
                            />
                        )}
                    />
                </FormGroup>
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={handleNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}
