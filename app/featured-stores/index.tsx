import ErrorMessage from '@/components/ui/error-message'
import Layout from '@/components/ui/layout'
import Loading from '@/components/ui/loading'
import FeaturedStoreCard from '@/components/ui/store-card/featured-store-card'
import Text from '@/components/ui/text'
import useFeaturedStores from '@/hooks/stores/useFeaturedStores'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Pressable, View } from 'react-native'

export default function FeaturedStoresPage() {
    const { data, isLoading, error } = useFeaturedStores()
    const { t } = useTranslation()
    const router = useRouter()

    if (isLoading) {
        return (
            <Loading />
        )
    }


    if (error) {
        return (
            <Layout>
                <ErrorMessage message={t('common.error_message')} />
            </Layout>
        )
    }
    return (
        <Layout>
            {/* Header */}
            <View className="px-4 pt-14 pb-4 bg-primary dark:bg-background-dark flex-row items-center justify-between shadow-sm">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={22} color="white" />
                </Pressable>

                <Text className="text-white text-xl font-cairo flex-1 text-center">
                    {t('home.featured_stores')}
                </Text>
            </View>


            <View className="flex-1 px-3  ">
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{ gap: 2 }}
                    contentContainerStyle={{ gap: 6, marginTop: 10, paddingBottom: 50 }}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <FeaturedStoreCard store={item}  />
                    )}
                    ListEmptyComponent={
                        <Text className="text-center mt-10">
                            لا يوجد متاجر مميزة
                        </Text>
                    }
                />
            </View>
        </Layout>
    )
}
