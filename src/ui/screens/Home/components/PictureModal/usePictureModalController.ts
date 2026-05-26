import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export function usePictureModalController() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

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
        }

        if (meal && meal.status === 'FAILED') {
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar a sua refeição. Por favor, tente novamente.',
            );
        }
    }, [meal?.status]);

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
        } catch (error) {
            console.log(error);
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
