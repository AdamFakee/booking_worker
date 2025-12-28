import { useRouter } from 'expo-router';
import { MessageCircle, Search } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data for conversations
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    workerId: '1',
    workerName: 'Nguyễn Văn A',
    workerAvatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Vâng, tôi sẽ đến vào 2h chiều nay ạ',
    timestamp: '10:30',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    workerId: '6',
    workerName: 'Nguyễn Văn F',
    workerAvatar: 'https://i.pravatar.cc/150?img=6',
    lastMessage: 'Cảm ơn anh đã tin tưởng sử dụng dịch vụ',
    timestamp: 'Hôm qua',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    workerId: '7',
    workerName: 'Trần Thị G',
    workerAvatar: 'https://i.pravatar.cc/150?img=7',
    lastMessage: 'Anh có thể gửi hình ảnh điều hòa được không ạ?',
    timestamp: 'Hôm qua',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    workerId: '2',
    workerName: 'Trần Văn B',
    workerAvatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Đã hoàn thành công việc',
    timestamp: '2 ngày trước',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    workerId: '8',
    workerName: 'Lê Thị H',
    workerAvatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Tôi sẽ đến sớm hơn 15 phút nhé anh',
    timestamp: '3 ngày trước',
    unread: 1,
    online: false,
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleConversationPress = (workerId: string) => {
    router.push(`/chat/${workerId}`);
  };

  const renderConversation = ({ item }: { item: typeof MOCK_CONVERSATIONS[0] }) => (
    <TouchableOpacity
      className="flex-row items-center px-5 py-4 bg-white border-b border-gray-100 active:bg-gray-50"
      onPress={() => handleConversationPress(item.workerId)}
    >
      {/* Avatar with online indicator */}
      <View className="relative mr-3">
        <Image
          source={{ uri: item.workerAvatar }}
          className="w-14 h-14 rounded-full bg-gray-200"
        />
        {item.online && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </View>

      {/* Message Info */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-bold text-gray-900">
            {item.workerName}
          </Text>
          <Text className="text-xs text-gray-400">{item.timestamp}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-sm flex-1 ${
              item.unread > 0
                ? 'text-gray-900 font-semibold'
                : 'text-gray-500'
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="ml-2 bg-[#256DC2] rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#fefefe]">
      {/* Header */}
      <View 
        style={{ paddingTop: insets.top + 10, paddingBottom: 20 }} 
        className="bg-white px-5 border-b border-gray-100"
      >
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-2xl font-bold text-[#256DC2]">
            Tin nhắn
          </Text>
          <TouchableOpacity className="p-2 bg-gray-50 rounded-full">
            <Search size={24} color="#256DC2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-20">
            <MessageCircle size={64} color="#9BA1A6" />
            <Text className="text-gray-400 mt-4 text-base">Chưa có tin nhắn nào</Text>
            <Text className="text-gray-400 text-sm mt-2 px-10 text-center">
              Bắt đầu trò chuyện với thợ để đặt lịch và trao đổi công việc
            </Text>
          </View>
        )}
      />
    </View>
  );
}
