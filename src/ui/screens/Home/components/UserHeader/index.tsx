import { useAccount } from '@app/hooks/queries/useAccount';
import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppButton } from '@ui/components/Button';
import { TargetIcon } from 'lucide-react-native';

export function UserHeader() {
    const { account } = useAccount();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.userInfo}>
                <Image
                    source={{ uri: 'https://github.com/lucasfNeves.png' }}
                    style={styles.avatar}
                />

                <View style={styles.greetings}>
                    <AppText size="sm" color={theme.colors.gray[700]}>
                        Olá, 👋
                    </AppText>
                    <AppText weight="semiBold">
                        {account?.profile.name || 'Usuário'}
                    </AppText>
                </View>
            </TouchableOpacity>

            <AppButton variant="ghost" leftIcon={TargetIcon}>
                Metas
            </AppButton>
        </View>
    );
}
