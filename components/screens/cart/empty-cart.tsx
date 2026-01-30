import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';


export default function EmptyCart() {
    const router = useRouter();
    const { t } = useTranslation();
    const { colorScheme } = useColorScheme()



    return (
        <View className="flex-1 justify-center items-center px-8">
            {/* Decorative Circle Background */}
            <View
                className="absolute w-80 h-80 rounded-full opacity-30"

            />

            {/* Cart Icon with Animation Effect */}
            <View
                className="w-40 h-40 items-center justify-center mb-8 rounded-full shadow-md"

            >
                <Ionicons
                    name="cart-outline"
                    size={80}
                    color={colorScheme ? '#4b5563' : '#9ca3af'}
                />
                {/* Small emoji badge */}
                <View
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full items-center justify-center shadow-lg"
                   
                >
                    <Text className="text-2xl text-white">🛒</Text>
                </View>
            </View>

            {/* Title */}
            <Text
                className="text-3xl font-extrabold mb-3 text-center"
                
            >
                {t('cart.title')}
            </Text>

            {/* Description */}
            <Text
                className="text-base text-center mb-8 px-4"
                
            >
                {t('cart.description_empty')}
            </Text>

            {/* Action Buttons */}
            <View className="w-full gap-3">
                {/* Primary Button - Browse Menu */}
                <TouchableOpacity
                    onPress={() => router.push('/')}
                    activeOpacity={0.8}
                    className="px-8 py-4 rounded-2xl shadow-lg"
                    
                >
                    <View className="flex-row items-center justify-center">
                        <Ionicons name="restaurant" size={22} color="white" />
                        <Text className="text-white text-center font-bold text-lg ml-2">
                            {t('navigation.home')}
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
                    </View>
                </TouchableOpacity>

              
                {/* <TouchableOpacity
                    onPress={() => router.push('/offers')}
                    activeOpacity={0.8}
                    className="px-8 py-4 rounded-2xl border-2 shadow-sm"
                    style={{
                        backgroundColor: isDark ? '#2a2a2a' : '#f3f4f6',
                        borderColor: isDark ? '#3a3a3a' : '#e5e7eb',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <View className="flex-row items-center justify-center">
                        <Ionicons name="pricetag" size={20} color={colors.tint} />
                        <Text
                            className="text-center font-bold text-base ml-2"
                            style={{ color: colors.tint }}
                        >
                            {t('cart.view_offers')}
                        </Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}
