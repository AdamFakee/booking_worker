import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';

const MOCK_REVIEWS = [
  {
    id: '1',
    user: 'Trần Văn Khách',
    date: '2025-12-20',
    rating: 5,
    comment: 'Thợ làm rất kỹ, nhiệt tình. Sửa xong dọn dẹp sạch sẽ. Sẽ ủng hộ lần sau.',
  },
  {
    id: '2',
    user: 'Lê Thị Hạnh',
    date: '2025-12-18',
    rating: 4,
    comment: 'Đến đúng giờ, làm việc nhanh gọn. Tuy nhiên giá hơi cao so với mặt bằng chung.',
  },
  {
    id: '3',
    user: 'Nguyễn Văn Nam',
    date: '2025-12-15',
    rating: 5,
    comment: 'Rất hài lòng với dịch vụ. Anh thợ vui tính, tư vấn nhiệt tình.',
  },
  {
    id: '4',
    user: 'Phạm Thị Mai',
    date: '2025-12-10',
    rating: 5,
    comment: 'Tuyệt vời! Đã sửa xong sự cố điện nước nhà mình.',
  },
  {
    id: '5',
    user: 'Hoàng Văn Dũng',
    date: '2025-12-05',
    rating: 3,
    comment: 'Làm ổn, nhưng hẹn 2h mà 2h30 mới tới.',
  },
];

export default function WorkerReviewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const renderItem = ({ item }: { item: typeof MOCK_REVIEWS[0] }) => (
    <View className="bg-white dark:bg-slate-900 p-4 mb-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <View className="flex-row justify-between mb-2">
        <Text className="font-bold text-gray-800 dark:text-white text-base">{item.user}</Text>
        <Text className="text-xs text-gray-400">{item.date}</Text>
      </View>
      <View className="flex-row mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            color="#FFD700" 
            fill={i < item.rating ? "#FFD700" : "transparent"} 
            className="mr-0.5"
          />
        ))}
      </View>
      <Text className="text-gray-600 dark:text-gray-300 text-sm leading-5">
        {item.comment}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="mr-3 w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800"
        >
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        <Text className="text-h2 font-bold text-gray-900 dark:text-white flex-1">Đánh giá khách hàng</Text>
        <View className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full flex-row items-center">
             <Star size={14} color="#F59E0B" fill="#F59E0B" />
             <Text className="ml-1 font-bold text-amber-700 dark:text-amber-500">4.8 (124)</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_REVIEWS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-4">
             <Text className="text-gray-500 dark:text-gray-400 text-center italic">
                Danh sách đánh giá gần đây nhất
             </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
