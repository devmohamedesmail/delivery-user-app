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
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

interface ProductAttributeValue {
    id: number
    value: string
    price: number
    attribute_id: number
    product_id: number
}

interface ProductAttribute {
    id: number
    name: string
    values: ProductAttributeValue[]
}

interface Product {
    id: number
    name: string
    image: string
    description: string | null
    price: number
    on_sale: boolean
    sale_price: number | null
    store_id: number
    category_id: number
    store: {
        id: number
        name: string
        logo: string
        rating: number
    }
    category: {
        id: number
        name: string
    }
    attributes: ProductAttribute[]
}

interface SearchResponse {
    success: boolean
    data: Product[]
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
        itemsPerPage: number
        hasNextPage: boolean
        hasPrevPage: boolean
    }
}

export default function Search() {
    const { t } = useTranslation()
    const params = useLocalSearchParams()
    const { selectedPlace } = usePlace()

    const [searchQuery, setSearchQuery] = useState((params.q as string) || '')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        if (params.q) {
            setSearchQuery(params.q as string)
            // Reset and search when query param changes
            setPage(1)
            performSearch(params.q as string, 1, true)
        }
    }, [params.q])

    const performSearch = async (query: string, pageNum: number, isNewSearch: boolean = false) => {
        if (!query.trim() || !selectedPlace?.id) return

        if (isNewSearch) {
            setLoading(true)
            setProducts([]) // Clear previous results immediately on new search
        } else {
            setLoadingMore(true)
        }

        setError(null)

        try {
            const response = await axios.get<SearchResponse>(
                `${config.URL}/products/search/products`,
                {
                    params: {
                        q: query.trim(),
                        place_id: selectedPlace.id,
                        page: pageNum,
                        limit: 10 // Based on itemsPerPage in example
                    }
                }
            )

            if (response.data.success) {
                if (isNewSearch) {
                    setProducts(response.data.data)
                } else {
                    setProducts(prev => [...prev, ...response.data.data])
                }
                setHasNextPage(response.data.pagination.hasNextPage)
                setPage(pageNum)
            }
        } catch (err) {
            setError(t('search_error') || 'حدث خطأ أثناء البحث')
            console.error('Search error:', err)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const loadMore = () => {
        if (!loadingMore && hasNextPage) {
            performSearch(searchQuery, page + 1, false)
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

    const renderFooter = () => {
        if (!loadingMore) return <View className="h-6" />;
        return (
            <View className="py-4">
                <ActivityIndicator size="small" color="#fd4a12" />
            </View>
        );
    };

    return (
        <Layout>
            <Header title={t('common.search_results')} />
            <View className="flex-1 bg-background dark:bg-background-dark">
                <HomeSearch />

                {/* Results Count */}
                {!loading && products.length > 0 && (
                    <View className="px-4 py-3 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark flex-row justify-between items-center">
                        <Text className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {t('common.results_count')}: {products.length}
                        </Text>
                    </View>
                )}

                {/* Loading State */}
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ResultCardItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                        ListEmptyComponent={renderEmptyState}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                )}
            </View>
        </Layout>
    )
}
