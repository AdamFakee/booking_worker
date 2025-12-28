import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TermsScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color={colorScheme === 'dark' ? '#FFF' : '#11181C'} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 dark:text-white mr-10">Điều khoản sử dụng</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Intro Card */}
        <View className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl mb-6 border border-blue-100 dark:border-blue-800 items-center">
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full items-center justify-center mb-3">
              <FileText size={24} color="#0068FF" />
            </View>
            <Text className="text-center text-body text-gray-700 dark:text-gray-300 leading-5">
              Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng dịch vụ của Thợ Việt. Việc bạn sử dụng ứng dụng đồng nghĩa với việc bạn chấp nhận các điều khoản này.
            </Text>
        </View>

        {/* Section 1 */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Giới thiệu dịch vụ</Text>
          <Text className="text-body text-gray-600 dark:text-gray-400 leading-6 text-justify">
            Thợ Việt là nền tảng kết nối khách hàng có nhu cầu sửa chữa, bảo dưỡng với các thợ lành nghề. Chúng tôi chỉ cung cấp nền tảng công nghệ và không trực tiếp thực hiện dịch vụ thi công trừ khi có thỏa thuận riêng.
          </Text>
        </View>

        {/* Section 2 */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Trách nhiệm của Khách hàng</Text>
          <View className="space-y-2">
            <View className="flex-row items-start mb-2">
              <CheckCircle size={16} color="#00C853" style={{ marginTop: 4, marginRight: 8 }} />
              <Text className="flex-1 text-gray-600 dark:text-gray-400 leading-5">Cung cấp thông tin chính xác về địa điểm, số điện thoại và nội dung công việc.</Text>
            </View>
            <View className="flex-row items-start mb-2">
              <CheckCircle size={16} color="#00C853" style={{ marginTop: 4, marginRight: 8 }} />
              <Text className="flex-1 text-gray-600 dark:text-gray-400 leading-5">Thanh toán đầy đủ chi phí dịch vụ sau khi nghiệm thu công việc.</Text>
            </View>
            <View className="flex-row items-start mb-2">
               <CheckCircle size={16} color="#00C853" style={{ marginTop: 4, marginRight: 8 }} />
               <Text className="flex-1 text-gray-600 dark:text-gray-400 leading-5">Tôn trọng và cư xử văn minh với đối tác (thợ) của chúng tôi.</Text>
            </View>
          </View>
        </View>

        {/* Section 3 */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Chính sách bảo hành</Text>
          <Text className="text-body text-gray-600 dark:text-gray-400 leading-6 text-justify">
            Các dịch vụ sửa chữa thông qua Thợ Việt đều được bảo hành tùy theo hạng mục. Thời gian bảo hành từ 1 đến 12 tháng. Vui lòng giữ lại phiếu thu hoặc hóa đơn điện tử để được hỗ trợ tốt nhất.
          </Text>
        </View>

        {/* Section 4 */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">4. Giải quyết khiếu nại</Text>
          <Text className="text-body text-gray-600 dark:text-gray-400 leading-6 text-justify">
            Mọi khiếu nại về chất lượng dịch vụ cần được gửi về bộ phận CSKH trong vòng 24h kể từ khi hoàn thành công việc. Chúng tôi cam kết xử lý và phản hồi trong thời gian sớm nhất.
          </Text>
        </View>

        {/* Updated Date */}
        <Text className="text-center text-caption text-gray-400 italic mb-10">
          Cập nhật lần cuối: 25/12/2025
        </Text>

      </ScrollView>

      {/* Accept Button */}
      <View 
        className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <TouchableOpacity 
          className="bg-[#256DC2] py-4 rounded-xl items-center"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-lg">Tôi đã hiểu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

