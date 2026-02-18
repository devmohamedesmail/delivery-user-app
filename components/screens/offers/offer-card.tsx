import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, clearCart } from "@/store/slices/cartSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartStore = useAppSelector((state) => state.cart.store);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState<{
        name: string;
        value: string;
        price: number;
    } | null>(null);

    const [modalQuantity, setModalQuantity] = useState(1);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        if (!isModalVisible) {
            setSelectedAttribute(null);
            setModalQuantity(1);
        }
    };

    const getCartQuantity = (productId: number) => {
        const filteredItems = cartItems.filter(
            (cartItem) => cartItem.id === productId.toString()
        );
        return filteredItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const calculateDiscount = () => {
        if (item.on_sale && item.sale_price && item.price > 0) {
            const discount = ((item.price - item.sale_price) / item.price) * 100;
            return Math.round(discount);
        }
        return 0;
    };

    const handleAddToCart = (
        product: OfferProduct,
        quantity: number = 1,
        attribute?: { name: string; value: string; price: number }
    ) => {
        const basePrice =
            product.on_sale && product.sale_price
                ? product.sale_price
                : product.price;

        const finalPrice = attribute ? basePrice + attribute.price : basePrice;

        const store = product.store;

        if (cartItems.length === 0) {
            for (let i = 0; i < quantity; i++) {
                dispatch(
                    addToCart({
                        product: {
                            id: product.id.toString(),
                            name: product.name,
                            description: product.description || "",
                            price: finalPrice,
                            image: product.image,
                            store_id: store.id,
                            store_name: store.name,
                            selectedAttribute: attribute,
                        },
                        store: store,
                    })
                );
            }
            Toast.show({
                type: "success", text1: t("cart.addedToCart")
            });
            toggleModal();
            return;
        }

        if (cartStore && cartStore.id !== store.id) {
            Alert.alert(
                t("cart.differentStoreTitle"),
                t("cart.differentStoreMessage"),
                [
                    { text: t("cart.cancel"), style: "cancel" },
                    {
                        text: t("cart.clearAndContinue"),
                        style: "destructive",
                        onPress: () => {
                            dispatch(clearCart());
                            for (let i = 0; i < quantity; i++) {
                                dispatch(
                                    addToCart({
                                        product: {
                                            id: product.id.toString(),
                                            name: product.name,
                                            description: product.description || "",
                                            price: finalPrice,
                                            image: product.image,
                                            store_id: store.id,
                                            store_name: store.name,
                                            selectedAttribute: attribute,
                                        },
                                        store,
                                    })
                                );
                            }
                            Toast.show({ type: "success", text1: t("cart.addedToCart") });
                            toggleModal();
                        },
                    },
                ]
            );
            return;
        }

        for (let i = 0; i < quantity; i++) {
            dispatch(
                addToCart({
                    product: {
                        id: product.id.toString(),
                        name: product.name,
                        description: product.description || "",
                        price: finalPrice,
                        image: product.image,
                        store_id: store.id,
                        store_name: store.name,
                        selectedAttribute: attribute,
                    },
                    store,
                })
            );
        }

        Toast.show({ type: "success", text1: t("cart.addedToCart") });
        toggleModal();
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

            {/* Modal logic is same as before but styled a bit cleaner if needed */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                useNativeDriver
                hideModalContentWhileAnimating
            >
                <View className="bg-white dark:bg-zinc-900 py-5 px-4 rounded-xl max-h-[80%]">
                    <View className="flex flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold dark:text-white">{t("cart.selectAttribute")}</Text>
                        <TouchableOpacity
                            onPress={toggleModal}
                            className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-full"
                        >
                            <AntDesign name="close" size={20} color={isDark ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
                        {item.attributes?.map((attribute, attrIndex) => (
                            <View key={attrIndex} className="mb-4">
                                <Text className="text-lg font-semibold mb-2 dark:text-gray-200">
                                    {attribute.name}
                                </Text>
                                {attribute.values.map((attrValue, valueIndex) => {
                                    const isSelected = selectedAttribute?.value === attrValue.value;
                                    return (
                                        <TouchableOpacity
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
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </ScrollView>

                    <View className="flex-row items-center justify-center mb-6 bg-gray-50 dark:bg-zinc-800 rounded-full p-2">
                        <TouchableOpacity
                            onPress={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                            className="bg-white dark:bg-zinc-700 w-10 h-10 rounded-full items-center justify-center shadow-sm"
                        >
                            <Text className="text-primary dark:text-orange-400 text-2xl font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="text-xl font-bold mx-6 dark:text-white">{modalQuantity}</Text>
                        <TouchableOpacity
                            onPress={() => setModalQuantity(modalQuantity + 1)}
                            className="bg-primary w-10 h-10 rounded-full items-center justify-center shadow-sm"
                        >
                            <Text className="text-white text-2xl font-bold">+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            if (item.attributes && item.attributes.length > 0) {
                                if (selectedAttribute) {
                                    handleAddToCart(item, modalQuantity, selectedAttribute);
                                } else {
                                    Toast.show({
                                        type: "error",
                                        text1: t("cart.selectAttributeError"),
                                    });
                                }
                            } else {

                                handleAddToCart(item, modalQuantity);
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
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
