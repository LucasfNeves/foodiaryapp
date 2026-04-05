import {
    createNavigationContainerRef,
    NavigationContainer,
} from '@react-navigation/native';
import { AuthStack, AuthStackParamList } from './AuthStack';

export const rootStack = createNavigationContainerRef<AuthStackParamList>();

export function Navigation() {
    return (
        <NavigationContainer ref={rootStack}>
            <AuthStack />
        </NavigationContainer>
    );
}
