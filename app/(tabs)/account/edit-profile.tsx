import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import Input from '@/components/ui/input'
import Layout from '@/components/ui/layout'
import Loading from '@/components/ui/loading'
import { useEditProfileLogic } from '@/hooks/auth/useUpdateProfile'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'

export default function EditProfile() {
    const {
        t,
        formik,
        pickImage,
        avatar,
        isFetchingProfile,
        updateProfileMutation
    } = useEditProfileLogic();

    return (
        <Layout>
            <Header title={t('account.edit_profile')} />
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {isFetchingProfile ? (
                    <Loading />
                ) : (
                    <ScrollView className="flex-1 px-5 py-6">
                        {/* Avatar Section */}
                        <View className="items-center mb-8">
                            <TouchableOpacity
                                onPress={pickImage}
                                activeOpacity={0.8}
                                className="relative"
                            >
                                <View className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 items-center justify-center overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                                    {avatar ? (
                                        <Image
                                            source={{ uri: avatar }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <Ionicons name="person" size={60} color="#9CA3AF" />
                                    )}
                                </View>

                                {/* Edit Icon Badge */}
                                <View className="absolute bottom-0 right-0 bg-primary w-10 h-10 rounded-full items-center justify-center border-4 border-white dark:border-gray-900">
                                    <Ionicons name="camera" size={20} color="white" />
                                </View>
                            </TouchableOpacity>

                            <Text className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                {t('account.tapToChangeAvatar')}
                            </Text>
                        </View>

                        {/* Form Section */}
                        <View className="space-y-4">
                            {/* Name Input */}
                            <Input
                                label={t('auth.name', 'Name')}
                                placeholder={t('auth.enterName', 'Enter your name')}
                                value={formik.values.name}
                                onChangeText={formik.handleChange('name')}
                                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                            />

                            {/* Email Input */}
                            <View className="mt-4">
                                <Input
                                    label={t('auth.email', 'Email')}
                                    placeholder={t('auth.enterEmail', 'Enter your email')}
                                    value={formik.values.email}
                                    onChangeText={formik.handleChange('email')}
                                    keyboardType="email-address"
                                    error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                                />
                            </View>

                            {/* Phone Input */}
                            <View className="mt-4">
                                <Input
                                    label={t('auth.phone', 'Phone')}
                                    placeholder={t('auth.enterPhone', 'Enter your phone number')}
                                    value={formik.values.phone}
                                    onChangeText={formik.handleChange('phone')}
                                    keyboardType="phone-pad"
                                    error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                                />
                            </View>
                        </View>

                        {/* Update Button */}
                        <View className="mt-8 mb-10">
                            <Button
                                title={updateProfileMutation.isPending ? t('common.updating') : t('account.update_profile')}
                                onPress={() => formik.handleSubmit()}
                                loading={updateProfileMutation.isPending}
                                size="lg"
                                disabled={updateProfileMutation.isPending || !formik.isValid}
                            />
                        </View>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </Layout>
    );
}
