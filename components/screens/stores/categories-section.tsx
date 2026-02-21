import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import useFetch from '@/hooks/useFetch'


export default function CategoriesSection({
    parsedStoreItem,
    setSelectedCategory,
    selectedCategory,
    t,
}: any) {
    const { data: categories } = useFetch(
        `/stores/${parsedStoreItem.id}/categories`
    );
    return (
        <View>
            {categories && categories.length > 0 && (
                <View className="px-5 py-3">
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={() => setSelectedCategory(null)}
                            className={`mr-2 px-4 py-2 rounded-md flex flex-row items-center ${selectedCategory === null ? "bg-primary" : "bg-gray-200"
                                }`}
                        >
                            <Text
                                className={`font-semibold ${selectedCategory === null ? "text-white" : "text-gray-700"
                                    }`}
                            >
                                {t("stores.all")}
                            </Text>
                        </TouchableOpacity>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {categories.map((cat: any) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    onPress={() => setSelectedCategory(cat.id)}
                                    className={`mr-2 px-4 py-2 rounded-md flex flex-row items-center ${selectedCategory === cat.id ? "bg-primary" : "bg-gray-200"
                                        }`}
                                >

                                    <Image
                                    source={{ uri: cat.image }}
                                    className="w-10 h-10 rounded-md"
                                    />
                                    <Text
                                        className={`font-semibold mx-2 ${selectedCategory === cat.id
                                                ? "text-white"
                                                : "text-gray-700"
                                            }`}
                                    >
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    )
}
