import React from 'react'
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
export default function NoWifi({ isConnected }: { isConnected: boolean }) {
    const { t } = useTranslation();
    return (
        <Modal
            isVisible={!isConnected}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.7}
            useNativeDriver={true}
        >
            <View className="items-center justify-center px-5">
                <View className="bg-white dark:bg-gray-800 rounded-3xl p-8 items-center shadow-2xl max-w-sm w-full">
                    {/* WiFi Icon with Slash */}
                    <View className="relative mb-6">
                        <Ionicons name="wifi-outline" size={70} color="#EF4444" />
                        <View className="absolute w-20 h-1 bg-red-500 rotate-45 top-8 -left-1" />
                    </View>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                        {t('network.title')}
                    </Text>

                    {/* Message */}
                    <Text className="text-base text-gray-600 dark:text-gray-300 text-center leading-6">
                        {t('network.message')}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}
