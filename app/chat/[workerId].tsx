import { ContactBottomSheet } from '@/components/ContactBottomSheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Mic, Phone, Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock worker data
const WORKERS_DATA: Record<string, { name: string; avatar: string; online: boolean; phone: string }> = {
  '1': { name: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?img=1', online: true, phone: '0921.141.901' },
  '2': { name: 'Trần Văn B', avatar: 'https://i.pravatar.cc/150?img=2', online: false, phone: '0902.345.678' },
  '6': { name: 'Nguyễn Văn F', avatar: 'https://i.pravatar.cc/150?img=6', online: false, phone: '0903.456.789' },
  '7': { name: 'Trần Thị G', avatar: 'https://i.pravatar.cc/150?img=7', online: true, phone: '0904.567.890' },
  '8': { name: 'Lê Thị H', avatar: 'https://i.pravatar.cc/150?img=8', online: false, phone: '0905.678.901' },
};

// Mock messages
const MOCK_MESSAGES = [
  {
    id: '1',
    text: 'Chào anh, em có thể giúp gì cho anh ạ?',
    sender: 'worker',
    timestamp: '09:00',
  },
  {
    id: '2',
    text: 'Chào bạn, tôi cần sửa ống nước bị rò rỉ',
    sender: 'user',
    timestamp: '09:02',
  },
  {
    id: '3',
    text: 'Dạ vâng, anh có thể gửi hình ảnh cho em xem được không ạ?',
    sender: 'worker',
    timestamp: '09:03',
  },
  {
    id: '4',
    text: 'Được, tôi gửi ngay',
    sender: 'user',
    timestamp: '09:05',
  },
  {
    id: '5',
    text: 'Em đã xem hình ảnh rồi ạ. Trường hợp này cần thay ống mới. Chi phí khoảng 300,000đ bao gồm vật tư và công.',
    sender: 'worker',
    timestamp: '09:10',
  },
  {
    id: '6',
    text: 'OK, bạn có thể đến khi nào?',
    sender: 'user',
    timestamp: '09:12',
  },
  {
    id: '7',
    text: 'Vâng, tôi sẽ đến vào 2h chiều nay ạ',
    sender: 'worker',
    timestamp: '10:30',
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const { workerId } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [showContactSheet, setShowContactSheet] = useState(false);

  const worker = WORKERS_DATA[workerId as string] || {
    name: 'Thợ',
    avatar: 'https://i.pravatar.cc/150',
    online: false,
    phone: '0900.000.000',
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => {
    const isUser = item.sender === 'user';
    return (
      <View className={`px-4 mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
        <View
          className={`max-w-[75%] px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-600 rounded-br-sm'
              : 'bg-gray-200 dark:bg-slate-800 rounded-bl-sm'
          }`}
        >
          <Text className={`text-sm ${isUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {item.text}
          </Text>
        </View>
        <Text className="text-xs text-gray-400 mt-1">{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center flex-1"
          onPress={() => router.push(`/find-worker/profile/${workerId}`)}
        >
          <View className="relative mr-3">
            <Image
              source={{ uri: worker.avatar }}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            {worker.online && (
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900 dark:text-white">
              {worker.name}
            </Text>
            <Text className="text-xs text-gray-500">
              {worker.online ? 'Đang hoạt động' : 'Không hoạt động'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowContactSheet(true)}>
          <Phone size={22} className="text-gray-900 dark:text-white" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
          <TouchableOpacity className="mr-3">
            <ImageIcon size={24} color="#0068FF" />
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2">
            <TextInput
              className="flex-1 text-base text-gray-900 dark:text-white"
              placeholder="Nhập tin nhắn..."
              placeholderTextColor="#9BA1A6"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity className="ml-2">
              <Mic size={20} color="#9BA1A6" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`ml-3 w-10 h-10 rounded-full items-center justify-center ${
              message.trim() ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-700'
            }`}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Send size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Contact Bottom Sheet */}
      <ContactBottomSheet
        visible={showContactSheet}
        onClose={() => setShowContactSheet(false)}
        workerName={worker.name}
        phoneNumber={worker.phone}
      />
    </SafeAreaView>
  );
}
