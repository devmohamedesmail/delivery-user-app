import BackButton from '@/components/ui/back-button';
import Logo from '@/components/ui/logo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function AuthHeader({ title, description }: { title?: string, description?: string }) {
    const { i18n } = useTranslation();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View className="overflow-hidden bg-black/5 pb-6">
            {/* Background Gradient & Shape */}
            <View className="absolute top-0 left-0 right-0 h-full overflow-hidden">
                <LinearGradient
                    colors={['#000', '#1a1a1a']} // Subtle gradient for professional look
                    className="absolute w-full h-full"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />

                {/* Decorative Elements - subtle circles */}
                <View className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                <View className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl" />
            </View>

            <View className="pt-14 px-5">
                {/* Back Button */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <BackButton />
                </Animated.View>

                {/* Logo/Brand Section */}
                <View className="items-center mt-2 mb-4">
                    <Animated.View
                        className="mb-6 rounded-full overflow-hidden shadow-xl shadow-primary/30"
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }, { scale: 1 }]
                        }}
                    >
                        <View className="p-1 border-2 border-white/20 rounded-full">
                            <Logo />
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }}
                        className="items-center"
                    >
                        <Text className="text-3xl font-bold text-white mb-3 tracking-wide">
                            {title}
                        </Text>
                        <Text
                            className={`text-gray-400 text-center text-base leading-6 px-4 ${i18n.language === "ar" ? "text-right" : "text-center"}`}
                        >
                            {description}
                        </Text>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}
