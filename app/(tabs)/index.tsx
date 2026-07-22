import React, { useEffect, useRef } from 'react'

import Layout from '@/components/ui/layout'
import BottomSheet from '@gorhom/bottom-sheet';
import { usePlace } from '@/hooks/place/usePlace'
import SlideShow from '@/components/screens/home/side-show'
import StoreTypesSection from '@/components/screens/home/store-types-section';
import HomeHeader from '@/components/screens/home/home-header';
import { ScrollView } from 'react-native'
import HomeSearch from '@/components/screens/home/home-search';
import FeaturedStores from '@/components/screens/home/featured-stores';
import { RefreshControl } from 'react-native-gesture-handler';
import { queryClient } from '@/providers';
import PlacesBottomPaper from '@/components/screens/home/places-bottom-paper';
import SupportFloatBtn from '@/components/ui/support-float-btn';
import ResetPlaceButton from '@/components/ui/reset-place';
import CategoriesSection from '@/components/screens/home/categories-section';



export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedPlace } = usePlace()
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (!selectedPlace || selectedPlace === null) {
      const timer = setTimeout(() => {
        bottomSheetRef.current?.expand()

      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [selectedPlace])



  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)

    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey

        return (
          (key[0] === 'store-types' && key[1] === selectedPlace?.id) ||
          (key[0] === 'featured-stores' && key[1] === selectedPlace?.id) ||
          key[0] === 'banners'
        )
      },
    })

    setRefreshing(false)
  }, [selectedPlace?.id])



  return (
    <>
      <Layout>
        <HomeHeader onOpenPlace={() => bottomSheetRef.current?.expand()} />
        <ScrollView className='flex-1' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <HomeSearch />
          <SlideShow />
          {/* <ResetPlaceButton /> */}
          <StoreTypesSection />
          <CategoriesSection />
          <FeaturedStores />

        </ScrollView>
        <SupportFloatBtn />
      </Layout>


      <PlacesBottomPaper
        bottomSheetRef={bottomSheetRef}
      />
    </>
  )
}
