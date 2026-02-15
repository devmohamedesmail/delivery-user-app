import colors from '@/constants/colors'
import React from 'react'
import { Pressable, Text } from 'react-native'

interface TabButtonProps {
  title: string
  value: string
  activeValue: string
  onPress: () => void
}

export default function TabButton({
  title,
  value,
  activeValue,
  onPress,
}: TabButtonProps) {
  const isActive = value === activeValue

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 py-3 rounded-lg items-center"
      style={{
        backgroundColor: isActive ? colors.light.tint : 'transparent',
      }}
    >
      <Text
        className="font-bold"
        style={{
          color: isActive ? '#fff' : colors.light.text,
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}
