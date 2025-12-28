import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera } from 'lucide-react-native';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationEkycScreen() {
  const router = useRouter();
  const { updateVerificationStatus } = useAuth();

  const handleUpload = () => {
    // Simulate upload process
    Alert.alert('Đang xử lý', 'Hệ thống đang kiểm tra CCCD của bạn...', [], { cancelable: false });
    
    setTimeout(async () => {
        await updateVerificationStatus('ekyc_completed');
        Alert.alert('Thành công', 'Đã xác minh danh tính.', [
            { text: 'Tiếp tục', onPress: () => router.back() }
        ]);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">eKYC - Xác minh</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6">
        <Text className="text-xl font-bold text-yellow-500 mb-2">Bước 2: Căn cước công dân</Text>
        <Text className="text-gray-500 mb-8">Vui lòng chụp ảnh 2 mặt CCCD để xác minh danh tính thật.</Text>

        <View className="space-y-6">
            {/* Front Card */}
            <View>
                <Text className="font-bold text-gray-800 mb-3">Mặt trước CCCD</Text>
                <TouchableOpacity className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center">
                    <Camera size={40} color="#9CA3AF" />
                    <Text className="text-gray-400 mt-2">Nhấn để chụp ảnh</Text>
                </TouchableOpacity>
            </View>

            {/* Back Card */}
            <View>
                <Text className="font-bold text-gray-800 mb-3">Mặt sau CCCD</Text>
                <TouchableOpacity className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center">
                     <Camera size={40} color="#9CA3AF" />
                     <Text className="text-gray-400 mt-2">Nhấn để chụp ảnh</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View className="mt-8 bg-yellow-50 p-4 rounded-xl flex-row">
             <View className="mt-1 mr-3">
                 <Camera size={20} color="#EAB308" />
             </View>
             <Text className="text-yellow-800 flex-1 leading-5">
                 Lưu ý: Chụp rõ nét, không bị lóa sáng, không mất góc để hệ thống duyệt nhanh chóng.
             </Text>
        </View>

      </ScrollView>

      <View className="p-5 border-t border-gray-100">
        <TouchableOpacity 
            onPress={handleUpload}
            className="w-full bg-yellow-500 py-4 rounded-xl items-center shadow-lg shadow-yellow-500/30"
        >
            <Text className="text-white font-bold text-lg">Gửi xác minh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
