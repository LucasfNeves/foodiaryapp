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

export function WeightStep() {
    const { goToNextStep } = useOnboarding();

    return (
        <Step>
            <StepHeader>
                <StepTitle>Qual é o seu peso?</StepTitle>
                <StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
            </StepHeader>
            <StepContent position="center">
                <FormGroup label="Peso" style={{ width: '100%' }}>
                    <AppInput
                        placeholder="Ex: 80"
                        keyboardType="numeric"
                        formatter={formatDecimal}
                        autoFocus
                    />
                </FormGroup>
            </StepContent>
            <StepFooter>
                <AppButton size="icon" onPress={goToNextStep}>
                    <ArrowRightIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </StepFooter>
        </Step>
    );
}
