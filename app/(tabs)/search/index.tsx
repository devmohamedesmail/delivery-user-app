import HomeSearch from '@/components/screens/home/home-search'
import NoResult from '@/components/screens/search/no-result'
import ResultCardItem from '@/components/screens/search/result-card-item'
import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import Loading from '@/components/ui/loading'
import { config } from '@/constants/config'
import { usePlace } from '@/hooks/usePlace'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Text, View } from 'react-native'

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
                <NoResult />
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
            <Header title={t('common.search_results')} />
            <View className="flex-1 bg-background dark:bg-background-dark">
                <HomeSearch />

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
                    <Loading />
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
