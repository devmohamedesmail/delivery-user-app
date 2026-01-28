import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";


export default function ReviewsHeader() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    return (
        <View className="px-5 pt-14 pb-4">
            <View className="flex-row items-center mb-2">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mr-3 p-2 -ml-2 bg-primary rounded-full"
                >
                    <Ionicons name={isRTL ? 'chevron-back' : 'chevron-back'} size={28} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 flex-1" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    {t('reviews.title')}
                </Text>
            </View>
        </View>
    )
}