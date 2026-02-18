import NotificationItem from '@/components/screens/notifications/notification-item';
import Header from '@/components/ui/header';
import { config } from '@/constants/config';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, Text, View } from 'react-native';

interface NotificationData {
  type: string;
  priority?: string;
  [key: string]: any;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  data: NotificationData;
  is_read: boolean;
  delivered_at: string | null;
  createdAt: string;
  updatedAt: string;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 172800) return 'Yesterday';
  return date.toLocaleDateString();
};

const getNotificationType = (type: string): 'info' | 'success' | 'warning' | 'error' | 'promo' => {
  switch (type?.toLowerCase()) {
    case 'maintenance':
    case 'warning':
      return 'warning';
    case 'success':
    case 'order_delivered':
      return 'success';
    case 'error':
    case 'canceled':
      return 'error';
    case 'promo':
    case 'offer':
      return 'promo';
    default:
      return 'info';
  }
};

export default function Notifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colorScheme } = useColorScheme();


  const fetch_notifications = async () => {
    try {
      const response = await axios.get(`${config.URL}/notifications?target_type=all`);
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetch_notifications();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch_notifications();
  }, []);

  const handlePress = (item: Notification) => {
    // Navigate or show details
    console.log('Notification pressed:', item.id);
    // Here we could also call an API to mark as read
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationItem
      title={item.title}
      message={item.message}
      time={formatTime(item.createdAt)}
      isRead={item.is_read}
      type={getNotificationType(item.data?.type)}
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

      {!loading && notifications.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}