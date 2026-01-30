import ResultCardItem from '@/components/screens/search/result-card-item'
import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import { config } from '@/constants/config'
import { usePlace } from '@/hooks/usePlace'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface Product {
    id: number
    name: string
    image: string
    description: string | null
    price: number
    on_sale: boolean
    sale_price: number | null
    store: {
        id: number
        name: string
        logo: string
    }
    category: {
        id: number
        name: string
    }
}

interface SearchResponse {
    count: number
    data: Product[]
}

export default function Search() {
    const { t, i18n } = useTranslation()
    const params = useLocalSearchParams()
    const { selectedPlace } = usePlace()

    const [searchQuery, setSearchQuery] = useState((params.q as string) || '')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (params.q) {
            setSearchQuery(params.q as string)
            performSearch(params.q as string)
        }
    }, [params.q])

    const performSearch = async (query: string) => {
        if (!query.trim() || !selectedPlace?.id) return

        setLoading(true)
        setError(null)

        try {
            const response = await axios.get<SearchResponse>(
                `${config.URL}/products/search/products`,
                {
                    params: {
                        q: query.trim(),
                        place_id: selectedPlace.id
                    }
                }
            )
            setProducts(response.data.data)
        } catch (err) {
            setError(t('search_error') || 'حدث خطأ أثناء البحث')
            console.error('Search error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        if (searchQuery.trim()) {
            performSearch(searchQuery)
        }
    }

    const handleClear = () => {
        setSearchQuery('')
        setProducts([])
        setError(null)
    }

  

   

    const renderEmptyState = () => {
        if (loading) return null

        if (error) {
            return (
                <View className="flex-1 items-center justify-center py-20">
                    <Ionicons name="alert-circle-outline" size={64} color="#9ca3af" />
                    <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 text-base">
                        {error}
                    </Text>
                </View>
            )
        }

        if (searchQuery && products.length === 0) {
            return (
                <View className="flex-1 items-center justify-center py-20">
                    <Ionicons name="search-outline" size={64} color="#9ca3af" />
                    <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 text-base">
                        {t('no_results') || 'لا توجد نتائج'}
                    </Text>
                    <Text className="text-gray-400 dark:text-gray-500 text-center mt-2 text-sm">
                        {t('try_different_search') || 'جرب البحث بكلمات مختلفة'}
                    </Text>
                </View>
            )
        }

        return (
            <View className="flex-1 items-center justify-center py-20">
                <Ionicons name="search-outline" size={64} color="#9ca3af" />
                <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 text-base">
                    {t('search_placeholder') || 'ابحث عن المنتجات'}
                </Text>
            </View>
        )
    }

    return (
        <Layout>
            <Header title={t('common.search_results') } />
            <View className="flex-1 bg-background dark:bg-background-dark">
                {/* Search Bar */}
                <View className="px-4 py-3 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark">
                    <View className="bg-background dark:bg-background-dark rounded-2xl flex-row items-center px-4 py-3 border border-border dark:border-border-dark">
                        <TouchableOpacity onPress={handleSearch}>
                            <Ionicons name="search" size={22} color="#fd4a12" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder={t('search_products') || 'ابحث عن المنتجات...'}
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
                            <TouchableOpacity onPress={handleClear}>
                                <Ionicons name="close-circle" size={22} color="#9ca3af" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Results Count */}
                {!loading && products.length > 0 && (
                    <View className="px-4 py-3 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                            {t('common.results_count')}: {products.length}
                        </Text>
                    </View>
                )}

                {/* Loading State */}
                {loading && (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#fd4a12" />
                        <Text className="text-gray-500 dark:text-gray-400 mt-4">
                            {t('searching') || 'جاري البحث...'}
                        </Text>
                    </View>
                )}

                {/* Results List */}
                {!loading && (
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ResultCardItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 16 }}
                        ListEmptyComponent={renderEmptyState}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </Layout>
    )
}
