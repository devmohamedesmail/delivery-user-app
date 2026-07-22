import React, { useState, useCallback, useRef } from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import Skeleton from '@/components/ui/skeleton'
import { useCategoryProducts } from '@/hooks/categories/use-category-products'
import { usePlace } from '@/hooks/place/usePlace'
import ProductCard from '@/components/screens/products/product-card'
import ProductListCard from '@/components/screens/products/product-list-card'
import { CategoryHeader } from '@/components/screens/category-products/category-products-header'
import EmptyState from '@/components/screens/category-products/empty-state'

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = 'grid' | 'list'

// ─── Skeleton loaders ─────────────────────────────────────────────────────────
function GridSkeleton() {
  return (
    <View className="w-1/2 mb-4 px-1">
      <Skeleton height={160} rounded={12} className="mb-2" />
      <Skeleton height={14} rounded={6} width="80%" className="mb-1" />
      <Skeleton height={12} rounded={6} width="50%" />
    </View>
  )
}

function ListSkeleton() {
  return (
    <View className="mb-3 mx-4 flex-row bg-white dark:bg-card-dark rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <Skeleton width={110} height={110} rounded={0} />
      <View className="flex-1 p-3 justify-between">
        <Skeleton height={14} rounded={6} width="85%" className="mb-2" />
        <Skeleton height={12} rounded={6} width="60%" className="mb-1" />
        <Skeleton height={12} rounded={6} width="40%" />
      </View>
    </View>
  )
}

function SkeletonGrid() {
  return (
    <View className="flex-row flex-wrap px-3 pt-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <GridSkeleton key={i} />
      ))}
    </View>
  )
}

function SkeletonList() {
  return (
    <View className="pt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <ListSkeleton key={i} />
      ))}
    </View>
  )
}



// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CategoryProductsScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId: string
    categoryName?: string
  }>()
  const { selectedPlace } = usePlace()
  const { colorScheme } = useColorScheme()

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useCategoryProducts(Number(categoryId), selectedPlace?.id ?? 0)

  const allProducts = data?.pages.flatMap((page) => page.data) ?? []
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter((p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allProducts

  const handleToggleView = useCallback(() => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))
  }, [])

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const handleToggleSearch = useCallback(() => {
    setSearchVisible((prev) => {
      if (prev) setSearchQuery('')
      return !prev
    })
  }, [])

  const renderFooter = () => {
    if (!isFetchingNextPage) return null
    return (
      <View className="py-5 items-center">
        <ActivityIndicator color="#fd4a12" size="small" />
      </View>
    )
  }

  const title = categoryName
    ? String(categoryName)
    : 'Products'

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'light'} />

      <CategoryHeader
        title={title}
        productCount={!isLoading ? allProducts.length : null}
        viewMode={viewMode}
        onToggleView={handleToggleView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
        searchVisible={searchVisible}
        onToggleSearch={handleToggleSearch}
      />

      {/* Subtle divider */}
      <View className="h-px bg-gray-100 dark:bg-gray-800" />

      {isLoading ? (
        viewMode === 'grid' ? <SkeletonGrid /> : <SkeletonList />
      ) : (
        <FlatList
          key={viewMode} // re-mount when switching between grid/list (numColumns change)
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={
            filteredProducts.length === 0
              ? { flexGrow: 1 }
              : viewMode === 'grid'
              ? { paddingHorizontal: 10, paddingTop: 12, paddingBottom: 24 }
              : { paddingTop: 12, paddingHorizontal: 16, paddingBottom: 24 }
          }
          columnWrapperStyle={
            viewMode === 'grid' ? { gap: 8 } : undefined
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListEmptyComponent={<EmptyState searchQuery={searchQuery} />}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) =>
            viewMode === 'grid' ? (
              <ProductCard item={item} store={item?.store} />
            ) : (
              <ProductListCard item={item} store={item?.store} />
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}
