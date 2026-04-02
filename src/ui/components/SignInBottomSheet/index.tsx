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
import { FormGroup } from '../FormGroup';
import { View } from 'react-native';
import { AppButton } from '../Button';

interface ISignInBottomSheetProps {
    ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
    const { bottom, bottomSheetModalRef } = useSignInBottomSheetController(ref);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal ref={bottomSheetModalRef}>
                <BottomSheetView
                    style={[styles.container, { paddingBottom: bottom }]}
                >
                    <AppText
                        size="3xl"
                        weight="semiBold"
                        style={styles.heading}
                    >
                        Acesse a sua conta
                    </AppText>
                    <View style={styles.form}>
                        <FormGroup label="E-mail">
                            <AppInput placeholder="Digite seu e-mail" />
                        </FormGroup>
                        <FormGroup label="Senha">
                            <AppInput placeholder="Digite sua senha" />
                        </FormGroup>

                        <AppButton onPress={() => {}}>Entrar</AppButton>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
