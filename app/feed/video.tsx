import { ReelsFeed } from '@/components/feed/ReelsFeed';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VideoScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      {/* Header overlay */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10" edges={['top']}>
          <View className="flex-row items-center justify-between px-4 py-2">
              <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-black/20">
                  <ArrowLeft size={24} color="white" />
              </TouchableOpacity>
              
              <View className="flex-row gap-4 px-4 py-1 bg-black/20 rounded-full">
                  <Text className="text-white font-bold text-base border-b-2 border-white pb-1">Dành cho bạn</Text>
                  <Text className="text-white/70 font-bold text-base">Đang theo dõi</Text>
              </View>

              <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-black/20">
                  <Search size={24} color="white" />
              </TouchableOpacity>
          </View>
      </SafeAreaView>

      <ReelsFeed isActiveTab={true} />
    </View>
  );
}
