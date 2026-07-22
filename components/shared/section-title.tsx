import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import Text from '@/components/ui/text'
import { useTranslation } from 'react-i18next'

export default function SectionTitle({ onPress, title }: { onPress: () => void, title: string }) {
    const { t } = useTranslation()
    return (
        <View className="flex-row items-center justify-between px-4 mb-4">
            <Pressable
                onPress={onPress}
                className="flex-row items-center"
            >
                <Ionicons name="arrow-back" size={16} color="#fd4a12" />
                <Text className="text-primary font-semibold mr-1">
                    {t("home.viewAll")}
                </Text>
            </Pressable>

            <View className="flex-row items-center">
                <Text>{title}</Text>
                <View className="w-1 h-6 bg-primary rounded-full ml-2" />
            </View>
        </View>
    )
}
