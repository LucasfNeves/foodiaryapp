import { Meal } from '@app/types/Meal';
import { createContext } from 'react';

export interface IHomeContextValue {
    date: Date;
    isLoading: boolean;
    previousDate: () => void;
    nextDate: () => void;
    meals: Meal[];
}

export const HomeContext = createContext({} as IHomeContextValue);
