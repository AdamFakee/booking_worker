import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Briefcase, Check } from 'lucide-react-native';

const JOBS = [
  'Điện lạnh', 
  'Điện dân dụng', 
  'Sửa ống nước', 
  'Xây dựng / Thợ hồ', 
  'Sơn nước', 
  'Mộc / Nội thất', 
  'Thông tắc cống', 
  'Vệ sinh công nghiệp'
];

export default function WorkerInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleContinue = () => {
    if (name && selectedJob) {
      router.push({ pathname: '/worker-auth/quiz', params: { job: selectedJob } });
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
                   const isSelected = selectedJob === job;
                   return (
                     <TouchableOpacity 
                       key={job}
                       className={`w-[48%] mb-3 px-3 py-4 rounded-xl border flex-row items-center justify-between ${isSelected ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-gray-700'}`}
                       onPress={() => setSelectedJob(job)}
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
            className={`w-full py-4 rounded-xl items-center shadow-lg mb-10 ${name && selectedJob ? 'bg-amber-400 shadow-amber-200' : 'bg-gray-200 dark:bg-slate-800'}`}
            onPress={handleContinue}
            disabled={!name || !selectedJob}
          >
            <Text className={`font-bold text-lg ${name && selectedJob ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
       </ScrollView>
    </SafeAreaView>
  );
}
