import React, { useState } from 'react'
import Layout from '@/components/ui/layout'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { usePlace } from '@/hooks/usePlace'
import useFetch from '@/hooks/useFetch'
import Loading from '@/components/ui/loading'
import { View, Text, FlatList } from 'react-native'
import NoStores from '@/components/screens/stores/no-stores'
import StoreItem from '@/components/screens/stores/store-item'
import StoresHeader from '@/components/screens/stores/stores-header'

export default function Stores() {
    const { storeType } = useLocalSearchParams();
    const parsedStoreType = JSON.parse(storeType as string);
    const { selectedPlace } = usePlace()
    const { data, loading } = useFetch(`/store-types/get-stores?place_id=${selectedPlace?.id}&store_type_id=${parsedStoreType.id}`);
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Stores based on search query
    const filteredStores = useMemo(() => {
        if (!data) return [];
        if (!searchQuery.trim()) return data;

        return data.filter(
            (store: any) =>
                store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    return (
        <Layout>
            <StoresHeader
                parsedStoreType={parsedStoreType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} />
            {loading ? <Loading /> :
                <View>
                    {filteredStores && filteredStores.length > 0 ? (
                        <FlatList
                            data={filteredStores}
                            numColumns={2}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <StoreItem item={item} />}

                            columnWrapperStyle={{ gap: 1 }}
                            contentContainerStyle={{
                                paddingHorizontal: 16,
                                paddingTop: 20,
                                paddingBottom: 120,
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <NoStores searchQuery={searchQuery} />
                    )}
                </View>
            }

        </Layout>
    )
}
