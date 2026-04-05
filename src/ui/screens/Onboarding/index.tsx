import { View } from 'react-native';
import { OnboadrdingStack } from './OnboardingStack';
import { OnboardingProvider } from './context/OnboardingProvider';

export function Onboarding() {
    return (
        <OnboardingProvider>
            <View style={{ flex: 1 }}>
                <OnboadrdingStack />
            </View>
        </OnboardingProvider>
    );
}
