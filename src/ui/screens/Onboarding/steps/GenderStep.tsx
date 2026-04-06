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

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export function GenderStep() {
    const { goToNextStep } = useOnboarding();

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é o seu gênero?</StepTitle>
                <StepSubtitle>
                    Seu gênero influencia no tipo de dieta
                </StepSubtitle>
            </StepHeader>
            <StepContent>
                <RadioGroup orientation="horizontal" initialValue={Gender.MALE}>
                    <RadioGroupItem value={Gender.MALE}>
                        <RadioGroupIcon>🧔‍♂️</RadioGroupIcon>
                        <RadioGroupLabel>Masculino</RadioGroupLabel>
                    </RadioGroupItem>
                    <RadioGroupItem value={Gender.FEMALE}>
                        <RadioGroupIcon>👩</RadioGroupIcon>
                        <RadioGroupLabel>Feminino</RadioGroupLabel>
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
