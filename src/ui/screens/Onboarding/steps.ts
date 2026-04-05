import { OnboardingStackParamList } from './OnboardingStack';

export const orderSteps: (keyof OnboardingStackParamList)[] = [
    'Goal',
    'Gender',
    'BirthDate',
    'Height',
    'Weight',
    'ActivityLevel',
    'CreateAccount',
];

export const TOTAL_STEPS = orderSteps.length;
