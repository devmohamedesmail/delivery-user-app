import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'nativewind';

export default function EmptyState() {
    const { t } = useTranslation();
    const { colorScheme } = useColorScheme();
  return (
     <View className="flex-1 justify-center items-center px-6 -mt-20">
      <View className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
        <Ionicons
          name="notifications-off-outline"
          size={48}
          color={colorScheme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
        />
      </View>
      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        {t('notifications.noNotifications')}
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center leading-6">
        {t('notifications.noNotificationsMessage')}
      </Text>
    </View>
  )
}
