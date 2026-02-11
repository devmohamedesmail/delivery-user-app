import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

// Sample data - replace with actual API calls
const SAMPLE_OFFERS = [
    { id: 1, title: "Summer Special", discount: "50%", image: "🍕" },
    { id: 2, title: "Weekend Deal", discount: "30%", image: "🍔" },
    { id: 3, title: "Happy Hour", discount: "25%", image: "🍜" },
];

const SAMPLE_RESTAURANTS = [
    { id: 1, name: "Pizza Palace", rating: 4.8, deliveryTime: "25-30", image: "🍕" },
    { id: 2, name: "Burger House", rating: 4.6, deliveryTime: "20-25", image: "🍔" },
    { id: 3, name: "Sushi Bar", rating: 4.9, deliveryTime: "30-35", image: "🍱" },
];

export default function IntroModal() {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        checkModal();
    }, []);

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                tension: 50,
                useNativeDriver: true,
            }).start();
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
        Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    const handleGetStarted = () => {
        handleClose();
        router.push('/(tabs)');
    };

    const handleViewOffers = () => {
        handleClose();
        router.push('/(tabs)');
    };

    return (
        <Modal
            isVisible={visible}
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={400}
            animationOutTiming={300}
            backdropOpacity={0.8}
            useNativeDriver={true}
            onBackdropPress={handleClose}
        >
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }]
                }}
                className="flex-1 justify-center items-center px-4"
            >
                <View className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Header with Gradient */}
                    <LinearGradient
                        colors={['#fd4a12', '#ff6b3d', '#fd4a12']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-6 pt-8 pb-6"
                    >
                        {/* Close Button */}
                        <Pressable
                            onPress={handleClose}
                            className="absolute top-4 z-10"
                            style={{ [isRTL ? 'left' : 'right']: 16 }}
                        >
                            <View className="bg-white/20 rounded-full p-2">
                                <Ionicons name="close" size={24} color="white" />
                            </View>
                        </Pressable>

                        {/* Title Section */}
                        <View className="items-center mt-4">
                            <View className="bg-white/20 rounded-full p-4 mb-4">
                                <Ionicons name="gift" size={40} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-white text-center mb-2">
                                {t('introModal.title')}
                            </Text>
                            <Text className="text-white/90 text-center text-base">
                                {t('introModal.subtitle')}
                            </Text>
                        </View>
                    </LinearGradient>

                    {/* Content Section */}
                    <ScrollView
                        className="max-h-96"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Special Offers Section */}
                        <View className="px-6 py-6">
                            <View className="flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center">
                                    <Ionicons name="pricetag" size={24} color="#fd4a12" />
                                    <Text className="text-xl font-bold text-gray-900 dark:text-white ml-2">
                                        {t('introModal.specialOffers')}
                                    </Text>
                                </View>
                                <Pressable onPress={handleViewOffers}>
                                    <Text className="text-primary font-semibold">
                                        {t('home.viewAll')}
                                    </Text>
                                </Pressable>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="mb-6"
                            >
                                {SAMPLE_OFFERS.map((offer, index) => (
                                    <Pressable
                                        key={offer.id}
                                        className={`${index > 0 ? (isRTL ? 'mr-3' : 'ml-3') : ''}`}
                                        onPress={handleViewOffers}
                                    >
                                        <View className="w-40 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border border-orange-200 dark:border-gray-600">
                                            <View className="items-center">
                                                <Text className="text-5xl mb-2">{offer.image}</Text>
                                                <View className="bg-primary rounded-full px-3 py-1 mb-2">
                                                    <Text className="text-white font-bold text-lg">
                                                        {offer.discount} {t('introModal.off')}
                                                    </Text>
                                                </View>
                                                <Text className="text-gray-800 dark:text-gray-200 font-semibold text-center text-sm">
                                                    {offer.title}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}
                            </ScrollView>

                            {/* Popular Restaurants Section */}
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="restaurant" size={24} color="#fd4a12" />
                                <Text className="text-xl font-bold text-gray-900 dark:text-white ml-2">
                                    {t('introModal.popularRestaurants')}
                                </Text>
                            </View>

                            {SAMPLE_RESTAURANTS.map((restaurant, index) => (
                                <Pressable
                                    key={restaurant.id}
                                    className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 flex-row items-center ${index < SAMPLE_RESTAURANTS.length - 1 ? 'mb-3' : ''
                                        }`}
                                    onPress={handleGetStarted}
                                >
                                    <View className="bg-white dark:bg-gray-700 rounded-xl p-3 mr-3">
                                        <Text className="text-3xl">{restaurant.image}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-900 dark:text-white font-bold text-base mb-1">
                                            {restaurant.name}
                                        </Text>
                                        <View className="flex-row items-center">
                                            <Ionicons name="star" size={14} color="#FFA500" />
                                            <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1 mr-3">
                                                {restaurant.rating}
                                            </Text>
                                            <Ionicons name="time-outline" size={14} color="#fd4a12" />
                                            <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                                                {restaurant.deliveryTime} {t('introModal.deliveryTime')}
                                            </Text>
                                        </View>
                                    </View>
                                    <Ionicons
                                        name={isRTL ? "chevron-back" : "chevron-forward"}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>

                    {/* Action Buttons */}
                    <View className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <Pressable
                            onPress={handleGetStarted}
                            className="bg-primary rounded-2xl py-4 mb-3 shadow-lg"
                            style={{
                                shadowColor: '#fd4a12',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 8,
                            }}
                        >
                            <Text className="text-center text-white font-bold text-lg">
                                {t('introModal.getStarted')}
                            </Text>
                        </Pressable>

                        <Pressable onPress={handleClose}>
                            <Text className="text-center text-gray-500 dark:text-gray-400 font-semibold">
                                {t('introModal.skip')}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
}
