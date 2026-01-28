import OptionButton from '@/components/screens/account/option-button'
import Layout from '@/components/ui/layout'
import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message';
import colors from '@/constants/colors'
import { useColorScheme } from 'nativewind'
import { Ionicons } from "@expo/vector-icons";

export default function index() {
  const { t, i18n } = useTranslation();
  const { colorScheme, toggleColorScheme}=useColorScheme()

  const handle_switchLanguage = () => {
    // Logic to switch language
    try {
      const newLanguage = i18n.language === "en" ? "ar" : "en";
      i18n.changeLanguage(newLanguage);
      Toast.show({
        type: "success",
        text1: t("account.language_switched"),
        position: "top",
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("account.language_switch_failed"),
        position: "top",
        visibilityTime: 2000,
      });
    }
  };
  return (
    <Layout>
      <View className='my-10'>
        <OptionButton
          title={t("account.switchLanguage")}
          icon={
            <MaterialIcons name="language" size={24} color={colors.light.tint} />
          }
          type="navigation"
          onPress={handle_switchLanguage}

        />

        <OptionButton
          title={colorScheme === "dark" ? t("common.darkMode") || "Dark Mode" : t("common.lightMode") || "Light Mode"}
          icon={
            <Ionicons name={colorScheme === "dark" ? "moon" : "sunny"} size={24} color={colors.light.tint} />
          }
          type="toggle"
          value={colorScheme === "dark"}
          onValueChange={toggleColorScheme}

        />
      </View>
    </Layout>
  )
}
