// components/NotificationTester.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import usePushNotifications from '@/hooks/usePushNotifications';


export default function NotificationTester() {
  const { expoPushToken, notification } = usePushNotifications();

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚀 Test Notification",
        body: "إذا ظهر هذا الإشعار فالنظام يعمل بنجاح!",
        data: { testData: 'Hello Mohamed 👋' },
      },
      trigger: null, // يرسل فوراً
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Push Notification Test</Text>

      <Text style={styles.label}>Expo Push Token:</Text>
      <Text selectable style={styles.token}>
        {expoPushToken || 'جاري التحميل...'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={sendTestNotification}>
        <Text style={styles.buttonText}>إرسال إشعار تجريبي</Text>
      </TouchableOpacity>

      {notification && (
        <View style={styles.notificationBox}>
          <Text style={styles.label}>آخر إشعار وصل:</Text>
          <Text>العنوان: {notification.request.content.title}</Text>
          <Text>المحتوى: {notification.request.content.body}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  token: {
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: '100%',
  },
});
