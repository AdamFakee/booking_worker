import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListFilter, Settings, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const FILTER_TABS = ['All', 'Order', 'Transaction', 'Referral'];

type NotificationType = 'ekyc' | 'system' | 'promo';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: NotificationType;
  read: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Hồ sơ đã được duyệt',
    description: 'Chúc mừng! Hồ sơ thợ của bạn đã được xác minh. Bạn có thể bắt đầu nhận việc ngay bây giờ.',
    date: '25/12/2025',
    type: 'ekyc',
    read: false,
  },
  {
    id: '2',
    title: 'Có đơn việc mới gần bạn',
    description: 'Tìm thấy đơn sửa điện tại Quận 1 (2.5km). Thu nhập ước tính: 300.000đ. Nhấn để xem chi tiết.',
    date: '25/12/2025',
    type: 'system',
    read: false,
  },
  {
    id: '3',
    title: 'Thưởng hiệu suất tháng 12',
    description: 'Bạn đã đạt mốc 50 đơn hàng trong tháng này! Tiền thưởng 500.000đ đã được cộng vào ví.',
    date: '24/12/2025',
    type: 'promo',
    read: true,
  },
];

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'ekyc':
        return <User size={24} color={isDark ? '#FFF' : '#0068FF'} />;
      case 'system':
      case 'promo':
        return <Settings size={24} color={isDark ? '#FFF' : '#0068FF'} />;
      default:
        return <Settings size={24} color={isDark ? '#FFF' : '#0068FF'} />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">Thông báo</Text>
          <TouchableOpacity>
            <ListFilter size={24} color={isDark ? '#FFF' : '#0068FF'} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View className="flex-row mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  className={`px-6 py-2 rounded-full mr-3 ${
                    isActive ? 'bg-blue-700' : 'bg-gray-100 dark:bg-slate-900'
                  }`}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    className={`font-semibold ${
                      isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Date Header */}
        <Text className="text-gray-900 dark:text-white font-bold mb-4">24/12/2025</Text>

        {/* Notification List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {NOTIFICATIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row bg-white dark:bg-slate-900 p-4 rounded-2xl mb-3 shadow-sm items-center"
            >
              <View className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 items-center justify-center mr-4">
                {getIcon(item.type)}
              </View>
              <View className="flex-1 mr-2">
                <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </Text>
                <Text
                  className="text-gray-500 dark:text-gray-400 text-sm leading-5"
                  numberOfLines={3}
                >
                  {item.description}
                </Text>
              </View>
              {!item.read && (
                <View className="w-2.5 h-2.5 rounded-full bg-red-500 self-start mt-2" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
