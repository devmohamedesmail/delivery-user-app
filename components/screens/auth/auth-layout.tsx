import React from "react";
import { KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();


  return (
    <View className="flex-1" >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Creative Header */}
          <View className="pt-14 pb-8 px-5">
            {/* Back Button */}
            <View className="mb-3">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-11 h-11 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Ionicons name="arrow-back" size={22} color="white" />
              </TouchableOpacity>
            </View>

            {/* Logo/Brand Section */}
            <View className="items-center  mb-3">
              <View className="mb-4 rounded-full overflow-hidden">
                {/* <Logo /> */}
              </View>
              <Text
                className="text-3xl text-white mb-2"
                style={{ fontFamily: "Cairo_700Bold" }}
              >
                {t("auth.welcomeBack")}
              </Text>
              <Text
                className={`text-white/70 text-center text-base ${i18n.language === "ar" ? "text-right" : "text-left"}`}
                style={{ fontFamily: "Cairo_400Regular" }}
              >
                {t("auth.loginToYourAccount")}
              </Text>
            </View>
          </View>

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
