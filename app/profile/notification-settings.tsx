import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Grid, MessageSquare, Settings as SettingsIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationTab = 'all' | 'system' | 'message' | 'other';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: NotificationTab;
}

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    // System notifications
    { id: 'job_request', title: 'Yêu cầu công việc mới', description: 'Thông báo khi có khách hàng gửi yêu cầu', enabled: true, category: 'system' },
    { id: 'job_accepted', title: 'Công việc được chấp nhận', description: 'Khi thợ chấp nhận công việc của bạn', enabled: true, category: 'system' },
    { id: 'job_completed', title: 'Hoàn thành công việc', description: 'Khi công việc được đánh dấu hoàn thành', enabled: true, category: 'system' },
    { id: 'payment', title: 'Thanh toán', description: 'Thông báo về giao dịch thanh toán', enabled: true, category: 'system' },
    { id: 'review', title: 'Đánh giá mới', description: 'Khi có người đánh giá bạn', enabled: true, category: 'system' },
    
    // Message notifications
    { id: 'new_message', title: 'Tin nhắn mới', description: 'Khi có tin nhắn mới từ khách hàng/thợ', enabled: true, category: 'message' },
    { id: 'message_reply', title: 'Phản hồi tin nhắn', description: 'Khi có người trả lời tin nhắn của bạn', enabled: true, category: 'message' },
    
    // Other notifications
    { id: 'promotion', title: 'Khuyến mãi & Ưu đãi', description: 'Thông báo về chương trình khuyến mãi', enabled: false, category: 'other' },
    { id: 'news', title: 'Tin tức & Cập nhật', description: 'Tin tức mới từ ứng dụng', enabled: false, category: 'other' },
    { id: 'tips', title: 'Mẹo & Hướng dẫn', description: 'Mẹo sử dụng ứng dụng hiệu quả', enabled: false, category: 'other' },
  ]);

  const tabs: { id: NotificationTab; label: string; icon: any }[] = [
    { id: 'all', label: 'Tất cả', icon: Grid },
    { id: 'system', label: 'Hệ thống', icon: Bell },
    { id: 'message', label: 'Tin nhắn', icon: MessageSquare },
    { id: 'other', label: 'Khác', icon: SettingsIcon },
  ];

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const filteredSettings = activeTab === 'all' 
    ? settings 
    : settings.filter(s => s.category === activeTab);

  const enabledCount = filteredSettings.filter(s => s.enabled).length;

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800"
        >
          <ArrowLeft size={24} color="#0068FF" />
        </TouchableOpacity>
        <View className="flex-1 ml-3">
          <Text className="text-h2 font-bold text-gray-900 dark:text-white">Cài đặt thông báo</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {enabledCount}/{filteredSettings.length} đang bật
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 py-3"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${
                  isActive 
                    ? 'bg-primary' 
                    : 'bg-gray-100 dark:bg-slate-800'
                }`}
              >
                <Icon 
                  size={16} 
                  color={isActive ? '#FFFFFF' : '#9BA1A6'} 
                />
                <Text className={`ml-2 font-semibold text-sm ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Settings List */}
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {filteredSettings.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 dark:text-gray-500">Không có cài đặt nào</Text>
          </View>
        ) : (
          <View className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-6">
            {filteredSettings.map((setting, index) => (
              <View 
                key={setting.id}
                className={`flex-row items-center p-4 ${
                  index !== filteredSettings.length - 1 
                    ? 'border-b border-gray-100 dark:border-gray-800' 
                    : ''
                }`}
              >
                <View className="flex-1 mr-3">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {setting.title}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5">
                    {setting.description}
                  </Text>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggleSetting(setting.id)}
                  trackColor={{ false: '#D1D5DB', true: '#0068FF' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#D1D5DB"
                />
              </View>
            ))}
          </View>
        )}

        {/* Info Note */}
        <View className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 mb-6">
          <Text className="text-sm text-blue-900 dark:text-blue-200 leading-6">
            💡 <Text className="font-semibold">Lưu ý:</Text> Một số thông báo quan trọng như thanh toán và bảo mật sẽ luôn được gửi để đảm bảo an toàn cho tài khoản của bạn.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
