import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

interface IPictureModalController {
    onClose: () => void;
    onCreate?: () => void;
}

export function usePictureModalController({
    onClose,
    onCreate,
}: IPictureModalController) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const { navigate } = useNavigation<AppStackNavigationProps>();
    const queryClient = useQueryClient();

    const memoizedOnClose = useRef(onClose);
    useLayoutEffect(() => {
        memoizedOnClose.current = onClose;
    }, [onClose]);

    const memoizedOnCreate = useRef(onCreate);
    useLayoutEffect(() => {
        memoizedOnCreate.current = onCreate;
    }, [onCreate]);

    const {
        createMeal,
        createdMealId,
        isLoading: isCreatingMeal,
    } = useCreateMeal();

    const {
        meal,
        isLoading: isLoadingMeal,
        isProcessing: isProcessingMeal,
    } = useMeal(createdMealId);

    useEffect(() => {
        if (meal && meal.status === 'SUCCESS') {
            memoizedOnClose.current();
            memoizedOnCreate.current?.();
            navigate('MealDetails', { mealId: meal.id });
            queryClient.invalidateQueries({ queryKey: ['meals'] });
        }

        if (meal && meal.status === 'FAILED') {
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar a sua refeição. Por favor, tente novamente.',
            );
        }
    }, [meal?.status, navigate, meal?.id, queryClient]);

    async function handleTakePicture() {
        if (!cameraRef.current) {
            return;
        }

        const { uri } = await cameraRef.current.takePictureAsync({
            imageType: 'jpg',
        });

        setPhotoUri(uri);
    }

    function handleTryAgain() {
        setPhotoUri(null);
    }

    async function handleConfirm() {
        if (!photoUri) {
            return;
        }

        try {
            await createMeal(photoUri);
        } catch {
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar a sua refeição. Por favor, tente novamente.',
            );
        }
    }

    return {
        permission,
        isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
        cameraRef,
        photoUri,
        handleTryAgain,
        handleConfirm,
        requestPermission,
        handleTakePicture,
    };
}
