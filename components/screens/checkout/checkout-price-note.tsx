import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text'

export default function CheckoutPriceNote() {
    const {t} = useTranslation();
  return (
    <View className="mx-4 mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
      <Text className="text-sm text-yellow-800">
        ⚠️ {t("checkout.priceNote")}
      </Text>
    </View>

  )
}
