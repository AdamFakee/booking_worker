import { NewsFeed } from '@/components/feed/NewsFeed';
import { useRouter } from 'expo-router';
import { Bell, Search } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, InteractionManager, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
    
    return () => task.cancel();
  }, []);

  const renderHeader = () => (
    <View className="bg-white dark:bg-slate-900 pt-2 shadow-sm z-10 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row justify-between items-center px-4 pb-2">
            <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Feeds
            </Text>
            <View className="flex-row gap-4 items-center">
                 <TouchableOpacity>
                     <Search size={24} className="text-gray-900 dark:text-white" />
                 </TouchableOpacity>
                 <TouchableOpacity>
                     <Bell size={24} className="text-gray-900 dark:text-white" />
                 </TouchableOpacity>
            </View>
        </View>

        {/* Custom Tab Bar */}
        <View className="flex-row">
            <TouchableOpacity 
                className="flex-1 items-center py-3 border-b-2 border-blue-600"
            >
                <Text className="font-bold text-base text-gray-900 dark:text-white">Nhật Ký</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => router.push('/feed/video')}
                className="flex-1 items-center justify-center py-3 border-b-2 border-transparent flex-row gap-2"
            >
                <Text className="font-bold text-base text-gray-500">Shot Video</Text>
                <View className="bg-green-500 px-1.5 py-0.5 rounded-full">
                    <Text className="text-[10px] text-white font-bold">Mới</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-slate-950" edges={['top']}>
      {renderHeader()}
      {isReady ? (
        <NewsFeed />
      ) : (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0068FF" />
        </View>
      )}
    </SafeAreaView>
  );
}
