import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Hammer, User } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { user, isLoading, signIn } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    
    // If user is already logged in, redirect to main app
    if (user.isLoggedIn) {
      router.replace('/(tabs)');
    }
  }, [user.isLoggedIn, isLoading, router]);

  const handleCustomerLogin = () => {
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-950">
        <ActivityIndicator size="large" color="#F59E0B" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 px-6 justify-center">
      <View className="items-center mb-12">
        <View className="w-20 h-20 bg-amber-400 rounded-3xl items-center justify-center mb-6 shadow-lg shadow-amber-200">
           <Hammer size={40} color="white" />
        </View>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Chào mừng đến với Thợ Việt
        </Text>
        <Text className="text-body text-gray-500 dark:text-gray-400 text-center px-4">
          Giải pháp tìm thợ uy tín - nhanh chóng - chất lượng hàng đầu Việt Nam
        </Text>
      </View>

      <Text className="text-lg font-bold text-gray-800 dark:text-white mb-6 text-center">
        Bạn là ai?
      </Text>

      <View className="space-y-4">
        {/* Customer Button */}
        <TouchableOpacity 
          className="flex-row items-center p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 active:scale-95 transition-transform"
          onPress={handleCustomerLogin}
          activeOpacity={0.8}
        >
          <View className="w-14 h-14 bg-blue-500 rounded-full items-center justify-center mr-4 shadow-md shadow-blue-300">
            <User size={28} color="white" />
          </View>
          <View className="flex-1">
             <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">Tôi là Khách hàng</Text>
             <Text className="text-sm text-gray-500 dark:text-gray-300">Tìm thợ sửa chữa, lắp đặt...</Text>
          </View>
        </TouchableOpacity>

        {/* Worker Button */}
        <TouchableOpacity 
          className="flex-row items-center p-5 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 active:scale-95 transition-transform"
          onPress={() => router.push('/worker-auth/login')}
          activeOpacity={0.8}
        >
          <View className="w-14 h-14 bg-amber-500 rounded-full items-center justify-center mr-4 shadow-md shadow-amber-300">
            <Hammer size={28} color="white" />
          </View>
          <View className="flex-1">
             <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">Tôi là Thợ</Text>
             <Text className="text-sm text-gray-500 dark:text-gray-300">Đăng ký làm đối tác, nhận việc...</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-xs text-gray-400 mt-10">
        Phiên bản 1.0.0
      </Text>
    </SafeAreaView>
  );
}
