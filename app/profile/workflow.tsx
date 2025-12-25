import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, PhoneCall, Search, CheckCircle2, ClipboardSignature } from 'lucide-react-native';

const STEPS = [
  {
    id: 1,
    title: 'Chọn dịch vụ & đặt lịch',
    desc: 'Chọn dịch vụ, ngày giờ theo theo thời gian của Khách hàng và tạo lịch hẹn.',
    icon: Calendar,
    color: '#FFD740'
  },
  {
    id: 2,
    title: 'Trao đổi & tư vấn',
    desc: 'Thợ sẽ liên hệ trao đổi, tư vấn chi tiết về dịch vụ, khoảng giá, thời gian thi công.',
    icon: PhoneCall,
    color: '#FFD740'
  },
  {
    id: 3,
    title: 'Khảo sát & báo giá',
    desc: 'Thợ đến tận nhà để khảo sát thực tế, báo giá chính xác chi phí không phát sinh, quy trình này hoàn toàn miễn phí.',
    icon: Search,
    color: '#FFD740'
  },
  {
    id: 4,
    title: 'Đồng ý & thi công',
    desc: 'Khách hàng đồng ý, thợ sẽ tiến hành thi công dịch vụ theo đúng yêu cầu và thời gian đã trao đổi.',
    icon: CheckCircle2,
    color: '#FFD740'
  },
  {
    id: 5,
    title: 'Kiểm tra & nghiệm thu',
    desc: 'Khách hàng nghiệm thu những hạng mục thi công và thanh toán kết thúc đơn hàng.',
    icon: ClipboardSignature,
    color: '#FFD740'
  },
];

export default function WorkflowScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50">
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 mr-10">Quy trình làm việc</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-8" showsVerticalScrollIndicator={false}>
         {STEPS.map((step, index) => (
           <View key={step.id} className="flex-row mb-2 relative">
             {/* Connector Line */}
             {index !== STEPS.length - 1 && (
               <View className="absolute left-[26px] top-14 bottom-[-16px] w-[2px] bg-amber-100 z-0" />
             )}

             {/* Number Circle */}
             <View className="mr-6 z-10 relative">
               <View className="w-14 h-14 rounded-full bg-amber-400 items-center justify-center border-4 border-white shadow-sm">
                 <Text className="text-xl font-bold text-gray-900">{step.id}</Text>
               </View>
             </View>

             {/* Content Card */}
             <View className="flex-1 bg-white p-5 rounded-2xl border border-gray-100 mb-6 shadow-sm">
               <View className="flex-row items-center mb-3">
                 <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center mr-3">
                   <step.icon size={20} color="#FFA000" />
                 </View>
                 <Text className="flex-1 text-lg font-bold text-gray-800">{step.title}</Text>
               </View>
               <Text className="text-gray-600 leading-5 text-sm">
                 {step.desc}
               </Text>
             </View>
           </View>
         ))}
         <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
