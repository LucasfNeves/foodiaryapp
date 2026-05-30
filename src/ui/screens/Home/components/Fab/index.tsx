import { View } from 'react-native';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@ui/components/Button';
import { PlusIcon } from 'lucide-react-native';
import { theme } from '@ui/styles/theme';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { AppText } from '@ui/components/AppText';
import { CreateMealOptions } from '../CreateMealOptions';

export function Fab() {
    const { bottom } = useSafeAreaInsets();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    function handleOpenBottomSheet() {
        bottomSheetModalRef.current?.present();
    }

    return (
        <>
            <View style={[styles.container, { bottom: bottom + 8 }]}>
                <AppButton size="icon" onPress={handleOpenBottomSheet}>
                    <PlusIcon size={20} color={theme.colors.black[700]} />
                </AppButton>
            </View>

            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    backgroundStyle={styles.bottomSheet}
                >
                    <BottomSheetView
                        style={[styles.content, { paddingBottom: bottom + 16 }]}
                    >
                        <AppText
                            style={styles.title}
                            size="lg"
                            weight="semiBold"
                        >
                            Cadastre sua refeição
                        </AppText>

                        <CreateMealOptions
                            onCreate={() =>
                                bottomSheetModalRef.current?.dismiss()
                            }
                        />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </>
    );
}
