import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CalendarCheck } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsDetailScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color={colorScheme === 'dark' ? '#FFF' : '#11181C'} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 dark:text-white mr-10">Chi tiết tin tức</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Image */}
        <View className="w-full h-56 bg-gray-200 dark:bg-slate-800 mb-6">
           <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1632759145551-dd1b05200474?q=80&w=3540&auto=format&fit=crop' }} 
              className="w-full h-full"
              resizeMode="cover"
           />
        </View>

        <View className="px-5 pb-10">
           {/* Title */}
           <Text className="text-2xl font-bold text-gray-900 dark:text-white leading-8 mb-4">
             Giải Pháp Nào Chống Thấm Cho Mái Nhà Hiệu Quả?
           </Text>

           {/* Intro */}
           <Text className="text-body text-gray-600 dark:text-gray-300 leading-7 mb-6 text-justify">
             Mái nhà là nơi đầu tiên chịu tác động của các hiện tượng thời tiết như nắng, mưa, bão gió,... Do vậy mà kết cấu này gặp phải sự cố về thấm, dột sau thời gian sử dụng là điều có thể xảy ra. Thợ Việt là đơn vị có nhiều năm kinh nghiệm trong việc thi công chống thấm cho mái nhà chuyên nghiệp và hiệu quả!
           </Text>

           {/* CTA Button */}
            <TouchableOpacity 
              className="bg-amber-400 flex-row items-center justify-center py-4 rounded-xl shadow-lg shadow-amber-400/30 mb-8"
              activeOpacity={0.8}
              onPress={() => router.push('/search')}
            >
              <CalendarCheck size={20} color="#11181C" />
              <Text className="text-gray-900 font-bold text-lg ml-2">Đặt lịch nhanh chóng</Text>
            </TouchableOpacity>

            {/* Content Body */}
            <View className="border-l-4 border-amber-400 pl-3 mb-4">
               <Text className="text-xl font-bold text-gray-900 dark:text-white">Nội dung chi tiết</Text>
            </View>

            <Text className="text-body text-gray-600 dark:text-gray-300 leading-7 mb-6 text-justify">
              Mái nhà là nơi đầu tiên chịu tác động của các hiện tượng thời tiết như nắng, mưa, bão gió,... Do vậy mà kết cấu này gặp phải sự cố về thấm, dột sau thời gian sử dụng là điều có thể xảy ra. Thợ Việt là đơn vị có nhiều năm kinh nghiệm trong việc thi công chống thấm cho mái nhà chuyên nghiệp và hiệu quả!
            </Text>

            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              1. Nguyên nhân khiến mái nhà bị thấm, dột
            </Text>
            <Text className="text-body text-gray-600 dark:text-gray-300 leading-7 text-justify">
              Có rất nhiều nguyên nhân, nhưng chủ yếu đến từ việc thi công không đúng kỹ thuật ban đầu, vật liệu kém chất lượng hoặc do thời gian sử dụng quá lâu mà không được bảo trì. Các vết nứt, lỗ thủng nhỏ cũng có thể lan rộng nếu không xử lý kịp thời.
            </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
