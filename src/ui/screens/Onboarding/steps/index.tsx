export { ActivityLevelStep } from './ActivityLevelStep';
export { BirthDateStep } from './BirthDateStep';
export { CreateAccountStep } from './CreateAccountStep';
export { GenderStep } from './GenderStep';
export { GoalStep } from './GoalStep';
export { HeightStep } from './HeightStep';
export { WeightStep } from './WeightStep';

import type { OnboardingStackParamList } from '../OnboardingStack';

export const orderSteps: Array<keyof OnboardingStackParamList> = [
    'Goal',
    'Gender',
    'BirthDate',
    'Height',
    'Weight',
    'ActivityLevel',
    'CreateAccount',
];
