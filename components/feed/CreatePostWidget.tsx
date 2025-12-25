import { useRouter } from 'expo-router';
import { Image as ImageIcon } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const CreatePostWidget = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/feed/create');
  };

  // Mock current user avatar
  const userAvatar = 'https://i.pravatar.cc/150?u=me';

  return (
    <View className="bg-white dark:bg-slate-900 mb-2 py-3 px-4">
      <View className="flex-row items-center gap-3">
        <Image 
            source={{ uri: userAvatar }} 
            className="w-10 h-10 rounded-full bg-gray-200"
        />
        
        <TouchableOpacity 
            className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2.5 flex-row items-center justify-between border border-gray-100 dark:border-slate-700"
            onPress={handlePress}
        >
            <Text className="text-gray-500 dark:text-gray-400 font-medium">Hôm nay bạn thế nào?</Text>
            <ImageIcon size={20} className="text-green-600 dark:text-green-500" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
