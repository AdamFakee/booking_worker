import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Check } from 'lucide-react-native';
import { workerAuthService } from '@/services/workerAuth';

const JOBS = [
  'Sinh viên', 
  'Công nhân', 
  'Điện nước', 
  'Part-time', 
  'Giúp việc, bán hàng', 
  'Phổ thông', 
  'Điện lạnh', 
  'Xem thêm'
];

export default function WorkerInfoScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [selectedJob, setSelectedJob] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleJob = (job: string) => {
    if (selectedJob.includes(job)) {
      setSelectedJob(prev => prev.filter(j => j !== job));
    } else {
      setSelectedJob(prev => [...prev, job]);
    }
  };

  const handleContinue = async () => {
    if (name && selectedJob.length > 0) {
      try {
        setLoading(true);
        // Save to DB
        const res = await workerAuthService.saveInfo(phone as string, name, selectedJob);
        
        if (res.success) {
          router.push({ 
            pathname: '/worker-auth/quiz', 
            params: { 
              job: JSON.stringify(selectedJob),
              phone: phone,
              name: name
            } 
          });
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
       <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
         <Text className="text-xl font-bold text-center text-gray-900 dark:text-white">Thông tin nghề nghiệp</Text>
       </View>

       <ScrollView className="flex-1 px-5 pt-6">
          <View className="mb-6">
            <Text className="font-bold text-gray-900 dark:text-white mb-2">Họ và tên</Text>
            <TextInput 
              className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-lg text-gray-900 dark:text-white"
              placeholder="Nhập họ tên đầy đủ"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="mb-8">
             <Text className="font-bold text-gray-900 dark:text-white mb-3">Lĩnh vực hoạt động chính</Text>
             <View className="flex-row flex-wrap justify-between">
                {JOBS.map((job) => {
                   const isSelected = selectedJob.includes(job);
                   return (
                     <TouchableOpacity 
                       key={job}
                       className={`w-[48%] mb-3 px-3 py-4 rounded-xl border flex-row items-center justify-between ${isSelected ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-gray-700'}`}
                       onPress={() => toggleJob(job)}
                     >
                        <Text className={`font-medium ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          {job}
                        </Text>
                        {isSelected && <Check size={16} color="#F59E0B" />}
                     </TouchableOpacity>
                   )
                })}
             </View>
          </View>

          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center shadow-lg mb-10 ${name && selectedJob.length > 0 && !loading ? 'bg-amber-400 shadow-amber-200' : 'bg-gray-200 dark:bg-slate-800'}`}
            onPress={handleContinue}
            disabled={!name || selectedJob.length === 0 || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className={`font-bold text-lg ${name && selectedJob.length > 0 ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                Tiếp tục
              </Text>
            )}
          </TouchableOpacity>
       </ScrollView>
    </SafeAreaView>
  );
}
