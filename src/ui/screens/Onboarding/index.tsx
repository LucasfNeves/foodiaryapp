import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingSchema, onboardingSchema } from './schema';

export function Onboarding() {
    const form = useForm<OnboardingSchema>({
        resolver: zodResolver(onboardingSchema),
        mode: 'onChange',
        defaultValues: {
            birthDate: new Date(),
            height: '',
            weight: '',
            account: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        },
    });

    return (
        <FormProvider {...form}>
            <OnboardingProvider>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                    }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View
                        style={{ flex: 1, backgroundColor: theme.colors.white }}
                    >
                        <OnboardingHeader />
                        <OnboardingStack />
                    </View>
                </KeyboardAvoidingView>
            </OnboardingProvider>
        </FormProvider>
    );
}
