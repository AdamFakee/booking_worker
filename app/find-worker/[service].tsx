import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Search, ShieldCheck, Star } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data for Workers
const MOCK_WORKERS = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    service: 'Điện nước',
    distance: 0.5, // km
    rating: 4.8,
    reviews: 124,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    service: 'Điện lạnh',
    distance: 1.2,
    rating: 4.5,
    reviews: 89,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    service: 'Xây dựng',
    distance: 2.5,
    rating: 4.9,
    reviews: 210,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: '4',
    name: 'Phạm Văn D',
    service: 'Điện nước',
    distance: 3.1,
    rating: 4.2,
    reviews: 45,
    verified: false,
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: '5',
    name: 'Hoàng Thị E',
    service: 'Vệ sinh',
    distance: 0.8,
    rating: 5.0,
    reviews: 12,
    verified: true,
    avatar: 'https://i.pravatar.cc/150?u=5',
  },
];

export default function WorkerListScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const decodedService = service ? decodeURIComponent(service as string) : 'Dịch vụ';
  
  // Sort by distance (and then reliability/rating effectively implicitly if logic was complex)
  const sortedWorkers = [...MOCK_WORKERS].sort((a, b) => a.distance - b.distance);

  const handleWorkerPress = (id: string) => {
    router.push(`/find-worker/profile/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800"
        >
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        <View className="flex-1 ml-4">
            <Text className="text-body text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Tìm thợ gần bạn</Text>
            <Text className="text-h2 font-bold text-gray-900 dark:text-white" numberOfLines={1}>
            {decodedService}
            </Text>
        </View>
        <TouchableOpacity className="p-2">
            <Search size={24} color="#11181C" />
        </TouchableOpacity>
      </View>

      {/* Location Bar */}
      <View className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 flex-row items-center justify-between">
         <View className="flex-row items-center flex-1">
             <MapPin size={16} color="#0068FF" />
             <Text className="ml-2 text-sm text-gray-700 dark:text-gray-300 font-medium" numberOfLines={1}>
                 Vị trí hiện tại: Quận 1, TP.HCM
             </Text>
         </View>
         <TouchableOpacity>
             <Text className="text-primary font-bold text-sm">Thay đổi</Text>
         </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList 
        data={sortedWorkers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-4 border border-gray-100 dark:border-gray-800 shadow-sm flex-row"
            onPress={() => handleWorkerPress(item.id)}
            activeOpacity={0.7}
          >
             {/* Avatar */}
             <View className="relative mr-4">
                <Image 
                  source={{ uri: item.avatar }} 
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                {item.verified && (
                    <View className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5">
                        <ShieldCheck size={16} color="#00C853" fill="#00C853" />
                    </View>
                )}
             </View>

             {/* Content */}
             <View className="flex-1 justify-center">
                 <View className="flex-row justify-between items-start">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</Text>
                    <View className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        <Text className="text-xs text-gray-500 dark:text-gray-400">{item.distance} km</Text>
                    </View>
                 </View>
                 
                 <View className="flex-row items-center mb-2">
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1">{item.rating}</Text>
                    <Text className="text-xs text-gray-400 ml-1">({item.reviews} đánh giá)</Text>
                 </View>

                 <View className="flex-row mt-1">
                    <View className="bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md mr-2">
                         <Text className="text-xs text-green-700 dark:text-green-400 font-medium">Đang rảnh</Text>
                    </View>
                    <View className="bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                         <Text className="text-xs text-gray-500 dark:text-gray-400">5 năm kn</Text>
                    </View>
                 </View>
             </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
