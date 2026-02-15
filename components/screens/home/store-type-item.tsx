import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, Pressable, Text } from 'react-native';

export default function StoreTypeItem({ storeType }: any) {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  // Animation value
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }} className="w-[30%] mb-4 mx-1">
      <Pressable
        onPress={() => {
          router.push({
            pathname: '/stores',
            params: { storeType: JSON.stringify(storeType) }
          });
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-full h-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm"
        style={{ elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
      >
        <Image
          source={{ uri: storeType.image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          className="absolute bottom-0 left-0 right-0 h-16 justify-end pb-3 px-2"
        >
          <Text
            className="text-center text-white text-xs font-bold"
            numberOfLines={2}
            style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          >
            {i18n.language === 'ar' ? storeType.name_ar : storeType.name_en}
          </Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}
