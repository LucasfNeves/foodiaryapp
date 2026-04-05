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
import {
    createNavigationContainerRef,
    NavigationContainer,
    NavigationIndependentTree,
    RouteProp,
} from '@react-navigation/native';

export type OnboadrdingStackParamList = {
    Goal: undefined;
    Gender: undefined;
    BirthDate: undefined;
    Height: undefined;
    Weight: undefined;
    ActivityLevel: undefined;
    CreateAccount: undefined;
};

export type OnboadrdingStackNavigationProps =
    NativeStackNavigationProp<OnboadrdingStackParamList>;

export type OnboadrdingStackScreenProps<
    TRouteName extends keyof OnboadrdingStackParamList,
> = NativeStackScreenProps<OnboadrdingStackParamList, TRouteName>;

export type OnboadrdingStackRouteProps<
    TRouteName extends keyof OnboadrdingStackParamList,
> = RouteProp<OnboadrdingStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<OnboadrdingStackParamList>();
export const onboardingNavigation =
    createNavigationContainerRef<OnboadrdingStackParamList>();

export function OnboadrdingStack() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer ref={onboardingNavigation}>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Goal"
                >
                    <Stack.Screen name="Goal" component={GoalStep} />
                    <Stack.Screen name="Gender" component={GenderStep} />
                    <Stack.Screen name="BirthDate" component={BirthDateStep} />
                    <Stack.Screen name="Height" component={HeightStep} />
                    <Stack.Screen name="Weight" component={WeightStep} />
                    <Stack.Screen
                        name="ActivityLevel"
                        component={ActivityLevelStep}
                    />
                    <Stack.Screen
                        name="CreateAccount"
                        component={CreateAccountStep}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
}
