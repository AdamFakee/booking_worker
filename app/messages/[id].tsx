import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image, Modal, TouchableWithoutFeedback, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Phone, MoreVertical, ShieldCheck } from 'lucide-react-native';

const INITIAL_MESSAGE = "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?";

// Mock Worker Data (Should match the one in profile)
const WORKER = {
  id: '1',
  name: 'Nguyễn Văn A',
  avatar: 'https://i.pravatar.cc/150?u=1',
  verified: true,
  status: 'Online'
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'worker';
  timestamp: Date;
}

export default function ChatScreen() {
  const router = useRouter();
  const { id, role } = useLocalSearchParams();
  const isWorkerParams = role === 'worker';

  // Mock Customer Data for Worker View
  const CUSTOMER = {
    id: 'c1',
    name: 'Trần Văn Khách',
    avatar: 'https://i.pravatar.cc/150?u=10',
    verified: true,
    status: 'Online'
  };

  const displayedUser = isWorkerParams ? CUSTOMER : WORKER;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  // Auto-send initial message
  useEffect(() => {
    // Simulate delay for realism
    const timer = setTimeout(() => {
       const initialMsg: Message = {
         id: 'init-1',
         text: isWorkerParams ? "Bạn có thể đến sớm hơn không?" : INITIAL_MESSAGE,
         sender: isWorkerParams ? 'user' : 'worker',
         timestamp: new Date()
       };
       setMessages([initialMsg]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: isWorkerParams ? 'worker' : 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
       // Use a small timeout to ensure layout is complete
       setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
       }, 100);
    }
  }, [messages]);

  const handlePhoneCall = () => {
    Linking.openURL('tel:0921141901');
    setShowCallModal(false);
  };

  const handleZaloCall = () => {
    Linking.openURL('https://zalo.me/0921141901');
    setShowCallModal(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="mr-3"
        >
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        
        <View className="relative">
           <Image 
             source={{ uri: displayedUser.avatar }} 
             className="w-10 h-10 rounded-full bg-gray-200"
           />
           <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
        </View>

        <View className="flex-1 ml-3">
           <View className="flex-row items-center">
              <Text className="text-body font-bold text-gray-900 dark:text-white mr-1">{displayedUser.name}</Text>
              {displayedUser.verified && <ShieldCheck size={14} color="#00C853" fill="#00C853" />}
           </View>
           <Text className="text-xs text-green-600 font-medium">{displayedUser.status}</Text>
        </View>

        <TouchableOpacity 
           className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full mr-2"
           onPress={() => setShowCallModal(true)}
        >
           <Phone size={20} color="#00C853" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
           <MoreVertical size={20} color="#9BA1A6" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View className="flex-1 bg-gray-50 dark:bg-black px-4">
            <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={({ item }) => {
                // Logic check:
                // If isWorkerParams is true (I am worker), then 'worker' sender is ME.
                // If isWorkerParams is false (I am user), then 'user' sender is ME.
                const isMe = isWorkerParams ? item.sender === 'worker' : item.sender === 'user';
                
                return (
                <View className={`flex-row mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                    <Image 
                        source={{ uri: displayedUser.avatar }} 
                        className="w-8 h-8 rounded-full bg-gray-200 mr-2 self-end mb-1"
                    />
                    )}
                    <View 
                    className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-sm ${
                        isMe 
                        ? 'bg-blue-500 rounded-br-none' 
                        : 'bg-white dark:bg-slate-800 rounded-bl-none border border-gray-100 dark:border-gray-700'
                    }`}
                    >
                    <Text className={`text-base ${isMe ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`}>
                        {item.text}
                    </Text>
                    <Text className={`text-[10px] mt-1 self-end ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                        {formatTime(item.timestamp)}
                    </Text>
                    </View>
                </View>
                );
            }}
            />
        </View>

        {/* Input Area */}
        <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
           <TextInput 
             style={{
                flex: 1,
                backgroundColor: '#F9FAFB', // gray-50
                borderColor: '#E5E7EB', // gray-200
                borderWidth: 1,
                borderRadius: 9999, // full
                paddingHorizontal: 20,
                paddingVertical: 12,
                marginRight: 12,
                maxHeight: 96,
                color: '#11181C', // text-gray-900 
             }}
             placeholder="Nhập tin nhắn..."
             placeholderTextColor="#9BA1A6"
             multiline
             value={inputText}
             onChangeText={setInputText}
           />
           <TouchableOpacity 
             style={{
               width: 48,
               height: 48,
               borderRadius: 24, // full
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: inputText.trim().length > 0 ? '#3B82F6' : '#E5E7EB', // blue-500 : gray-200 (dark: slate-700 not handled effectively in pure inline without hook, but sufficient for fix)
               // Add shadow if active
               ...(inputText.trim().length > 0 ? {
                 shadowColor: '#BFDBFE', // blue-200
                 shadowOffset: { width: 0, height: 4 },
                 shadowOpacity: 0.5,
                 shadowRadius: 10,
                 elevation: 4
               } : {})
             }}
             disabled={inputText.trim().length === 0}
             onPress={sendMessage}
           >
              <Send 
                size={20} 
                color="white" 
                style={{ marginLeft: inputText.trim().length > 0 ? 4 : 0 }} 
              />
           </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Call Options Modal */}
      <Modal
        visible={showCallModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCallModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCallModal(false)}>
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 pb-10">
              <Text className="text-center font-bold text-lg mb-6 text-gray-900 dark:text-white">
                Liên hệ với {displayedUser.name}
              </Text>
              
              <TouchableOpacity 
                className="flex-row items-center bg-green-500 p-4 rounded-xl mb-3"
                onPress={handlePhoneCall}
              >
                <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-4">
                   <Phone size={24} color="white" />
                </View>
                <View>
                   <Text className="text-white font-bold text-base">Gọi điện thoại</Text>
                   <Text className="text-green-100 text-sm">0921.141.901</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                className="flex-row items-center bg-blue-500 p-4 rounded-xl mb-4"
                onPress={handleZaloCall}
              >
                 <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-4">
                   <Text className="text-white font-extrabold text-xl">Z</Text>
                </View>
                 <View>
                   <Text className="text-white font-bold text-base">Liên hệ qua Zalo</Text>
                   <Text className="text-blue-100 text-sm">0921.141.901</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl items-center"
                onPress={() => setShowCallModal(false)}
              >
                <Text className="font-bold text-gray-900 dark:text-white">Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
}
