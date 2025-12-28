import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { CheckSquare, Facebook, Smartphone, Square, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginSuccess = async () => {
    await signIn();
    router.replace('/(tabs)');
  };

  const checkAgreement = () => {
      if (!agreed) {
          Alert.alert('Yêu cầu', 'Vui lòng đọc và đồng ý với Điều khoản sử dụng để tiếp tục.');
          return false;
      }
      return true;
  };

  const handlePhoneLogin = () => {
      if (checkAgreement()) {
          router.push('/auth/otp');
      }
  };

  const handleSocialLogin = (provider: string) => {
    if (checkAgreement()) {
        Alert.alert('Chức năng Demo', `Đăng nhập bằng ${provider} thành công!`, [
            { text: 'OK', onPress: handleLoginSuccess }
        ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 px-6 justify-center">
      <View className="items-center mb-6">
         {/* Logo Placeholder */}
         <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg shadow-blue-300">
             <Text className="text-3xl font-extrabold text-white">4T</Text>
         </View>
         <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lao động & Việc Làm</Text>
         <Text className="text-gray-500 text-center">Đăng nhập để kết nối với hàng ngàn thợ giỏi và khách hàng tiềm năng.</Text>
      </View>



      <TouchableOpacity 
        onPress={handlePhoneLogin}
        className={`flex-row items-center justify-center py-4 rounded-xl shadow-lg mb-5 ${agreed ? 'bg-blue-600 shadow-blue-200' : 'bg-gray-300 shadow-none'}`}
        disabled={!agreed}
      >
         <Smartphone size={20} color="white" className="mr-3" />
         <Text className="text-white font-bold text-lg ml-2">Đăng nhập bằng Số điện thoại</Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-5">
         <View className="flex-1 h-[1px] bg-gray-200" />
         <Text className="mx-4 text-gray-400">Hoặc tiếp tục với</Text>
         <View className="flex-1 h-[1px] bg-gray-200" />
      </View>

      <View className="flex-row justify-between gap-4">
         <TouchableOpacity 
            onPress={() => handleSocialLogin('Google')}
            className={`flex-1 flex-row items-center justify-center border py-3 rounded-xl bg-gray-50 ${agreed ? 'border-gray-200 opacity-100' : 'border-gray-100 opacity-50'}`}
            disabled={!agreed}
         >
            {/* Mock Google Icon */}
            <View className="w-5 h-5 bg-red-500 rounded-full items-center justify-center mr-2">
                <Text className="text-white font-bold text-xs">G</Text>
            </View>
            <Text className="font-bold text-gray-700">Google</Text>
         </TouchableOpacity>

         <TouchableOpacity 
             onPress={() => handleSocialLogin('Facebook')}
             className={`flex-1 flex-row items-center justify-center border py-3 rounded-xl bg-gray-50 ${agreed ? 'border-gray-200 opacity-100' : 'border-gray-100 opacity-50'}`}
             disabled={!agreed}
         >
             <Facebook size={20} color="#1877F2" className="mr-2" />
             <Text className="font-bold text-gray-700 ml-2">Facebook</Text>
         </TouchableOpacity>
      </View>

      {/* Terms Agreement Checkbox - Positioned Below Buttons */}
      <View className="flex-row items-center w-full mt-8">
          <TouchableOpacity onPress={() => setAgreed(!agreed)} className="mr-3 mt-0.5">
              {agreed ? 
                  <CheckSquare size={20} color="#2563EB" /> : 
                  <Square size={20} color="#9CA3AF" />
              }
          </TouchableOpacity>
          <View className="flex-1">
              <Text className="text-gray-600 leading-5">
                  Tôi đồng ý với{' '}
                  <Text 
                    className="text-blue-600 font-bold underline"
                    onPress={() => setModalVisible(true)}
                  >
                    Điều khoản sử dụng
                  </Text>
                  {' '}của ứng dụng.
              </Text>
          </View>
      </View>

      {/* Terms Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl h-[80%] p-5">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-900">Điều khoản sử dụng</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-gray-100 p-2 rounded-full">
                        <X size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <ScrollView className="flex-1 bg-gray-50 rounded-xl p-4 mb-4" showsVerticalScrollIndicator={false}>
                    <Text className="font-bold mb-2">1. Giới thiệu</Text>
                    <Text className="text-gray-600 mb-4">Chào mừng bạn đến với ứng dụng 4T. Khi sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản sau đây...</Text>
                    
                    <Text className="font-bold mb-2">2. Quyền và nghĩa vụ</Text>
                    <Text className="text-gray-600 mb-4">Người dùng cam kết cung cấp thông tin trung thực và chịu trách nhiệm về các hoạt động trên tài khoản của mình...</Text>
                    
                    <Text className="font-bold mb-2">3. Bảo mật thông tin</Text>
                    <Text className="text-gray-600 mb-4">Chúng tôi cam kết bảo mật thông tin cá nhân của bạn theo chính sách bảo mật hiện hành...</Text>
                    
                    <Text className="font-bold mb-2">4. Thanh toán</Text>
                    <Text className="text-gray-600 mb-4">Các dịch vụ có phí sẽ được thông báo rõ ràng trước khi bạn xác nhận thanh toán...</Text>

                    <Text className="font-bold mb-2">5. Điều khoản chung</Text>
                    <Text className="text-gray-600 mb-10">Chúng tôi có quyền thay đổi điều khoản bất cứ lúc nào. Việc tiếp tục sử dụng ứng dụng đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</Text>
                </ScrollView>
                <TouchableOpacity 
                    onPress={() => {
                        setModalVisible(false);
                        setAgreed(true);
                    }}
                    className="bg-blue-600 py-4 rounded-xl items-center"
                >
                    <Text className="text-white font-bold text-lg">Tôi đồng ý</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
