import { AppText } from '@ui/components/AppText';
import { AppButton } from '@ui/components/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { theme } from '@ui/styles/theme';
import { useHomeContext } from '../../context/useHomeContext';

export function DateSwitcher() {
    const { date, previousDate, nextDate, isLoading } = useHomeContext();
    return (
        <View style={[styles.container, isLoading && { opacity: 0.5 }]}>
            <AppButton
                size="icon"
                variant="ghost"
                onPress={previousDate}
                disabledProp={isLoading}
            >
                <ChevronLeftIcon color="#000" size={20} />
            </AppButton>

            <AppText
                color={theme.colors.gray[700]}
                style={styles.selectedDate}
                weight="medium"
            >
                {formatDate(date)}
            </AppText>

            <AppButton
                size="icon"
                variant="ghost"
                onPress={nextDate}
                disabledProp={isLoading}
            >
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
