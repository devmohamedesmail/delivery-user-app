import React from 'react'
import { Pressable, Text } from 'react-native'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next';
export default function AddCartModalAction({ item, selectedAttribute, handleAddToCart, modalQuantity, toggleModal }: any) {
    const { t } = useTranslation();

    return (
        <Pressable
            onPress={() => {
                if (item.attributes && item.attributes.length > 0) {
                    if (selectedAttribute) {
                        handleAddToCart(item, modalQuantity, selectedAttribute);
                        toggleModal();
                    } else {
                        Toast.show({
                            type: "error",
                            text1: t("cart.selectAttributeError"),
                        });
                    }
                } else {

                    handleAddToCart(item, modalQuantity, selectedAttribute || undefined);
                    toggleModal();

                }
            }}
            className={`py-3 rounded-full ${(item.attributes && item.attributes.length > 0 && !selectedAttribute)
                ? "bg-gray-300 dark:bg-zinc-700"
                : "bg-primary"
                }`}
            disabled={!!(item.attributes && item.attributes.length > 0 && !selectedAttribute)}
        >
            <Text className="text-white text-center font-bold text-lg">
                {t("cart.confirmAdd")}
            </Text>
        </Pressable>
    )
}
