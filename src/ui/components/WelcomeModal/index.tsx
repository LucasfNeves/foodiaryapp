import { Modal, Text, View } from 'react-native';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { AppText } from '../AppText';
import { AppButton } from '../Button';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@ui/styles/theme';
import { GoalStats } from '../GoalSteps';
import { useAuthContext } from '@app/context/AuthContext/useAuthContext';
import { useState } from 'react';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Goal } from '@app/types/Goal';

const goalsMap: Record<Goal, { icon: string; label: string }> = {
    [Goal.LOSE]: {
        icon: '🥦',
        label: 'Perder Peso',
    },
    [Goal.MAINTAIN]: {
        icon: '🍍',
        label: 'Manter o Peso',
    },
    [Goal.GAIN]: {
        icon: '🥩',
        label: 'Ganhar Peso',
    },
};

export function WelcomeModal() {
    const { signedUp } = useAuthContext();
    const { account } = useAccount();

    const [visible, setVisible] = useState(signedUp);

    function handleClose() {
        setVisible(false);
    }

    const goal = goalsMap[account?.profile.goal || Goal.MAINTAIN];

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <StatusBar animated style="light" />

            <View style={styles.container}>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.wrapper}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <View style={styles.icon}>
                                    <AppText>{goal.icon}</AppText>
                                </View>

                                <View style={styles.headerContent}>
                                    <AppText
                                        color={theme.colors.gray[100]}
                                        align="center"
                                        size="3xl"
                                        weight="semiBold"
                                        style={styles.title}
                                    >
                                        Seu plano de dieta para{' '}
                                        <Text style={styles.textHighLigth}>
                                            {goal.label}
                                        </Text>{' '}
                                        está pronto!
                                    </AppText>

                                    <AppText
                                        color={theme.colors.gray[600]}
                                        align="center"
                                    >
                                        Seu plano de dieta para {goal.label}
                                        está pronto!
                                    </AppText>
                                </View>

                                <View style={styles.body}>
                                    <GoalStats
                                        calories={{
                                            goal: account?.goal.calories,
                                        }}
                                        carbohydrates={{
                                            goal: account?.goal.carbohydrates,
                                        }}
                                        fats={{ goal: account?.goal.fats }}
                                        proteins={{
                                            goal: account?.goal.proteins,
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <AppButton onPress={handleClose}>
                                Começar meu Plano
                            </AppButton>
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </Modal>
    );
}
