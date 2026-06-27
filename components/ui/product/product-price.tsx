import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { Product } from '@/@types/stores'
import { useTranslation } from 'react-i18next'
import { getPriceRange } from '@/helper/getPriceRange'

export default function ProductPrice({ item }: { item: Product }) {
    const { t } = useTranslation()
    const priceRange = getPriceRange(item);
    return (
        <View className="flex-row justify-center items-center mt-1 bg-primary rounded-tr-xl rounded-bl-xl px-4 py-2">
            {item.product_type === "simple" ? (
                <>
                    {item.on_sale && item.sale_price ? (
                        <>
                            <Text className="text-primary cairoBold text-md">
                                {item.sale_price} {t("common.currency")}
                            </Text>
                            <Text className="text-gray-400 line-through cairoBold text-xs ml-2">
                                {item.price} {t("common.currency")}
                            </Text>
                        </>
                    ) : (
                        <Text className="text-primary cairoBold text-sm">
                            {item.price} {t("common.currency")}
                        </Text>
                    )}


                </>) : (<Text>
                    <Text className="text-primary cairoBold text-sm text-white">
                        {priceRange?.min} - {priceRange?.max} {t("common.currency")}
                    </Text>
                </Text>)}
        </View>
    )
}
