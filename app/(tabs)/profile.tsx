import { useRouter } from 'expo-router';
import {
    Briefcase,
    ChevronRight,
    FileText,
    HelpCircle,
    Info,
    LogOut,
    MessageSquare,
    Settings,
    User
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';

const MENU_ITEMS = [
  { 
    id: 'account', 
    title: 'Thông tin tài khoản', 
    icon: User, 
    color: '#0068FF', 
    bg: '#E3F2FD',
    route: '/profile/account' 
  },
  { 
    id: 'workflow', 
    title: 'Quy trình làm việc', 
    icon: Briefcase, 
    color: '#FF6600', 
    bg: '#FFF3E0',
    route: '/profile/workflow' 
  },
  { 
    id: 'feedback', 
    title: 'Góp ý dịch vụ', 
    icon: MessageSquare, 
    color: '#00C853', 
    bg: '#E8F5E9',
    route: '/profile/feedback' 
  },
  { 
    id: 'faq', 
    title: 'Câu hỏi thường gặp', 
    icon: HelpCircle, 
    color: '#FDD835', 
    bg: '#FFFDE7',
    route: '/profile/faq' 
  },
  { 
    id: 'terms', 
    title: 'Điều khoản và dịch vụ', 
    icon: FileText, 
    color: '#78909C', 
    bg: '#ECEFF1',
    route: '/profile/terms' // Placeholder for now
  },
  { 
    id: 'company', 
    title: 'Thông tin công ty', 
    icon: Info, 
    color: '#8E24AA', 
    bg: '#F3E5F5',
    route: '/profile/company' 
  },
  { 
    id: 'settings', 
    title: 'Cài đặt (Giao diện/Ngôn ngữ)', 
    icon: Settings, 
    color: '#546E7A', 
    bg: '#ECEFF1',
    route: '/profile/settings' // Placeholder
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const hanldeSignOut = () => {
    signOut();
    router.replace('/index' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header Profile */}
      <View className="px-5 py-6 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 flex-row items-center transition-colors">
        <View className="w-16 h-16 rounded-full bg-gray-200 dark:bg-slate-800 items-center justify-center mr-4 border border-gray-100 dark:border-gray-700">
          <User size={32} color="#9BA1A6" />
        </View>
        <View className="flex-1">
          <Text className="text-h2 font-bold text-gray-900 dark:text-white">
            {user.isWorker ? 'Khách hàng & Thợ' : 'Khách hàng'}
          </Text>
          <Text className="text-body text-gray-500 dark:text-gray-400">0866904922</Text>
          {user.isWorker && (
            <View className="flex-row items-center mt-1">
              <View className={`w-2 h-2 rounded-full mr-1.5 ${user.isWorkerActive ? 'bg-green-500' : 'bg-gray-400'}`} />
              <Text className="text-xs text-gray-600 dark:text-gray-400">
                {user.isWorkerActive ? 'Đang hoạt động' : 'Không hoạt động'}
              </Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-6">
          {/* Worker Registration CTA - Only shown if user is NOT a worker */}
          {!user.isWorker && (
            <TouchableOpacity 
              className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-400 dark:border-amber-600 p-5 mb-6 shadow-lg shadow-amber-200/50"
              onPress={() => router.push('/worker-auth/register' as any)}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-amber-500 rounded-full items-center justify-center mr-3">
                  <Briefcase size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Trở thành thợ
                  </Text>
                  <Text className="text-sm text-amber-700 dark:text-amber-400 font-semibold">
                    Kiếm thêm thu nhập 💰
                  </Text>
                </View>
                <ChevronRight size={24} color="#F59E0B" />
              </View>
              <Text className="text-sm text-gray-600 dark:text-gray-300 leading-5">
                Đăng ký làm thợ để nhận việc và kiếm thêm thu nhập. Cần xác thực căn cước công dân để đảm bảo uy tín.
              </Text>
            </TouchableOpacity>
          )}

          <View className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6 transition-colors">
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity 
                key={item.id}
                className={`flex-row items-center p-4 active:bg-gray-50 dark:active:bg-slate-800 ${(index !== MENU_ITEMS.length - 1) ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                onPress={() => item.route && router.push(item.route as any)}
              >
                <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: item.bg }}>
                  <item.icon size={20} color={item.color} />
                </View>
                <Text className="flex-1 text-body font-medium text-gray-800 dark:text-gray-200">{item.title}</Text>
                <ChevronRight size={20} color="#CFD8DC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="p-5 mt-4 mb-2">
            <TouchableOpacity 
              className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-900 flex-row items-center justify-center py-4 rounded-xl"
              onPress={() => hanldeSignOut()} // Use signOut
            >
               <LogOut size={20} color="#EF4444" />
               <Text className="text-red-500 font-bold ml-2">Đăng xuất</Text>
            </TouchableOpacity>
            <Text className="text-center text-gray-400 dark:text-gray-500 text-xs mt-4">Phiên bản 1.0.0 (Build 50)</Text>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}
