import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Building2, MapPin, Mail, Phone, Landmark } from 'lucide-react-native';

export default function CompanyInfoScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50">
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 mr-10">Thông tin liên hệ</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
         
         <Text className="text-xl font-bold text-gray-800 mb-4 px-2">Thông tin công ty</Text>

         {/* Company Name */}
         <View className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 flex-row items-center">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4">
              <Building2 size={24} color="#FFB300" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500 uppercase font-bold mb-1">Tên công ty</Text>
              <Text className="text-body font-bold text-gray-900 leading-6">
                CÔNG TY TNHH DỊCH VỤ KỸ THUẬT THỢ VIỆT
              </Text>
            </View>
         </View>

         {/* Address 1 */}
         <View className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 flex-row items-start">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4 mt-1">
              <MapPin size={24} color="#FFB300" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500 uppercase font-bold mb-1">Địa chỉ</Text>
              <Text className="text-body font-medium text-gray-800 leading-5">
                25/6 Phùng Văn Cung, Phường Cầu Kiệu, TP Hồ Chí Minh, Việt Nam
              </Text>
            </View>
         </View>

         {/* Address 2 */}
         <View className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 flex-row items-start">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4 mt-1">
              <MapPin size={24} color="#FFB300" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500 uppercase font-bold mb-1">Văn phòng giao dịch</Text>
              <Text className="text-body font-medium text-gray-800 leading-5">
                88 Đường 18, Phường Hiệp Bình, TP Hồ Chí Minh, Việt Nam
              </Text>
            </View>
         </View>

         {/* Bank Info */}
         <View className="bg-white p-4 rounded-2xl mb-8 border border-gray-100 flex-row items-start">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4 mt-1">
              <Landmark size={24} color="#FFB300" />
            </View>
            <View className="flex-1">
               <Text className="text-xs text-gray-500 uppercase font-bold mb-1">Số tài khoản</Text>
               <Text className="text-lg font-bold text-gray-900 mb-1">1190 0008 0546</Text>
               <Text className="text-body text-gray-600 leading-5">
                 Ngân Hàng Công Thương Việt Nam - Chi nhánh 2 TP Hồ Chí Minh
               </Text>
            </View>
         </View>

         <Text className="text-xl font-bold text-gray-800 mb-4 px-2">Thông tin liên hệ</Text>

         {/* Email */}
         <View className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 flex-row items-center">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4">
              <Mail size={24} color="#FFB300" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500 uppercase font-bold mb-1">Email</Text>
              <Text className="text-body font-medium text-gray-800">
                info@thoviet.com.vn
              </Text>
            </View>
         </View>

         {/* Hotline */}
         <View className="bg-white p-4 rounded-2xl mb-10 border border-gray-100 flex-row items-center">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center mr-4">
              <Phone size={24} color="#FFB300" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500 uppercase font-bold mb-1">Hotline</Text>
              <Text className="text-body font-medium text-gray-800">
                 1800 8122
              </Text>
            </View>
         </View>

         <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
