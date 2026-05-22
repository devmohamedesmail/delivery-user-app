import React from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { Store } from '@/@types/stores'
import { useRouter } from 'expo-router'
import StoreImage from '@/components/ui/store-card/store-image'
import StoreTitle from '@/components/ui/store-card/store-title'
import StoreRating from '@/components/ui/store-card/store-rating'
import StoreDeliveryTime from '@/components/ui/store-card/store-delivery-time'
import StoreOpeningTime from '@/components/ui/store-card/store-opening-time'


type Props = {
    store: Store
    className?: string
    style?: StyleProp<ViewStyle>
}
export default function FeaturedStoreCard({ store,className = 'mb-4 mx-2',
    style }: Props) {
    const router = useRouter()
    return (
        <Pressable
            key={store.id}
            onPress={() => {
                router.push({
                    pathname: '/stores/products',
                    params: { storeItem: JSON.stringify(store) }
                })
            }}
            className="mb-4 mx-2"
            style={{ width: 170 }}
        >
            <View className="rounded-3xl overflow-hidden bg-white dark:bg-card-dark shadow-lg">

                <StoreImage store={store} />


                {/* Store Info */}
                <View className="p-4">
                    <StoreTitle store={store} />
                    <View className="flex-row items-center justify-between">
                        <StoreRating store={store} />
                        <StoreDeliveryTime store={store} />
                    </View>
                    {/* <StoreOpeningTime store={store} /> */}
                </View>
            </View>
        </Pressable>
    )
}
