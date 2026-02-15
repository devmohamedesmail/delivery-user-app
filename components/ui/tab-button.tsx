import colors from '@/constants/colors'
import React from 'react'
import { Pressable, Text } from 'react-native'

export default function TabButton({ onPress, title, registerMethod }: any) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-1 py-3 rounded-lg items-center"
            style={{
                backgroundColor: registerMethod === "email" ? colors.light.tint : "transparent",
            }}
        >
            <Text
                className="font-bold"
                style={{
                    color: registerMethod === "email" ? "#fff" : colors.light.text,
                }}
            >
                {title}
            </Text>
        </Pressable>
    )
}
