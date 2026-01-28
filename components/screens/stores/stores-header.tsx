import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TextInput, TouchableOpacity } from "react-native";
export default function StoresHeader({ parsedStoreType, searchQuery, setSearchQuery }: any) {
    const { i18n } = useTranslation();
    const router = useRouter();
    return (
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
    )
}