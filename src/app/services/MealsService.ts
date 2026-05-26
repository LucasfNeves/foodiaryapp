import { Service } from './Service';
import { Meal, SimplifiedMeal } from '@app/types/Meal';

export class MealsService extends Service {
    static async getMealsByDate(
        date: string,
    ): Promise<MealsService.GetMealsByDateResponse> {
        const { data } =
            await this.apiClient.get<MealsService.GetMealsByDateResponse>(
                '/meals',
                {
                    params: {
                        date,
                    },
                },
            );
        return {
            meals: data.meals.map((meal) => ({
                ...meal,
                createdAt: new Date(meal.createdAt),
            })),
        };
    }

    static async createMeal(payload: MealsService.CreateMealPayload) {
        const { data } = await this.apiClient.post('/meals', {
            data: payload,
        });

        await this.uploadPresignedPost({
            uploadSignature: data.uploadSignature,
            file: {
                uri: payload.file.uri,
                type: payload.file.type,
                name: payload.file.name,
            },
        });

        return {
            mealId: data.mealId,
        };
    }

    static async getMealById(
        id: string,
    ): Promise<MealsService.GetMealByIdResponse> {
        const { data } =
            await this.apiClient.get<MealsService.GetMealByIdResponse>(
                `/meals/${id}`,
            );
        return {
            meal: {
                ...data.meal,
                createdAt: new Date(data.meal.createdAt),
            },
        };
    }
}

export namespace MealsService {
    export type GetMealsByDateResponse = {
        meals: SimplifiedMeal[];
    };

    export type CreateMealPayload = {
        file: {
            type: 'audio/m4a' | 'image/jpeg';
            size: number;
            uri: string;
            name: string;
        };
    };

    export type CreateMealResponse = {
        mealId: string;
        uploadSignature: string;
    };

    export type GetMealByIdResponse = {
        meal: Meal;
    };
}
