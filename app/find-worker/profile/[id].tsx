import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  MessageSquare, 
  Clock, 
  Award,
  ThumbsUp
} from 'lucide-react-native';

const MOCK_WORKER_DETAIL = {
  id: '1',
  name: 'Nguyễn Văn A',
  service: 'Điện nước, Lắp đặt máy lạnh',
  distance: 0.5,
  rating: 4.8,
  reviews: 124,
  verified: true,
  avatar: 'https://i.pravatar.cc/150?u=1',
  phone: '0901234567',
  zalo: '0901234567',
  bio: 'Chuyên sửa chữa điện nước dân dụng, lắp đặt thiết bị vệ sinh, máy bơm nước. Có kinh nghiệm 5 năm trong nghề, cam kết uy tín, chất lượng.',
  skills: ['Sửa đường ống nước', 'Lắp đặt đèn LED', 'Thông nghẹt', 'Sửa máy bơm', 'Thi công điện âm tường'],
  stats: {
    jobs: 540,
    successRate: '99%',
    experience: '5 năm'
  }
};

export default function WorkerProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // In a real app, fetch worker by ID. We use mock data here.
  const worker = MOCK_WORKER_DETAIL;

  const handleCall = () => {
    Linking.openURL(`tel:${worker.phone}`);
  };

  const handleZalo = () => {
    // Zalo often uses links like https://zalo.me/PHONE_NUMBER
    Linking.openURL(`https://zalo.me/${worker.zalo}`);
  };

  const handleChat = () => {
    // Navigate to local chat screen
    router.push(`/messages/${worker.id}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header with Background Image Effect (Simulated) */}
      <View className="h-48 bg-blue-600 absolute top-0 left-0 right-0" />
      
      <View className="flex-row items-center justify-between px-4 py-3 z-10">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Thông tin thợ</Text>
        <View className="w-10" /> 
      </View>

      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="mx-5 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-800 mb-6">
           <View className="flex-row items-start">
              <View className="relative">
                 <Image 
                   source={{ uri: worker.avatar }} 
                   className="w-20 h-20 rounded-full bg-gray-200 border-2 border-white dark:border-slate-800"
                 />
                 {worker.verified && (
                    <View className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1 border-2 border-white dark:border-slate-900">
                        <ShieldCheck size={14} color="white" fill="white" />
                    </View>
                 )}
              </View>
              <View className="flex-1 ml-4 pt-1">
                 <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">{worker.name}</Text>
                 <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">{worker.service}</Text>
                 <View className="flex-row items-center">
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text className="text-base font-bold text-gray-800 dark:text-gray-200 ml-1">{worker.rating}</Text>
                    <Text className="text-sm text-gray-400 ml-1">({worker.reviews} đánh giá)</Text>
                 </View>
              </View>
           </View>
           
           {/* Stats */}
           <View className="flex-row mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 justify-between">
              <View className="items-center flex-1 border-r border-gray-100 dark:border-gray-800">
                 <Text className="text-lg font-bold text-gray-900 dark:text-white">{worker.stats.jobs}</Text>
                 <Text className="text-xs text-gray-500">Đã làm</Text>
              </View>
              <View className="items-center flex-1 border-r border-gray-100 dark:border-gray-800">
                 <Text className="text-lg font-bold text-gray-900 dark:text-white">{worker.stats.successRate}</Text>
                 <Text className="text-xs text-gray-500">Thành công</Text>
              </View>
              <View className="items-center flex-1">
                 <Text className="text-lg font-bold text-gray-900 dark:text-white">{worker.stats.experience}</Text>
                 <Text className="text-xs text-gray-500">Kinh nghiệm</Text>
              </View>
           </View>
        </View>

        {/* Verification & Bio */}
        <View className="px-5 mb-6">
           <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">Giới thiệu</Text>
           <Text className="text-body text-gray-600 dark:text-gray-300 leading-6 mb-4">
              {worker.bio}
           </Text>
           
           <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">Kỹ năng đã xác thực</Text>
           <View className="flex-row flex-wrap">
              {worker.skills.map((skill, index) => (
                 <View key={index} className="bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg mr-2 mb-2 border border-green-100 dark:border-green-900/30">
                    <Text className="text-sm font-medium text-green-700 dark:text-green-400">{skill}</Text>
                 </View>
              ))}
           </View>
        </View>

        {/* Reviews Preview (Simple) */}
        <View className="px-5 mb-24">
           <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">Đánh giá từ khách hàng</Text>
              <TouchableOpacity onPress={() => router.push(`/find-worker/reviews/${worker.id}` as any)}>
                 <Text className="text-primary font-bold text-sm">Xem tất cả</Text>
              </TouchableOpacity>
           </View>
           
           <View className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
               <View className="flex-row justify-between mb-2">
                   <Text className="font-bold text-gray-800 dark:text-white">Trần Văn Khách</Text>
                   <View className="flex-row">
                       <Star size={14} color="#FFD700" fill="#FFD700" />
                       <Star size={14} color="#FFD700" fill="#FFD700" />
                       <Star size={14} color="#FFD700" fill="#FFD700" />
                       <Star size={14} color="#FFD700" fill="#FFD700" />
                       <Star size={14} color="#FFD700" fill="#FFD700" />
                   </View>
               </View>
               <Text className="text-gray-600 dark:text-gray-400 text-sm">
                   Thợ làm rất kỹ, nhiệt tình. Sửa xong dọn dẹp sạch sẽ. Sẽ ủng hộ lần sau.
               </Text>
           </View>
        </View>
      </ScrollView>

      {/* Floating Action Buttons */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-gray-800 flex-row justify-between shadow-2xl">
          <TouchableOpacity 
            className="flex-1 bg-green-500 flex-col items-center justify-center py-3 rounded-xl mr-2 shadow-lg shadow-green-200"
            onPress={handleCall}
          >
             <Phone size={24} color="white" />
             <Text className="text-white font-bold text-xs mt-1">Gọi điện</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 bg-blue-500 flex-col items-center justify-center py-3 rounded-xl mr-2 shadow-lg shadow-blue-200"
            onPress={handleZalo}
          >
             {/* Simple Text for Zalo if no icon */}
             <Text className="text-white font-extrabold text-lg leading-6">Z</Text>
             <Text className="text-white font-bold text-xs mt-0.5">Chat Zalo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex-col items-center justify-center py-3 rounded-xl shadow-sm"
            onPress={handleChat}
          >
             <MessageSquare size={24} color="#374151" />
             <Text className="text-gray-700 dark:text-gray-300 font-bold text-xs mt-1">Chat App</Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
