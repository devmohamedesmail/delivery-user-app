import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

export default function SocialSection() {
    const { t, i18n } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const SocialButton = ({
        icon,
        label,
        onPress,
        color,
        iconColor
    }: {
        icon: any,
        label: string,
        onPress: () => void,
        color: string,
        iconColor?: string
    }) => (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center justify-center py-3.5 px-4 rounded-xl mb-3 border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                } shadow-sm`}
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
            }}
        >
            <View className="mr-3">
                {icon}
            </View>
            <Text
                className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View className="mt-6 mb-8 w-full">
            <View className="flex-row items-center mb-6">
                <View className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <Text className={`mx-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('auth.orContinueWith')}
                </Text>
                <View className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </View>

            <SocialButton
                icon={<FontAwesome name="google" size={20} color="#DB4437" />}
                label={t('auth.continueWithGoogle')}
                onPress={toggleModal}
                color="#fff"
            />

            <SocialButton
                icon={<FontAwesome name="facebook" size={20} color="#4267B2" />}
                label={t('auth.continueWithFacebook')}
                onPress={toggleModal}
                color="#fff"
            />

            {/* Coming Soon Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                animationIn="zoomIn"
                animationOut="zoomOut"
                backdropOpacity={0.5}
                useNativeDriver
            >
                <View className={`p-6 rounded-2xl items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                    <View className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 items-center justify-center mb-4">
                        <Ionicons name="rocket-outline" size={32} color="#fd4a12" />
                    </View>

                    <Text className={`text-xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('auth.featureComingSoon')}
                    </Text>

                    <Text className={`text-base text-center mb-6 leading-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('auth.featureComingSoonDesc')}
                    </Text>

                    <TouchableOpacity
                        onPress={toggleModal}
                        className="w-full py-3.5 bg-primary rounded-xl items-center"
                    >
                        <Text className="text-white font-bold text-base">
                            {t('auth.ok')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
