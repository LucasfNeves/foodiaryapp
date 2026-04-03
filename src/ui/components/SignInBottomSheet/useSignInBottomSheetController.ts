import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useImperativeHandle } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { TextInput } from 'react-native';

export function useSignInBottomSheetController(
    ref: React.Ref<ISignInBottomSheet>,
) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();
    const passwordInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            bottomSheetModalRef.current?.present();
        },
    }));

    function handleSubmit() {
        console.log('Submit');
    }

    return {
        bottomSheetModalRef,
        bottom,
        passwordInputRef,
        handleSubmit,
    };
}
