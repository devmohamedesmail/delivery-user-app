import HeaderIcon from '@/components/ui/header-icon'
import React from 'react'
import { View } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useAppSelector, selectCartTotalItems } from "@/store/hooks";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import PlaceIcon from './place-icon';






export default function HomeHeader({ onOpenPlace }: { onOpenPlace: () => void }) {
  const router = useRouter();
  const totalItems = useAppSelector(selectCartTotalItems);

  return (
    <View className="flex-row items-center justify-between px-4 pt-14 pb-2">

      <HeaderIcon icon={<EvilIcons name="bell" size={24} color="black" />} onPress={() => router.push("/(tabs)/notifications")} />
      <PlaceIcon onOpen={onOpenPlace} />

      <HeaderIcon count={totalItems} icon={<AntDesign name="shopping-cart" size={24} color="black" />} onPress={() => router.push("/(tabs)/cart")} />
    </View>
  )
}
