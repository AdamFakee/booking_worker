import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin,
  Check
} from 'lucide-react-native';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/context/ToastContext';

const days = [
  { day: 'T4', date: '25' },
  { day: 'T5', date: '26' },
  { day: 'T6', date: '27' },
  { day: 'T7', date: '28' },
  { day: 'CN', date: '29' },
];

const timeSlots = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
];

// 1. Define Zod Schema
const bookingSchema = z.object({
  jobContent: z.string().min(1, "Vui lòng nhập nội dung công việc"),
  address: z.string().min(5, "Địa chỉ phải chi tiết hơn (tối thiểu 5 ký tự)"),
  phone: z.string().regex(/^(0|\+84)(\s?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])(\d)(\s?|\.)(\d{3})(\s?|\.)(\d{3})$/, "Số điện thoại không hợp lệ"),
  fullName: z.string().min(2, "Vui lòng nhập họ và tên đầy đủ"),
  note: z.string().optional(),
  isSurvey: z.boolean(),
  selectedDay: z.number(),
  selectedTime: z.string().min(1, "Vui lòng chọn giờ làm việc"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingScreen() {
  const router = useRouter();
  const { serviceName } = useLocalSearchParams();
  const { showToast } = useToast();

  const defaultContent = typeof serviceName === 'string' ? serviceName : '';

  // 2. Initialize Form
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      jobContent: defaultContent,
      address: '',
      phone: '',
      fullName: '',
      note: '',
      isSurvey: false,
      selectedDay: 0,
      selectedTime: '',
    }
  });

  const selectedDay = watch('selectedDay');
  const selectedTime = watch('selectedTime');
  const isSurveyChecked = watch('isSurvey');

  // 3. Submit Handler
  const onSubmit = (data: BookingFormData) => {
    console.log("Form Data:", data);
    
    // Simulate API Call
    showToast("Đặt lịch thành công! Thợ sẽ liên hệ sớm.", "success");
    
    // Navigate back to Home after delay
    setTimeout(() => {
      router.dismissAll();
    }, 1500);
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
    showToast("Vui lòng kiểm tra lại thông tin còn thiếu", "error");
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-50"
        >
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h2 font-bold text-gray-900 mr-10">
          Đặt lịch nhanh chóng
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Nội dung công việc */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 mb-2">Nội dung công việc <Text className="text-error">*</Text></Text>
          <Controller
            control={control}
            name="jobContent"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput 
                className={`bg-white border rounded-xl px-4 py-3 text-body text-gray-800 ${errors.jobContent ? 'border-error' : 'border-gray-200'}`}
                placeholder="Nhập nội dung công việc"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.jobContent && <Text className="text-error text-xs mt-1">{errors.jobContent.message}</Text>}
        </View>

        {/* Checkbox Khảo sát */}
        <TouchableOpacity 
          className="flex-row items-start mb-6"
          activeOpacity={0.8}
          onPress={() => setValue('isSurvey', !isSurveyChecked)}
        >
          <View className={`w-5 h-5 rounded border mr-3 items-center justify-center ${isSurveyChecked ? 'bg-primary border-primary' : 'bg-white border-gray-400'}`}>
            {isSurveyChecked && <Check size={14} color="white" strokeWidth={3} />}
          </View>
          <Text className="text-body text-gray-700 font-medium flex-1 leading-5">
            Khảo sát tư vấn tận nơi, báo giá trước miễn phí
          </Text>
        </TouchableOpacity>

        {/* Địa chỉ */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 mb-2">Địa chỉ <Text className="text-error">*</Text></Text>
          <View className={`flex-row items-center bg-white border rounded-xl px-4 h-12 ${errors.address ? 'border-error' : 'border-gray-200'}`}>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                  className="flex-1 text-body text-gray-800"
                  placeholder="Vui lòng nhập địa chỉ cụ thể"
                  placeholderTextColor="#9BA1A6"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity>
               <MapPin size={20} color="#FF6600" />
            </TouchableOpacity>
          </View>
          {errors.address && <Text className="text-error text-xs mt-1">{errors.address.message}</Text>}
        </View>

        {/* Số điện thoại */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 mb-2">Số điện thoại <Text className="text-error">*</Text></Text>
          <View className={`flex-row items-center bg-white border rounded-xl h-12 overflow-hidden ${errors.phone ? 'border-error' : 'border-gray-200'}`}>
            <View className="w-20 bg-gray-50 items-center justify-center h-full border-r border-gray-100 flex-row">
              <Text className="text-lg mr-1">🇻🇳</Text>
              <Text className="text-body font-bold text-gray-700">+84</Text>
            </View>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                  className="flex-1 px-4 text-body text-gray-800"
                  placeholder="Số điện thoại của Quý Khách"
                  placeholderTextColor="#9BA1A6"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.phone && <Text className="text-error text-xs mt-1">{errors.phone.message}</Text>}
        </View>

        {/* Họ và tên */}
        <View className="mb-4">
          <Text className="text-body font-bold text-gray-900 mb-2">Họ và tên <Text className="text-error">*</Text></Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput 
                className={`bg-white border rounded-xl px-4 py-3 text-body text-gray-800 ${errors.fullName ? 'border-error' : 'border-gray-200'}`}
                placeholder="Vui lòng nhập họ và tên"
                placeholderTextColor="#9BA1A6"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fullName && <Text className="text-error text-xs mt-1">{errors.fullName.message}</Text>}
        </View>

        {/* Ghi chú */}
        <View className="mb-2">
          <Text className="text-body font-bold text-gray-900 mb-2">Ghi chú cho thợ</Text>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput 
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-body text-gray-800 h-24"
                placeholder="Vui lòng nhập ghi chú nếu có"
                placeholderTextColor="#9BA1A6"
                multiline
                textAlignVertical="top"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <Text className="text-caption text-gray-400 italic mb-6">
          Gợi ý:{"\n"}
          - Nhập thêm địa chỉ, số căn hộ, tháp chung cư...{"\n"}
          - Nhập thêm tình trạng thiết bị cần sửa, mang thang cao...
        </Text>

        {/* Chọn ngày & giờ */}
        <View className="mb-8">
          <Text className="text-body font-bold text-gray-900 mb-3">Chọn ngày & giờ <Text className="text-error">*</Text></Text>
          
          {/* Days */}
          <View className="flex-row justify-between mb-4">
            {days.map((item, index) => (
              <TouchableOpacity 
                key={index}
                activeOpacity={0.7}
                onPress={() => setValue('selectedDay', index)}
                className={`items-center justify-center w-[18%] py-3 rounded-xl border ${selectedDay === index ? 'bg-amber-400 border-amber-400' : 'bg-white border-gray-200'}`}
              >
                <Text className={`font-bold ${selectedDay === index ? 'text-white' : 'text-gray-500'}`}>{item.day}</Text>
                <Text className={`text-xs mt-1 ${selectedDay === index ? 'text-white' : 'text-gray-400'}`}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Slots */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => setValue('selectedTime', time, { shouldValidate: true })}
                className={`px-4 py-2 rounded-xl border mr-3 ${selectedTime === time ? 'bg-primary border-primary' : `bg-white ${errors.selectedTime ? 'border-error' : 'border-gray-200'}`}`}
              >
                <Text className={`font-medium ${selectedTime === time ? 'text-white' : 'text-gray-600'}`}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.selectedTime && <Text className="text-error text-xs mt-2">{errors.selectedTime.message}</Text>}
        </View>


        <View className="h-24" />
      </ScrollView>

      {/* Button đặt lịch */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-lg">
        <TouchableOpacity 
          className="bg-primary py-4 rounded-xl items-center shadow-md shadow-blue-200"
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit, onError)}
        >
          <Text className="text-white text-h2 font-bold">Đặt lịch ngay</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

