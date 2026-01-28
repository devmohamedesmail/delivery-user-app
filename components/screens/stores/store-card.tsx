import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'



interface StoreItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  logo: string;
  banner: string;
  start_time: string;
  end_time: string;
  delivery_time: string;
  delivery_fee: string;
  rating: string;
  review_count: number;
  is_active: boolean;
  is_verified: boolean;
  business_type_id: number;
  avg_rating: string;
  total_reviews: number;
}

export default function StoreCard({ item }: { item: StoreItem }) {
  const { t } = useTranslation()
  const router = useRouter();


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        router.push({
          pathname: '/stores/products',
          params: { storeItem: JSON.stringify(item) }
        })

      }}
      className='m-2 flex-1 overflow-hidden'
    >
      <View
        className=' rounded-2xl overflow-hidden bg-white dark:bg-card-dark'
      >
        <View className='w-full h-48  ' >
          <Image source={{ uri: item.logo }} className='w-full h-full rounded-2xl' resizeMode='cover' />
        </View>

        <View className='px-4 pb-4'>

          <Text className='text-xl mt-3 font-extrabold text-black text-center dark:text-white' numberOfLines={1}>
            {item.name}
          </Text>


          <View className='flex-row items-center justify-between mt-2'>
            <View className='flex flex-row items-center'>
              <Ionicons name="star" size={14} color="#fd4a12" />
              <Text className='text-sm font-bold ml-1' style={{ color: '#fd4a12' }}>
                {parseFloat(item.avg_rating).toFixed(1)}
              </Text>
            </View>



            <View className='flex flex-row items-center '>
              <Text className='text-xs text-black dark:text-white'>

                ( {item.total_reviews} )
              </Text>
              <Text className='ml-1 text-black dark:text-white text-xs'>
                {t('stores.reviews')}
              </Text>
            </View>


          </View>


         

        </View>
      </View>
    </TouchableOpacity>
  )
}
