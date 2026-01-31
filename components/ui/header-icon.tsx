import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

type HeaderIconProps = {
    count?: number
    icon?: React.ReactNode
    onPress: () => void
}

export default function HeaderIcon({ count, icon, onPress }: HeaderIconProps) {
    return (
        <View className='bg-white relative rounded-full items-center justify-center w-12 h-12 border border-white/30'>
            <TouchableOpacity onPress={onPress} className='flex items-center justify-center'>
                {icon}
            </TouchableOpacity>
            {count && count > 0 && (
                <View style={{ top: -6, right: -6 }} className='absolute w-6 text-center h-6 bg-red-500 rounded-full items-center justify-center border-2 border-white'>
                    <Text className='text-white text-xs'>{count}</Text>
                </View>
            )}
        </View>
       
    )

}
