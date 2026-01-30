import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity, View } from 'react-native'

export default function HomeSearch() {
    const { t, i18n } = useTranslation()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push({
                pathname: '/(tabs)/search',
                params: { q: searchQuery.trim() }
            })
        }
    }

    const handleClear = () => {
        setSearchQuery('')
    }

    return (
        <View className="px-4 py-3">
            <View className="bg-card dark:bg-card-dark rounded-2xl flex-row items-center px-4 py-3 shadow-sm border border-border dark:border-border-dark">
                <Ionicons name="search" size={22} color="#fd4a12" />
                <TextInput
                    placeholder={t('common.search_products')}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                    className={`flex-1 mx-3 text-base text-text dark:text-text-dark ${i18n.language === 'ar' ? 'text-right' : 'text-left'
                        }`}
                    cursorColor="#fd4a12"
                    placeholderTextColor="#9ca3af"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={handleClear} className="mr-1">
                        <Ionicons name="close-circle" size={22} color="#9ca3af" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
