import useFetch from '@/hooks/useFetch'
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@/hooks/useTheme'
import colors from '@/constants/colors'




interface Banner {
  id: number;
  image: string;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
}

export default function SlideShow() {
  const { data, loading, error } = useFetch('/banners')
  const { theme } = useTheme()
  const isDark = theme === 'dark'
//   const colors = Colors[theme]
  if (loading) return null
  if (!data || data.length === 0) return null

  return (
    <View className='px-3 '>
      <View style={{ height: 200 }}>
        <Swiper
          autoplay
          loop
          autoplayTimeout={5}
          showsPagination={true}
          dotStyle={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
          }}
          activeDotStyle={{
            backgroundColor: colors.light.tint,
            width: 24,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
          }}
          paginationStyle={{
            bottom: -22,
          }}
        >
          {data?.map((banner: Banner) => (
            <View key={banner.id} className='px-1'>
              <View
                style={[
                  styles.bannerContainer,
                  {
                    shadowColor: isDark ? '#000' : '#000',
                    shadowOpacity: isDark ? 0.5 : 0.15,
                  }
                ]}
              >
                <Image
                  source={{ uri: banner.image }}
                  className='w-full h-full rounded-2xl'
                  resizeMode='cover'
                />

                {/* Gradient overlay for better text readability */}
                <LinearGradient
                  colors={[
                    'transparent',
                    'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.7)',
                  ]}
                  style={styles.gradientOverlay}
                  className='rounded-2xl'
                />

                {/* Content container */}
                <View className='absolute bottom-0 left-0 right-0 p-5'>
                  <Text
                    className='text-white font-bold text-3xl mb-2'
                    style={styles.title}
                    numberOfLines={2}
                  >
                    {banner.title}
                  </Text>
                  <Text
                    className='text-white text-base opacity-90'
                    style={styles.content}
                    numberOfLines={2}
                  >
                    {banner.content}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 6,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  title: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 36,
  },
  content: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 22,
  },
});
