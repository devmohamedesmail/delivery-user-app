import React, { useState } from "react";
import { View,Text, ScrollView,Linking} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Layout from "@/components/ui/layout";
import colors from "@/constants/colors";
import Header from "@/components/ui/header";
import ContactCard from "@/components/ui/contact-card";

interface ContactOption {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  action: () => void;
}



export default function Support() {
  const { t, i18n } = useTranslation();


  const handleCall = () => {
    const phoneNumber = "0102283709";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleChat = () => {
    Linking.openURL(`https://wa.me/+971589107126`);
  }


  const contactOptions: ContactOption[] = [
    {
      icon: "call",
      title: t("support.callUs"),
      description: t("support.callUsDesc"),
      color: "white",
      bgColor: colors.light.tabIconSelected,
      action: handleCall,
    },
    {
      icon: "logo-whatsapp",
      title: t("support.chatwhatsApp"),
      description: t("support.chatWithUsDesc"),
      color: "white",
      bgColor: colors.light.tabIconSelected,
      action: handleChat,
    },
  

  ];



  return (
    <Layout>
      {/* Header */}
      <Header title="support" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Quick Actions */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-black text-center mb-4">
            {t("support.quickActions")}
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {contactOptions.map((option, index) => (
              <ContactCard key={index} option={option} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
