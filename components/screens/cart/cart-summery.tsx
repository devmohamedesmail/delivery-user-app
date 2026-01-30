import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/store";
import { selectCartTotalPrice } from "@/store/hooks";
import { config } from "@/constants/config";


export default function CartSummary() {
  const { t, i18n } = useTranslation();
  const totalPrice = useAppSelector(selectCartTotalPrice);


  return (
    <View
      className="mx-4 rounded-2xl p-5 mb-4 bg-white dark:bg-card-dark"
    >
      <Text
        className="text-lg text-center mb-4 font-extrabold text-black dark:text-white"
      >
        {t("cart.orderSummary")}
      </Text>

      <View
        className="border-t pt-4 mt-2"
        
      >
        <View
          className={`flex-row justify-between items-center ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
        >
          <Text
            className="text-base text-black dark:text-white"
            
          >
            {t("cart.total")}
          </Text>
          <Text
            className="text-xl font-bold text-black dark:text-white"
            
          >
            {config.CurrencySymbol} {totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}


