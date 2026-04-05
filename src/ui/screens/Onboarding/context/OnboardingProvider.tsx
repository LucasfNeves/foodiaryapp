import { useCallback, useState } from 'react';
import { OnboardingContext } from '.';
import { orderSteps } from '../steps';
import { onboardingNavigation } from '../OnboardingStack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProps } from '@app/navigation/AuthStack';

export function OnboardingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { goBack } = useNavigation<AuthStackNavigationProps>();

    const goToNextStep = useCallback(() => {
        const nextStepIndex = currentStepIndex + 1;
        const nextStepName = orderSteps[nextStepIndex];

        if (!nextStepName) return;

        onboardingNavigation.navigate(nextStepName);

        setCurrentStepIndex(nextStepIndex);
    }, [currentStepIndex]);

    const goToPreviousStep = useCallback(() => {
        const previousStepIndex = currentStepIndex - 1;

        if (!onboardingNavigation.canGoBack()) {
            goBack();
            return;
        }

        onboardingNavigation.goBack();

        setCurrentStepIndex(previousStepIndex);
    }, [currentStepIndex]);

    return (
        <OnboardingContext
            value={{
                currentStepIndex,
                goToNextStep,
                goToPreviousStep,
            }}
        >
            {children}
        </OnboardingContext>
    );
}
