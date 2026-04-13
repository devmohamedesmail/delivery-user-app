import { Store } from '@/@types/stores'
import SectionTitle from '@/components/ui/section-title'
import Skeleton from '@/components/ui/skeleton'
import useFeaturedStores from '@/hooks/stores/useFeaturedStores'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import FeaturedStoreCard from '../../ui/store-card/featured-store-card'

export default function FeaturedStores() {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading } = useFeaturedStores()




    if (isLoading) {
        return (
            <Skeleton width={"100%"} height={200} />
        )
    }

    if (!data || data.length === 0) {
        return null
    }

    return (
        <View className="py-2">
            <SectionTitle
                title={t("home.featured_stores")}
                onPress={() => router.push('/featured-stores')}
            />

            {/* Stores Horizontal Scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                className="flex-row"
            >
                {data?.map((store: Store, index: number) => (<FeaturedStoreCard key={store.id} store={store} className="w-[280px] mr-4" />))}
            </ScrollView>
        </View>
    )
}
