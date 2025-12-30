import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState(1); // 1: Input Phone, 2: Input OTP
  const inputs = useRef<TextInput[]>([]);

  const handleSendOtp = async () => {
    if (phone.length < 9) {
        Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
        return;
    }
    try {
        await authService.login(phone);
        setStep(2);
    } catch (error) {
        Alert.alert('Lỗi', 'Không thể gửi mã xác thực. Vui lòng thử lại.');
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    try {
        const res = await authService.verify(phone, otp.join(''));
        if (res.success) {
            await signIn(res.token, res.user);
            Alert.alert('Thành công', 'Đăng nhập thành công', [
                { text: 'OK', onPress: () => router.replace('/(tabs)') }
            ]);
        } else {
            Alert.alert('Lỗi', res.message || 'Mã xác thực không đúng');
        }
    } catch (error) {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi xác thực');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-4">
      <TouchableOpacity onPress={() => step === 1 ? router.back() : setStep(1)} className="mb-6">
        <ArrowLeft size={24} color="#374151" />
      </TouchableOpacity>

      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Lock size={30} color="#2563EB" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Nhập số điện thoại' : 'Xác thực OTP'}
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-4">
            {step === 1 
                ? 'Chúng tôi sẽ gửi mã xác thực đến số điện thoại này để đăng nhập hoặc đăng ký.' 
                : `Mã xác thực đã gửi tới ${phone}. Vui lòng kiểm tra tin nhắn.`}
        </Text>
      </View>

      {step === 1 ? (
          <View>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-14 mb-6 focus:border-blue-500">
                 <Text className="text-gray-500 font-bold mr-3">+84</Text>
                 <View className="w-[1px] h-6 bg-gray-300 mr-3" />
                 <TextInput 
                    className="flex-1 text-lg font-bold text-gray-900" 
                    placeholder="912 345 678"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    autoFocus
                 />
              </View>
              <TouchableOpacity 
                onPress={handleSendOtp}
                className="bg-blue-600 py-4 rounded-xl items-center shadow-lg shadow-blue-200"
              >
                  <Text className="text-white font-bold text-lg">Tiếp tục</Text>
              </TouchableOpacity>
          </View>
      ) : (
          <View>
             <View className="flex-row justify-between mb-8">
                {otp.map((d, i) => (
                    <TextInput 
                        key={i}
                        ref={r => { if(r) inputs.current[i] = r }}
                        className={`w-12 h-14 border rounded-xl text-center text-2xl font-bold ${d ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={d}
                        onChangeText={t => handleOtpChange(t, i)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !d && i > 0) {
                               inputs.current[i - 1]?.focus();
                            }
                          }}
                    />
                ))}
             </View>
             <TouchableOpacity 
                onPress={verifyOtp}
                className="bg-blue-600 py-4 rounded-xl items-center shadow-lg shadow-blue-200"
              >
                  <Text className="text-white font-bold text-lg">Xác thực</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="mt-6 items-center">
                  <Text className="text-blue-600 font-bold">Gửi lại mã</Text>
              </TouchableOpacity>
          </View>
      )}
    </SafeAreaView>
  );
}
