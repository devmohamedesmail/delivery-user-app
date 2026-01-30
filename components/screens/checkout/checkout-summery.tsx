import React from 'react'
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import { useAppSelector } from '@/store/hooks';

export default function CheckoutSummery({selectedArea}: {selectedArea: any}) {
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const totalItems = useAppSelector((state) => state.cart.totalItems);
    const cart = useAppSelector((state) => state.cart);
    const { t, i18n } = useTranslation();
   
  return (
       <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className={`text-xl  text-black mb-4 text-center font-extrabold `}> {t("order.orderSummary")}</Text>
          <View className={`flex-row justify-between items-center mb-2 ${i18n.language === "ar" ? " flex-row-reverse" : ""}`}>
            <Text className="text-gray-600"> {t("order.subtotal")} ({totalItems} items)</Text>
            <Text className="font-semibold text-gray-900"> {config.CurrencySymbol} {totalPrice.toFixed(2)}
            </Text>
          </View>

          <View className={`flex-row justify-between items-center mb-2 ${i18n.language === "ar" ? " flex-row-reverse" : ""}`}>
            <Text className="text-gray-600">{t("order.deliveryFee")}</Text>
            <Text className="font-semibold text-gray-900">
              {config.CurrencySymbol} {selectedArea?.price}
            </Text>
          </View>

          <View className="border-t border-gray-200 pt-3">
            <View
              className={`flex-row justify-between items-center mb-2 ${i18n.language === "ar" ? " flex-row-reverse" : ""}`}
            >
              <Text className="text-lg font-bold text-gray-900">
                {t("order.total")}
              </Text>
              <Text className="text-lg font-bold text-gray-900">
                {config.CurrencySymbol}{" "}
                {Number(cart.store.delivery_fee) +
                  Number(totalPrice.toFixed(2))}
              </Text>
            </View>
          </View>
        </View>
  )
}
