import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function NoReviews() {
    const { t } = useTranslation();
    return (
        <View className="items-center justify-center py-16">
            <Ionicons name="chatbox-outline" size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-400 mt-4">
                {t('reviews.noReviews') || 'No reviews yet'}
            </Text>
            <Text className="text-gray-400 mt-2 text-center">
                {t('reviews.noReviewsMessage') || 'Be the first to write a review!'}
            </Text>
        </View>
    )
}
