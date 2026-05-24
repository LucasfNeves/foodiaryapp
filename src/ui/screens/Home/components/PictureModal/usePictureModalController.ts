import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';

export function usePictureModalController() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

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

    function handleConfirm() {
        alert('confirm');
    }

    return {
        permission,
        isLoading: false,
        cameraRef,
        photoUri,
        handleTryAgain,
        handleConfirm,
        requestPermission,
        handleTakePicture,
    };
}
