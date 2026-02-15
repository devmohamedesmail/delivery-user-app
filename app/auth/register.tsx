import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { AuthContext } from '@/context/auth-provider'
import Toast from 'react-native-toast-message'
import { useRouter } from 'expo-router'
import colors from '@/constants/colors'
import Layout from '@/components/ui/layout'
import AuthLayout from '@/components/screens/auth/auth-layout'
import TabButton from '@/components/ui/tab-button'

interface RegisterFormValues {
    name: string
    email: string
    phone: string
    password: string
    role_id: string
}

export default function Register() {
    const { t, i18n } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const [registerMethod, setRegisterMethod] = useState<"email" | "phone">("email")
    const { handle_register } = useContext(AuthContext)
    const router = useRouter()



    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, t('auth.name_min_required'))
            .required(t('auth.name_required')),
        email: registerMethod === "email"
            ? Yup.string()
                .email(t('auth.email_invalid'))
                .required(t('auth.email_required'))
            : Yup.string(),
        phone: registerMethod === "phone"
            ? Yup.string()
                .matches(/^[0-9]{10,15}$/, t('auth.phone_invalid'))
                .required(t('auth.phone_required'))
            : Yup.string(),
        password: Yup.string()
            .min(6, t('auth.password_min'))
            .required(t('auth.password_required')),
    })

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            role_id: '1'
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            try {
                const email = registerMethod === "email" ? values.email : null;
                const phone = registerMethod === "phone" ? values.phone : null;

                const result = await handle_register(values.name, email, phone, values.password, values.role_id);
                if (result.success) {
                    Toast.show({
                        type: 'success',
                        text1: t('auth.registration_success'),
                        text2: t('auth.thankYou'),
                        position: 'top',
                        visibilityTime: 3000,
                    });
                    setTimeout(() => {
                        setIsLoading(false)
                        router.push('/')
                    }, 3000);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: t('auth.registration_failed'),
                        text2: t('auth.pleaseTryAgain'),
                        position: 'top',
                        visibilityTime: 3000,
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: t('auth.registration_failed'),
                    text2: t('auth.pleaseTryAgain'),
                    position: 'top',
                    visibilityTime: 3000,
                });
            } finally {
                setIsLoading(false)
            }
        }
    })

    return (
        <Layout>
            <AuthLayout>
                <View className="flex-1 -mt-4 pt-8 rounded-t-3xl px-6 pb-20" >
                    {/* Registration Method Toggle */}
                    <View className="flex-row mb-4 rounded-xl p-1 bg-white" >
                        
                        <TabButton
                            title={t("auth.email")}
                            value="email"
                            activeValue={registerMethod}
                            onPress={() => setRegisterMethod("email")}
                        />
                      

                        <TabButton
                            title={t("auth.phone")}
                            value="phone"
                            activeValue={registerMethod}
                            onPress={() => setRegisterMethod("phone")}
                        />
                    </View>

                    {/* Name Input */}
                    <Input
                        label={t('auth.name')}
                        placeholder={t('auth.enterName')}
                        type="text"
                        value={formik.values.name}
                        onChangeText={formik.handleChange('name')}
                        error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                    />

                    {/* Email/Phone Input */}
                    {registerMethod === "email" ? (
                        <Input
                            label={t('auth.email')}
                            placeholder={t('auth.enterEmail')}
                            type="email"
                            keyboardType="email-address"
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                        />
                    ) : (
                        <Input
                            label={t('auth.phone')}
                            placeholder={t('auth.enterPhone')}
                            type="phone"
                            keyboardType="phone-pad"
                            value={formik.values.phone}
                            onChangeText={formik.handleChange('phone')}
                            error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                        />
                    )}

                    {/* Password Input */}
                    <Input
                        label={t('auth.password')}
                        placeholder={t('auth.enterPassword')}
                        type="password"
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                    />

                    <Button
                       size='lg'
                        title={isLoading ? t('auth.signingUp') : t('auth.signUp')}
                        onPress={() => formik.handleSubmit()}
                        disabled={
                            isLoading ||
                            !formik.isValid ||
                            !formik.dirty ||
                            (registerMethod === "email" ? !formik.values.email : !formik.values.phone) ||
                            !formik.values.password
                        }
                    />

                    {/* Terms and Sign In Link */}
                    <View className="mb-6 mt-5">
                        <View className="flex-row justify-center items-center">
                            <Text className='text-black dark:text-white mx-2'>{t('auth.alreadyHaveAccount')} </Text>
                            <TouchableOpacity onPress={() => router.push('/auth/login')}>
                                <Text className="font-bold text-primary">{t('auth.signIn')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </AuthLayout>
        </Layout>
    )
}
