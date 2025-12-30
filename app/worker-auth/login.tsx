import { useRouter } from 'expo-router';
import { ArrowLeft, Phone } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { workerAuthService } from '@/services/workerAuth';

export default function WorkerLoginScreen() {
  const router = useRouter();
  const { user, signIn, registerAsWorker } = useAuth();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    // Basic validation
    if (phone.length < 9) return;
    
    try {
      setLoading(true);
      await workerAuthService.sendOtp(phone);
      router.push({ pathname: '/worker-auth/otp', params: { phone } });
    } catch (error) {
      alert('Gửi mã OTP thất bại, vui lòng thử lại');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipDemo = async () => {
    // If user is not logged in yet, sign them in first
    if (!user.isLoggedIn) {
      await signIn();
    }
    
    // Register as worker (skip KYC for demo)
    await registerAsWorker();
    
    // Redirect to main app (tabs) instead of separate worker-home
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="px-5 pt-2">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 px-5 pt-10" contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 rounded-full items-center justify-center mb-6">
            <Phone size={32} color="#FFA000" />
          </View>
          
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Đăng ký Đối tác</Text>
          <Text className="text-body text-gray-500 dark:text-gray-400 mb-8">
            Nhập số điện thoại của bạn để bắt đầu quy trình đăng ký trở thành Thợ Việt.
          </Text>

          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 dark:text-white mb-2">Số điện thoại</Text>
            <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-xl px-4 h-14 bg-white dark:bg-slate-900 focus:border-amber-400">
              <Text className="text-gray-500 dark:text-gray-400 mr-2 font-bold">+84</Text>
              <View className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 mr-3" />
              <TextInput 
                className="flex-1 text-lg font-medium text-gray-900 dark:text-white h-full"
                placeholder="000 000 000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                autoFocus
              />
            </View>
          </View>

          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center shadow-lg ${phone.length > 8 ? 'bg-amber-400 shadow-amber-200' : 'bg-gray-200 dark:bg-slate-800'}`}
            onPress={handleSendCode}
            disabled={phone.length <= 8 || loading}
          >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text className={`font-bold text-lg ${phone.length > 8 ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                Tiếp tục
                </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center mt-4 bg-blue-500 shadow-lg shadow-blue-200"
            onPress={handleSkipDemo}
          >
            <Text className="font-bold text-lg text-white">
              Bỏ qua Demo (Vào thẳng App)
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
