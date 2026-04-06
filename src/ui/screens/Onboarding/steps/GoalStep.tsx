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

export enum Goal {
    LOSE = 'lose',
    MAINTAIN = 'maintain',
    GAIN = 'gain',
}

export function GoalStep() {
    const { goToNextStep } = useOnboarding();
    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é seu objetivo?</StepTitle>
                <StepSubtitle>
                    O que você pretende alcançar com a dieta?
                </StepSubtitle>
            </StepHeader>
            <StepContent>
                <RadioGroup>
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
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={goToNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}
