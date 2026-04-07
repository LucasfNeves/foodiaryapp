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
    RadioGroupDescription,
    RadioGroupIcon,
    RadioGroupItem,
    RadioGroupItemInfo,
    RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { useOnboarding } from '../context/useOnboarding';
import { ActivityLevel } from '@app/types/ActivityLevel';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';

export function ActivityLevelStep() {
    const { goToNextStep } = useOnboarding();
    const form = useFormContext<OnboardingSchema>();

    async function handleNextStep() {
        const isValid = await form.trigger('activityLevel');
        if (isValid) {
            goToNextStep();
        }
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual seu nível de atividade?</StepTitle>
                <StepSubtitle>
                    Cada nível impacta diretamente no seu gasto calórico
                </StepSubtitle>
            </StepHeader>
            <StepContent>
                <Controller
                    name="activityLevel"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            value={field.value}
                            onChangeValue={field.onChange}
                            error={!!fieldState.error && !fieldState.isDirty}
                        >
                            <RadioGroupItem value={ActivityLevel.SEDENTARY}>
                                <RadioGroupIcon>🪑</RadioGroupIcon>
                                <RadioGroupItemInfo>
                                    <RadioGroupLabel>Sedentário</RadioGroupLabel>
                                    <RadioGroupDescription>
                                        Não me exercito
                                    </RadioGroupDescription>
                                </RadioGroupItemInfo>
                            </RadioGroupItem>
                            <RadioGroupItem value={ActivityLevel.LIGHT}>
                                <RadioGroupIcon>🌿</RadioGroupIcon>
                                <RadioGroupItemInfo>
                                    <RadioGroupLabel>Leve</RadioGroupLabel>
                                    <RadioGroupDescription>
                                        1 a 2 vezes por semana
                                    </RadioGroupDescription>
                                </RadioGroupItemInfo>
                            </RadioGroupItem>
                            <RadioGroupItem value={ActivityLevel.MODERATE}>
                                <RadioGroupIcon>⚡</RadioGroupIcon>
                                <RadioGroupItemInfo>
                                    <RadioGroupLabel>Moderado</RadioGroupLabel>
                                    <RadioGroupDescription>
                                        3 a 5 vezes por semana
                                    </RadioGroupDescription>
                                </RadioGroupItemInfo>
                            </RadioGroupItem>
                            <RadioGroupItem value={ActivityLevel.HEAVY}>
                                <RadioGroupIcon>🔥</RadioGroupIcon>
                                <RadioGroupItemInfo>
                                    <RadioGroupLabel>Pesado</RadioGroupLabel>
                                    <RadioGroupDescription>
                                        6 a 7 vezes por semana
                                    </RadioGroupDescription>
                                </RadioGroupItemInfo>
                            </RadioGroupItem>
                            <RadioGroupItem value={ActivityLevel.ATHLETE}>
                                <RadioGroupIcon>🏋️</RadioGroupIcon>
                                <RadioGroupItemInfo>
                                    <RadioGroupLabel>Atleta</RadioGroupLabel>
                                    <RadioGroupDescription>
                                        2 vezes por semana
                                    </RadioGroupDescription>
                                </RadioGroupItemInfo>
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
