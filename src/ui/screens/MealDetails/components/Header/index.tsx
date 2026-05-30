import { AppText } from '@ui/components/AppText';
import { ImageBackground, View } from 'react-native';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppButton } from '@ui/components/Button';
import { ChevronLeftIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@ui/styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Meal, MealInputType } from '@app/types/Meal';
import { useMemo } from 'react';

interface IHeaderProps {
    meal?: Meal | null;
}

export function Header({ meal }: IHeaderProps) {
    const { top } = useSafeAreaInsets();
    const { goBack } = useNavigation();

    const summary = useMemo(() => {
        return (meal?.foods || []).reduce(
            (acc, food) => {
                const proteinCalories = food?.proteins * 4;
                const carbohydrateCalories = food?.carbohydrates * 4;
                const fatCalories = food?.fats * 9;

                const totalCalories = Math.round(
                    proteinCalories + carbohydrateCalories + fatCalories,
                );

                return {
                    calories: acc.calories + totalCalories,
                    carbohydrates: acc.carbohydrates + food.carbohydrates,
                    proteins: acc.proteins + food.proteins,
                    fats: acc.fats + food.fats,
                };
            },
            { calories: 0, carbohydrates: 0, proteins: 0, fats: 0 },
        );
    }, [meal]);

    const percentages = useMemo(() => {
        const proteinCalories = summary?.proteins * 4;
        const carbohydrateCalories = summary?.carbohydrates * 4;
        const fatCalories = summary?.fats * 9;

        if (!summary?.calories) {
            return { protein: 0, carbohydrate: 0, fat: 0 };
        }

        return {
            protein: Math.round((proteinCalories / summary?.calories) * 100),
            carbohydrate: Math.round(
                (carbohydrateCalories / summary?.calories) * 100,
            ),
            fat: Math.round((fatCalories / summary?.calories) * 100),
        };
    }, [summary]);

    const isPictureInput = meal?.inputType === MealInputType.PICTURE;

    return (
        <>
            <StatusBar animated translucent style="light" />
            <View style={styles.container}>
                {isPictureInput && (
                    <ImageBackground
                        source={{ uri: meal?.inputFileUrl }}
                        style={styles.image}
                        alt="Imagem de uma refeição"
                        resizeMode="cover"
                    >
                        <LinearGradient
                            style={[styles.overlay, { paddingTop: top + 12 }]}
                            colors={['rgba(0, 0, 0, 0.5)', 'transparent']}
                            start={{ y: 0.6, x: 0 }}
                            end={{ y: 1, x: 0 }}
                        >
                            <BlurView
                                intensity={50}
                                tint="dark"
                                style={styles.blurView}
                            >
                                <AppButton
                                    variant="ghost"
                                    size="icon"
                                    onPress={goBack}
                                >
                                    <ChevronLeftIcon
                                        size={20}
                                        color={theme.colors.white}
                                    />
                                </AppButton>
                            </BlurView>
                        </LinearGradient>
                    </ImageBackground>
                )}

                <View
                    style={[
                        styles.content,
                        { marginTop: isPictureInput ? 0 : top },
                    ]}
                >
                    <View
                        style={[
                            styles.pageTitleContainer,
                            isPictureInput && { paddingLeft: 16 },
                        ]}
                    >
                        {!isPictureInput && (
                            <AppButton
                                variant="ghost"
                                size="icon"
                                onPress={goBack}
                            >
                                <ChevronLeftIcon
                                    size={20}
                                    color={theme.colors.white}
                                />
                            </AppButton>
                        )}

                        <AppText color={theme.colors.gray[300]} weight="medium">
                            Refeição
                        </AppText>
                    </View>

                    <View style={styles.caloriesContainer}>
                        <AppText color={theme.colors.gray[300]}>
                            Calorias
                        </AppText>
                        <AppText color={theme.colors.white} weight="medium">
                            {summary?.calories || 0} kcal
                        </AppText>
                    </View>
                </View>
            </View>

            <View style={styles.macrosContainer}>
                <View style={styles.macro}>
                    <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
                    <AppText weight="medium" color={theme.colors.support.teal}>
                        {summary?.proteins || 0}g (
                        {percentages.protein.toFixed(0)}%)
                    </AppText>
                </View>

                <View style={styles.macro}>
                    <AppText color={theme.colors.gray[700]}>
                        Carboidratos
                    </AppText>
                    <AppText
                        weight="medium"
                        color={theme.colors.support.yellow}
                    >
                        {summary?.carbohydrates || 0}g (
                        {percentages.carbohydrate.toFixed(0)}%)
                    </AppText>
                </View>

                <View style={styles.macro}>
                    <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
                    <AppText
                        weight="medium"
                        color={theme.colors.support.orange}
                    >
                        {summary?.fats || 0}g ({percentages.fat.toFixed(0)}%)
                    </AppText>
                </View>
            </View>

            <View style={styles.macroProgress}>
                <View
                    style={[
                        styles.proteinProgress,
                        { width: `${percentages.protein}%` },
                    ]}
                />
                <View
                    style={[
                        styles.carbohydrateProgress,
                        { width: `${percentages.carbohydrate}%` },
                    ]}
                />
                <View
                    style={[
                        styles.fatProgress,
                        { width: `${percentages.fat}%` },
                    ]}
                />
            </View>

            <View style={styles.divider} />

            <AppText size="xl" weight="semiBold" style={styles.mealName}>
                {meal?.name}
            </AppText>

            <AppText
                weight="medium"
                style={styles.mealItemsHeader}
                color={theme.colors.gray[700]}
            >
                itens
            </AppText>
        </>
    );
}
