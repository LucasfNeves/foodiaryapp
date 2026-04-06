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
import { Controller } from 'react-hook-form';

interface ISignInBottomSheetProps {
    ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
    const {
        bottom,
        bottomSheetModalRef,
        passwordInputRef,
        handleSubmitForm,
        control,
        formState,
    } = useSignInBottomSheetController(ref);

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
                        <FormGroup
                            label="E-mail"
                            error={formState.errors.email?.message}
                        >
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
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
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                        </FormGroup>

                        <FormGroup
                            label="Senha"
                            error={formState.errors.password?.message}
                        >
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <AppInput
                                        ref={passwordInputRef}
                                        placeholder="Digite sua senha"
                                        InputComponent={BottomSheetTextInput}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete="current-password"
                                        returnKeyType="done"
                                        onSubmitEditing={handleSubmitForm}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                    />
                                )}
                            />
                        </FormGroup>

                        <AppButton onPress={handleSubmitForm}>Entrar</AppButton>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
