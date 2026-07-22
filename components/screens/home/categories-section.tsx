import { Text, View, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useCategories } from '@/hooks/categories/use-categories'
import { router } from 'expo-router'
import SectionTitle from '@/components/shared/section-title'
import useImports from '@/hooks/common/use-import'
import CategoryCard from '@/components/shared/category-card'
import { Category } from '@/@types/stores'

export default function CategoriesSection() {
    const { data, isLoading } = useCategories()
    const {t}=useImports()

    const categories = data?.slice(0, 10) ?? []

    if (isLoading) {
        return (
            <View className="mt-5">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-900">
                        Categories
                    </Text>
                </View>

                <ActivityIndicator size="small" />
            </View>
        )
    }

    return (
        <View className="my-10">

            <SectionTitle  
            title={t("home.categories")}
            onPress={() => router.push('/categories')} />


            {/* Categories */}
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    gap: 16
                }}
                renderItem={({ item }) =>  <CategoryCard category={item as Category}/>}
            />

        </View>
    )
}