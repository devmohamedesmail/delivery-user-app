import colors from '@/constants/colors'
import { useAuth } from '@/hooks/useAuth'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import OptionButton from './option-button'
import Input from '@/components/ui/input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { config } from '@/constants/config'
import Toast from 'react-native-toast-message'

export default function LogoutSection() {
    const { t } = useTranslation()
    const router = useRouter()
    const { logout,auth } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    
    console.log(auth?.token)


    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required(t('account.password_required')),
        }),
        onSubmit: async (values) => {
            try {
                console.log(values.password)
                const response = await axios.post(`${config.URL}/auth/delete-account`, values , {
                
                    headers: {
                        'Authorization':`Bearer ${auth?.token}`,
                    }
                })
                Toast.show({
                    type: 'success',
                    text1: t('account.delete_account_success'),
                })
                await logout()
                router.replace('/auth/login')
            } catch (error) {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: t('account.delete_account_error'),
                })
            }
        },
    })

    const handleLogoutPress = () => {
        setIsModalVisible(true)
    }

    const handleConfirmLogout = async () => {
        setIsModalVisible(false)
       await logout()
        router.replace('/auth/login')
    }

    const handleCancelLogout = () => {
        setIsModalVisible(false)
    }

    const handleDeletePress = () => {
        setIsDeleteModalVisible(true)
    }

  

    return (
        <View className="my-2">
            <Pressable
                onPress={handleLogoutPress}

                className='bg-red-600 dark:bg-red-700 mx-4 mb-2 p-4 rounded-xl flex-row-reverse items-center justify-between'>
                <View>
                    <Text className='text-white font-semibold text-base'>{t("account.logout")}</Text>
                </View>
                <View>
                    <Ionicons name="log-out-outline" size={24} color="#ffffff" />
                </View>
            </Pressable>


            <Pressable
                onPress={handleDeletePress}

                className='bg-red-800 dark:bg-red-900 mx-4 mb-2 p-4 rounded-xl flex-row-reverse items-center justify-between'>
                <View>
                    <Text className='text-white font-semibold text-base'>{t("account.logout")}</Text>
                </View>
                <View>
                    <Ionicons name="trash" size={24} color="#ffffff" />
                </View>
            </Pressable>


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


            {/* Delete Confirmation Modal */}
            <Modal
                isVisible={isDeleteModalVisible}
                onBackdropPress={() => setIsDeleteModalVisible(false)}
                onBackButtonPress={() => setIsDeleteModalVisible(false)}
                animationIn="zoomIn"
                animationOut="zoomOut"
                backdropOpacity={0.5}
                useNativeDriver
            >
                <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 mx-4">
                    {/* Icon */}
                    <View className="items-center mb-4">
                        <View className="bg-red-100 dark:bg-red-900/30 rounded-full p-4">
                            <Ionicons name="trash" size={48} color="#ef4444" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        {t('account.delete_confirm_title')}
                    </Text>

                    {/* Message */}
                    <Text className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-6">
                        {t('account.delete_confirm_message') || 'هل أنت متأكد أنك تريد حذف حسابك؟'}
                    </Text>


                    <View>
                        <Input 
                        label={t('auth.password')}
                        type="password"
                        placeholder={t('auth.password')}
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        />
                    </View>

                    {/* Buttons */}
                    <View className="gap-3">
                        {/* Confirm Button */}
                        <TouchableOpacity
                            disabled={formik.isSubmitting}
                            className="bg-red-500 py-4 rounded-xl flex-row items-center justify-center"
                            onPress={() => formik.handleSubmit()}
                        >
                            <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                            <Text className="text-white font-semibold text-base ml-2">
                                {t('account.delete_confirm') || 'حذف'}
                            </Text>
                        </TouchableOpacity>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            className="border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl"
                            onPress={() => setIsDeleteModalVisible(false)}
                        >
                            <Text className="text-gray-700 dark:text-gray-300 font-semibold text-base text-center">
                                {t('account.delete_cancel') || 'إلغاء'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
