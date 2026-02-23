import Modal from '@/components/ui/modal'
import { config } from '@/constants/config'
import { useAuth } from '@/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup'

export default function AddReview({ storeItem }: any) {
    const { t, i18n } = useTranslation();
    const [isModalReviewVisible, setModalReviewVisible] = useState(false);
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const isRTL = i18n.language === 'ar';
    const { auth } = useAuth();
    const router = useRouter()

    const reviewSchema = Yup.object().shape({
        rating: Yup.number()
            .min(1, t('reviews.pleaseSelectRating'))
            .max(5, t('reviews.ratingMustBeBetween'))
            .required(t('reviews.ratingIsRequired')),
        comment: Yup.string()
            .min(10, t('reviews.reviewMustBeAtLeast'))
            .max(500, t('reviews.reviewMustBeLessThan'))
            .required(t('reviews.reviewIsRequired')),
    });



    const formik = useFormik({
        initialValues: {
            rating: 0,
            comment: '',
            store_id: storeItem.id,
            user_id: auth.user?.id,
        },
        validationSchema: reviewSchema,
        onSubmit: async (values, { resetForm }) => {
            setSubmitting(true);
            try {
                const response = await axios.post(`${config.URL}/reviews/create`, values);
                setModalReviewVisible(false);
                resetForm();
                setSuccessModalVisible(true);
            } catch (error: any) {
                setModalReviewVisible(false);
                setErrorModalVisible(true);
            } finally {
                setSubmitting(false);
            }
        },
    });




    const getRatingText = (rating: number) => {
        switch (rating) {
            case 5: return t('reviews.excellent');
            case 4: return t('reviews.veryGood');
            case 3: return t('reviews.good');
            case 2: return t('reviews.fair');
            case 1: return t('reviews.poor');
            default: return '';
        }
    };
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    if (!auth) {
                        setAuthModalVisible(true)
                    } else {
                        setModalReviewVisible(true)
                    }
                }}
                className="absolute bottom-16 right-6 shadow-lg"
                style={{ elevation: 5 }}
            >
                <LinearGradient
                    colors={['#fd4a12', '#ff6b3d']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-row items-center px-6 py-4 rounded-full"
                >
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                    <Text className="text-white font-bold text-base ml-2">
                        {t('reviews.addReview')}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Add Review Modal */}

            <Modal visible={isModalReviewVisible} onClose={() => {
                setModalReviewVisible(false);
                formik.resetForm();
            }}>
                <View className="pb-8">
                    <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {t('reviews.writeReview')}
                    </Text>

                    {/* Star Rating */}
                    <View className="mb-6">
                        <Text className="text-base font-semibold text-gray-700 mb-3" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                            {t('reviews.yourRating')}
                        </Text>
                        <View className="flex-row justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => formik.setFieldValue('rating', star)}
                                    className="mx-2"
                                >
                                    <Ionicons
                                        name={star <= formik.values.rating ? 'star' : 'star-outline'}
                                        size={40}
                                        color={star <= formik.values.rating ? '#FFA500' : '#D1D5DB'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        {formik.values.rating > 0 && (
                            <Text className="text-center text-orange-600 font-semibold mt-2">
                                {getRatingText(formik.values.rating)}
                            </Text>
                        )}
                        {formik.touched.rating && formik.errors.rating && (
                            <Text className="text-center text-red-500 text-sm mt-2">
                                {formik.errors.rating}
                            </Text>
                        )}
                    </View>

                    {/* Review Text */}
                    <View className="mb-6">
                        <Text className="text-base font-semibold text-gray-700 mb-3" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                            {t('reviews.yourReview')}
                        </Text>
                        <TextInput
                            className="bg-gray-50 rounded-xl p-4 text-gray-900 min-h-[120px]"
                            placeholder={t('reviews.writeYourReview')}
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            value={formik.values.comment}
                            onChangeText={formik.handleChange('comment')}
                            onBlur={formik.handleBlur('comment')}
                            style={{ textAlign: isRTL ? 'right' : 'left' }}
                        />
                        {formik.touched.comment && formik.errors.comment && (
                            <Text className="text-red-500 text-sm mt-2" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                                {formik.errors.comment}
                            </Text>
                        )}
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row items-center space-x-3 gap-2">
                        <TouchableOpacity
                            onPress={() => {
                                setModalReviewVisible(false);
                                formik.resetForm();
                            }}
                            className="w-1/2 py-4 bg-gray-200 rounded-xl  "
                            disabled={submitting}
                        >
                            <Text className="text-gray-700 font-bold text-center text-base">
                                {t('reviews.cancelReview')}
                            </Text>
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => formik.handleSubmit()}
                            className="w-1/2 rounded-xl py-4 overflow-hidden ml-2"
                            disabled={submitting}
                        >
                            <LinearGradient
                                colors={['#fd4a12', '#ff6b3d']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="py-4"
                            >
                                <Text className="text-white font-bold text-center text-base">
                                    {submitting ? t('reviews.submitting') : t('reviews.submitReview')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>





            {/* Login Required Modal - Improved Design */}
            <Modal
                visible={authModalVisible}
                onClose={() => setAuthModalVisible(false)}
            >
                <View className='bg-white rounded-3xl p-8 mx-4'>
                    {/* Icon */}
                    <View className="items-center mb-6">
                        <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center mb-4">
                            <Ionicons name="person-circle-outline" size={48} color="#fd4a12" />
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                            {t('reviews.loginToReview')}
                        </Text>
                        <Text className="text-gray-600 text-center text-base leading-6">
                            {t('reviews.loginToReviewMessage')}
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View className="space-y-3">
                        <TouchableOpacity
                            onPress={() => {
                                setAuthModalVisible(false);
                                router.push('/auth/login');
                            }}
                            className="rounded-xl overflow-hidden mb-3"
                        >
                            <LinearGradient
                                colors={['#fd4a12', '#ff6b3d']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="py-4"
                            >
                                <Text className="text-white font-bold text-center text-base">
                                    {t('common.login')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setAuthModalVisible(false)}
                            className="bg-gray-100 rounded-xl py-4"
                        >
                            <Text className="text-gray-700 font-bold text-center text-base">
                                {t('common.close')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal
                visible={successModalVisible}
                onClose={() => setSuccessModalVisible(false)}
            >
                <View className='bg-white rounded-3xl p-8 mx-4'>
                    {/* Success Animation */}
                    <View className="items-center mb-6">
                        <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-5">
                            <Ionicons name="checkmark-circle" size={60} color="#10b981" />
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
                            {t('reviews.successTitle')}
                        </Text>
                        <Text className="text-gray-600 text-center text-base leading-6">
                            {t('reviews.successMessage')}
                        </Text>
                    </View>

                    {/* Stars Display */}
                    <View className="flex-row justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                                key={star}
                                name="star"
                                size={28}
                                color="#FFA500"
                                style={{ marginHorizontal: 3 }}
                            />
                        ))}
                    </View>

                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={() => setSuccessModalVisible(false)}
                        className="rounded-xl overflow-hidden"
                    >
                        <LinearGradient
                            colors={['#10b981', '#059669']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="py-4"
                        >
                            <Text className="text-white font-bold text-center text-base">
                                {t('common.ok')}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Error Modal */}
            <Modal
                visible={errorModalVisible}
                onClose={() => setErrorModalVisible(false)}
            >
                <View className='bg-white rounded-3xl p-8 mx-4'>
                    {/* Error Icon */}
                    <View className="items-center mb-6">
                        <View className="w-24 h-24 rounded-full bg-red-100 items-center justify-center mb-5">
                            <Ionicons name="close-circle" size={60} color="#ef4444" />
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
                            {t('reviews.errorTitle')}
                        </Text>
                        <Text className="text-gray-600 text-center text-base leading-6">
                            {t('reviews.errorMessage')}
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View className="space-y-3">
                        <TouchableOpacity
                            onPress={() => {
                                setErrorModalVisible(false);
                                setModalReviewVisible(true);
                            }}
                            className="rounded-xl overflow-hidden mb-3"
                        >
                            <LinearGradient
                                colors={['#fd4a12', '#ff6b3d']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="py-4"
                            >
                                <Text className="text-white font-bold text-center text-base">
                                    {t('common.retry')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setErrorModalVisible(false)}
                            className="bg-gray-100 rounded-xl py-4"
                        >
                            <Text className="text-gray-700 font-bold text-center text-base">
                                {t('common.close')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </>
    )
}
