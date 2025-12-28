import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationInfoScreen() {
  const router = useRouter();
  const { updateVerificationStatus } = useAuth();
  
  const [formData, setFormData] = useState({
    job: '',
    experience: '',
    phone: '',
  });

  const handleSubmit = async () => {
    if (!formData.job || !formData.experience) {
        Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin.');
        return;
    }
    
    // Simulate API call
    setTimeout(async () => {
        await updateVerificationStatus('info_submitted');
        Alert.alert('Thành công', 'Đã cập nhật hồ sơ.', [
            { text: 'Tiếp tục', onPress: () => router.back() }
        ]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Thông tin thợ</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6">
        <Text className="text-xl font-bold text-orange-500 mb-2">Bước 1: Giới thiệu bản thân</Text>
        <Text className="text-gray-500 mb-6">Hãy cho khách hàng biết bạn làm nghề gì và kinh nghiệm ra sao.</Text>

        <View className="space-y-4">
            <View>
                <Text className="font-medium text-gray-700 mb-2">Nghề nghiệp chính</Text>
                <TextInput 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                    placeholder="Ví dụ: Thợ điện, Giúp việc..."
                    value={formData.job}
                    onChangeText={(t) => setFormData({...formData, job: t})}
                />
            </View>

            <View>
                <Text className="font-medium text-gray-700 mb-2">Số năm kinh nghiệm</Text>
                <TextInput 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                    placeholder="Ví dụ: 5 năm"
                    value={formData.experience}
                    onChangeText={(t) => setFormData({...formData, experience: t})}
                />
            </View>

            <View>
                <Text className="font-medium text-gray-700 mb-2">Số điện thoại liên hệ</Text>
                <TextInput 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                    placeholder="0912..."
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(t) => setFormData({...formData, phone: t})}
                />
            </View>
        </View>

        {/* Mini Quiz Mock */}
        <View className="mt-8 bg-blue-50 p-4 rounded-xl">
            <Text className="font-bold text-blue-700 mb-2">Câu hỏi nhanh:</Text>
            <Text className="text-gray-700 mb-3">Khi khách hàng phàn nàn, bạn nên làm gì?</Text>
            
            <TouchableOpacity className="flex-row items-center mb-2">
                <View className="w-5 h-5 rounded-full border border-blue-500 mr-2 items-center justify-center">
                    <View className="w-3 h-3 rounded-full bg-blue-500" />
                </View>
                <Text className="text-gray-800">Lắng nghe và tìm giải pháp</Text>
            </TouchableOpacity>
            
             <TouchableOpacity className="flex-row items-center">
                <View className="w-5 h-5 rounded-full border border-gray-400 mr-2" />
                <Text className="text-gray-500">Tranh cãi để bảo vệ mình</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      <View className="p-5 border-t border-gray-100">
        <TouchableOpacity 
            onPress={handleSubmit}
            className="w-full bg-orange-500 py-4 rounded-xl items-center shadow-lg shadow-orange-500/30"
        >
            <Text className="text-white font-bold text-lg">Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
