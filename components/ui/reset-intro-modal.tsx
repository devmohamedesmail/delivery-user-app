import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetIntroModal() {
  return (
    <Pressable
            onPress={async () => {
              await AsyncStorage.removeItem("introModalTime");
              alert("Modal storage reset! Reload the app.");
            }}
            className="bg-red-500 p-3 rounded-xl mt-4"
          >
            <Text className="text-white text-center">Reset Intro Modal</Text>
          </Pressable>
  )
}