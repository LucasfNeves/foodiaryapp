import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetTextInput,
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
    const { bottom, bottomSheetModalRef, passwordInputRef, handleSubmit } =
        useSignInBottomSheetController(ref);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal ref={bottomSheetModalRef}>
                <BottomSheetView
                    style={[styles.container, { paddingBottom: bottom + 16 }]}
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
                            <AppInput
                                placeholder="Digite seu e-mail"
                                InputComponent={BottomSheetTextInput}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                        </FormGroup>
                        <FormGroup label="Senha">
                            <AppInput
                                ref={passwordInputRef}
                                placeholder="Digite sua senha"
                                InputComponent={BottomSheetTextInput}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="current-password"
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit}
                            />
                        </FormGroup>

                        <AppButton onPress={handleSubmit}>Entrar</AppButton>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
