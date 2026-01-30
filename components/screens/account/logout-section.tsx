import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import OptionButton from './option-button'

export default function LogoutSection() {
    const { t } = useTranslation()
    const router = useRouter()
    const { logout } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleLogoutPress = () => {
        setIsModalVisible(true)
    }

    const handleConfirmLogout = () => {
        setIsModalVisible(false)
        logout()
        router.replace('/auth/login')
    }

    const handleCancelLogout = () => {
        setIsModalVisible(false)
    }

    return (
        <View className="my-2">
            <OptionButton
                title={t("account.logout")}
                icon={
                    <MaterialIcons
                        name="logout"
                        size={24}
                        color={colors.light.tint}
                    />
                }
                type="navigation"
                onPress={handleLogoutPress}
            />

            {/* Logout Confirmation Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={handleCancelLogout}
                onBackButtonPress={handleCancelLogout}
                animationIn="zoomIn"
                animationOut="zoomOut"
                backdropOpacity={0.5}
                useNativeDriver
            >
                <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 mx-4">
                    {/* Icon */}
                    <View className="items-center mb-4">
                        <View className="bg-red-100 dark:bg-red-900/30 rounded-full p-4">
                            <Ionicons name="log-out-outline" size={48} color="#ef4444" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        {t('account.logout_confirm_title')}
                    </Text>

                    {/* Message */}
                    <Text className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-6">
                        {t('account.logout_confirm_message') || 'هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟'}
                    </Text>

                    {/* Buttons */}
                    <View className="gap-3">
                        {/* Confirm Button */}
                        <TouchableOpacity
                            className="bg-red-500 py-4 rounded-xl flex-row items-center justify-center"
                            onPress={handleConfirmLogout}
                        >
                            <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                            <Text className="text-white font-semibold text-base ml-2">
                                {t('account.logout_confirm') || 'تسجيل الخروج'}
                            </Text>
                        </TouchableOpacity>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            className="border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl"
                            onPress={handleCancelLogout}
                        >
                            <Text className="text-gray-700 dark:text-gray-300 font-semibold text-base text-center">
                                {t('account.logout_cancel') || 'إلغاء'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
