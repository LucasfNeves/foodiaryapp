import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { theme } from '@ui/styles/theme';

export function DateSwitcher() {
    const date = new Date();
    return (
        <View style={styles.container}>
            <AppButton size="icon" variant="ghost">
                <ChevronLeftIcon color="#000" size={20} />
            </AppButton>

            <AppText
                color={theme.colors.gray[700]}
                style={styles.selectedDate}
                weight="medium"
            >
                {formatDate(date)}
            </AppText>

            <AppButton size="icon" variant="ghost">
                <ChevronRightIcon color="#000" size={20} />
            </AppButton>
        </View>
    );
}

function formatDate(date: Date) {
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();

    const formattedDate = Intl.DateTimeFormat('pt-BR', {
        weekday: isToday ? undefined : 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
        .format(date)
        .toUpperCase();

    return isToday ? `HOJE, ${formattedDate}` : formattedDate;
}
