import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function NoAreaFound() {
    const { t } = useTranslation();
    return (
        <View className='flex items-center justify-center'>
            <FontAwesome5 name="search-location" size={24} color="black" />
            <Text className="text-center mt-4 text-gray-400">{t('order.noAreaFound')}</Text>
            <Text className="text-center mt-4 text-gray-400">{t('order.noAreaFoundDescription')}</Text>

        </View>
    )
}
