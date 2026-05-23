import { useState } from 'react';

export type AudioModalState = 'idle' | 'recording' | 'recorded';

export function useAudioModalController() {
    const [state, setState] = useState<AudioModalState>('idle');

    function handleStartRecording() {
        setState('recording');
        // Lógica para iniciar a gravação de áudio
    }

    const isRecording = state === 'recording';

    return { state, setState, isRecording, handleStartRecording };
}
