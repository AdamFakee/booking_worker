import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, CheckCircle, FileText, ShieldCheck } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkerRegistrationScreen() {
  const router = useRouter();
  const { registerAsWorker } = useAuth();
  const [step, setStep] = useState<'intro' | 'kyc' | 'success'>('intro');

  const handleStartKYC = () => {
    setStep('kyc');
  };

  const handleCompleteKYC = async () => {
    // In a real app, this would verify the ID with backend
    // For now, we'll just simulate success
    await registerAsWorker();
    setStep('success');
  };

  const handleFinish = () => {
    router.replace('/(tabs)/profile' as any);
  };

  if (step === 'success') {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mb-6">
            <CheckCircle size={48} color="#22C55E" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Đăng ký thành công! 🎉
          </Text>
          <Text className="text-body text-gray-600 dark:text-gray-400 text-center mb-8 leading-6">
            Bạn đã trở thành thợ. Bật chế độ "Hoạt động" ở màn hình chính để khách hàng có thể tìm thấy bạn.
          </Text>
          <TouchableOpacity
            className="bg-primary px-8 py-4 rounded-xl shadow-lg shadow-primary/30"
            onPress={handleFinish}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg">Hoàn tất</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'kyc') {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <View className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <TouchableOpacity onPress={() => setStep('intro')} className="flex-row items-center">
            <ArrowLeft size={24} color="#0068FF" />
            <Text className="text-primary font-semibold ml-2">Quay lại</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 pt-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Xác thực căn cước
          </Text>
          <Text className="text-body text-gray-600 dark:text-gray-400 mb-8">
            Chụp ảnh căn cước công dân của bạn để xác thực danh tính
          </Text>

          {/* Front ID Card */}
          <View className="mb-6">
            <Text className="text-base font-bold text-gray-900 dark:text-white mb-3">
              Mặt trước căn cước
            </Text>
            <TouchableOpacity className="bg-gray-100 dark:bg-slate-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl h-48 items-center justify-center">
              <Camera size={40} color="#9BA1A6" />
              <Text className="text-gray-500 dark:text-gray-400 mt-3 font-medium">
                Chụp ảnh mặt trước
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back ID Card */}
          <View className="mb-6">
            <Text className="text-base font-bold text-gray-900 dark:text-white mb-3">
              Mặt sau căn cước
            </Text>
            <TouchableOpacity className="bg-gray-100 dark:bg-slate-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl h-48 items-center justify-center">
              <Camera size={40} color="#9BA1A6" />
              <Text className="text-gray-500 dark:text-gray-400 mt-3 font-medium">
                Chụp ảnh mặt sau
              </Text>
            </TouchableOpacity>
          </View>

          {/* Selfie with ID */}
          <View className="mb-8">
            <Text className="text-base font-bold text-gray-900 dark:text-white mb-3">
              Ảnh chân dung cầm căn cước
            </Text>
            <TouchableOpacity className="bg-gray-100 dark:bg-slate-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl h-48 items-center justify-center">
              <Camera size={40} color="#9BA1A6" />
              <Text className="text-gray-500 dark:text-gray-400 mt-3 font-medium">
                Chụp ảnh chân dung
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-primary py-4 rounded-xl mb-6 shadow-lg shadow-primary/30"
            onPress={handleCompleteKYC}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-center text-lg">Xác thực ngay</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Intro step
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <ArrowLeft size={24} color="#0068FF" />
          <Text className="text-primary font-semibold ml-2">Quay lại</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full items-center justify-center mb-4">
            <ShieldCheck size={40} color="#F59E0B" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Trở thành thợ
          </Text>
          <Text className="text-body text-gray-600 dark:text-gray-400 text-center">
            Đăng ký làm thợ để nhận việc và kiếm thêm thu nhập
          </Text>
        </View>

        {/* Benefits */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Lợi ích khi trở thành thợ
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row items-start">
              <View className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-lg">💰</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  Thu nhập ổn định
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                  Nhận việc liên tục từ khách hàng trong khu vực của bạn
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-lg">⏰</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  Linh hoạt thời gian
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                  Tự do bật/tắt chế độ hoạt động theo lịch trình của bạn
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-lg">🛡️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  Bảo vệ uy tín
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                  Hệ thống đánh giá giúp xây dựng danh tiếng của bạn
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Requirements */}
        <View className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-8">
          <View className="flex-row items-center mb-3">
            <FileText size={20} color="#F59E0B" />
            <Text className="text-base font-bold text-gray-900 dark:text-white ml-2">
              Yêu cầu
            </Text>
          </View>
          <Text className="text-sm text-gray-600 dark:text-gray-400 leading-6">
            • Căn cước công dân còn hiệu lực{'\n'}
            • Độ tuổi từ 18 trở lên{'\n'}
            • Có kỹ năng hoặc kinh nghiệm trong lĩnh vực bạn đăng ký
          </Text>
        </View>

        <TouchableOpacity
          className="bg-primary py-4 rounded-xl mb-6 shadow-lg shadow-primary/30"
          onPress={handleStartKYC}
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-center text-lg">Bắt đầu đăng ký</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
