import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Calendar, Clock, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_NEWS_LIST = [
  {
    id: '1',
    title: 'Cách sửa ống nước bị rò rỉ tại nhà đơn giản',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Tin tức',
    date: '20/12/2024',
    readTime: '5 phút',
    desc: 'Hướng dẫn chi tiết cách xử lý nhanh các sự cố rò rỉ nước thường gặp mà không cần gọi thợ.'
  },
  {
    id: '2',
    title: 'Top 5 loại sơn chống thấm tốt nhất 2024',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Kiến thức',
    date: '19/12/2024',
    readTime: '3 phút',
    desc: 'Đánh giá các dòng sơn chống thấm hiệu quả nhất trên thị trường hiện nay.'
  },
  {
    id: '3',
    title: 'Bảo dưỡng điều hòa định kỳ: Tại sao cần thiết?',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Điện lạnh',
    date: '18/12/2024',
    readTime: '4 phút',
    desc: 'Những lợi ích không ngờ của việc vệ sinh máy lạnh thường xuyên giúp tiết kiệm điện năng.'
  },
  {
    id: '4',
    title: 'Mẹo hay giúp nhà cửa luôn thơm mát',
    image: 'https://images.unsplash.com/photo-1527513027856-49c86c637e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Lifestyle',
    date: '15/12/2024',
    readTime: '2 phút',
    desc: 'Tổng hợp các phương pháp tự nhiên giúp không gian sống của bạn luôn dễ chịu.'
  },
  {
    id: '5',
    title: 'Lắp đặt hệ thống điện thông minh: Nên hay không?',
    image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Công nghệ',
    date: '10/12/2024',
    readTime: '6 phút',
    desc: 'Phân tích ưu nhược điểm của Smarthome và chi phí lắp đặt cơ bản.'
  },
];

export default function NewsListScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNews = MOCK_NEWS_LIST.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: typeof MOCK_NEWS_LIST[0] }) => (
        <TouchableOpacity 
            className="flex-row bg-white dark:bg-slate-900 mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.id } })}
        >
            <Image 
                source={{ uri: item.image }} 
                className="w-32 h-32 bg-gray-200"
                resizeMode="cover"
            />
            <View className="flex-1 p-3 justify-between">
                <View>
                    <View className="flex-row items-center mb-1">
                        <View className="bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md self-start mr-2">
                            <Text className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{item.category}</Text>
                        </View>
                        <View className="flex-row items-center">
                             <Clock size={10} color="#9BA1A6" className="mr-1" />
                             <Text className="text-[10px] text-gray-400">{item.readTime}</Text>
                        </View>
                    </View>
                    <Text className="text-sm font-bold text-gray-900 dark:text-white leading-5" numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1" numberOfLines={2}>
                        {item.desc}
                    </Text>
                </View>
                
                <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                        <Calendar size={12} color="#9BA1A6" className="mr-1" />
                        <Text className="text-xs text-gray-400">{item.date}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-xs font-medium text-primary mr-1">Đọc tiếp</Text>
                        <ArrowRight size={12} color="#0068FF" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
            <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800 -ml-2">
                     <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 dark:text-white ml-2">Tin tức & Tuyển dụng</Text>
            </View>

            <View className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
                <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                    <Search size={20} color="#9ca3af" />
                    <TextInput 
                        className="flex-1 ml-2 text-gray-900 dark:text-white"
                        placeholder="Tìm kiếm bài viết..."
                        placeholderTextColor="#9ca3af"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList 
                data={filteredNews}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-500">Không tìm thấy bài viết nào.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
