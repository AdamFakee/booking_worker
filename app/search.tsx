import FloatingSelectionBar from '@/components/selection/FloatingSelectionBar';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ChevronRight,
  Search
} from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const suggestions = [
  "sinh viên part-time", "giúp việc theo giờ", "bán hàng", 
  "bảo vệ", "thợ điện", "tạp vụ"
];

// Mock data for search results
const services = [
  { id: '1', title: 'Điện nước', icon: require('../assets/icons/worker commons/điện nước.png'), color: '#E3F2FD' }, // Blue
  { id: '2', title: 'Công nhân', icon: require('../assets/icons/worker commons/công nhân.png'), color: '#FFF3E0' }, // Orange
  { id: '3', title: 'Điện lạnh', icon: require('../assets/icons/worker commons/điện lạnh.png'), color: '#E8F5E9' }, // Green
  { id: '4', title: 'Giúp việc, bán hàng', icon: require('../assets/icons/worker commons/giúp việc, bán hàng.png'), color: '#FCE4EC' }, // Pink
  { id: '5', title: 'Sinh viên', icon: require('../assets/icons/worker commons/sinh viên.png'), color: '#E0F7FA' }, // Cyan
  { id: '6', title: 'Part-time', icon: require('../assets/icons/worker commons/part-time.png'), color: '#F3E5F5' }, // Purple
  { id: '7', title: 'Phổ thông', icon: require('../assets/icons/worker commons/lao động phổ thông.png'), color: '#EFEBE9' }, // Brown
  { id: '8', title: 'Xem thêm', icon: require('../assets/icons/worker commons/xem thêm.png'), color: '#F5F5F5' }, // Grey
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filteredServices = services.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-2 mt-2">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="mr-3 w-10 h-10 items-center justify-center rounded-full bg-gray-50"
        >
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center bg-white border border-gray-200 rounded-2xl px-4 h-12 shadow-sm">
          <Search size={20} color="#9BA1A6" />
          <TextInput 
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm lao động và việc làm..." 
            placeholderTextColor="#9BA1A6"
            className="flex-1 ml-3 font-medium text-body text-gray-800"
            autoFocus
          />
        </View>
      </View>

      <View className="flex-1 px-5">
        {/* Suggestions */}
        <View className="mt-3">
          <Text className="text-caption text-gray-500 italic leading-5">
            Gợi ý: {suggestions.join(' • ')}
          </Text>
        </View>

        {/* List Header */}
        <View className="flex-row items-center mt-6 mb-4">
          <Text className="text-h2 font-bold text-gray-900">Chọn lao động bạn cần</Text>
          <View className="ml-3 bg-[#256DC2] px-2 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">8</Text>
          </View>
        </View>

        {/* Service List */}
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="flex-row items-center bg-white p-4 mb-3 rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50"
              activeOpacity={0.7}
              onPress={() => router.push(`/find-worker/${encodeURIComponent(item.title)}` as any)}
            >
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: item.color }}
              >
                <Image 
                    source={item.icon} 
                    style={{ width: 24, height: 24, resizeMode: 'contain' }}
                  />
              </View>
              <Text className="flex-1 text-body font-semibold text-gray-800">
                {item.title}
              </Text>
              <ChevronRight size={20} color="#9BA1A6" />
            </TouchableOpacity>
          )}

          ListEmptyComponent={
            <View className="mt-10 items-center">
              <Text className="text-gray-500">Không tìm thấy dịch vụ nào</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
    <FloatingSelectionBar />
    </>
  );
}
