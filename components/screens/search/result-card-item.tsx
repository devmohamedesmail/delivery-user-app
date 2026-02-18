import { config } from '@/constants/config'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface Product {
    id: number
    name: string
    image: string
    description: string | null
    price: number
    on_sale: boolean
    sale_price: number | null
    store: {
        id: number
        name: string
        logo: string
    }
    category: {
        id: number
        name: string
    }
}
export default function ResultCardItem({ item }: { item: Product }) {
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const handleProductPress = (product: Product) => {
        // router.push({
        //     pathname: '/(tabs)/stores/[id]',
        //     params: { id: product.store.id }
        // })
    }
    return (
        <TouchableOpacity
            onPress={() => handleProductPress(item)}
            className="bg-card dark:bg-card-dark rounded-xl mb-3 overflow-hidden border border-border dark:border-border-dark"
        >
            <View className="flex-row">
                <Image
                    source={{ uri: item.image }}
                    className="w-24 h-24"
                    resizeMode="cover"
                />
                <View className="flex-1 p-3">
                    <Text className="text-base font-semibold text-text dark:text-text-dark mb-1" numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2" numberOfLines={1}>
                        {item.store.name}
                    </Text>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            {item.on_sale && item.sale_price ? (
                                <>
                                    <Text className="text-base font-bold text-primary dark:text-primary-dark">
                                        {item.sale_price} {config.CurrencySymbol}
                                    </Text>
                                    <Text className="text-sm text-gray-400 line-through ml-2">
                                        {item.price} {config.CurrencySymbol}
                                    </Text>
                                </>
                            ) : (
                                <Text className="text-base font-bold text-primary dark:text-primary-dark">
                                    {item.price} {config.CurrencySymbol}
                                </Text>
                            )}
                        </View>
                        {item.on_sale && (
                            <View className="bg-red-500 px-2 py-1 rounded-full">
                                <Text className="text-xs text-white font-semibold">
                                    {t('sale') || 'تخفيض'}
                                </Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity className='bg-primary dark:bg-primary-dark p-2 rounded-full'>
                        <Text> <Plus color="white" size={20} /></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
