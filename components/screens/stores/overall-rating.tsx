import React from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function OverallRating({storeItem}:any) {
    const { t } = useTranslation();
  return (
     <View className="mx-5 mb-6 bg-gradient-to-br rounded-3xl overflow-hidden shadow-lg">
          <LinearGradient
            colors={['#fd4a12', '#ff6b3d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6"
          >
            <View className="items-center">
              <Text className="text-6xl font-bold text-white mb-2">{storeItem.total_reviews}</Text>
              <View className="flex-row mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= parseFloat(storeItem.avg_rating) ? 'star' : 'star-outline'}
                    size={24}
                    color="#FFF"
                    style={{ marginHorizontal: 2 }}
                  />
                ))}
              </View>
              <Text className="text-white text-base opacity-90">
                {t('reviews.basedOnReviews', { count: storeItem.total_reviews })}
              </Text>
            </View>
          </LinearGradient>
        </View>
  )
}
