import Skeleton from '@/components/ui/skeleton'
import { config } from '@/constants/config'
import { usePlace } from '@/hooks/usePlace'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface Store {
    id: number
    name: string
    address: string
    phone: string
    logo: string
    banner: string | null
    start_time: string
    end_time: string
    devlivery_time: string | null
    avg_rating: number
    total_reviews: number
    is_active: boolean
    is_verified: boolean
    is_featured: boolean
}

export default function FeaturedStores() {
    const { t } = useTranslation()
    const router = useRouter()
    const [featuredStores, setFeaturedStores] = useState<Store[]>([])
    const [loading, setLoading] = useState(true)
    const { selectedPlace } = usePlace()

    const fetchFeaturedStores = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${config.URL}/stores/featured`, {
                place_id: selectedPlace?.id,
            })
            const data = response.data.data
            setFeaturedStores(data)
        } catch (error) {
            console.log("Error fetching featured stores:" )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (selectedPlace?.id) {
            fetchFeaturedStores()
        }
    }, [selectedPlace])

    const isStoreOpen = (startTime: string, endTime: string) => {
        const now = new Date()
        const currentTime = now.getHours() * 60 + now.getMinutes()

        const [startHour, startMin] = startTime.split(':').map(Number)
        const [endHour, endMin] = endTime.split(':').map(Number)

        const start = startHour * 60 + startMin
        const end = endHour * 60 + endMin

        if (end < start) {
            return currentTime >= start || currentTime <= end
        }
        return currentTime >= start && currentTime <= end
    }

    if (loading) {
        return (
            <Skeleton width={"100%"} height={200} />
        )
    }

    if (!featuredStores || featuredStores.length === 0) {
        return null
    }

    return (
        <View className="py-6">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 mb-4">
                <View className="flex-row items-center">
                    <View className="w-1 h-6 bg-[#fd4a12] rounded-full mr-2" />
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t("home.featured_stores")}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.push('/stores')}
                    className="flex-row items-center"
                >
                    <Text className="text-[#fd4a12] font-semibold mr-1">
                        {t("home.viewAll")}
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#fd4a12" />
                </TouchableOpacity>
            </View>

            {/* Stores Horizontal Scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                className="flex-row"
            >
                {featuredStores.map((store, index) => {
                    const storeOpen = isStoreOpen(store.start_time, store.end_time)

                    return (
                        <TouchableOpacity
                            key={store.id}
                            activeOpacity={0.9}
                            onPress={() => {
                                router.push({
                                    pathname: '/stores/products',
                                    params: { storeItem: JSON.stringify(store) }
                                })
                            }}
                            className="mr-4"
                            style={{ width: 280 }}
                        >
                            <View className="rounded-3xl overflow-hidden bg-white dark:bg-card-dark shadow-lg">
                                {/* Store Image with Gradient Overlay */}
                                <View className="relative h-40">
                                    <Image
                                        source={{ uri: store.logo }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                                        className="absolute bottom-0 left-0 right-0 h-20"
                                    />

                                    {/* Featured Badge */}
                                    <View className="absolute top-3 left-3">
                                        <LinearGradient
                                            colors={['#fd4a12', '#ff6b35']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            className="px-3 py-1.5 rounded-full flex-row items-center"
                                        >
                                            <Ionicons name="star" size={12} color="white" />
                                            <Text className="text-white text-xs font-bold ml-1">
                                                {t("home.featured")}
                                            </Text>
                                        </LinearGradient>
                                    </View>

                                    {/* Verified Badge */}
                                    {store.is_verified && (
                                        <View className="absolute top-3 right-3 bg-blue-500 rounded-full p-1.5">
                                            <Ionicons name="checkmark-circle" size={16} color="white" />
                                        </View>
                                    )}

                                    {/* Store Status */}
                                    <View className="absolute bottom-3 right-3">
                                        <View className={`px-3 py-1 rounded-full ${storeOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                                            <Text className="text-white text-xs font-semibold">
                                                {storeOpen ? t("home.open_now") : t("home.closed")}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Store Info */}
                                <View className="p-4">
                                    {/* Store Name */}
                                    <Text
                                        className="text-lg font-bold text-gray-900 dark:text-white mb-2"
                                        numberOfLines={1}
                                    >
                                        {store.name}
                                    </Text>

                                    {/* Address */}
                                    <View className="flex-row items-center mb-3">
                                        <Ionicons name="location-outline" size={14} color="#6B7280" />
                                        <Text
                                            className="text-xs text-gray-500 dark:text-gray-400 ml-1 flex-1"
                                            numberOfLines={1}
                                        >
                                            {store.address}
                                        </Text>
                                    </View>

                                    {/* Rating and Delivery Time */}
                                    <View className="flex-row items-center justify-between">
                                        {/* Rating */}
                                        <View className="flex-row items-center bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1.5 rounded-lg">
                                            <Ionicons name="star" size={14} color="#fd4a12" />
                                            <Text className="text-sm font-bold text-[#fd4a12] ml-1">
                                                {store.avg_rating > 0 ? store.avg_rating.toFixed(1) : 'N/A'}
                                            </Text>
                                            <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                                ({store.total_reviews})
                                            </Text>
                                        </View>

                                        {/* Delivery Time */}
                                        {store.devlivery_time && (
                                            <View className="flex-row items-center">
                                                <Ionicons name="time-outline" size={14} color="#6B7280" />
                                                <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                                    {store.devlivery_time} {t("home.min_delivery")}
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    {/* Opening Hours */}
                                    {!storeOpen && (
                                        <View className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                                            <Text className="text-xs text-gray-500 dark:text-gray-400">
                                                {t("home.opens_at")} {store.start_time}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}
