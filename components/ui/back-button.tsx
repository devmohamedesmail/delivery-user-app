import React from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function BackButton() {
    const router = useRouter()
    return (
        <View className="mb-3">
            <Pressable
                onPress={() => router.back()}
                className="w-11 h-11 rounded-2xl items-center justify-center"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                }}
            >
                <Ionicons name="arrow-back" size={22} color="white" />
            </Pressable>
        </View>
    )
}
