import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";



export default function Search({ placeholder, value, onChangeText, onPress }: any) {
  const { t, i18n } = useTranslation();
  return (
    <View className="bg-white rounded-full flex-row items-center px-4 py-1">
      <Ionicons name="search" size={20} color="#9ca3af" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-base text-right text-black" 
        cursorColor="#fd4a12"
        placeholderTextColor="#9ca3af"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="close-circle" size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
