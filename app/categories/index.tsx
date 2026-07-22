import React from 'react'
import {  FlatList} from 'react-native'
import Layout from '@/components/ui/layout'
import { useCategories } from '@/hooks/categories/use-categories'
import CategoryCard from '@/components/shared/category-card'
import { Category } from '@/@types/stores'

import Loading from '@/components/ui/loading'
import Header from '@/components/ui/header'
import useImports from '@/hooks/common/use-import'

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