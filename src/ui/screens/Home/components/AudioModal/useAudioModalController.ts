import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
    AudioModule,
    setAudioModeAsync,
    useAudioRecorder,
    RecordingPresets,
} from 'expo-audio';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';

export type AudioModalState = 'idle' | 'recording' | 'recorded';

interface IAudioModalController {
    onClose: () => void;
    onCreate?: () => void;
}

export function useAudioModalController({
    onClose,
    onCreate,
}: IAudioModalController) {
    const [state, setState] = useState<AudioModalState>('idle');
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const { navigate } = useNavigation<AppStackNavigationProps>();
    const queryClient = useQueryClient();

    const memoizedOnCreate = useRef(onCreate);
    useLayoutEffect(() => {
        memoizedOnCreate.current = onCreate;
    }, [onCreate]);

    const memoizedOnClose = useRef(onClose);
    useLayoutEffect(() => {
        memoizedOnClose.current = onClose;
    }, [onClose]);

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

    useEffect(() => {
        async function loadPermissions() {
            const status = await AudioModule.requestRecordingPermissionsAsync();

            if (!status.granted) {
                Alert.alert(
                    'Permissão necessária',
                    'É necessário conceder permissão para acessar o microfone.',
                );
            }

            setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true,
            });
        }

        loadPermissions();
    }, []);

    async function handleStartRecording() {
        await audioRecorder.prepareToRecordAsync();

        audioRecorder.record();
        setState('recording');
    }

    async function handleStopRecording() {
        await audioRecorder.stop();

        setAudioUri(audioRecorder.uri);
        setState('recorded');
    }

    async function handleTryAgain() {
        setAudioUri(null);
        setState('idle');
    }

    async function handleConfirm() {
        if (!audioUri) {
            return;
        }

        try {
            await createMeal(audioUri);
        } catch {
            Alert.alert(
                'Oops!',
                'Ocorreu um erro ao criar a sua refeição. Por favor, tente novamente.',
            );
        }
    }

    const isRecording = state === 'recording';

    return {
        state,
        setState,
        isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
        isRecording,
        handleStartRecording,
        handleStopRecording,
        handleTryAgain,
        audioUri,
        handleConfirm,
    };
}
