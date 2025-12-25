import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock } from 'lucide-react-native';


// Mock Data
const activeJobs = [
  {
    id: '25122737854',
    title: 'Hàn sắt tại nhà (Giảm giá 10% nhân công)',
    address: 'Nhà, 54 D Bá Trạc, Chánh Hưng, Hồ Chí Minh',
    time: '27-12-2025',
    status: 'Đã hủy', // 'Đã hủy' | 'Đang tìm' | 'Đã nhận'
    statusColor: '#D50000', // Error red
  },
  {
    id: '25122737855',
    title: 'Sửa chữa điện nước',
    address: '123 Nguyễn Văn Cừ, Q5, TP.HCM',
    time: '28-12-2025',
    status: 'Đang tìm thợ',
    statusColor: '#FF6600', // Secondary Orange
  }
];

const completedJobs = [
  {
    id: '2411200001',
    title: 'Vệ sinh máy lạnh (2HP)',
    address: '45 Lê Thánh Tôn, Q1, TP.HCM',
    time: '20-11-2025',
    status: 'Hoàn thành',
    statusColor: '#00C853', // Success Green
  }
];

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<'booked' | 'completed'>('booked');

  const data = activeTab === 'booked' ? activeJobs : completedJobs;

  const renderItem = ({ item }: { item: typeof activeJobs[0] }) => (
    <View className="bg-white dark:bg-slate-900 p-4 mb-3 mx-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <Text className="text-amber-500 font-bold text-xs mb-1">#{item.id}</Text>
      <Text className="text-body font-bold text-gray-900 dark:text-white mb-2">{item.title}</Text>
      
      <View className="flex-row items-start mb-1">
        <Text className="text-gray-500 dark:text-gray-400 text-xs w-16">Địa chỉ:</Text>
        <Text className="text-gray-700 dark:text-gray-300 text-xs flex-1" numberOfLines={2}>{item.address}</Text>
      </View>
      
      <View className="flex-row items-center mb-3">
        <Text className="text-gray-500 dark:text-gray-400 text-xs w-16">Thời gian:</Text>
        <Text className="text-gray-700 dark:text-gray-300 text-xs">{item.time}</Text>
      </View>

      <View className="flex-row justify-end items-center border-t border-gray-100 dark:border-gray-800 pt-3">
        <View className="flex-row items-center">
          <View 
            className="w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: item.statusColor }} 
          />
          <Text 
            className="font-bold text-xs"
            style={{ color: item.statusColor }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="bg-white dark:bg-slate-900 pt-2 shadow-sm z-10 border-b border-gray-100 dark:border-gray-800">
        <Text className="text-center text-h2 font-bold text-gray-900 dark:text-white mb-4">
          Lịch sử công việc
        </Text>

        {/* Custom Tabs */}
        <View className="flex-row">
          <TouchableOpacity 
            className={`flex-1 items-center pb-3 border-b-2 ${activeTab === 'booked' ? 'border-primary' : 'border-transparent'}`}
            onPress={() => setActiveTab('booked')}
          >
            <Text className={`font-bold text-body ${activeTab === 'booked' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
              Đã đặt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 items-center pb-3 border-b-2 ${activeTab === 'completed' ? 'border-primary' : 'border-transparent'}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text className={`font-bold text-body ${activeTab === 'completed' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
              Đã làm
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20 px-10">
            <Clock size={48} color="#E0E0E0" />
            <Text className="text-gray-400 mt-4 text-center">Chưa có công việc nào trong danh sách này.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

