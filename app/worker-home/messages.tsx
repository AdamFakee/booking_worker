import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

const MOCK_CONVERSATIONS = [
  {
    id: 'c1',
    user: {
      name: 'Trần Văn Khách',
      avatar: 'https://i.pravatar.cc/150?u=10',
    },
    lastMessage: 'Bạn có thể đến sớm hơn không?',
    time: '10:30',
    unread: 2,
  },
  {
    id: 'c2',
    user: {
      name: 'Lê Thị Hạnh',
      avatar: 'https://i.pravatar.cc/150?u=20',
    },
    lastMessage: 'Cảm ơn anh nhé, làm tốt lắm!',
    time: 'Hôm qua',
    unread: 0,
  },
  {
    id: 'c3',
    user: {
      name: 'Nguyễn Văn Nam',
      avatar: 'https://i.pravatar.cc/150?u=30',
    },
    lastMessage: 'Giá này có bao gồm vật tư chưa?',
    time: 'Hôm qua',
    unread: 0,
  },
];

export default function WorkerMessagesScreen() {
  const router = useRouter();

  const handlePress = (id: string) => {
    // Navigate to shared chat screen. 
    // Pass role='worker' so the chat screen knows to show Customer info
    router.push(`/messages/${id}?role=worker` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      <View className="px-5 pt-4 pb-2 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
         <Text className="text-h1 font-bold text-gray-900 dark:text-white mb-4">Tin nhắn</Text>
         
         {/* Search */}
         <View className="flex-row items-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 h-11 mb-2">
            <Search size={20} color="#9BA1A6" />
            <TextInput 
              className="flex-1 ml-3 text-body"
              placeholder="Tìm kiếm tin nhắn..."
              placeholderTextColor="#9BA1A6"
            />
         </View>
      </View>

      <FlatList 
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row items-center bg-white dark:bg-slate-900 p-4 rounded-xl mb-3 border border-gray-100 dark:border-gray-800 shadow-sm active:bg-gray-50 dark:active:bg-slate-800"
            onPress={() => handlePress(item.id)}
          >
             <View className="relative mr-4">
                <Image 
                  source={{ uri: item.user.avatar }} 
                  className="w-14 h-14 rounded-full bg-gray-200"
                />
                {/* Online Status Mock */}
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
             </View>
             
             <View className="flex-1">
                <View className="flex-row justify-between mb-1">
                   <Text className="text-body font-bold text-gray-900 dark:text-white">{item.user.name}</Text>
                   <Text className="text-xs text-gray-400">{item.time}</Text>
                </View>
                <Text 
                  className={`text-sm ${item.unread > 0 ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-500 dark:text-gray-400'}`} 
                  numberOfLines={1}
                >
                   {item.lastMessage}
                </Text>
             </View>

             {item.unread > 0 && (
                <View className="ml-2 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                   <Text className="text-[10px] font-bold text-white">{item.unread}</Text>
                </View>
             )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
