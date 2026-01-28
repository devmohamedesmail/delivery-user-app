import React, { use } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function NoProducts({ searchQuery }: { searchQuery: string }) {
    const {t}=useTranslation();
    return (
        <View className='flex-1 items-center justify-center px-5'>
            <Ionicons name="cube-outline" size={64} color="#d1d5db" />
            <Text className='text-gray-800 text-lg font-bold mt-4'>{t('stores.noProductsFound')}</Text>
            <Text className='text-gray-500 text-center mt-2'>
                {searchQuery ? t('stores.tryDifferentKeywords') : t('stores.noProductsAvailable')}
            </Text>
        </View>
    )
}
