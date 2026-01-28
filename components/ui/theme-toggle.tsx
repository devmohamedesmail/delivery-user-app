import { useColorScheme } from 'nativewind'
import React from 'react'
import { Pressable,Text } from 'react-native'

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme}=useColorScheme()
  
  return (
      <Pressable
      onPress={toggleColorScheme}
      className="bg-card-light dark:bg-card-dark px-4 py-2 rounded-xl"
    >
      <Text className="text-text-light dark:text-text-dark">
        {colorScheme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </Text>
    </Pressable>
  )
}
