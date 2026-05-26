import { getFileInfo } from '@app/lib/getFileInfo';
import { MealsService } from '@app/services/MealsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {
    const { mutateAsync, data, isPending } = useMutation({
        mutationFn: async (fileUri: string) => {
            const { size, filename, type } = await getFileInfo(fileUri);

            const { mealId } = await MealsService.createMeal({
                file: {
                    size,
                    type,
                    name: filename,
                    uri: fileUri,
                },
            });

            return { mealId };
        },
    });

    return {
        createMeal: mutateAsync,
        createdMealId: data?.mealId,
        isLoading: isPending,
    };
}
