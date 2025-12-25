import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, CheckCircle, Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function KYCScreen() {
  const router = useRouter();
  const [images, setImages] = useState<{ portrait: string | null, front: string | null, back: string | null }>({
    portrait: null,
    front: null,
    back: null
  });
  const [loading, setLoading] = useState<string | null>(null);

  const takePhoto = async (type: 'portrait' | 'front' | 'back') => {
    // Simply mocking the camera pick for now or using ImagePicker if configured,
    // but for "Mock flow" requested by user, we can just simulate a "success" 
    // or pick from library. Let's try picking for realism.
    setLoading(type);
    
    // Simulate delay
    setTimeout(() => {
        // Just a placeholder URL or Result for demo
        const mockUri = 'https://via.placeholder.com/300'; 
        setImages(prev => ({ ...prev, [type]: mockUri }));
        setLoading(null);
    }, 1500);
  };

  const isComplete = images.portrait && images.front && images.back;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
       <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
         <Text className="text-xl font-bold text-center text-gray-900 dark:text-white">Xác minh danh tính</Text>
       </View>

       <ScrollView className="flex-1 px-5 pt-6">
          <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Vui lòng cung cấp hình ảnh chân dung và căn cước công dân để hoàn tất hồ sơ.
          </Text>

          {/* Portrait */}
          <View className="mb-6">
            <Text className="font-bold text-gray-900 dark:text-white mb-2">1. Ảnh chân dung (Selfie)</Text>
            <TouchableOpacity 
              className={`h-40 border-2 border-dashed rounded-xl items-center justify-center ${images.portrait ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-900'}`}
              onPress={() => takePhoto('portrait')}
              disabled={!!loading}
            >
              {loading === 'portrait' ? (
                <ActivityIndicator color="#FFA000" />
              ) : images.portrait ? (
                 <View className="items-center">
                    <CheckCircle size={32} color="#00C853" className="mb-2" />
                    <Text className="text-green-600 font-bold">Đã tải lên</Text>
                 </View>
              ) : (
                <View className="items-center">
                   <Camera size={32} color="#9CA3AF" />
                   <Text className="text-gray-400 mt-2">Chạm để chụp ảnh</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Front ID */}
          <View className="mb-6">
            <Text className="font-bold text-gray-900 dark:text-white mb-2">2. CCCD Mặt trước</Text>
            <TouchableOpacity 
              className={`h-40 border-2 border-dashed rounded-xl items-center justify-center ${images.front ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-900'}`}
              onPress={() => takePhoto('front')}
              disabled={!!loading}
            >
               {loading === 'front' ? (
                <ActivityIndicator color="#FFA000" />
              ) : images.front ? (
                 <View className="items-center">
                    <CheckCircle size={32} color="#00C853" className="mb-2" />
                    <Text className="text-green-600 font-bold">Đã tải lên</Text>
                 </View>
              ) : (
                <View className="items-center">
                   <Upload size={32} color="#9CA3AF" />
                   <Text className="text-gray-400 mt-2">Tải lên mặt trước</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Back ID */}
          <View className="mb-10">
            <Text className="font-bold text-gray-900 dark:text-white mb-2">3. CCCD Mặt sau</Text>
            <TouchableOpacity 
              className={`h-40 border-2 border-dashed rounded-xl items-center justify-center ${images.back ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-900'}`}
              onPress={() => takePhoto('back')}
              disabled={!!loading}
            >
               {loading === 'back' ? (
                <ActivityIndicator color="#FFA000" />
              ) : images.back ? (
                 <View className="items-center">
                    <CheckCircle size={32} color="#00C853" className="mb-2" />
                    <Text className="text-green-600 font-bold">Đã tải lên</Text>
                 </View>
              ) : (
                <View className="items-center">
                   <Upload size={32} color="#9CA3AF" />
                   <Text className="text-gray-400 mt-2">Tải lên mặt sau</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center shadow-lg mb-10 ${isComplete ? 'bg-amber-400 shadow-amber-200' : 'bg-gray-200 dark:bg-slate-800'}`}
            onPress={() => router.push('/worker-auth/info')}
            disabled={!isComplete}
          >
            <Text className={`font-bold text-lg ${isComplete ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
       </ScrollView>
    </SafeAreaView>
  );
}
