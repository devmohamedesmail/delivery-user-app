import OfferCard from '@/components/screens/offers/offer-card';
import OffersHeader from '@/components/screens/offers/offers-header';
import { config } from '@/constants/config';
import { usePlace } from '@/hooks/usePlace';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';

interface Attribute {
    id: number;
    name: string;
    values: { id: number; value: string; price: number }[];
}

interface OfferProduct {
    id: number;
    name: string;
    image: string;
    description: string | null;
    price: number;
    on_sale: boolean;
    sale_price: number | null;
    store_id: number;
    category_id: number;
    store: {
        id: number;
        name: string;
        logo: string;
        rating: number;
    };
    attributes?: Attribute[];
    [key: string]: any;
}

export default function Offers() {
    const { t } = useTranslation();
    const [offers, setOffers] = useState<OfferProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { colorScheme } = useColorScheme();
    const { selectedPlace } = usePlace();

    const fetch_offers = async () => {
        try {
            if (!selectedPlace) {
                setLoading(false);
                return;
            }
            if (!refreshing) setLoading(true);

            const response = await axios.get(`${config.URL}/products/sale/products?place_id=${selectedPlace?.id}`);
            if (response.data.success) {
                setOffers(response.data.data);
            }
        } catch (error) {
            console.log("Error fetching offers:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        fetch_offers();
    }, [selectedPlace]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch_offers();
    }, [selectedPlace]);

    const renderItem = ({ item }: { item: OfferProduct }) => (
        <OfferCard item={item} />
    );

    const EmptyState = () => (
        <View className="flex-1 justify-center items-center px-6 mt-20">
            <View className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                <Ionicons
                    name="pricetags-outline"
                    size={48}
                    color={colorScheme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
                />
            </View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {t('offers.noOffers')}
            </Text>
            <Text className="text-base text-gray-500 dark:text-gray-400 text-center leading-6">
                {t('offers.noOffersMessage')}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            <OffersHeader />

            {loading && !refreshing ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#fd4a12" />
                </View>
            ) : offers.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={offers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fd4a12']} />
                    }
                />
            )}
        </View>
    );
}
