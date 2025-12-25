import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MessageSquare } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const REASONS = [
  'Chất lượng công việc chưa đạt yêu cầu.',
  'Giá dịch vụ chưa minh bạch hoặc chưa hợp lý.',
  'Thợ có thái độ chưa chuyên nghiệp, thiếu tôn trọng Khách hàng.',
  'Trang phục, tác phong của thợ chưa chỉnh chu.',
  'Thợ đến trễ hoặc thay đổi lịch hẹn không báo trước.',
  'Không vệ sinh sau khi hoàn thành công việc.',
  'Không giải thích rõ nguyên nhân sự cố, tư vấn không đầy đủ.',
  'Không tuân thủ quy trình an toàn lao động.'
];

export default function FeedbackScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const toggleReason = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color={colorScheme === 'dark' ? '#FFF' : '#11181C'} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 dark:text-white mr-10">Góp ý dịch vụ</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center py-6 px-5">
           <View className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 rounded-full items-center justify-center mb-4">
             <MessageSquare size={32} color="#FFA000" />
           </View>
           <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chia sẻ ý kiến</Text>
           <Text className="text-center text-gray-500 dark:text-gray-400 leading-5">
             Thông tin góp ý, khiếu nại của Quý Khách sẽ được gửi tới Ban Quản lý nhằm cải thiện chất lượng dịch vụ tốt hơn, Công ty xin chân thành cảm ơn!
           </Text>
        </View>

        <View className="bg-white dark:bg-slate-900 mx-4 rounded-xl p-4 mb-4 dark:border dark:border-gray-800">
          {REASONS.map((reason, index) => {
            const isSelected = selectedReasons.includes(reason);
            return (
              <TouchableOpacity 
                key={index} 
                className={`flex-row items-start mb-4`}
                onPress={() => toggleReason(reason)}
                activeOpacity={0.7}
              >
                <View className={`w-5 h-5 rounded-full mr-3 items-center justify-center mt-0.5 ${isSelected ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
                   {isSelected && <View className="w-2 h-2 bg-white rounded-full" />}
                </View>
                <Text className={`flex-1 text-body ${isSelected ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                  {reason}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        
        <View className="px-4 mb-10">
           <TextInput 
             className="bg-white dark:bg-slate-900 p-4 rounded-xl text-body h-32 border border-blue-50 dark:border-gray-700 text-gray-900 dark:text-white"
             placeholder="Để lại nhận xét của Khách hàng..."
             placeholderTextColor={colorScheme === 'dark' ? '#64748b' : '#9ca3af'}
             multiline
             textAlignVertical="top"
             value={comment}
             onChangeText={setComment}
           />
        </View>

      </ScrollView>

      {/* Footer Button */}
      <View className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
        <TouchableOpacity 
          className={`py-4 rounded-xl items-center ${comment.length > 0 ? 'bg-amber-400' : 'bg-gray-200 dark:bg-slate-800'}`}
          disabled={comment.length === 0}
        >
          <Text className={`${comment.length > 0 ? 'text-white' : 'text-gray-400 dark:text-gray-500'} font-bold text-lg`}>Gửi phản hồi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

