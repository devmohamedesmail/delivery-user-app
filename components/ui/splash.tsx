import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Constants for animations
const LOGO_SIZE = width * 0.9;

export default function Splash() {
  const { t } = useTranslation();

  // Shared values for animations
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const circleScale = useSharedValue(0);

  useEffect(() => {
    // Start animations sequence

    // 1. Circle background expands
    circleScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // 2. Logo appears with spring effect
    logoScale.value = withDelay(
      400,
      withSpring(1, {
        damping: 10,
        stiffness: 100,
        mass: 1,
      })
    );
    logoOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));

    // 3. Text fades in and moves up
    textOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(
      1000,
      withSpring(0, {
        damping: 12,
        stiffness: 90,
      })
    );
  }, []);

  // Animated styles
  const rLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }],
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
    };
  });

  return (
    <View className="flex-1 bg-white items-center justify-center overflow-hidden">
      {/* Background Decorative Circle */}
      <Animated.View
        className="absolute items-center justify-center bg-orange-600 rounded-full"
        style={[
          {
            width: width * 2,
            height: width * 2,
          },
          rCircleStyle
        ]}
      />

      <View className="items-center justify-center z-10">
        {/* Animated Logo */}
        <Animated.View
          className="mb-10 shadow-lg shadow-orange-500/30"
          style={rLogoStyle}
        >
          <Image
            source={require('@/assets/images/splash.png')}
            style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
            contentFit="cover"
          />
        </Animated.View>

        {/* Animated Text */}
        <Animated.View className="items-center" style={rTextStyle}>
          <Text className="text-3xl font-extrabold text-white mb-2 tracking-wide">
            {t('splash.welcome_message')}
          </Text>
          <Text className="text-base text-white font-medium">
            {t('splash.loading_app',)}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}