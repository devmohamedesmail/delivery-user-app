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

export default function StoreItem({ item }: { item: StoreItem }) {
  const {t}=useTranslation()
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
      className='m-2 flex-1'
    >
      <View
        className='bg-white rounded-2xl overflow-hidden'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 1,
        }}
      >
        <View className='w-full h-48  p-2' >
          <Image source={{ uri: item.logo }} className='w-full h-full rounded-2xl' resizeMode='cover' />
        </View>

        <View className='pt-10 px-4 pb-4'>
          {/* Name and Rating */}
          <View className='flex-row items-start justify-between mb-2'>
            <View className='flex-1 pr-2'>
              <Text className='text-lg font-bold text-gray-800' numberOfLines={1}>
                {item.name}
              </Text>
              <View className='flex-row items-center mt-1'>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text className='text-xs text-gray-500 ml-1' numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
            </View>

          </View>


          <View className=''>
            <View className='bg-orange-50 rounded-full px-3 py-1 flex-row items-center'>
              <Ionicons name="star" size={14} color="#fd4a12" />
              <Text className='text-sm font-bold ml-1' style={{ color: '#fd4a12' }}>
                {parseFloat(item.avg_rating).toFixed(1)}
              </Text>
            </View>
            <View className='flex flex-row items-center mt-2'>
              <Text className='text-xs'>
               
                ( {item.total_reviews} )
              </Text>
              <Text className='ml-1 text-gray-500 text-xs'>
                {t('stores.reviews')}
              </Text>
            </View>
          </View>
          {/* Info Row */}

        </View>
      </View>
    </TouchableOpacity>
  )
}
