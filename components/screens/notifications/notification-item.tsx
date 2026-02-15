import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface NotificationItemProps {
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type?: 'info' | 'success' | 'warning' | 'error' | 'promo';
    onPress?: () => void;
}

export default function NotificationItem({
    title,
    message,
    time,
    isRead,
    type = 'info',
    onPress,
}: NotificationItemProps) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const getIcon = () => {
        switch (type) {
            case 'success':
                return { name: 'checkmark-circle' as const, color: '#4CAF50' };
            case 'warning':
                return { name: 'warning' as const, color: '#FFC107' };
            case 'error':
                return { name: 'alert-circle' as const, color: '#F44336' };
            case 'promo':
                return { name: 'pricetag' as const, color: '#fd4a12' }; // Brand color
            default:
                return { name: 'notifications' as const, color: '#2196F3' };
        }
    };

    const iconData = getIcon();

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`mx-4 mb-3 p-4 rounded-xl flex-row items-start ${isRead
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-orange-50 dark:bg-stone-900 border border-orange-100 dark:border-stone-800'
                } shadow-sm`}
        >
            {/* Icon Container */}
            <View className={`p-2 rounded-full mr-3 ${isRead ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
                <Ionicons name={iconData.name} size={24} color={iconData.color} />
            </View>

            {/* Content */}
            <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                    <Text
                        className={`text-base font-bold flex-1 mr-2 ${isDark ? 'text-white' : 'text-gray-900'
                            }`}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text
                        className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                    >
                        {time}
                    </Text>
                </View>

                <Text
                    className={`text-sm leading-5 ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    numberOfLines={2}
                >
                    {message}
                </Text>
            </View>

            {/* Unread Indicator */}
            {!isRead && (
                <View className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500" />
            )}
        </TouchableOpacity>
    );
}
