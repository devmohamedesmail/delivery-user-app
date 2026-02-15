import NotificationItem from '@/components/screens/notifications/notification-item';
import Header from '@/components/ui/header';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';

// Dummy data for visual verification
const DUMMY_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Order Delivered',
    message: 'Your order #12345 has been successfully delivered. Enjoy your meal!',
    time: '2 mins ago',
    isRead: false,
    type: 'success' as const,
  },
  {
    id: '2',
    title: '50% Off Promo',
    message: 'Get 50% off your next order with code WELCOME50. Valid until tomorrow.',
    time: '1 hour ago',
    isRead: false,
    type: 'promo' as const,
  },
  {
    id: '3',
    title: 'Ride Canceled',
    message: 'Your ride request has been canceled by the driver. We apologize for the inconvenience.',
    time: 'Yesterday',
    isRead: true,
    type: 'error' as const,
  },
  {
    id: '4',
    title: 'System Update',
    message: 'We will be performing maintenance tonight from 2 AM to 4 AM.',
    time: '2 days ago',
    isRead: true,
    type: 'info' as const,
  },
];

export default function Notifications() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const router = useRouter();


  const handlePress = (item: any) => {
    // Navigate or show details
    console.log('Notification pressed:', item.id);
  };

  // Set to true to test empty state
  const notifications = DUMMY_NOTIFICATIONS;

  const renderItem = ({ item }: { item: typeof DUMMY_NOTIFICATIONS[0] }) => (
    <NotificationItem
      title={item.title}
      message={item.message}
      time={item.time}
      isRead={item.isRead}
      type={item.type}
      onPress={() => handlePress(item)}
    />
  );

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-6 -mt-20">
      <View className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
        <Ionicons
          name="notifications-off-outline"
          size={48}
          color={colorScheme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
        />
      </View>
      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        {t('notifications.noNotifications')}
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center leading-6">
        {t('notifications.noNotificationsMessage')}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-black">
      <Header title={t('notifications.title')} />

      {notifications.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}