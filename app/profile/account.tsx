import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, ChevronDown } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function AccountInfoScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  
  // Mock Data
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '0866904922',
    address: 'Vui lòng nhập địa chỉ của Quý Khách',
    email: '',
    dob: '',
    gender: 'Vui lòng chọn giới tính',
  });

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color={colorScheme === 'dark' ? '#FFF' : '#11181C'} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 dark:text-white mr-10">Thông tin tài khoản</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        {/* Helper Text */}
        <View className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-xl mb-6 border border-amber-100 dark:border-amber-800 flex-row">
          <Text className="text-amber-500 mr-2">!</Text>
          <Text className="text-body text-gray-700 dark:text-amber-100 flex-1 text-sm">
            Quý khách vui lòng nhập đầy đủ thông tin Họ và tên, Số điện thoại và Địa chỉ. Thợ Việt sẽ sử dụng thông tin này để hỗ trợ đặt lịch nhanh chóng và thuận tiện hơn.
          </Text>
        </View>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 dark:text-gray-100 mb-2">Họ và tên <Text className="text-error">*</Text></Text>
          <TextInput 
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-body text-gray-900 dark:text-white"
            placeholder="Vui lòng nhập họ và tên"
            placeholderTextColor={colorScheme === 'dark' ? '#64748b' : '#9ca3af'}
            value={userInfo.name}
            onChangeText={(t) => setUserInfo({...userInfo, name: t})}
          />
        </View>

        {/* Phone */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 dark:text-gray-100 mb-2">Số điện thoại <Text className="text-error">*</Text></Text>
          <TextInput 
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-body text-gray-800 dark:text-gray-200"
            value={userInfo.phone}
            editable={false} // Phone is usually fixed or requires OTP to change
          />
        </View>

         {/* Address */}
         <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 dark:text-gray-100 mb-2">Địa chỉ <Text className="text-error">*</Text></Text>
          <View className="flex-row items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4">
            <TextInput 
               className="flex-1 py-3 text-body text-gray-900 dark:text-white"
               value={userInfo.address}
               placeholderTextColor={colorScheme === 'dark' ? '#64748b' : '#9ca3af'}
               onChangeText={(t) => setUserInfo({...userInfo, address: t})}
            />
            <MapPin size={20} color="#FF6600" />
          </View>
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 dark:text-gray-100 mb-2">Email</Text>
          <TextInput 
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-body text-gray-900 dark:text-white"
            placeholder="Vui lòng nhập email"
            placeholderTextColor={colorScheme === 'dark' ? '#64748b' : '#9ca3af'}
            value={userInfo.email}
            onChangeText={(t) => setUserInfo({...userInfo, email: t})}
          />
        </View>

        {/* DOB (Mock Date Picker) */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 dark:text-gray-100 mb-2">Ngày sinh</Text>
          <TouchableOpacity className="flex-row items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 justify-between">
            <Text className="text-body text-gray-500 dark:text-gray-400">{userInfo.dob || 'Vui lòng chọn ngày sinh'}</Text>
            <Calendar size={20} color="#FF6600" />
          </TouchableOpacity>
        </View>

         {/* Gender (Mock Select) */}
         <View className="mb-8">
          <Text className="text-body font-bold text-gray-900 dark:text-gray-100 mb-2">Giới tính</Text>
          <TouchableOpacity className="flex-row items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 justify-between">
            <Text className="text-body text-gray-500 dark:text-gray-400">{userInfo.gender}</Text>
            <ChevronDown size={20} color="#9BA1A6" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-gray-100 dark:bg-slate-800 py-4 rounded-xl items-center mb-10">
           <Text className="text-gray-400 dark:text-gray-500 font-bold text-lg">Cập nhật thông tin</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

