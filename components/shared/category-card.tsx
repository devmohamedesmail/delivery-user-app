import { View, Pressable, Image } from 'react-native'
import React from 'react'
import { Category } from '@/@types/stores'
import Text from '../ui/text'
import useImports from '@/hooks/common/use-import'

export default function CategoryCard({ category }: { category: Category }) {
    const { router } = useImports();
    return (
        <Pressable
            className="items-center"
            onPress={() =>
                router.push({
                    pathname: '/category-products',
                    params: {
                        categoryId: category.id,
                        categoryName: category.name,
                    }
                })
            }
        >

            <View className=" w-28 h-28 rounded-full  bg-gray-100  overflow-hidden border border-gray-100">
                <Image source={{ uri: category.image }} className="w-full h-full" resizeMode="cover" />

            </View>


            <Text
                className=" mt-2 text-sm text-gray-800 font-medium text-center"
                numberOfLines={1}
            >
                {category.name}
            </Text>


        </Pressable>
    )
}
