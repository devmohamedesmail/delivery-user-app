import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ContactCard({ option, index }: any) {
    return (
        <View key={index} className="w-1/2 px-2 mb-4">
            <TouchableOpacity
                onPress={option.action}
                className="bg-white rounded-2xl p-4"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-3"
                    style={{ backgroundColor: option.bgColor }}
                >
                    <Ionicons name={option.icon} size={28} color={option.color} />
                </View>
                <Text className="text-base font-semibold text-gray-800 mb-1">
                    {option.title}
                </Text>
                <Text className="text-xs text-gray-500" numberOfLines={2}>
                    {option.description}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
