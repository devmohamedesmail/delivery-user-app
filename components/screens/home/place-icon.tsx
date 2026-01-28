import React, { useRef } from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useTranslation } from 'react-i18next'
import BottomSheet from '@gorhom/bottom-sheet';
import { usePlace } from '@/hooks/usePlace'
import BottomPaper from '@/components/ui/bottom-paper'


export default function PlaceIcon({ onOpen }: { onOpen: () => void }) {
  const { t } = useTranslation()
  const { places, selectedPlace, setSelectedPlace } = usePlace()
  const refRBSheet = useRef<any>(null)
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <View>

      <TouchableOpacity
        // onPress={() => refRBSheet.current.open()}
        onPress={onOpen}
        className="flex-row items-center bg-white  px-4 py-2 rounded-full self-start border border-white/30"
      >
        <Ionicons name="location" size={18} color="black" style={{ marginRight: 6 }} />
        <Text className="text-black font-bold arabic-font mr-2 text-md" numberOfLines={1}>
          {selectedPlace ? selectedPlace.name : t("common.select_place")}
        </Text>
        <Ionicons name="chevron-down" size={16} color="black" />
      </TouchableOpacity>


      <BottomPaper ref={bottomSheetRef} snapPoints={['40%', '80%']}>
        <View className="flex-1 px-5 pb-8">
          <Text className="text-xl font-bold mb-4 text-center text-gray-800 arabic-font-bold mt-2">
            {t("common.select_place")}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {places.map((place) => (
              <TouchableOpacity
                key={place.id}
                onPress={() => {
                  setSelectedPlace(place);
                  refRBSheet.current.close();
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
                    {/* {place.description && (
                      <Text className="text-xs text-gray-500 text-left" numberOfLines={1}>
                        {place.description}
                      </Text>
                    )} */}
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



      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: 'white',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#E5E7EB',
            width: 50,
            height: 5,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
      >
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
                  refRBSheet.current.close();
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
      </RBSheet>
    </View>
  )
}
