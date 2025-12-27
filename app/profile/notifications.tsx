import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, DollarSign, Settings, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationTab = 'all' | 'order' | 'transaction' | 'other';

interface Notification {
  id: string;
  type: NotificationTab;
  title: string;
  message: string;
  date: string;
  read: boolean;
  icon: any;
}

// Mock notifications data grouped by date
const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Hồ sơ đã được duyệt',
    message: 'Chúc mừng! Hồ sơ thợ của bạn đã được xác minh. Bạn có thể bắt đầu nhận việc ngay bây giờ.',
    date: '24/12/2025',
    read: false,
    icon: User,
  },
  {
    id: '2',
    type: 'order',
    title: 'Có đơn việc mới gần bạn',
    message: 'Tìm thấy đơn sửa điện tại Quận 1 (2.5km). Thu nhập ước tính: 300.000đ. Nhấn để xem chi tiết.',
    date: '24/12/2025',
    read: false,
    icon: Settings,
  },
  {
    id: '3',
    type: 'transaction',
    title: 'Thưởng hiệu suất tháng 12',
    message: 'Bạn đã đạt mốc 50 đơn hàng trong tháng này! Tiền thưởng 500.000đ đã được cộng vào ví.',
    date: '24/12/2025',
    read: true,
    icon: DollarSign,
  },
  {
    id: '4',
    type: 'other',
    title: 'Cập nhật ứng dụng',
    message: 'Phiên bản mới 2.0.0 đã có sẵn. Cập nhật ngay để trải nghiệm tính năng mới.',
    date: '23/12/2025',
    read: true,
    icon: Bell,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');

  const tabs: { id: NotificationTab; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'order', label: 'Đơn hàng' },
    { id: 'transaction', label: 'Giao dịch' },
    { id: 'other', label: 'Khác' },
  ];

  const filteredNotifications = activeTab === 'all' 
    ? NOTIFICATIONS 
    : NOTIFICATIONS.filter(n => n.type === activeTab);

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0a0e27]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 items-center justify-center mr-3"
          >
            <ArrowLeft size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">Thông báo</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-5 mb-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full ${
                  isActive 
                    ? 'bg-blue-600' 
                    : 'bg-gray-100 dark:bg-[#1a1f3a]'
                }`}
              >
                <Text className={`font-medium text-sm ${
                  isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {Object.keys(groupedNotifications).length === 0 ? (
          // Empty state
          <View className="items-center justify-center py-20 px-6">
            <View className="w-20 h-20 bg-gray-100 dark:bg-[#1a1f3a] rounded-full items-center justify-center mb-4">
              <Bell size={40} color={isDark ? '#9BA1A6' : '#6B7280'} />
            </View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Chưa có thông báo
            </Text>
            <Text className="text-center text-gray-500 dark:text-gray-400 leading-6">
              Bạn sẽ nhận được thông báo về đơn hàng, giao dịch và các hoạt động khác tại đây
            </Text>
          </View>
        ) : (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <View key={date} className="mb-6">
              {/* Date Header */}
              <Text className="text-gray-900 dark:text-white font-semibold mb-3">{date}</Text>

              {/* Notifications for this date */}
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <TouchableOpacity
                    key={notification.id}
                    className="bg-gray-50 dark:bg-[#1a1f3a] rounded-2xl p-4 mb-3 flex-row"
                    activeOpacity={0.7}
                  >
                    {/* Icon */}
                    <View className="w-12 h-12 bg-gray-200 dark:bg-[#2a2f4a] rounded-full items-center justify-center mr-3">
                      <Icon size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-2">
                        <Text className="flex-1 text-gray-900 dark:text-white font-semibold text-base">
                          {notification.title}
                        </Text>
                        {!notification.read && (
                          <View className="w-2 h-2 bg-red-500 rounded-full ml-2 mt-1" />
                        )}
                      </View>
                      <Text className="text-gray-600 dark:text-gray-400 text-sm leading-5">
                        {notification.message}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}

        {/* Bottom padding */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
