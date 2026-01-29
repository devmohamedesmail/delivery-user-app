import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Layout from '@/components/ui/layout'
import Header from '@/components/ui/header'

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const isRTL = i18n.language === 'ar'

  const sections = [
    {
      icon: 'information-circle-outline',
      title: t('privacy.introduction'),
      content: t('privacy.introText'),
      color: '#3b82f6'
    },
    {
      icon: 'document-text-outline',
      title: t('privacy.infoCollect'),
      content: t('privacy.infoCollectText'),
      color: '#8b5cf6'
    },
    {
      icon: 'settings-outline',
      title: t('privacy.howWeUse'),
      content: t('privacy.howWeUseText'),
      color: '#10b981'
    },
    {
      icon: 'share-social-outline',
      title: t('privacy.dataSharing'),
      content: t('privacy.dataSharingText'),
      color: '#f59e0b'
    },
    {
      icon: 'shield-checkmark-outline',
      title: t('privacy.dataSecurity'),
      content: t('privacy.dataSecurityText'),
      color: '#ef4444'
    },
    {
      icon: 'person-outline',
      title: t('privacy.yourRights'),
      content: t('privacy.yourRightsText'),
      color: '#06b6d4'
    },
    {
      icon: 'analytics-outline',
      title: t('privacy.cookies'),
      content: t('privacy.cookiesText'),
      color: '#ec4899'
    },
    {
      icon: 'shield-outline',
      title: t('privacy.childrenPrivacy'),
      content: t('privacy.childrenPrivacyText'),
      color: '#6366f1'
    },
    {
      icon: 'refresh-outline',
      title: t('privacy.changes'),
      content: t('privacy.changesText'),
      color: '#14b8a6'
    },
    {
      icon: 'mail-outline',
      title: t('privacy.contact'),
      content: t('privacy.contactText'),
      color: '#f97316'
    }
  ]

  return (
    <Layout>
      {/* Header */}
      
      <Header title={t('privacy.title')} />

      {/* Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {sections.map((section, index) => (
          <View
            key={index}
            className="bg-white mx-4 mt-4 rounded-2xl p-5 shadow-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}
          >
            {/* Section Header */}
            <View className="flex-row items-center mb-3">
              <View
                className="p-3 rounded-full mr-3"
                style={{ backgroundColor: `${section.color}15` }}
              >
                <Ionicons
                  name={section.icon as any}
                  size={24}
                  color={section.color}
                />
              </View>
              <Text
                className={`text-lg font-bold text-gray-900 flex-1 ${isRTL ? 'arabic-font text-right' : ''}`}
              >
                {section.title}
              </Text>
            </View>

            {/* Section Content */}
            <Text
              className={`text-gray-600 leading-6 ${isRTL ? 'arabic-font text-right' : ''}`}
            >
              {section.content}
            </Text>

            {/* Contact Details for Contact Section */}
            {section.title === t('privacy.contact') && (
              <View className="mt-4 space-y-3">
                <View className="flex-row items-center bg-gray-50 p-3 rounded-xl">
                  <Ionicons name="mail" size={20} color="#6b7280" />
                  <Text
                    className={`text-gray-700 ml-3 ${isRTL ? 'arabic-font' : ''}`}
                  >
                    {t('privacy.email')}
                  </Text>
                </View>
                <View className="flex-row items-center bg-gray-50 p-3 rounded-xl">
                  <Ionicons name="call" size={20} color="#6b7280" />
                  <Text
                    className={`text-gray-700 ml-3 ${isRTL ? 'arabic-font' : ''}`}
                  >
                    {t('privacy.phone')}
                  </Text>
                </View>
                <View className="flex-row items-center bg-gray-50 p-3 rounded-xl">
                  <Ionicons name="location" size={20} color="#6b7280" />
                  <Text
                    className={`text-gray-700 ml-3 ${isRTL ? 'arabic-font' : ''}`}
                  >
                    {t('privacy.address')}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Bottom Notice */}
        <View className="mx-4 mt-6 mb-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={24} color="#3b82f6" />
            <Text
              className={`flex-1 text-blue-800 ml-3 ${isRTL ? 'arabic-font text-right' : ''}`}
            >
              By using our app, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </Text>
          </View>
        </View>
      </ScrollView>


    </Layout>
  )
}
