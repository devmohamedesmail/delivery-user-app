import { useSetting } from '@/hooks/useSetting';
import React from 'react'
import { Image, View } from 'react-native'


export default function Logo() {
    const { settings } = useSetting();
    return (
        <View className="mb-4 rounded-full overflow-hidden">
            <Image
                source={{ uri: settings?.logo || '' }}
                className="w-24 h-24 object-cover"
            />
        </View>
    )
}
