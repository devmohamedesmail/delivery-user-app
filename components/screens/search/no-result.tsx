import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function NoResult() {
    const { t } = useTranslation()
    return (
        <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#9ca3af" />
            <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 text-base">
                {t('common.no_results')}
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-center mt-2 text-sm">
                {t('common.try_different_search')}
            </Text>
        </View>
    )
}
