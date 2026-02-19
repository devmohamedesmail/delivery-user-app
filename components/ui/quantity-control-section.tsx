import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function QuantityControlSection({ modalQuantity, setModalQuantity }: any) {
    return (
        <View className="flex-row items-center justify-center mb-6 bg-gray-50 dark:bg-zinc-800 rounded-full p-2">
            <Pressable
                onPress={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                className="bg-white dark:bg-zinc-700 w-10 h-10 rounded-full items-center justify-center shadow-sm"
            >
                <Text className="text-primary dark:text-orange-400 text-2xl font-bold">-</Text>
            </Pressable>
            <Text className="text-xl font-bold mx-6 dark:text-white">{modalQuantity}</Text>
            <Pressable
                onPress={() => setModalQuantity(modalQuantity + 1)}
                className="bg-primary w-10 h-10 rounded-full items-center justify-center shadow-sm"
            >
                <Text className="text-white text-2xl font-bold">+</Text>
            </Pressable>
        </View>
    )
}
