import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
export default function StoresHeader({ parsedStoreType, searchQuery, setSearchQuery }: any) {
    const { i18n } = useTranslation();
    const router = useRouter();
    return (
        <View
            className="px-5 pt-14 pb-6 bg-primary dark:bg-background-dark"
        >
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold flex-1 text-center">
                    {i18n.language === "ar"
                        ? `${parsedStoreType.name_ar}`
                        : `${parsedStoreType.name_en}`}
                </Text>
                <View className="w-10" />
            </View>

            {/* Search Bar */}
            <View className="bg-white rounded-full flex-row items-center px-4 py-1">
                <Ionicons name="search" size={20} color="#9ca3af" />
                <TextInput
                    placeholder={
                        i18n.language === "ar"
                            ? "ابحث عن متجر..."
                            : "Search for a store..."
                    }
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 ml-2 text-base text-gray-800"
                    cursorColor="#fd4a12"
                    placeholderTextColor="#9ca3af"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}