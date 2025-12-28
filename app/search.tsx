import FloatingSelectionBar from '@/components/selection/FloatingSelectionBar';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ChevronRight,
  Droplets,
  Hammer,
  PaintBucket,
  Search,
  Wrench,
  Zap
} from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const suggestions = [
  "máy lạnh", "máy giặt", "tủ lạnh", "đèn", "điện", 
  "ống nước", "lavabo", "bồn cầu", "mái tôn", "máy bơm"
];

// Mock data for search results
const allServices = [
  { id: '1', title: 'Sửa nhà', icon: Hammer },
  { id: '2', title: 'Sửa tường', icon: PaintBucket },
  { id: '3', title: 'Sửa trần nhà', icon: Hammer },
  { id: '4', title: 'Sửa sàn nhà', icon: Hammer },
  { id: '5', title: 'Sửa cửa', icon: Wrench },
  { id: '6', title: 'Sửa nhà vệ sinh', icon: Droplets },
  { id: '7', title: 'Sửa bếp', icon: Zap },
  { id: '8', title: 'Sửa điện', icon: Zap },
  { id: '9', title: 'Sửa ống nước', icon: Droplets },
  { id: '10', title: 'Chống thấm', icon: Droplets },
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filteredServices = allServices.filter(item => 
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
            Gợi ý: {suggestions.join(', ')},...
          </Text>
        </View>

        {/* List Header */}
        <View className="flex-row items-center mt-6 mb-4">
          <Text className="text-h2 font-bold text-gray-900">Chọn dịch vụ cần đặt</Text>
          <View className="ml-3 bg-yellow-400 px-2 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">436</Text>
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
              <View className="w-12 h-12 rounded-xl bg-orange-50 items-center justify-center mr-4">
                <item.icon size={24} color="#FF6600" strokeWidth={2} />
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
