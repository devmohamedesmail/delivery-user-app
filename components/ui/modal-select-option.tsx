import React from 'react'
import { Pressable, Text } from 'react-native'
import { useTranslation } from 'react-i18next';

export default function ModalSelectOption({ attrValue, attribute, valueIndex, setSelectedAttribute, isSelected }: any) {
    const { t } = useTranslation();
    return (
        <Pressable
            key={valueIndex}
            onPress={() =>
                setSelectedAttribute({
                    name: attribute.name,
                    value: attrValue.value,
                    price: attrValue.price,
                })
            }
            className={`p-3 rounded-lg mb-2 flex-row justify-between items-center border ${isSelected
                ? "bg-primary border-primary"
                : "bg-gray-50 dark:bg-zinc-800 border-gray-100 dark:border-zinc-700"
                }`}
        >
            <Text className={`font-medium ${isSelected ? "text-white" : "text-black dark:text-gray-200"}`}>
                {attrValue.value}
            </Text>
            <Text className={`font-bold ${isSelected ? "text-white" : "text-primary dark:text-orange-400"}`}>
                {attrValue.price} {t("common.currency")}
            </Text>
        </Pressable>
    )
}
