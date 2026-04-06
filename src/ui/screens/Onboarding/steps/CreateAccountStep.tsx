import { useRef } from 'react';
import { TextInput, View } from 'react-native';
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

export function CreateAccountStep() {
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    function handleSubmit() {
        console.log('Create account');
    }

    return (
        <Step>
            <StepHeader>
                <StepTitle>Crie sua conta</StepTitle>
                <StepSubtitle>Para poder visualizar seu progresso</StepSubtitle>
            </StepHeader>
            <StepContent>
                <View style={{ gap: 24 }}>
                    <FormGroup label="Nome">
                        <AppInput
                            placeholder="João Silva"
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoComplete="name"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current?.focus()
                            }
                            autoFocus
                        />
                    </FormGroup>
                    <FormGroup label="E-mail">
                        <AppInput
                            ref={emailInputRef}
                            placeholder="joaosilva@gmail.com"
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
                            placeholder="Mínimo 8 caracteres"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="new-password"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                confirmPasswordInputRef.current?.focus()
                            }
                        />
                    </FormGroup>
                    <FormGroup label="Confirmar Senha">
                        <AppInput
                            ref={confirmPasswordInputRef}
                            placeholder="Mínimo 8 caracteres"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="new-password"
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                        />
                    </FormGroup>
                </View>
            </StepContent>
            <StepFooter>
                <AppButton onPress={handleSubmit} style={{ width: '100%' }}>
                    Criar conta
                </AppButton>
            </StepFooter>
        </Step>
    );
}
