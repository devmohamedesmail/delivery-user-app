import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Animated, Pressable, Text, View } from "react-native";
import Modal from 'react-native-modal';

export default function IntroModal() {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        checkModal();
    }, []);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [visible]);

    const checkModal = async () => {
        const lastShown = await AsyncStorage.getItem("introModalTime");
        const now = Date.now();
        const hours24 = 24 * 60 * 60 * 1000;

        if (!lastShown || now - Number(lastShown) > hours24) {
            setVisible(true);
            await AsyncStorage.setItem("introModalTime", now.toString());
        }
    };

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start(() => setVisible(false));
    };

    const handleGetStarted = () => {
        handleClose();
        router.push('/(tabs)');
    };

    return (
        <Modal
            isVisible={visible}
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={500}
            animationOutTiming={300}
            backdropOpacity={0.85}
            useNativeDriver={true}
            onBackdropPress={handleClose}
        >
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }],
                    opacity: fadeAnim
                }}
                className="flex-1 justify-center items-center px-5"
            >
                <View className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Gradient Header */}
                    <LinearGradient
                        colors={['#fd4a12', '#ff6b3d', '#fd8a5c']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-6 pt-12 pb-16 relative"
                    >
                        {/* Decorative Circles */}
                        <View className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full" />
                        <View className="absolute bottom-8 right-8 w-32 h-32 bg-white/10 rounded-full" />
                        <View className="absolute top-20 right-4 w-16 h-16 bg-white/10 rounded-full" />

                        {/* Close Button */}
                        <Pressable
                            onPress={handleClose}
                            className="absolute top-4 z-10"
                            style={{ [isRTL ? 'left' : 'right']: 16 }}
                        >
                            <View className="bg-white/20 backdrop-blur rounded-full p-2">
                                <Ionicons name="close" size={24} color="white" />
                            </View>
                        </Pressable>

                        {/* Welcome Icon */}
                        <Animated.View
                            style={{
                                transform: [{ translateY: slideAnim }]
                            }}
                            className="items-center"
                        >
                            <View className="bg-white/20 backdrop-blur rounded-full p-6 mb-6">
                                <Ionicons name="hand-right" size={56} color="white" />
                            </View>

                            {/* Welcome Text */}
                            <Text className="text-4xl font-bold text-white text-center mb-3">
                                {t('common.welcome')}! 👋
                            </Text>
                            <Text className="text-white/95 text-center text-lg font-medium px-4">
                                {t('introModal.subtitle')}
                            </Text>
                        </Animated.View>
                    </LinearGradient>

                   

                  
                </View>
            </Animated.View>
        </Modal>
    );
}
