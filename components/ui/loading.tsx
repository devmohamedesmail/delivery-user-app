import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'upload' | 'download' | 'processing';
  showText?: boolean;
}



export default function Loading({ 
  message = 'Loading...', 
  size = 'medium', 
  type = 'default',
  showText = true 
}: LoadingProps) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;
  const dotsValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  // Size configurations
  const sizeConfig = {
    small: { container: 80, spinner: 40, text: 14 },
    medium: { container: 120, spinner: 60, text: 16 },
    large: { container: 160, spinner: 80, text: 18 }
  };

  const config = sizeConfig[size];

  // Icon mapping for different types
  const getIcon = () => {
    switch (type) {
      case 'upload': return 'cloud-upload-outline';
      case 'download': return 'cloud-download-outline';
      case 'processing': return 'cog-outline';
      default: return 'refresh-outline';
    }
  };

  // Message mapping for different types
  const getMessage = () => {
    if (message !== 'Loading...') return message;
    
    switch (type) {
      case 'upload': return 'Uploading...';
      case 'download': return 'Downloading...';
      case 'processing': return 'Processing...';
      default: return 'Loading...';
    }
  };

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Dots animation
    const dotsAnimation = Animated.loop(
      Animated.timing(dotsValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();
    pulseAnimation.start();
    dotsAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
      dotsAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseScale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const pulseOpacity = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.1],
  });

  const dotsOpacity1 = dotsValue.interpolate({
    inputRange: [0, 0.2, 0.4, 1],
    outputRange: [0.3, 1, 0.3, 0.3],
  });

  const dotsOpacity2 = dotsValue.interpolate({
    inputRange: [0, 0.1, 0.3, 0.5, 1],
    outputRange: [0.3, 0.3, 1, 0.3, 0.3],
  });

  const dotsOpacity3 = dotsValue.interpolate({
    inputRange: [0, 0.4, 0.6, 0.8, 1],
    outputRange: [0.3, 0.3, 0.3, 1, 0.3],
  });

  return (
    <Animated.View 
      className="items-center justify-center"
      style={{
        transform: [{ scale: scaleValue }],
        opacity: fadeValue,
      }}
    >
      {/* Main Loading Container */}
      <View className="relative items-center justify-center mb-6">
        {/* Pulse Background Rings */}
        <Animated.View
          className="absolute rounded-full border-2"
          style={{
            borderColor: '#fd4a12',
            width: config.container,
            height: config.container,
            transform: [{ scale: pulseScale }],
            opacity: pulseOpacity,
          }}
        />
        
        <Animated.View
          className="absolute rounded-full border"
          style={{
            borderColor: '#fd4a12',
            width: config.container * 0.8,
            height: config.container * 0.8,
            transform: [{ scale: pulseScale }],
            opacity: pulseOpacity,
          }}
        />

        {/* Main Spinner with Gradient */}
        <LinearGradient
          colors={['#fd4a12', '#ff7a47', '#ff9066']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-full items-center justify-center"
          style={{
            width: config.spinner,
            height: config.spinner,
          }}
        >
          <Animated.View
            style={{
              transform: [{ rotate: spin }],
            }}
          >
            <Ionicons 
              name={getIcon() as any} 
              size={config.spinner * 0.4} 
              color="white" 
            />
          </Animated.View>
        </LinearGradient>

        {/* Orbiting Dots */}
        <View className="absolute inset-0 items-center justify-center">
          {[0, 120, 240].map((rotation, index) => (
            <Animated.View
              key={index}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#fd4a12',
                transform: [
                  { rotate: `${rotation}deg` },
                  { translateY: -(config.spinner * 0.7) },
                  { rotate: spin },
                ],
                opacity: index === 0 ? dotsOpacity1 : index === 1 ? dotsOpacity2 : dotsOpacity3,
              }}
            />
          ))}
        </View>
      </View>

      {/* Loading Text */}
      {showText && (
        <View className="items-center">
          <Text 
            className="font-semibold mb-2 arabic-font-bold"
            style={{ fontSize: config.text, color: '#1a1a1a' }}
          >
            {getMessage()}
          </Text>
          
          {/* Animated Dots */}
          <View className="flex-row space-x-1">
            <Animated.View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#fd4a12', opacity: dotsOpacity1 }}
            />
            <Animated.View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#fd4a12', opacity: dotsOpacity2 }}
            />
            <Animated.View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#fd4a12', opacity: dotsOpacity3 }}
            />
          </View>
        </View>
      )}

      {/* Progress Bar (for specific types) */}
      {(type === 'upload' || type === 'download') && (
        <View className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <Animated.View
            className="h-full rounded-full"
            style={{
              backgroundColor: '#fd4a12',
              width: dotsValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['20%', '90%'],
              }),
            }}
          />
        </View>
      )}
    </Animated.View>
  );
}
