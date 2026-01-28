import React from 'react'
import { Image, TouchableOpacity, View ,Text} from 'react-native'
import { useTranslation } from 'react-i18next'

export default function StoreTypeItem({ storeType }: any) {
    const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity className='w-[30%]'>
      <View className='w-full h-32 mb-2 relative'>
        <Image
          source={{ uri: storeType.image }}
          className='w-full h-32 mb-2'
          resizeMode='cover'
        />
        <Text className='text-center absolute bottom-0 left-0 right-0 text-white bg-primary text-lg font-bold'>
         {i18n.language === 'ar' ? storeType.name_ar : storeType.name_en}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
