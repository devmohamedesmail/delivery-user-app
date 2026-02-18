import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OffersHeader() {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const { t } = useTranslation();
    const isDark = colorScheme === 'dark';

    return (
        <View className="overflow-hidden rounded-b-3xl shadow-lg">
            <LinearGradient
                colors={['#fd4a12', '#ff7e5f']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ paddingTop: insets.top, paddingBottom: 20 }}
            >
                <View className="px-6 pt-4">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <View className="flex-row items-center mb-1">
                                <Ionicons name="pricetag" size={24} color="white" />
                                <Text className="text-white font-bold text-2xl ml-2">
                                    {t('offers.title')}
                                </Text>
                            </View>
                            <Text className="text-white/90 text-sm font-medium">
                                {t('offers.availableDeals')}
                            </Text>
                        </View>

                        <View className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                            <Ionicons name="gift-outline" size={24} color="white" />
                        </View>
                    </View>
                </View>

                {/* Decorative Circles */}
                <View className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                <View className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full" />
            </LinearGradient>
        </View>
    );
}
