import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Search from '@/components/ui/search';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import HeaderIcon from '@/components/ui/header-icon';
export default function ProductsHeader({ parsedStoreItem, searchQuery, setSearchQuery }: any) {
    const router = useRouter();
    const { i18n } = useTranslation();
    const cartItems = useAppSelector((state) => state.cart.items);
    return (
        <LinearGradient
            colors={["#fd4a12", "#FF6A3D"]}
            className="px-4 pt-14 pb-6"
        >
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold flex-1 text-center">
                    {i18n.language === "ar" ? "المنتجات" : "Products"} -{" "}
                    {parsedStoreItem.name}
                </Text>

                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: '/stores/reviews',
                        params: { storeItem: JSON.stringify(parsedStoreItem) }
                    })}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mx-2"
                >
                    <AntDesign name="comment" size={22} color="white" />
                    {parsedStoreItem.total_reviews && (
                        <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                            <Text className="text-white text-xs font-bold">
                                {parsedStoreItem.total_reviews}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/cart")}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                >
                    <Ionicons name="cart-outline" size={22} color="white" />
                    {cartItems.length > 0 && (
                        <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                            <Text className="text-white text-xs font-bold">
                                {cartItems.length}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <Search
                placeholder={
                    i18n.language === "ar" ? "ابحث عن منتج..." : "Search products..."
                }
                value={searchQuery}
                onChangeText={setSearchQuery}
                // onPress={() => setSearchQuery("")}
            />
        </LinearGradient>
    )
}
