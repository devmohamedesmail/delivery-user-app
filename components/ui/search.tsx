import React from "react"
import { View, TextInput, TouchableOpacity, ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"

interface SearchInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onClear?: () => void
  containerStyle?: ViewStyle
  autoFocus?: boolean
  textAlign?: "left" | "right" | "center",
  handleSearch?: () => void
}

export default function SearchInput({
  value,
  onChangeText,
  placeholder = "Search",
  onClear,
  containerStyle,
  autoFocus = false,
  textAlign = "left",
  handleSearch,
}: SearchInputProps) {
  const { t, i18n } = useTranslation()
  return (
  
    <View className="px-4 py-3" style={containerStyle}>
      <View className="bg-card dark:bg-card-dark rounded-2xl flex-row items-center px-4 py-3 shadow-sm border border-border dark:border-border-dark">
        <Ionicons name="search" size={22} color="#fd4a12" />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          className={`flex-1 mx-3 text-base text-text dark:text-text-dark ${i18n.language === 'ar' ? 'text-right' : 'text-left'
            }`}
          cursorColor="#fd4a12"
          placeholderTextColor="#9ca3af"
        />
        {!!value && onClear && (
          <TouchableOpacity onPress={onClear} className="mr-1">
            <Ionicons name="close-circle" size={22} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
