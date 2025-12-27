import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, CheckCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
// ... imports

const MOCK_QUIZ = [
  { question: "Khi lắp đặt ổ cắm điện, dây nóng (L) thường có màu gì?", options: ["Xanh dương", "Đỏ hoặc Nâu", "Vàng sọc xanh", "Trắng"], correct: 1 },
  { question: "Thiết bị bảo vệ quá tải và ngắn mạch gia đình là gì?", options: ["Cầu dao", "Aptomat (CB)", "Công tắc", "Rơ le"], correct: 1 },
  { question: "Dòng điện 30mA qua cơ thể người có thể gây ra hậu quả gì?", options: ["Không cảm giác", "Co giật cơ, khó thở", "Ngừng tim ngay lập tức", "Chỉ tê nhẹ"], correct: 1 },
  { question: "Khi sửa chữa điện, bước đầu tiên quan trọng nhất là gì?", options: ["Mặc đồ bảo hộ", "Ngắt nguồn điện và kiểm tra", "Chuẩn bị kìm, tuốc nơ vít", "Thông báo cho chủ nhà"], correct: 1 },
  { question: "Hiện tượng ngắn mạch xảy ra khi nào?", options: ["Dây nóng chạm dây nguội", "Dòng điện quá nhỏ", "Điện áp tăng cao", "Dây nối đất bị đứt"], correct: 0 },
];

export default function WorkerQuizScreen() {
  const router = useRouter();
  const { user, signIn, registerAsWorker } = useAuth();
  const { job } = useLocalSearchParams();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); 
  const [showResult, setShowResult] = useState(false);
  const [passed, setPassed] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQ < MOCK_QUIZ.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      let correctCount = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === MOCK_QUIZ[idx].correct) correctCount++;
      });
      const finalScore = Math.round((correctCount / MOCK_QUIZ.length) * 100);
      setScore(finalScore);
      setPassed(finalScore >= 70);
      setShowResult(true);
    }
  };

  const retryQuiz = () => {
    setAnswers([]);
    setCurrentQ(0);
    setShowResult(false);
  };

  const finish = async () => {
    setShowResult(false);
    
    // If user is not logged in yet, sign them in first
    if (!user.isLoggedIn) {
      await signIn();
    }
    
    // Register as worker (after KYC verification in real app)
    await registerAsWorker();
    
    // Redirect to main app (tabs) instead of separate worker-home
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
       <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex-row justify-between items-center">
         <Text className="text-xl font-bold text-gray-900 dark:text-white">Kiểm tra kiến thức</Text>
         <Text className="text-primary font-bold">{currentQ + 1}/{MOCK_QUIZ.length}</Text>
       </View>

       <ScrollView className="flex-1 px-5 pt-8">
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase font-bold tracking-widest">{job || 'Kỹ năng chung'}</Text>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-8 leading-9">
            {MOCK_QUIZ[currentQ].question}
          </Text>

          {MOCK_QUIZ[currentQ].options.map((option, index) => (
            <TouchableOpacity 
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-4 active:bg-blue-50 dark:active:bg-blue-900/20 active:border-blue-500"
              onPress={() => handleAnswer(index)}
            >
              <Text className="text-lg text-gray-800 dark:text-gray-200">{option}</Text>
            </TouchableOpacity>
          ))}
          
          <View className="items-center mt-6 pb-10">
            <TouchableOpacity 
              onPress={finish}
              className="bg-blue-500 px-8 py-3 rounded-full shadow-md shadow-blue-300"
            >
              <Text className="text-white font-bold">Bỏ qua Demo (Vào thẳng App)</Text>
            </TouchableOpacity>
          </View>
       </ScrollView>

       {/* Result Modal */}
       <Modal visible={showResult} transparent animationType="slide">
         <View className="flex-1 bg-black/50 justify-center items-center px-6">
            <View className="bg-white dark:bg-slate-900 w-full rounded-3xl p-6 items-center shadow-xl">
               <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${passed ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                  {passed ? <CheckCircle size={40} color={passed ? "#00C853" : "#D50000"} /> : <AlertTriangle size={40} color="#D50000" />}
               </View>
               
               <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                 {passed ? 'Chúc mừng!' : 'Chưa đạt yêu cầu'}
               </Text>
               <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
                 {passed 
                   ? `Bạn đã đạt ${score}% số điểm. Hồ sơ của bạn đã được duyệt thành công.` 
                   : `Bạn chỉ đạt ${score}% số điểm (yêu cầu 70%). Vui lòng kiểm tra lại kiến thức và thử lại.`}
               </Text>

               <TouchableOpacity 
                 className={`w-full py-4 rounded-xl items-center mb-3 ${passed ? 'bg-amber-400' : 'bg-gray-200 dark:bg-slate-800'}`}
                 onPress={passed ? finish : retryQuiz}
               >
                 <Text className={`font-bold text-lg ${passed ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                   {passed ? 'Vào ứng dụng' : 'Làm lại bài kiểm tra'}
                 </Text>
               </TouchableOpacity>
            </View>
         </View>
       </Modal>
    </SafeAreaView>
  );
}
