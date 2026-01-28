import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next';

interface NoStoresProps {
    searchQuery?: string;
}

export default function NoStores({ searchQuery }: NoStoresProps) {
    const { t } = useTranslation();
    return (
        <View className='flex-1 items-center justify-center px-5'>
            <Ionicons name="storefront-outline" size={64} color="#d1d5db" />
            <Text className='text-gray-800 text-lg font-bold mt-4'>
                {searchQuery ? t('stores.noResultsFound') : t('stores.noStoresAvailable')}
            </Text>
            <Text className='text-gray-500 text-center mt-2'>
                {searchQuery ? t('stores.tryDifferentKeywords') : t('stores.checkBackLater')}
            </Text>
        </View>
    )
}
