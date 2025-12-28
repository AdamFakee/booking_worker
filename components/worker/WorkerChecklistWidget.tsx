import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { BadgeCheck, CreditCard, FileCheck, ShieldAlert, User } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function WorkerChecklistWidget() {
  const { user } = useAuth();
  const router = useRouter();
  const status = user.verificationStatus || 'new';

  if (status === 'vip') return null; // Hide if VIP

  // Helper to determine step state: 'current' | 'completed' | 'pending'
  const getStepState = (stepLevel: number, currentLevel: number) => {
    if (currentLevel > stepLevel) return 'completed';
    if (currentLevel === stepLevel) return 'current';
    return 'pending';
  };

  // Level mapping: new=0, info_submitted=1, ekyc_completed=2, verified=3
  const getLevel = (s: string) => {
    switch (s) {
      case 'new': return 0;
      case 'info_submitted': return 1;
      case 'ekyc_completed': return 2;
      case 'verified': return 3;
      default: return 0;
    }
  };

  const currentLevel = getLevel(status);

  const steps = [
    {
      id: 'info',
      title: 'Cập nhật hồ sơ',
      desc: 'Giúp khách hàng hiểu rõ về bạn',
      icon: User,
      route: '/worker-auth/verification-info',
      level: 0,
      color: '#F97316', // Orange
      bg: '#FFF7ED',
    },
    {
      id: 'ekyc',
      title: 'Xác minh danh tính',
      desc: 'Đảm bảo an toàn tin cậy',
      icon: BadgeCheck,
      route: '/worker-auth/verification-ekyc',
      level: 1,
      color: '#EAB308', // Yellow/Goldish
      bg: '#FEFCE8',
    },
    {
      id: 'payment',
      title: 'Thanh toán phí',
      desc: 'Kích hoạt tài khoản nhận việc',
      icon: CreditCard,
      route: '/worker-auth/verification-payment',
      level: 2,
      color: '#16A34A', // Green
      bg: '#F0FDF4',
    }
  ];

  // Colors for the main card based on status
  const cardColors = {
     new: { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-700', icon: '#EF4444' },
     info_submitted: { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700', icon: '#F97316' },
     ekyc_completed: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-700', icon: '#EAB308' },
     verified: { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700', icon: '#16A34A' },
  };

  const currentTheme = cardColors[status as keyof typeof cardColors] || cardColors.new;

  return (
    <View className="mb-6">
       {status !== 'verified' && (
           <View className={`rounded-xl border ${currentTheme.border} ${currentTheme.bg} p-4 mb-4`}>
                <View className="flex-row items-center mb-2">
                    <ShieldAlert size={20} color={currentTheme.icon} />
                    <Text className={`ml-2 font-bold ${currentTheme.text}`}>
                        {status === 'new' ? 'Tài khoản chưa kích hoạt' : 
                         status === 'info_submitted' ? 'Hồ sơ đang chờ hoàn thiện' :
                         status === 'ekyc_completed' ? 'Sắp hoàn thành!' : 'Hoàn tất'}
                    </Text>
                </View>
                <Text className="text-gray-600 text-sm mb-3">
                    {status === 'new' ? 'Vui lòng hoàn tất các bước dưới đây để bắt đầu nhận việc.' :
                     status === 'info_submitted' ? 'Bạn đã cập nhật thông tin. Hãy xác minh danh tính.' :
                     status === 'ekyc_completed' ? 'Bước cuối cùng: Thanh toán phí xác thực để nhận việc.' : ''}
                </Text>
           </View>
       )}

       {/* Steps List */}
       <View className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
           {steps.map((step, index) => {
               const state = getStepState(step.level, currentLevel);
               const isClickable = state === 'current';
               
               return (
                   <TouchableOpacity 
                    key={step.id}
                    disabled={!isClickable}
                    onPress={() => router.push(step.route as any)}
                    className={`p-4 flex-row items-center border-b border-gray-50 ${isClickable ? 'bg-white' : 'bg-gray-50 opacity-60'}`}
                   >
                       <View 
                        className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${state === 'completed' ? 'bg-green-100' : 'bg-gray-100'}`}
                        style={isClickable ? { backgroundColor: step.bg } : {}}
                       >
                           {state === 'completed' ? (
                               <FileCheck size={20} color="#16A34A" />
                           ) : (
                               <step.icon size={20} color={isClickable ? step.color : '#9CA3AF'} />
                           )}
                       </View>
                       
                       <View className="flex-1">
                           <Text className={`font-bold ${isClickable ? 'text-gray-900' : 'text-gray-500'}`}>
                               {step.title}
                           </Text>
                           <Text className="text-xs text-gray-400">{step.desc}</Text>
                       </View>

                       {state === 'current' && (
                           <View className="bg-blue-600 px-3 py-1 rounded-full">
                               <Text className="text-white text-xs font-bold">Làm ngay</Text>
                           </View>
                       )}
                       
                       {state === 'completed' && (
                            <Text className="text-green-600 text-xs font-bold mr-2">Đã xong</Text>
                       )}
                   </TouchableOpacity>
               );
           })}
       </View>
    </View>
  );
}
