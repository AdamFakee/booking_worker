import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

const NEWS_DATA = [
  {
    id: '1',
    title: 'Giải Pháp Nào Chống Thấm Cho Mái Nhà Hiệu Quả?',
    desc: 'Mái nhà là nơi đầu tiên chịu tác động của thời tiết. Tìm hiểu ngay cách bảo vệ ngôi nhà của bạn.',
    date: '25/12/2025',
    image: 'https://images.unsplash.com/photo-1632759145551-dd1b05200474?q=80&w=3540&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Bảng Giá Dịch Vụ Sửa Chữa Điện Nước 2025',
    desc: 'Cập nhật bảng giá mới nhất cho các hạng mục sửa chữa, lắp đặt điện nước dân dụng.',
    date: '24/12/2025',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=3538&auto=format&fit=crop'
  },
  {
    id: '3',
    title: '5 Mẹo Tiết Kiệm Điện Năng Cho Gia Đình',
    desc: 'Những thói quen nhỏ giúp bạn tiết kiệm chi phí tiền điện hàng tháng đáng kể.',
    date: '22/12/2025',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=3540&auto=format&fit=crop'
  }
];

export default function NewsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="bg-white dark:bg-slate-900 pt-2 pb-4 shadow-sm z-10 border-b border-gray-100 dark:border-gray-800">
        <Text className="text-center text-h2 font-bold text-gray-900 dark:text-white">
          Tin tức & Sự kiện
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
         
         {/* Featured Item (First one) */}
         <TouchableOpacity 
           className="mb-8"
           onPress={() => router.push(`/news/${NEWS_DATA[0].id}`)}
           activeOpacity={0.8}
         >
           <View className="h-48 rounded-2xl bg-gray-200 dark:bg-slate-800 mb-4 overflow-hidden">
             <Image 
                source={{ uri: NEWS_DATA[0].image }} 
                className="w-full h-full"
                resizeMode="cover"
             />
             <View className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full">
                <Text className="text-xs font-bold text-primary">Nổi bật</Text>
             </View>
           </View>
           <Text className="text-gray-400 dark:text-gray-500 text-xs mb-2">{NEWS_DATA[0].date}</Text>
           <Text className="text-h2 font-bold text-gray-900 dark:text-white mb-2 leading-7">
             {NEWS_DATA[0].title}
           </Text>
           <Text className="text-body text-gray-600 dark:text-gray-400 leading-6" numberOfLines={3}>
             {NEWS_DATA[0].desc}
           </Text>
         </TouchableOpacity>

         <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-amber-400 pl-3">
           Tin mới nhất
         </Text>

         {/* List Items */}
         <View className="pb-10">
           {NEWS_DATA.slice(1).map((item) => (
             <TouchableOpacity 
               key={item.id}
               className="flex-row mb-6 bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
               onPress={() => router.push(`/news/${item.id}`)}
               activeOpacity={0.7}
             >
               <View className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-slate-800 mr-4 overflow-hidden">
                 <Image 
                    source={{ uri: item.image }} 
                    className="w-full h-full"
                    resizeMode="cover"
                 />
               </View>
               <View className="flex-1 justify-between py-1">
                 <View>
                   <Text className="text-gray-500 dark:text-gray-500 text-[10px] mb-1">{item.date}</Text>
                   <Text className="text-body font-bold text-gray-900 dark:text-white leading-5" numberOfLines={2}>
                     {item.title}
                   </Text>
                 </View>
                 <View className="flex-row items-center">
                    <Text className="text-primary text-xs font-bold mr-1">Xem chi tiết</Text>
                    <ChevronRight size={14} color="#0068FF" />
                 </View>
               </View>
             </TouchableOpacity>
           ))}
         </View>

      </ScrollView>
    </SafeAreaView>
  );
}
