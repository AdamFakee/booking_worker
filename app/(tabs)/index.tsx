import ServiceBottomSheet from '@/components/ServiceBottomSheet';
import { NewsCarousel } from '@/components/home/NewsCarousel';
import { Link, useRouter } from 'expo-router';
import {
    Droplets,
    Hammer,
    MapPin,
    PaintBucket,
    Search,
    ShieldCheck,
    Snowflake,
    Truck,
    User,
    Wrench,
    Zap
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data for the 8-item grid
const services = [
  { id: '1', title: 'Điện', icon: Zap, color: '#E3F2FD', iconColor: '#2196F3' }, // Blue
  { id: '2', title: 'Nước', icon: Droplets, color: '#E0F7FA', iconColor: '#00BCD4' }, // Cyan
  { id: '3', title: 'Điện lạnh', icon: Snowflake, color: '#E8F5E9', iconColor: '#4CAF50' }, // Green
  { id: '4', title: 'Xây sửa', icon: Hammer, color: '#FFF3E0', iconColor: '#FF9800' }, // Orange
  { id: '5', title: 'Thông nghẹt', icon: Wrench, color: '#F3E5F5', iconColor: '#9C27B0' }, // Purple
  { id: '6', title: 'Sơn nhà', icon: PaintBucket, color: '#FCE4EC', iconColor: '#E91E63' }, // Pink
  { id: '7', title: 'Chuyển nhà', icon: Truck, color: '#EFEBE9', iconColor: '#795548' }, // Brown
  { id: '8', title: 'Khác', icon: ShieldCheck, color: '#FAFAFA', iconColor: '#9E9E9E' }, // Grey
];

// Mock Data for Map Markers
const workersAround = [
  { id: 1, top: 50, left: 40 },
  { id: 2, top: 120, left: 150 },
  { id: 3, top: 80, left: 280 },
  { id: 4, top: 200, left: 80 },
  { id: 5, top: 180, left: 250 },
];


// ... (keep existing imports)

export default function HomeScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* ... (keep Header Section) ... */}
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Text className="text-h2 font-bold text-gray-800 dark:text-white mr-2">Worker, xin chào</Text>
              <Text className="text-xl">👋</Text>
            </View>
            
            {/* Points Badge */}
            <View className="bg-amber-100 dark:bg-amber-900/40 flex-row items-center px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
              <View className="w-4 h-4 rounded-full bg-amber-400 items-center justify-center mr-1.5">
                <Text className="text-[10px] font-bold text-white">$</Text>
              </View>
              <Text className="text-amber-700 dark:text-amber-400 font-bold text-caption">0 điểm</Text>
            </View>
          </View>

          {/* Search Bar */}
          <Link href="/search" asChild>
            <TouchableOpacity className="flex-row items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-full px-4 h-12 shadow-sm">
              <Search size={20} color="#9BA1A6" />
              <Text className="flex-1 ml-3 font-medium text-body text-gray-400 dark:text-gray-500">
                Tìm hơn 100+ dịch vụ...
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View className="px-5 mt-2">
          <Text className="text-lg font-bold text-gray-800 dark:text-white mb-4 font-sans">Dịch vụ phổ biến</Text>
          <View className="flex-row flex-wrap justify-between">
            {services.map((service) => (
              <TouchableOpacity 
                key={service.id} 
                className="w-[23%] items-center mb-6"
                activeOpacity={0.7}
                onPress={() => setSelectedService(service)}
              >
                <View 
                  className="w-14 h-14 rounded-full items-center justify-center mb-2 shadow-sm dark:bg-slate-800"
                  style={{ backgroundColor: service.color }}
                >
                  <service.icon size={24} color={service.iconColor} strokeWidth={2} />
                </View>
                <Text className="text-xs text-center font-medium text-gray-700 dark:text-gray-300 leading-4">
                  {service.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>



        {/* ... (keep Map Section) ... */}
        <View className="mt-2">
          <View className="px-5 mb-3 flex-row justify-between items-end">
            <Text className="text-lg font-bold text-gray-800 dark:text-white font-sans">Thợ quanh bạn</Text>
            <View className="flex-row items-center">
               <MapPin size={14} color="#0068FF" />
               <Text className="text-primary text-xs ml-1 font-medium">Quận 1, TP.HCM</Text>
            </View>
          </View>

          {/* Map Container Placeholder */}
          <View className="h-64 bg-gray-100 dark:bg-slate-900 relative w-full overflow-hidden border-t border-gray-200 dark:border-gray-800">
             {/* Fake Map Grid Lines */}
             <View className="absolute top-10 w-full h-1 bg-gray-200 dark:bg-slate-800" />
             <View className="absolute top-32 w-full h-2 bg-gray-200 dark:bg-slate-800 rotate-3" />
             <View className="absolute top-52 w-full h-1 bg-gray-200 dark:bg-slate-800" />
             <View className="absolute left-20 h-full w-2 bg-gray-200 dark:bg-slate-800" />
             <View className="absolute left-60 h-full w-1 bg-gray-200 dark:bg-slate-800" />

             {/* Worker Markers */}
             {workersAround.map((worker) => (
               <View 
                 key={worker.id}
                 className="absolute bg-white dark:bg-slate-800 p-1 rounded-full shadow-md border border-white dark:border-slate-700"
                 style={{ top: worker.top, left: worker.left }}
               >
                 <View className="bg-primary w-8 h-8 rounded-full items-center justify-center">
                    <User size={16} color="white" />
                 </View>
               </View>
             ))}

            {/* Bottom Overlay & Button */}
             <View className="absolute bottom-4 left-5 right-5">
               <TouchableOpacity 
                 className="bg-primary flex-row items-center justify-center py-3 rounded-xl shadow-lg shadow-primary/30"
                 activeOpacity={0.8}
                 onPress={() => router.push('/find-worker/map' as any)}
               >
                 <MapPin size={18} color="white" />
                 <Text className="text-white font-bold ml-2">Xem bản đồ chi tiết</Text>
               </TouchableOpacity>
             </View>
          </View>
        </View>

        <NewsCarousel />
        
        {/* Bottom padding for scroll */}
        <View className="h-10" />
      </ScrollView>

      {/* Service Selection Bottom Sheet */}
      <ServiceBottomSheet 
        visible={!!selectedService}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </SafeAreaView>
  );
}




