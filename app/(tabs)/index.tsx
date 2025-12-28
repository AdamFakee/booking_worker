import ServiceBottomSheet from '@/components/ServiceBottomSheet';
import { NewsCarousel } from '@/components/home/NewsCarousel';
import { Link, useRouter } from 'expo-router';
import {
  BellIcon,
  Clock, // Updated: For Part-time
  GraduationCap,
  Hammer, // Updated: For Phổ thông
  HardHat, // Updated: For Công nhân
  MoreHorizontal,
  Search,
  ShoppingBag, // Updated: For Giúp việc, bán hàng
  Snowflake,
  Zap // Keep for Điện nước
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Data for the 8-item grid - Updated to match design
const services = [
  { id: '1', title: 'Điện nước', icon: Zap, color: '#E3F2FD', iconColor: '#42A5F5' }, // Blue
  { id: '2', title: 'Công nhân', icon: HardHat, color: '#FFF3E0', iconColor: '#FF7043' }, // Orange - Changed to HardHat
  { id: '3', title: 'Điện lạnh', icon: Snowflake, color: '#E8F5E9', iconColor: '#66BB6A' }, // Green
  { id: '4', title: 'Giúp việc, bán hàng', icon: ShoppingBag, color: '#FCE4EC', iconColor: '#EC407A' }, // Pink - Changed to ShoppingBag
  { id: '5', title: 'Sinh viên', icon: GraduationCap, color: '#E0F7FA', iconColor: '#26C6DA' }, // Cyan
  { id: '6', title: 'Part-time', icon: Clock, color: '#F3E5F5', iconColor: '#AB47BC' }, // Purple - Changed to Clock
  { id: '7', title: 'Phổ thông', icon: Hammer, color: '#EFEBE9', iconColor: '#8D6E63' }, // Brown - Changed to Hammer
  { id: '8', title: '...', icon: MoreHorizontal, color: '#F5F5F5', iconColor: '#757575' }, // Grey
];

// Mock Data for Map Markers (Keep existing)
const workersAround = [
  { id: 1, top: 50, left: 40 },
  { id: 2, top: 120, left: 150 },
  { id: 3, top: 80, left: 280 },
  { id: 4, top: 200, left: 80 },
  { id: 5, top: 180, left: 250 },
];

export default function HomeScreen() {
  const router = useRouter();

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      {/* Custom Header Area - Blue Background */}
      <View 
        style={{ paddingTop: insets.top + 10, paddingBottom: 30 }} 
        className="bg-[#256DC2] px-5 z-20"
      >
        {/* Top Row: User Info & Notification */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
             {/* Logo / Avatar Placeholder */}
             <View className="w-12 h-12 bg-white rounded-lg items-center justify-center mr-3 shadow-sm">
                <Text className="text-[#256DC2] font-extrabold text-xl">4T</Text>
             </View>
             <View>
                <Text className="text-blue-100 text-sm font-medium">Xin chào,</Text>
                <Text className="text-white font-bold text-xl">Nguyễn Văn A</Text>
             </View>
          </View>

          <View className="flex-row items-center gap-3">
             {/* Points Badge */}
             <View className="bg-white flex-row items-center px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-md">
               <View className="w-5 h-5 rounded-full bg-amber-400 items-center justify-center mr-1.5 shadow-sm">
                 <Text className="text-[10px] font-bold text-white">$</Text>
               </View>
               <Text className="text-[#256DC2] font-bold text-xs">1250 điểm</Text>
             </View>
             
             {/* Bell Icon */}
             <TouchableOpacity 
                onPress={() => router.push('/profile/notifications' as any)}
                className="w-10 h-10 items-center justify-center"
             >
                <BellIcon size={25} color="white" />
                <View className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#256DC2]" />
             </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Overlapping Search Bar */}
      <View className="px-5 -mt-6 z-50">
        <Link href="/search" asChild>
          <TouchableOpacity 
            className="flex-row items-center bg-white rounded-2xl px-4 h-14 border border-gray-100"
            style={{ 
              elevation: 4, 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 4 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 12 
            }}
          >
            <Search size={22} color="#9CA3AF" />
            <Text className="flex-1 ml-3 font-medium text-gray-400 text-base">
              Bạn cần tìm thợ gì hôm nay?
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView className="flex-1 bg-[#fefefe]" showsVerticalScrollIndicator={false}>
        
        {/* Service Grid Section */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Thợ & Lao động phổ biến</Text>
          <View className="flex-row flex-wrap justify-between">
            {services.map((service) => (
              <TouchableOpacity 
                key={service.id} 
                className="w-[23%] items-center mb-5"
                activeOpacity={0.7}
                onPress={() => setSelectedService(service)}
              >
                <View 
                  className="w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm"
                  style={{ backgroundColor: service.color }}
                >
                  <service.icon size={26} color={service.iconColor} strokeWidth={1.5} />
                </View>
                <Text 
                  className="text-xs text-center font-medium text-gray-700 leading-4"
                  numberOfLines={2}
                >
                  {service.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Workers Nearby Section */}
        <View className="px-5 mt-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">Thợ gần bạn</Text>
          
          <View className="h-48 bg-[#e9e8e8] rounded-2xl overflow-hidden relative border border-gray-200">
             {/* Simulated Map Background */}
             <View className="absolute inset-0 opacity-60">
                {/* Parks */}
                <View className="absolute top-5 left-10 w-20 h-16 bg-[#cbeecb] rounded-md" />
                <View className="absolute bottom-8 right-12 w-24 h-24 bg-[#cbeecb] rounded-md" />
                <View className="absolute top-[-10] right-[-10] w-32 h-32 bg-[#cbeecb] rounded-full opacity-50" />
                
                {/* Roads */}
                <View className="absolute top-0 left-1/3 w-4 h-full bg-white border-x border-gray-300" />
                <View className="absolute top-1/2 left-0 w-full h-4 bg-white border-y border-gray-300 transform -rotate-6" />
                <View className="absolute top-0 right-1/4 w-3 h-full bg-white shadow-sm" />
                
                {/* Highway */}
                <View className="absolute top-0 left-4 w-3 h-full bg-[#fadd96] border-x border-[#e8c37d]" />
             </View>

             {/* User Location Marker (Center) */}
             <View className="absolute top-1/2 left-1/2 -ml-4 -mt-4 z-10 items-center justify-center">
                <View className="w-16 h-16 bg-blue-500/20 rounded-full absolute animate-pulse" />
                <View className="w-12 h-12 bg-blue-500/10 rounded-full absolute" />
                <View className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm" />
             </View>

             {/* Worker Markers */}
             {workersAround.map((worker) => (
               <View 
                 key={worker.id}
                 className="absolute items-center justify-center"
                 style={{ top: worker.top * 0.8, left: worker.left }} // Adjust scaling slightly
               >
                 <View className="relative items-center">
                    {/* Pin Head */}
                    <View className="w-10 h-10 bg-[#fbbc04] rounded-full p-0.5 shadow-md z-20 border-2 border-white items-center justify-center">
                        <HardHat size={20} color="white" fill="#d97706" />
                    </View>
                    {/* Pin Point */}
                    <View className="w-3 h-3 bg-[#fbbc04] rotate-45 -mt-1.5 z-10" />
                 </View>
               </View>
             ))}

             {/* Google Logo Placeholder */}
             <View className="absolute bottom-1.5 left-2">
                <Text className="text-gray-500 font-sans text-[10px] font-bold opacity-70">Google</Text>
             </View>

             {/* 'Xem bản đồ' Button */}
             <View className="absolute bottom-4 left-0 right-0 items-center justify-center z-30">
                <TouchableOpacity 
                   onPress={() => router.push('/find-worker/map' as any)}
                   className="bg-white px-6 py-2 rounded-full shadow-lg flex-row items-center"
                   activeOpacity={0.9}
                   style={{ 
                      elevation: 4,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.15,
                      shadowRadius: 4
                   }}
                >
                   <Text className="text-[#0f172a] font-bold text-sm">Xem bản đồ</Text>
                </TouchableOpacity>
             </View>
          </View>
        </View>

        {/* News Section */}
        <View className="mt-6">
          <NewsCarousel />
        </View>

      </ScrollView>

      {/* Service Selection Bottom Sheet */}
      <ServiceBottomSheet 
        visible={!!selectedService}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </View>
  );
}



