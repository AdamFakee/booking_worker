import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationPaymentScreen() {
  const router = useRouter();
  const { updateVerificationStatus } = useAuth();

  const handlePay = () => {
    Alert.alert('Xác nhận thanh toán', 'Thanh toán 50.000đ phí xác thực?', [
        { text: 'Hủy', style: 'cancel' },
        { 
            text: 'Thanh toán', 
            onPress: async () => {
                await updateVerificationStatus('verified');
                Alert.alert('Thành công!', 'Bạn đã trở thành đối tác chính thức.', [
                    { text: 'Về trang chủ', onPress: () => router.back() }
                ]);
            }
        }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Thanh toán phí xác thực</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6">
        <View className="items-center mb-8 mt-5">
            <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
                <ShieldCheck size={40} color="#16A34A" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 text-center">Phí xác minh hồ sơ</Text>
            <Text className="text-gray-500 text-center mt-2 px-10">
                Khoản phí nhỏ để đảm bảo cam kết làm việc nghiêm túc và duy trì độ tin cậy của cộng đồng.
            </Text>
        </View>

        <View className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-600">Phí xác minh (1 lần)</Text>
                <Text className="font-bold text-gray-900">50.000đ</Text>
            </View>
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-600">Phí duy trì</Text>
                <Text className="font-bold text-green-600">Miễn phí</Text>
            </View>
            <View className="h-[1px] bg-gray-200 my-2" />
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-lg font-bold text-gray-900">Tổng cộng</Text>
                <Text className="text-2xl font-bold text-blue-600">50.000đ</Text>
            </View>
        </View>

        <View className="bg-green-50 p-4 rounded-xl">
            <Text className="font-bold text-green-800 mb-3">Quyền lợi khi thanh toán:</Text>
            <View className="flex-row items-center mb-2">
                <CheckCircle2 size={16} color="#16A34A" />
                <Text className="text-green-700 ml-2">Hiển thị trên bản đồ tìm kiếm</Text>
            </View>
            <View className="flex-row items-center mb-2">
                <CheckCircle2 size={16} color="#16A34A" />
                <Text className="text-green-700 ml-2">Nhận thông báo việc mới ngay lập tức</Text>
            </View>
            <View className="flex-row items-center">
                <CheckCircle2 size={16} color="#16A34A" />
                <Text className="text-green-700 ml-2">Huy hiệu "Đã xác thực" uy tín</Text>
            </View>
        </View>

      </ScrollView>

      <View className="p-5 border-t border-gray-100">
        <TouchableOpacity 
            onPress={handlePay}
            className="w-full bg-green-600 py-4 rounded-xl items-center shadow-lg shadow-green-600/30"
        >
            <Text className="text-white font-bold text-lg">Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
