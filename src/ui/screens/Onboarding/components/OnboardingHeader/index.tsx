import { View, Animated } from 'react-native';
import { styles } from './styles';
import { AppButton } from '@ui/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import { useOnboarding } from '../../context/useOnboarding';
import { useEffect, useRef } from 'react';
import { TOTAL_STEPS } from '../../steps';

export function OnboardingHeader() {
    const { top } = useSafeAreaInsets();
    const { goToPreviousStep, currentStepIndex } = useOnboarding();

    const widthAnimation = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(widthAnimation.current, {
            toValue: ((currentStepIndex + 1) * 100) / TOTAL_STEPS,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [currentStepIndex]);

    return (
        <View style={[styles.container, { marginTop: top }]}>
            <AppButton size="icon" variant="ghost" onPress={goToPreviousStep}>
                <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
            </AppButton>

            <View style={styles.progressBarBackground}>
                <Animated.View
                    style={[
                        styles.progressBarForeground,
                        {
                            width: widthAnimation.current.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>

            <View style={styles.rightActionPlaceholder} />
        </View>
    );
}
