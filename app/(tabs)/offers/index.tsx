import EmptyOffers from '@/components/screens/offers/empty-offers';
import OfferCard from '@/components/screens/offers/offer-card';
import OffersHeader from '@/components/screens/offers/offers-header';
import Loading from '@/components/ui/loading';
import { config } from '@/constants/config';
import { usePlace } from '@/hooks/usePlace';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { addToCart, clearCart } from "@/store/slices/cartSlice";

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

  

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            <OffersHeader />

            {loading && !refreshing ? (
                <Loading />
            ) : offers.length === 0 ? (
                <EmptyOffers />
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
