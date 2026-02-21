import NotificationItem from '@/components/screens/notifications/notification-item';
import Header from '@/components/ui/header';
import { config } from '@/constants/config';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { io, Socket } from "socket.io-client";
import * as Notifications from 'expo-notifications';
import EmptyState from '@/components/screens/notifications/empty-state';
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




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



export default function NotificationsScreen() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { colorScheme } = useColorScheme();
  const socketRef = useRef<Socket | null>(null);

  const socket = io(`${config.URL}`);


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


    socketRef.current = io(config.BASE_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      
    });

    socketRef.current.on("new_notification", async (notification: Notification) => {
    

      await Notifications.scheduleNotificationAsync({
          content: {
            title: t(notification.title),
            body: t(notification.message,),
            sound: 'default',
            data: { type: 'new_notification', order: notification },
          },
          trigger: null, 
        });
    
      setNotifications((prev) => [notification, ...prev]);
    });

    // Cleanup
    return () => {
      socketRef.current?.disconnect();
    };
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