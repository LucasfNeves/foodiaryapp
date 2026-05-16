import { MacroProgress } from './types';

export function calcMacroPercentage({ goal, current }: MacroProgress) {
    if (current === undefined) {
        return 100;
    }

    if (goal === undefined || goal === 0) {
        return 0;
    }

    const percentage = (current / goal) * 100;

    return Math.min(percentage, 100);
}

export function formatMacro({ goal, current }: MacroProgress) {
    return current !== undefined ? Math.round(current) : goal;
}
