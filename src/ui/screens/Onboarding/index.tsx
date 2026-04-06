import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingProvider } from './context/OnboardingProvider';
import { OnboardingHeader } from './components/OnboardingHeader';
import { theme } from '@ui/styles/theme';

export function Onboarding() {
    return (
        <OnboardingProvider>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
                    <OnboardingHeader />
                    <OnboardingStack />
                </View>
            </KeyboardAvoidingView>
        </OnboardingProvider>
    );
}
