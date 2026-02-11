import { useTheme } from '@/hooks/useTheme';
import React from 'react'
import { Switch, TouchableOpacity, View, Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from 'nativewind';

interface SettingItemProps {
    onPress?: () => void;
    icon: React.ReactNode;
    type: "navigation" | "toggle";
    title: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
}
export default function OptionButton({ onPress, icon, type, title, value, onValueChange }: SettingItemProps) {
   const { colorScheme } = useColorScheme()

    return (
        <TouchableOpacity
            onPress={type === "navigation" ? onPress : undefined}
            activeOpacity={type === "navigation" ? 0.7 : 1}
            className="mx-4 mb-2 p-4 rounded-xl flex-row-reverse items-center justify-between dark:bg-card-dark bg-card"

        >
            <View className="flex-row-reverse items-center flex-1">
                <View
                    className="p-3 rounded-full ml-4"

                >
                    {icon}
                </View>
                <Text
                    className="font-extrabold arabic-font text-base text-right flex-1 text-text dark:text-white"

                >
                    {title}
                </Text>
            </View>

            {type === "toggle" ? (
                <Switch
                    trackColor={{ false: "#d1d5db", true: "#10b981" }}
                    thumbColor="#ffffff"
                    value={value}
                    onValueChange={onValueChange}
                />
            ) : (
                <Ionicons name="chevron-back" size={20}
                color={colorScheme === 'dark' ? '#fff' : '#000'}
                />
            )}
        </TouchableOpacity>
    )
}
