import AddCartModal from "@/components/ui/add-cart-modal";
import { useAddToCart } from "@/hooks/useAddToCart";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

interface Attribute {
    id: number;
    name: string;
    values: { id: number; value: string; price: number }[];
}

interface OfferProduct {
    id: number;
    name: string;
    image: string;
    description: string | null;
    price: number;
    on_sale: boolean;
    sale_price: number | null;
    store_id: number;
    category_id: number;
    store: {
        id: number;
        name: string;
        logo: string;
        rating: number;
    };
    attributes?: Attribute[];
    [key: string]: any;
}

export default function OfferCard({ item }: { item: OfferProduct }) {
    const { t } = useTranslation();
    const { handleAddToCart, getCartQuantity } = useAddToCart();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState<{
        name: string;
        value: string;
        price: number;
    } | null>(null);

    const [modalQuantity, setModalQuantity] = useState(1);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        if (!isModalVisible) {
            setSelectedAttribute(null);
            setModalQuantity(1);
        }
    };


    const calculateDiscount = () => {
        if (item.on_sale && item.sale_price && item.price > 0) {
            const discount = ((item.price - item.sale_price) / item.price) * 100;
            return Math.round(discount);
        }
        return 0;
    };


    const handleAddButtonPress = () => {
        setModalVisible(true);
    };

    const quantity = getCartQuantity(item.id);
    const discountPercentage = calculateDiscount();

    return (
        <View className="flex-1 m-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
            {/* Image Container */}
            <View className="relative">
                <Image
                    source={{ uri: item.image }}
                    className="w-full h-40 object-cover"
                    resizeMode="cover"
                />

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-lg">
                        <Text className="text-white text-xs font-bold">
                            {discountPercentage}% OFF
                        </Text>
                    </View>
                )}

                {/* Store Logo Badge (optional) */}
                {item.store?.logo && (
                    <View className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-white dark:border-zinc-800 overflow-hidden bg-white shadow-sm">
                        <Image
                            source={{ uri: item.store.logo }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                )}
            </View>

            {/* Content */}
            <View className="p-3">
                <Text className="text-gray-900 dark:text-white font-bold text-base mb-1" numberOfLines={1}>
                    {item.name}
                </Text>

                <Text className="text-gray-500 dark:text-gray-400 text-xs mb-2" numberOfLines={1}>
                    {item.store?.name}
                </Text>

                <View className="flex-row items-center justify-between mt-2">
                    <View>
                        {item.on_sale && item.sale_price ? (
                            <View>
                                <Text className="text-primary font-bold text-lg">
                                    {item.sale_price} {t("common.currency")}
                                </Text>
                                <Text className="text-gray-400 line-through text-xs">
                                    {item.price} {t("common.currency")}
                                </Text>
                            </View>
                        ) : (
                            <Text className="text-primary font-bold text-lg">
                                {item.price} {t("common.currency")}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity
                        onPress={handleAddButtonPress}
                        className="bg-primary w-8 h-8 rounded-full items-center justify-center shadow-sm"
                    >
                        <MaterialIcons name="add" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {quantity > 0 && (
                    <View className="flex-row items-center mt-2 bg-green-50 dark:bg-green-900/20 py-1 px-2 rounded self-start">
                        <MaterialIcons name="shopping-cart" size={12} color="#22c55e" />
                        <Text className="text-green-600 dark:text-green-400 text-xs ml-1 font-medium">
                            {quantity} {t("cart.inCart")}
                        </Text>
                    </View>
                )}
            </View>


            <AddCartModal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                item={item}
                setSelectedAttribute={setSelectedAttribute}
                selectedAttribute={selectedAttribute}
                setModalQuantity={setModalQuantity}
                modalQuantity={modalQuantity}
                handleAddToCart={handleAddToCart}
            />
        </View>
    );
}
