import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
    AudioModule,
    setAudioModeAsync,
    useAudioRecorder,
    RecordingPresets,
} from 'expo-audio';

export type AudioModalState = 'idle' | 'recording' | 'recorded';

export function useAudioModalController() {
    const [state, setState] = useState<AudioModalState>('idle');
    const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY);
    const [audioUri, setAudioUri] = useState<string | null>(null);

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

    const isRecording = state === 'recording';

    return {
        state,
        setState,
        isLoading: false,
        isRecording,
        handleStartRecording,
        handleStopRecording,
        audioUri,
    };
}
