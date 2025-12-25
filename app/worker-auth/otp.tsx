import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Lock } from 'lucide-react-native';

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<TextInput[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Mock Verify
    router.push('/worker-auth/kyc');
  };

  const isFull = otp.every(d => d.length > 0);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="px-5 pt-2">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800">
          <ArrowLeft size={24} color="#11181C" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 pt-10" contentContainerStyle={{ alignItems: 'center' }}>
        <View className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mb-6">
           <Lock size={32} color="#0068FF" />
        </View>

        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Nhập mã xác thực</Text>
        <Text className="text-body text-gray-500 dark:text-gray-400 mb-8 text-center px-4">
          Mã xác thực đã được gửi đến số điện thoại <Text className="font-bold text-gray-900 dark:text-white">{phone}</Text>
        </Text>

        <View className="flex-row justify-between w-full mb-10 px-2">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => { if (el) inputs.current[index] = el; }}
              className={`w-12 h-14 border rounded-xl text-center text-2xl font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white ${digit ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-gray-700'}`}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(t) => handleOtpChange(t, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                   inputs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity 
          className={`w-full py-4 rounded-xl items-center shadow-lg ${isFull ? 'bg-amber-400 shadow-amber-200' : 'bg-gray-200 dark:bg-slate-800'}`}
          onPress={handleVerify}
          disabled={!isFull}
        >
          <Text className={`font-bold text-lg ${isFull ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>
            Xác thực
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-6">
          <Text className="text-primary font-bold">Gửi lại mã</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
