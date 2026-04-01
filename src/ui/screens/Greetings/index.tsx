import { Logo } from '@ui/assets/Logo';
import { AppText } from '@ui/components/AppText';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { theme } from '@ui/styles/theme';
import { AppButton } from '@ui/components/Button';
import greetingsBg from '@ui/assets/greetings-bg/image.png';
import { LinearGradient } from 'expo-linear-gradient';

export function Greetings() {
    return (
        <>
            <ImageBackground
                source={greetingsBg}
                resizeMode="cover"
                style={styles.container}
            >
                <SafeAreaView style={styles.content} edges={['top']}>
                    <Logo />
                </SafeAreaView>

                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.85)']}
                    style={styles.gradient}
                />

                <SafeAreaView style={styles.ctaContainer} edges={['bottom']}>
                    <AppText
                        color={theme.colors.white}
                        weight="semiBold"
                        size="3xl"
                        style={styles.heading}
                    >
                        Controle sua dieta de forma simples
                    </AppText>

                    <View style={styles.ctaContent}>
                        <AppButton>Criar conta</AppButton>

                        <View style={styles.signInContainer}>
                            <AppText color={theme.colors.white}>
                                Já tem conta?
                            </AppText>
                            <TouchableOpacity>
                                <AppText
                                    color={theme.colors.lime[500]}
                                    weight="medium"
                                >
                                    Acesse a sua conta
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </>
    );
}
