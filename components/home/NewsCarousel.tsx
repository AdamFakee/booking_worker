import { useRouter } from 'expo-router';
import { ArrowRight, Calendar, Clock } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Cách sửa ống nước bị rò rỉ tại nhà đơn giản',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Tin tức',
    date: '20/12',
    readTime: '5 phút'
  },
  {
    id: '2',
    title: 'Top 5 loại sơn chống thấm tốt nhất 2024',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Kiến thức',
    date: '19/12',
    readTime: '3 phút'
  },
  {
    id: '3',
    title: 'Bảo dưỡng điều hòa định kỳ: Tại sao cần thiết?',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Điện lạnh',
    date: '18/12',
    readTime: '4 phút'
  },
];

export const NewsCarousel = () => {
  const router = useRouter();
  
  return (
    <View className="mt-6 mb-2">
      <View className="px-5 mb-3 flex-row justify-between items-center">
        <Text className="text-lg font-bold text-gray-800 dark:text-white font-sans">Tin tức & Mẹo vặt</Text>
        <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => router.push('/news')}
        >
            <Text className="text-[#256DC2] text-xs font-medium mr-1">Xem tất cả</Text>
            <ArrowRight size={14} color="#256DC2" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
      >
        {MOCK_NEWS.map((item) => (
            <TouchableOpacity 
                key={item.id}
                className="w-72 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm"
                activeOpacity={0.9}
                onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.id } })}
            >
                <Image 
                    source={{ uri: item.image }} 
                    className="w-full h-32 bg-gray-200"
                    resizeMode="cover"
                />
                <View className="p-3">
                    <View className="flex-row items-center justify-between mb-2">
                         <View className="bg-[#256DC2]/10 px-2 py-1 rounded-md">
                             <Text className="text-[10px] font-bold text-[#256DC2]">{item.category}</Text>
                         </View>
                         <View className="flex-row items-center">
                             <Clock size={10} color="#9BA1A6" className="mr-1" />
                             <Text className="text-[10px] text-gray-400">{item.readTime}</Text>
                         </View>
                    </View>
                    
                    <Text className="text-sm font-bold text-gray-900 dark:text-white leading-5 mb-2" numberOfLines={2}>
                        {item.title}
                    </Text>

                    <View className="flex-row items-center mt-1">
                        <Calendar size={12} color="#9BA1A6" className="mr-1" />
                        <Text className="text-xs text-gray-400">{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
