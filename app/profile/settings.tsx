import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Globe,
    Moon,
    Smartphone,
    Sun
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from 'nativewind';

export default function SettingsScreen() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  // States
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} className="text-gray-900 dark:text-white" color={colorScheme === 'dark' ? '#FFF' : '#11181C'} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 dark:text-white mr-10">Cài đặt</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Section: General */}
        <Text className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs mb-3 px-2">Chung</Text>
        <View className="bg-white dark:bg-slate-900 rounded-2xl mb-6 overflow-hidden border border-gray-100 dark:border-gray-800">
          
          {/* Language */}
          <View className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800">
             <View className="w-9 h-9 bg-purple-50 dark:bg-purple-900/30 rounded-full items-center justify-center mr-3">
               <Globe size={18} color="#9C27B0" />
             </View>
             <Text className="flex-1 text-body font-medium text-gray-800 dark:text-gray-200">Ngôn ngữ</Text>
             <View className="flex-row items-center bg-gray-50 dark:bg-slate-800 rounded-lg p-1">
               <TouchableOpacity 
                 className={`px-3 py-1 rounded-md ${language === 'vi' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                 onPress={() => setLanguage('vi')}
               >
                 <Text className={`text-xs ${language === 'vi' ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Tiếng Việt</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                 className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                 onPress={() => setLanguage('en')}
               >
                 <Text className={`text-xs ${language === 'en' ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>English</Text>
               </TouchableOpacity>
             </View>
          </View>

          {/* Theme */}
          <View className="flex-row items-center p-4">
             <View className="w-9 h-9 bg-orange-50 dark:bg-orange-900/30 rounded-full items-center justify-center mr-3">
               {colorScheme === 'dark' ? <Moon size={18} color="#EF6C00" /> : <Sun size={18} color="#EF6C00" />}
             </View>
             <Text className="flex-1 text-body font-medium text-gray-800 dark:text-gray-200">Giao diện tối (Dark Mode)</Text>
             <Switch 
               value={colorScheme === 'dark'} 
               onValueChange={toggleColorScheme}
               trackColor={{ false: "#e0e0e0", true: "#0068FF" }}
               thumbColor={"#FFFFFF"}
             />
          </View>
        </View>


        {/* Section: Notifications */}
        <Text className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs mb-3 px-2">Thông báo</Text>
        <View className="bg-white dark:bg-slate-900 rounded-2xl mb-6 overflow-hidden border border-gray-100 dark:border-gray-800">
          <TouchableOpacity 
            className="flex-row items-center p-4"
            onPress={() => router.push('/profile/notification-settings' as any)}
            activeOpacity={0.7}
          >
             <View className="w-9 h-9 bg-red-50 dark:bg-red-900/30 rounded-full items-center justify-center mr-3">
               <Bell size={18} color="#D32F2F" />
             </View>
             <View className="flex-1">
               <Text className="text-body font-medium text-gray-800 dark:text-gray-200">Cài đặt thông báo</Text>
               <Text className="text-caption text-gray-500 dark:text-gray-400">Quản lý thông báo hệ thống, tin nhắn...</Text>
             </View>
             <ChevronRight size={20} color="#9BA1A6" />
          </TouchableOpacity>
        </View>

        {/* Section: Build Info */}
        <Text className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs mb-3 px-2">Thông tin ứng dụng</Text>
        <View className="bg-white dark:bg-slate-900 rounded-2xl mb-10 overflow-hidden border border-gray-100 dark:border-gray-800">
          <View className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800">
             <View className="w-9 h-9 bg-gray-100 dark:bg-slate-800 rounded-full items-center justify-center mr-3">
               <Smartphone size={18} className="text-gray-600 dark:text-gray-400" color="#455A64" />
             </View>
             <Text className="flex-1 text-body font-medium text-gray-800 dark:text-gray-200">Phiên bản</Text>
             <Text className="text-body text-gray-500 dark:text-gray-400">1.0.0 (Build 20251225)</Text>
          </View>
           <TouchableOpacity className="flex-row items-center p-4">
             <Text className="flex-1 text-body font-medium text-error flex text-center">Xóa tài khoản vĩnh viễn</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}
