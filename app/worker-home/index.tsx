import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, AppState, Linking, Alert, ActivityIndicator, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Briefcase, DollarSign, Star, User, LogOut, MapPin } from 'lucide-react-native';
import * as Location from 'expo-location';

import { useAuth } from '@/context/AuthContext';

export default function WorkerHomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const appState = useRef(AppState.currentState);
  const [isOnline, setIsOnline] = useState(true);

  const checkPermissions = async () => {
    try {
      // 1. Check Foreground
      const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
        setHasPermission(false);
        return;
      }

      // 2. Check Background (All Time)
      // Note: On Expo Go, background location might behave differently or be restricted.
      const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();
      
      if (backgroundStatus !== 'granted') {
        setHasPermission(false);
        return;
      }

      setHasPermission(true);
    } catch (error) {
      console.error("Error checking permissions:", error);
      setHasPermission(false);
    }
  };

  const requestPermissions = async () => {
    try {
      // Request Foreground first
      const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
      if (fgStatus !== 'granted') {
         Alert.alert('Cần quyền vị trí', 'Vui lòng cấp quyền vị trí để tiếp tục.', [
            { text: 'Mở cài đặt', onPress: () => Linking.openSettings() }
         ]);
         return;
      }

      // Request Background
      // This often requires taking the user to settings on newer Android versions
      const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (bgStatus === 'granted') {
         setHasPermission(true);
      } else {
         Alert.alert(
            'Yêu cầu "Luôn cho phép"', 
            'Để nhận việc tự động, bạn cần chọn "Luôn cho phép" (Allow all the time) trong cài đặt vị trí.', 
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() }
            ]
         );
      }
    } catch (e) {
        console.log(e);
        Linking.openSettings();
    }
  };

  useEffect(() => {
    checkPermissions();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground, re-check permissions
        checkPermissions();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (hasPermission === null) {
     return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-slate-950">
           <ActivityIndicator size="large" color="#0068FF" />
        </SafeAreaView>
     );
  }

  if (hasPermission === false) {
     return (
        <SafeAreaView className="flex-1 px-6 justify-center items-center bg-white dark:bg-slate-950">
           <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-6">
              <MapPin size={40} color="#EF4444" />
           </View>
           <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Yêu cầu quyền vị trí
           </Text>
           <Text className="text-center text-gray-500 dark:text-gray-400 mb-8 leading-6">
              Để nhận công việc gần bạn, ứng dụng cần quyền truy cập vị trí <Text className="font-bold">&quot;Mọi lúc&quot; (All the time)</Text>. Vui lòng cấp quyền trong cài đặt.
           </Text>
           
           <TouchableOpacity 
             className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-blue-500/30 mb-4"
             onPress={requestPermissions}
           >
              <Text className="text-white font-bold text-lg">Cấp quyền ngay</Text>
           </TouchableOpacity>
           
           <TouchableOpacity onPress={() => signOut()}>
              <Text className="text-gray-400 font-medium">Đăng xuất</Text>
           </TouchableOpacity>
        </SafeAreaView>
     );
  }

  // ... (existing code)

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950">
       {/* (Header remains same) */}
       <View className="px-5 pt-4 pb-6 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 flex-row justify-between items-center">
          <View className="flex-row items-center">
             <View className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-full mr-3 items-center justify-center">
                <User size={24} color="#9CA3AF" />
             </View>
             <View>
                <Text className="text-body text-gray-500 dark:text-gray-400">Xin chào đối tác,</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Nguyễn Văn A</Text>
             </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-full items-center justify-center relative">
               <Bell size={20} color="#6B7280" />
               <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut} className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full items-center justify-center">
               <LogOut size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
       </View>

       <ScrollView className="flex-1 px-5 pt-6">
          {/* Status Card */}
          <View 
            className={`rounded-2xl p-5 mb-6 shadow-xl ${
               isOnline ? 'bg-primary shadow-blue-500/30' : 'bg-gray-500 shadow-gray-500/30'
            }`}
          >
             <Text className="text-blue-100 text-sm mb-1">Trạng thái hoạt động</Text>
             <View className="flex-row items-center justify-between">
                <View>
                   <Text className="text-white text-2xl font-bold">
                      {isOnline ? 'Đang nhận việc' : 'Đang ngoại tuyến'}
                   </Text>
                   <Text className="text-blue-100 text-xs mt-1">
                      {isOnline ? 'Sẵn sàng nhận việc mới' : 'Bạn sẽ không nhận được thông báo việc mới'}
                   </Text>
                </View>
                <Switch
                   trackColor={{ false: "#767577", true: "#81b0ff" }}
                   thumbColor={isOnline ? "#ffffff" : "#f4f3f4"}
                   ios_backgroundColor="#3e3e3e"
                   onValueChange={() => setIsOnline(!isOnline)}
                   value={isOnline}
                   style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                />
             </View>
          </View>

          {/* Stats Grid */}
          <View className="flex-row justify-between mb-8">
             <View className="w-[48%] bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mb-3">
                   <DollarSign size={20} color="#00C853" />
                </View>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">Thu nhập hôm nay</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">500.000đ</Text>
             </View>
             <View className="w-[48%] bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <View className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full items-center justify-center mb-3">
                   <Star size={20} color="#F59E0B" />
                </View>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">Đánh giá trung bình</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">4.9/5</Text>
             </View>
          </View>

          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Công việc mới</Text>
          
          {/* Job List Placeholder */}
          <View className="bg-white dark:bg-slate-900 rounded-2xl p-5 items-center justify-center border border-gray-100 dark:border-gray-800 border-dashed min-h-[150px]">
             <Briefcase size={40} color="#E5E7EB" />
             <Text className="text-gray-400 mt-3 text-center">Chưa có công việc mới nào gần bạn.</Text>
             <Text className="text-gray-400 text-center">Hãy giữ trạng thái Online để nhận việc nhé!</Text>
          </View>

          <View className="h-10" />
       </ScrollView>
    </SafeAreaView>
  );
}
