import WorkerChecklistWidget from '@/components/worker/WorkerChecklistWidget';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { Bell, Briefcase, Lock, LogOut, MapPin, Shield, User } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, AppState, Linking, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';

export default function WorkerHomeScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth(); // Added user to access status
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const appState = useRef(AppState.currentState);
  const [isOnline, setIsOnline] = useState(false); // Default false

  const isVerified = user.verificationStatus === 'verified' || user.verificationStatus === 'vip';

  const checkPermissions = async () => {
    try {
      // 1. Check Foreground
      const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
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
      // Request Foreground
      const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
      if (fgStatus !== 'granted') {
         Alert.alert('Cần quyền vị trí', 'Vui lòng cấp quyền vị trí để ứng dụng hoạt động.', [
            { text: 'Mở cài đặt', onPress: () => Linking.openSettings() }
         ]);
         return;
      }
      
      setHasPermission(true);
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
     // ... (Existing Permission Block)
     return (
        <SafeAreaView className="flex-1 px-6 justify-center items-center bg-white dark:bg-slate-950">
           <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-6">
              <MapPin size={40} color="#EF4444" />
           </View>
           <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Yêu cầu quyền vị trí
           </Text>
           <Text className="text-center text-gray-500 dark:text-gray-400 mb-8 leading-6">
              Để nhận công việc gần bạn, ứng dụng cần quyền truy cập vị trí <Text className="font-bold">&quot;Khi dùng ứng dụng&quot; (While using app)</Text>. Vui lòng cấp quyền trong cài đặt.
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
          {/* INSERT CHECKLIST WIDGET HERE */}
          <WorkerChecklistWidget />

          {/* Status Card */}
          <View 
            className={`rounded-2xl p-5 mb-6 shadow-xl ${
               !isVerified ? 'bg-gray-400' :
               isOnline ? 'bg-primary shadow-blue-500/30' : 'bg-gray-600 shadow-gray-500/30'
            }`}
          >
             <View className="flex-row justify-between items-start">
               <Text className="text-white/80 text-sm mb-1">Trạng thái hoạt động</Text>
               {!isVerified && <Lock size={16} color="white" opacity={0.8} />}
             </View>
             
             <View className="flex-row items-center justify-between">
                <View>
                   <Text className="text-white text-2xl font-bold">
                      {!isVerified ? 'Chưa kích hoạt' : (isOnline ? 'Đang nhận việc' : 'Đang ngoại tuyến')}
                   </Text>
                   <Text className="text-white/80 text-xs mt-1">
                      {!isVerified 
                        ? 'Hoàn tất xác thực để bật nhận việc' 
                        : (isOnline ? 'Sẵn sàng nhận việc mới' : 'Bạn sẽ không nhận được thông báo việc mới')}
                   </Text>
                </View>
                <Switch
                   trackColor={{ false: "#767577", true: "#81b0ff" }}
                   thumbColor={isOnline ? "#ffffff" : "#f4f3f4"}
                   ios_backgroundColor="#3e3e3e"
                   onValueChange={() => {
                        if (!isVerified) {
                            Alert.alert('Chưa kích hoạt', 'Vui lòng hoàn tất danh sách công việc phía trên để mở khóa tính năng nhận việc.');
                            return;
                        }
                        setIsOnline(!isOnline);
                   }}
                   value={isOnline}
                   disabled={!isVerified}
                   style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                />
             </View>
          </View>

          <View className="mb-8">
             <View className="w-full bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mb-3">
                   <Shield size={20} color="#0068FF" />
                </View>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">Trust Score</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Tuyệt vời (98/100)</Text>
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
