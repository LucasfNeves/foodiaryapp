import { useRef } from 'react';
import { Alert, TextInput, View } from 'react-native';
import {
    Step,
    StepContent,
    StepFooter,
    StepHeader,
    StepSubtitle,
    StepTitle,
} from '../components/Step';
import { AppButton } from '@ui/components/Button';
import { AppInput } from '@ui/components/AppInput';
import { FormGroup } from '@ui/components/FormGroup';
import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingSchema } from '../schema';
import { AuthService } from '@app/services/AuthService';
import { isAxiosError } from 'axios';

export function CreateAccountStep() {
    const form = useFormContext<OnboardingSchema>();
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const handleSubmit = form.handleSubmit(async (formData) => {
        const birthDate = formData.birthDate.toISOString().split('T')[0];

        try {
            const response = await AuthService.signUp({
                account: {
                    email: formData.account.email,
                    password: formData.account.password,
                },
                profile: {
                    name: formData.account.name,
                    activityLevel: formData.activityLevel,
                    birthDate,
                    gender: formData.gender,
                    goal: formData.goal,
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                },
            });

            console.log('Conta criada com sucesso:', response);
        } catch (error) {
            if (
                isAxiosError(error) &&
                error.response?.data?.error?.ErrorCode.EMAIL_ALREADY_IN_USE
            ) {
                Alert.alert(
                    'Erro',
                    'O email informado já está em uso. Tente novamente.',
                );

                return;
            }

            Alert.alert(
                'Erro',
                'Ocorreu um erro ao criar a conta. Tente novamente.',
            );
        }
    });

    return (
        <Step>
            <StepHeader>
                <StepTitle>Crie sua conta</StepTitle>
                <StepSubtitle>Para poder visualizar seu progresso</StepSubtitle>
            </StepHeader>
            <StepContent>
                <View style={{ gap: 24 }}>
                    <FormGroup
                        label="Nome"
                        error={form.formState.errors.account?.name?.message}
                    >
                        <Controller
                            control={form.control}
                            name="account.name"
                            render={({ field }) => (
                                <AppInput
                                    placeholder="João Silva"
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    autoComplete="name"
                                    returnKeyType="next"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onSubmitEditing={() =>
                                        emailInputRef.current?.focus()
                                    }
                                    disabled={form.formState.isSubmitting}
                                    autoFocus
                                />
                            )}
                        />
                    </FormGroup>
                    <FormGroup
                        label="E-mail"
                        error={form.formState.errors.account?.email?.message}
                    >
                        <Controller
                            control={form.control}
                            name="account.email"
                            render={({ field }) => (
                                <AppInput
                                    ref={emailInputRef}
                                    placeholder="joaosilva@gmail.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="email"
                                    returnKeyType="next"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onSubmitEditing={() =>
                                        passwordInputRef.current?.focus()
                                    }
                                    disabled={form.formState.isSubmitting}
                                />
                            )}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Senha"
                        error={form.formState.errors.account?.password?.message}
                    >
                        <Controller
                            control={form.control}
                            name="account.password"
                            render={({ field }) => (
                                <AppInput
                                    ref={passwordInputRef}
                                    placeholder="Mínimo 8 caracteres"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="new-password"
                                    returnKeyType="next"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onSubmitEditing={() =>
                                        confirmPasswordInputRef.current?.focus()
                                    }
                                    disabled={form.formState.isSubmitting}
                                />
                            )}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Confirmar Senha"
                        error={
                            form.formState.errors.account?.confirmPassword
                                ?.message
                        }
                    >
                        <Controller
                            control={form.control}
                            name="account.confirmPassword"
                            render={({ field }) => (
                                <AppInput
                                    ref={confirmPasswordInputRef}
                                    placeholder="Mínimo 8 caracteres"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="new-password"
                                    returnKeyType="done"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onSubmitEditing={handleSubmit}
                                    disabled={form.formState.isSubmitting}
                                />
                            )}
                        />
                    </FormGroup>
                </View>
            </StepContent>
            <StepFooter>
                <AppButton
                    onPress={handleSubmit}
                    style={{ width: '100%' }}
                    isLoading={form.formState.isSubmitting}
                >
                    Criar conta
                </AppButton>
            </StepFooter>
        </Step>
    );
}
