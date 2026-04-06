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

export enum ActivityLevel {
    SEDENTARY = 'sedentary',
    LIGHT = 'light',
    MODERATE = 'moderate',
    HEAVY = 'heavy',
    ATHLETE = 'athlete',
}

export function ActivityLevelStep() {
    const { goToNextStep } = useOnboarding();

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual seu nível de atividade?</StepTitle>
                <StepSubtitle>
                    Cada nível impacta diretamente no seu gasto calórico
                </StepSubtitle>
            </StepHeader>
            <StepContent>
                <RadioGroup>
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
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={goToNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}

