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
import StoresHeader from '@/components/screens/stores/stores-header'
import StoreCard from '@/components/screens/stores/store-card'

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

        const query = searchQuery.toLowerCase();

        return data.filter((store: any) => {
            const name = store?.name?.toLowerCase() || "";
            const address = store?.address?.toLowerCase() || "";

            return name.includes(query) || address.includes(query);
        });
    }, [data, searchQuery]);
    return (
        <Layout>
            <StoresHeader
                parsedStoreType={parsedStoreType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} />
            {loading ? <Loading /> :
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={filteredStores || []}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <StoreCard item={item} />}
                        columnWrapperStyle={{ gap: 10 }}
                        contentContainerStyle={{
                            paddingHorizontal: 5,
                            paddingTop: 20,
                            paddingBottom: 120,
                            flexGrow: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <NoStores searchQuery={searchQuery} />
                        )}
                    />
                </View>
            }

            {/* {loading ? <Loading /> :
                <View>
                    {filteredStores && filteredStores.length > 0 ? (
                        <FlatList
                            data={filteredStores}
                            numColumns={2}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <StoreCard item={item} />}

                            columnWrapperStyle={{ gap: 1 }}
                            contentContainerStyle={{
                                paddingHorizontal: 5,
                                paddingTop: 20,
                                paddingBottom: 120,
                            }}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<NoStores searchQuery={searchQuery} />}

                        />
                    ) : (
                        <NoStores searchQuery={searchQuery} />
                    )}
                </View>
            } */}

        </Layout>
    )
}
