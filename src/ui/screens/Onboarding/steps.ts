import { OnboadrdingStackParamList } from './OnboardingStack';

export const orderSteps: (keyof OnboadrdingStackParamList)[] = [
    'Goal',
    'Gender',
    'BirthDate',
    'Height',
    'Weight',
    'ActivityLevel',
    'CreateAccount',
];

export const TOTAL_STEPS = orderSteps.length;
