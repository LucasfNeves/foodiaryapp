import { useCallback, useState } from 'react';
import { OnboardingContext } from '.';
import { orderSteps } from '../steps';
import { onboardingNavigation } from '../OnboardingStack';

export function OnboardingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const goToNextStep = useCallback(() => {
        const nextStepIndex = currentStepIndex + 1;
        const nextStepName = orderSteps[nextStepIndex];

        if (!nextStepName) return;

        onboardingNavigation.navigate(nextStepName);

        setCurrentStepIndex(nextStepIndex);
    }, [currentStepIndex]);

    const goToPreviousStep = useCallback(() => {
        const previousStepIndex = currentStepIndex - 1;

        if (!onboardingNavigation.canGoBack()) return;

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
