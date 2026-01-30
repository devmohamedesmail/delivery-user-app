import React from 'react'

import Layout from '@/components/ui/layout'
import { useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next'
import { usePlace } from '@/hooks/usePlace'
import SlideShow from '@/components/screens/home/side-show'
import StoreTypesSection from '@/components/screens/home/store-types-section';
import HomeHeader from '@/components/screens/home/home-header';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import BottomPaper from '@/components/ui/bottom-paper';
import { Ionicons } from '@expo/vector-icons'
import HomeSearch from '@/components/screens/home/home-search';

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { t } = useTranslation()
  const { places, selectedPlace, setSelectedPlace } = usePlace()
  return (
    <>
      <Layout>
        <HomeHeader onOpenPlace={() => bottomSheetRef.current?.expand()} />
        <ScrollView>
          <HomeSearch />
          <SlideShow />
          <StoreTypesSection />
        </ScrollView>
      </Layout>


      <BottomPaper ref={bottomSheetRef} snapPoints={['50%']}>
        <View className="flex-1 px-5 pb-8">
          <Text className="text-xl font-bold mb-4 text-center text-gray-800 arabic-font-bold mt-2">
            {t("common.select_place") || "Select Delivery Location"}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {places.map((place) => (
              <TouchableOpacity
                key={place.id}
                onPress={() => {
                  setSelectedPlace(place);
                  bottomSheetRef.current?.close();
                }}
                className={`flex-row items-center justify-between p-4 mb-3 rounded-xl border ${selectedPlace?.id === place.id
                  ? "bg-[#fd4a12]/10 border-[#fd4a12]"
                  : "bg-gray-50 border-gray-100"
                  }`}
              >
                <View className="flex-row items-center flex-1">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${selectedPlace?.id === place.id ? "bg-[#fd4a12]" : "bg-gray-200"
                    }`}>
                    <Ionicons
                      name="location"
                      size={20}
                      color={selectedPlace?.id === place.id ? "white" : "#6B7280"}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className={`text-base font-bold mb-0.5 text-left ${selectedPlace?.id === place.id ? "text-[#fd4a12]" : "text-gray-800"
                      }`}>
                      {place.name}
                    </Text>
                    {place.description && (
                      <Text className="text-xs text-gray-500 text-left" numberOfLines={1}>
                        {place.description}
                      </Text>
                    )}
                  </View>
                </View>

                {selectedPlace?.id === place.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#fd4a12" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomPaper>
    </>
  )
}
