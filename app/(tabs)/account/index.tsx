import OptionButton from '@/components/screens/account/option-button'
import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function index() {
  const { t, i18n } = useTranslation();
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const router = useRouter()
  const { user } = useAuth();

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
      <Header title={t("account.title")} />

      <ScrollView>
        {user ? (
          <View className="mx-4 my-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {/* Profile Avatar */}
            <View className="items-center mb-6">
              <View className="bg-primary/10 dark:bg-primary/20 rounded-full p-4 mb-3">
                <Ionicons
                  name="person"
                  size={48}
                  color="#fd4a12"
                />
              </View>
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </Text>
            </View>

            {/* User Information */}
            <View className="space-y-4">
              {/* Email */}
              <View className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <View className="bg-primary/10 dark:bg-primary/20 rounded-full p-2 mr-3">
                  <Ionicons name="mail" size={20} color="#fd4a12" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('account.email') || 'البريد الإلكتروني'}
                  </Text>
                  <Text className="text-base text-gray-900 dark:text-white font-medium">
                    {user.email}
                  </Text>
                </View>
              </View>

              {/* Phone */}
              <View className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <View className="bg-primary/10 dark:bg-primary/20 rounded-full p-2 mr-3">
                  <Ionicons name="call" size={20} color="#fd4a12" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('account.phone') || 'رقم الهاتف'}
                  </Text>
                  <Text className="text-base text-gray-900 dark:text-white font-medium">
                    {user.phone}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className="mx-4 my-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {/* Icon */}
            <View className="items-center mb-4">
              <View className="bg-blue-100 dark:bg-blue-900 rounded-full p-4">
                <Ionicons
                  name="person-circle-outline"
                  size={64}
                  color={colorScheme === 'dark' ? colors.dark.tint : colors.dark.tint}
                />
              </View>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {t("account.loginPromptTitle")}
            </Text>

            {/* Message */}
            <Text className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-6">
              {t("account.loginPromptMessage")}
            </Text>

            {/* Buttons */}
            <View className="gap-3">
              <TouchableOpacity
                className="bg-primary dark:bg-primary py-4 rounded-xl flex-row items-center justify-center"
                onPress={() => router.push("/auth/login")}
              >
                <Text className="text-white font-semibold text-base mr-2">
                  {t("account.signInButton")}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                className="border-2 border-primary dark:border-primary py-4 rounded-xl"
                onPress={() => router.push("/auth/register")}
              >
                <Text className="text-primary dark:text-primary font-semibold text-base text-center">
                  {t("account.createAccountButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}





        <View className='my-2'>
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


        <View className='my-2'>
          <OptionButton
            title={t("account.privacyPolicy")}
            icon={
              <MaterialIcons
                name="privacy-tip"
                size={24}
                color={colors.light.tint}
              />
            }
            type="navigation"
            onPress={() => router.push("/privacy")}

          />

          <OptionButton
            title={t("account.helpSupport")}
            icon={<MaterialIcons name="support-agent" size={24} color={colors.light.tint} />}
            type="navigation"
            onPress={() => router.push("/support")}

          />
        </View>
      </ScrollView>

    </Layout>
  )
}
