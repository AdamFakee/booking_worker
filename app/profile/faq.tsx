import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQS = [
  {q: 'Tôi cần đặt thợ thì phải làm thế nào?', a: 'Quý khách vui lòng chọn dịch vụ trên Trang chủ, sau đó chọn "Đặt lịch ngay" và điền đầy đủ thông tin.'},
  {q: 'Đặt lịch trên ứng dụng Thợ Việt tôi được ưu đãi gì?', a: 'Quý khách sẽ được tích điểm thành viên, nhận mã giảm giá và được ưu tiên hỗ trợ nhanh chóng.'},
  {q: 'Ứng dụng Thợ Việt cung cấp những dịch vụ nào?', a: 'Chúng tôi cung cấp đa dạng dịch vụ: Điện, Nước, Điện lạnh, Xây sửa, Vệ sinh, và nhiều dịch vụ khác.'},
  {q: 'Tôi có thể đặt lịch trước không?', a: 'Có. Quý khách hoàn toàn có thể chọn ngày giờ cụ thể trong tương lai để đặt lịch.'},
  {q: 'Thợ đến trong bao lâu sau khi đặt lịch?', a: 'Thông thường thợ sẽ liên hệ trong vòng 15-30 phút để xác nhận và di chuyển tới nơi trong khoảng 1 giờ (nếu đặt gấp).'},
  {q: 'Thợ tới khảo sát, kiểm tra, báo giá có tính phí không?', a: 'Việc khảo sát và báo giá là hoàn toàn miễn phí.'},
  {q: 'Chi phí tính như thế nào?', a: 'Chi phí dựa trên bảng giá niêm yết và khối lượng công việc thực tế sau khi khảo sát.'},
  {q: 'Tôi thấy thợ báo giá cao, không hợp lý thì xử lý như thế nào?', a: 'Quý khách vui lòng liên hệ tổng đài hoặc gửi khiếu nại qua mục "Góp ý dịch vụ".'},
  {q: 'Tôi có thể thanh toán bằng cách nào?', a: 'Quý khách có thể thanh toán tiền mặt trực tiếp cho thợ hoặc chuyển khoản.'},
];

export default function FAQScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color={colorScheme === 'dark' ? '#FFF' : '#11181C'} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 dark:text-white mr-10">Câu hỏi thường gặp</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
         {FAQS.map((item, index) => {
           const isExpanded = expandedIndex === index;
           return (
             <View key={index} className="bg-white dark:bg-slate-900 mb-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
               <TouchableOpacity 
                 className="flex-row items-center p-4 justify-between"
                 activeOpacity={0.7}
                 onPress={() => toggleExpand(index)}
               >
                 <View className="flex-row items-center flex-1 mr-2">
                   <View className="w-8 h-8 rounded-full bg-[#256DC2] dark:bg-[#256DC2] items-center justify-center mr-3">
                     <Text className="text-white font-bold">{index + 1}</Text>
                   </View>
                   <Text className="nav-text text-gray-900 dark:text-white font-medium flex-1 leading-5">{item.q}</Text>
                 </View>
                 {isExpanded ? <ChevronUp size={20} color="#9BA1A6" /> : <ChevronDown size={20} color="#9BA1A6" />}
               </TouchableOpacity>
               
               {isExpanded && (
                 <View className="px-4 pb-4 pl-14 pr-4 bg-gray-50/50 dark:bg-slate-800">
                    <Text className="text-body text-gray-600 dark:text-gray-300 leading-5">{item.a}</Text>
                 </View>
               )}
             </View>
           )
         })}
         <View className="h-10" />
      </ScrollView>

    </SafeAreaView>
  );
}

