import {
    createNavigationContainerRef,
    NavigationContainer,
    NavigationIndependentTree,
    RouteProp,
} from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
    GoalStep,
    ActivityLevelStep,
    BirthDateStep,
    CreateAccountStep,
    GenderStep,
    HeightStep,
    WeightStep,
} from './steps/index';
export type OnboardingStackParamList = {
    Goal: undefined;
    Gender: undefined;
    BirthDate: undefined;
    Height: undefined;
    Weight: undefined;
    ActivityLevel: undefined;
    CreateAccount: undefined;
};

export type OnboardingStackNavigationProps =
    NativeStackNavigationProp<OnboardingStackParamList>;

export type OnboardingStackScreenProps<
    TRouteName extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, TRouteName>;

export type OnboardingStackRouteProps<
    TRouteName extends keyof OnboardingStackParamList,
> = RouteProp<OnboardingStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const onboardingNavigation =
    createNavigationContainerRef<OnboardingStackParamList>();

export function OnboardingStack() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer ref={onboardingNavigation}>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Goal"
                >
                    <Stack.Screen
                        name="ActivityLevel"
                        component={ActivityLevelStep}
                    />
                    <Stack.Screen name="BirthDate" component={BirthDateStep} />
                    <Stack.Screen
                        name="CreateAccount"
                        component={CreateAccountStep}
                    />
                    <Stack.Screen name="Gender" component={GenderStep} />
                    <Stack.Screen name="Goal" component={GoalStep} />
                    <Stack.Screen name="Height" component={HeightStep} />
                    <Stack.Screen name="Weight" component={WeightStep} />
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
}
