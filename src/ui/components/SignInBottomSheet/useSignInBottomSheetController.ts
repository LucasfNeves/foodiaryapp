import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useImperativeHandle } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { Alert, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { sigInSchema, SignInSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@app/context/AuthContext/useAuthContext';

export function useSignInBottomSheetController(
    ref: React.Ref<ISignInBottomSheet>,
) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();
    const { signIn } = useAuthContext();

    const { handleSubmit, control, formState } = useForm<SignInSchema>({
        resolver: zodResolver(sigInSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmitForm = handleSubmit(async (data) => {
        try {
            await signIn(data);
        } catch {
            Alert.alert(
                'Oops!',
                'As credenciais fornecidas são inválidas. Por favor, tente novamente.',
            );
        }
    });

    const passwordInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            bottomSheetModalRef.current?.present();
        },
    }));

    return {
        bottomSheetModalRef,
        bottom,
        passwordInputRef,
        handleSubmitForm,
        control,
        formState,
    };
}
