import React from "react";
import { KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "./auth-header";



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
         <AuthHeader title={t('auth.welcomeBack')} description={t('auth.loginToYourAccount')} />

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
