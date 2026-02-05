import React from 'react'
import { TouchableOpacity, View, Text, Pressable } from 'react-native'

type HeaderIconProps = {
    count?: number
    icon?: React.ReactNode
    onPress: () => void
}

export default function HeaderIcon({ count, icon, onPress }: HeaderIconProps) {
    return (

        <Pressable onPress={onPress} className='bg-white relative rounded-full items-center justify-center w-12 h-12 border border-white/30'>
            <View>
                {icon}

                {count ? <View className='absolute -top-3 -right-5 w-6 text-center h-6 bg-red-500 rounded-full items-center justify-center border-2 border-white'>
                    <Text className='text-white text-xs'>{count}</Text>
                </View> : null}
            </View>
        </Pressable>


    )

}
