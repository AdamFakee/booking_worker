import { DiaryFeed } from '@/components/feed/DiaryFeed';
import { NewsFeed } from '@/components/feed/NewsFeed';
import { Bell, Search } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, InteractionManager, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedScreen() {
  // const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'community' | 'diary'>('community');

  React.useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
    
    return () => task.cancel();
  }, []);

  const renderHeader = () => (
    <View className="bg-white dark:bg-slate-900 pt-2 shadow-sm z-10 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row justify-between items-center px-4 pb-2">
            <Text className="text-2xl font-bold text-[#256DC2] dark:text-[#256DC2]">
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
                onPress={() => setActiveTab('community')}
                className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'community' ? 'border-blue-600' : 'border-transparent'}`}
            >
                <Text className={`font-bold text-base ${activeTab === 'community' ? 'text-[#256DC2] dark:text-[#256DC2]' : 'text-gray-500'}`}>Cộng đồng</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => setActiveTab('diary')}
                className={`flex-1 items-center justify-center py-3 border-b-2 ${activeTab === 'diary' ? 'border-blue-600' : 'border-transparent'}`}
            >
                <Text className={`font-bold text-base ${activeTab === 'diary' ? 'text-[#256DC2] dark:text-[#256DC2]' : 'text-gray-500'}`}>Nhật ký</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-slate-950" edges={['top']}>
      {renderHeader()}
      {isReady ? (
        activeTab === 'community' ? <NewsFeed /> : <DiaryFeed />
      ) : (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0068FF" />
        </View>
      )}
    </SafeAreaView>
  );
}
