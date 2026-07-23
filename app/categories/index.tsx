import React from 'react'
import { FlatList, View } from 'react-native'
import Layout from '@/components/ui/layout'
import { useCategories } from '@/hooks/categories/use-categories'
import CategoryCard from '@/components/shared/category-card'
import { Category } from '@/@types/stores'

import Loading from '@/components/ui/loading'
import Header from '@/components/ui/header'
import useImports from '@/hooks/common/use-import'
import { Ionicons } from "@expo/vector-icons";
import Text from "@/components/ui/text";
import colors from "@/constants/colors";

export default function CategoriesScreen() {

    const { data, isLoading } = useCategories()
    const { t } = useImports();

    const categories = data ?? []


    if (isLoading) {
        return (
            <Layout>
                <Loading />
            </Layout>
        )
    }


    return (
        <Layout>
            <Header title={t("home.categories")} />
            <View
                className="mx-2 mt-2 mb-2 rounded-3xl px-4 py-1 bg-white"
            >
                <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-4">
                        <Text className="text-2xl font-bold text-black">
                            {t("home.categories")}
                        </Text>

                        <Text className="mt-2 text-sm leading-6 text-gray-600">
                            {t("home.categoriesDescription")}
                        </Text>
                    </View>

                    <View
                        className="h-16 w-16 items-center justify-center rounded-2xl bg-primary"
                        
                    >
                        <Ionicons
                            name="grid-outline"
                            size={32}
                            color="white"
                        />
                    </View>
                </View>
            </View>
            <FlatList
                data={categories}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 30,
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 25
                }}
                renderItem={({ item }) => (
                    <CategoryCard
                        category={item as Category}
                    />
                )}

            />
        </Layout>
    )
}