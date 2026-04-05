import { createContext } from 'react';

interface IOnboardingContextValue {
    currentStepIndex: number;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

export const OnboardingContext = createContext({} as IOnboardingContextValue);
