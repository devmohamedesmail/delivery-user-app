import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, Text, View } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Loading({
  message = 'Loading...',
  size = 'medium',
  showText = true
}: LoadingProps) {
  const { t } = useTranslation();

  // Animation Values
  const bikeBounce = useRef(new Animated.Value(0)).current;
  const wheelRotate = useRef(new Animated.Value(0)).current;
  const roadMove = useRef(new Animated.Value(0)).current;
  const windMove = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const roomWidthRef = useRef(50); // width of one dash segment + gap

  // Configuration
  const sizes = {
    small: { icon: 40, text: 12, branding: 16 },
    medium: { icon: 60, text: 14, branding: 20 },
    large: { icon: 80, text: 16, branding: 24 },
  };
  const config = sizes[size];
  const roadWidth = 100;

  useEffect(() => {
    // Fade In
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Bike Bounce Animation
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bikeBounce, {
          toValue: -10,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bikeBounce, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

  
    const tilt = Animated.loop(
      Animated.sequence([
        Animated.timing(wheelRotate, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(wheelRotate, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );

    // Road Line Movement (Infinite Scroll)
    const road = Animated.loop(
      Animated.timing(roadMove, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Wind/Cloud Movement
    const wind = Animated.loop(
      Animated.timing(windMove, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    bounce.start();
    road.start();
    wind.start();
    // tilt.start(); 

    return () => {
      bounce.stop();
      road.stop();
      wind.stop();
      // tilt.stop();
    };
  }, []);

  const roadTranslateX = roadMove.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -roomWidthRef.current || -50], // Value needs to match width of dash pattern
  });

  const windTranslateX = windMove.interpolate({
    inputRange: [0, 1],
    outputRange: [50, -50], // Move past the bike
  });



  return (
    <Animated.View
      className="items-center justify-center flex-1"
      style={{ opacity: fadeAnim }}
    >
      <View className="items-center justify-center h-40">
        {/* Wind/Speed Lines - Moving past */}
        <Animated.View
          className="absolute top-0 right-0"
          style={{
            transform: [{ translateX: windTranslateX }],
            opacity: 0.6
          }}
        >
          <View className="h-0.5 w-8 bg-gray-300 rounded mb-2" />
          <View className="h-0.5 w-4 bg-gray-300 rounded ml-4" />
        </Animated.View>

        {/* Bouncing Bike */}
        <Animated.View
          style={{
            transform: [
              { translateY: bikeBounce },
            ]
          }}
          className="z-10 bg-transparent"
        >
          <Ionicons name="bicycle" size={config.icon} color="#fd4a12" />
        </Animated.View>

        {/* Moving Road */}
        <View className="h-1 w-32 overflow-hidden mt-2 flex-row items-center relative">
          <Animated.View
            className="flex-row absolute"
            style={{
              transform: [{
                translateX: roadMove.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -40] // Width of pattern (dash 20 + gap 20)
                })
              }]
            }}
          >
            {/* Repeat dashes to cover width + buffer for loop */}
            {[...Array(6)].map((_, i) => (
              <View key={i} className="flex-row items-center justify-center" style={{ width: 40 }}>
                <View className="h-1 w-5 bg-gray-300 rounded-full" />
                <View className="w-5" />
              </View>
            ))}
          </Animated.View>
        </View>
      </View>

      {/* Branding and Message */}
      {/* {showText && (
        <View className="items-center mt-4">
          <Text
            className="font-bold text-primary mb-1"
            style={{ fontSize: config.branding, color: '#fd4a12', letterSpacing: 1 }}
          >
            Riva
          </Text>
          <Text
            className="font-medium text-gray-500 dark:text-gray-400"
            style={{ fontSize: config.text }}
          >
            {message === 'Loading...' ? t('common.loading') : message}
          </Text>
        </View>
      )} */}
    </Animated.View>
  );
}
