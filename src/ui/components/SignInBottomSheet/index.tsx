import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { AppText } from '../AppText';
import { useSignInBottomSheetController } from './useSignInBottomSheetController';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { AppInput } from '../AppInput';
import { styles } from './styles';

interface ISignInBottomSheetProps {
    ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
    const { bottom, bottomSheetModalRef } = useSignInBottomSheetController(ref);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal ref={bottomSheetModalRef}>
                <BottomSheetView style={{ paddingBottom: bottom }}>
                    <AppText
                        size="3xl"
                        weight="semiBold"
                        style={styles.heading}
                    >
                        Acesse a sua conta
                    </AppText>

                    <AppInput placeholder="E-mail" />
                    <AppInput placeholder="Senha" />
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
