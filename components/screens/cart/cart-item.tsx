import { config } from "@/constants/config";
import { deleteFromCart, updateQuantity } from "@/store/slices/cartSlice";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { selectCartItems, useAppDispatch, useAppSelector } from "@/store/hooks";
import { useColorScheme } from "nativewind";
import ItemDeleteModal from "./item-delete-modal";


export default function CartItem({ item }: any) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const { t } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const { colorScheme } = useColorScheme()

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleIncreaseQuantity = (itemId: string) => {
        const item = cartItems.find((cartItem) => cartItem.id === itemId);
        if (item) {
            dispatch(updateQuantity({ id: itemId, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        const item = cartItems.find((cartItem) => cartItem.id === itemId);
        if (item) {
            dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
        }
    };

    const delete_item = (id: any) => {
        dispatch(deleteFromCart(id));
        toggleModal();
    };

    return (
        <>
            <View
                className="w-[48%] rounded-2xl overflow-hidden bg-white dark:bg-card-dark">

                <View className="relative">
                    {item.image ? (
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: "100%", height: 150 }}
                            className="rounded-t-2xl"
                            resizeMode="cover"
                        />
                    ) : (
                        <View
                            className="h-36 flex items-center justify-center rounded-t-2xl">
                            <Text >{item.store_name}</Text>
                        </View>
                    )}

                    {/* Delete Button */}
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedItemId(item.id);
                            toggleModal();
                        }}
                        className="absolute bg-red-600 top-2 right-2 p-2 w-9 h-9 rounded-full flex items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <FontAwesome5 name="trash" size={14} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Item Content */}
                <View className="px-3 py-4">
                    <Text
                        className="text-base text-center font-bold mb-2 text-black dark:text-white"
                        numberOfLines={2}
                    >
                        {item.name}
                    </Text>

                    <Text
                        className="font-bold text-center text-base mb-3 text-black dark:text-white"

                    >
                        {item.selectedAttribute ? item.selectedAttribute.price : item.price}{" "}
                        {config.CurrencySymbol}
                    </Text>

                    {item.selectedAttribute && (
                        <Text className="text-sm text-center bg-primary dark:bg-primary-dark rounded-md w-fit text-white mx-auto px-5 mb-3">{item.selectedAttribute.value}</Text>
                    )}

                    {/* Quantity Controls */}
                    <View className="flex flex-row items-center justify-center mt-2">
                        <View
                            className="flex-row justify-center items-center rounded-full p-1 px-2"

                        >
                            <TouchableOpacity
                                onPress={() => handleDecreaseQuantity(item.id)}
                                className="p-2 rounded-full bg-primary dark:bg-primary-dark"

                                activeOpacity={0.8}
                            >
                                <Ionicons name="remove" size={16} color="white" />
                            </TouchableOpacity>

                            <View className="px-4 py-1 min-w-[40px]">
                                <Text
                                    className="font-bold text-center text-black dark:text-white"

                                >
                                    {item.quantity}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleIncreaseQuantity(item.id)}
                                className="p-2 rounded-full bg-primary dark:bg-primary-dark"
                                activeOpacity={0.8}
                            >
                                <Ionicons name="add" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <ItemDeleteModal
                toggleModal={toggleModal}
                isModalVisible={isModalVisible}
                selectedItemId={selectedItemId}
                delete_item={delete_item}
                item={item}
            />
        </>
    );
}


