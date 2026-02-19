import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AddCartModalHeader({ toggleModal }: any) {
    const { t } = useTranslation();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    return (
        <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold dark:text-white">{t("cart.selectAttribute")}</Text>
            <Pressable
                onPress={toggleModal}
                className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-full"
            >
                <AntDesign name="close" size={20} color={isDark ? "white" : "black"} />
            </Pressable>
        </View>
    )
}
