import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Heart, MoreHorizontal, Send, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Reuse the mock stories from the widget - in a real app this would come from a context or API
const MOCK_STORIES = [
  {
    id: '1',
    name: 'Lộc Tây Hair...',
    // Use a known static test video for the first one to verify player works
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    avatar: 'https://i.pravatar.cc/150?u=user1',
    isSeen: false,
    time: '2 giờ trước'
  },
  {
    id: '2',
    name: 'Linh Lee',
    video: 'https://www.pexels.com/download/video/14886038/',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    isSeen: false,
    time: '5 giờ trước'
  },
  {
    id: '3',
    name: 'E. Tú . 25',
    video: 'https://www.pexels.com/download/video/7583161/',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    isSeen: true,
    time: '12 giờ trước'
  },
  {
    id: '4',
    name: 'Hoàng Minh',
    video: 'https://www.pexels.com/download/video/35192564/',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    isSeen: false,
    time: '1 ngày trước'
  },
  {
    id: '5',
    name: 'Thảo Trang',
    video: 'https://www.pexels.com/download/video/35316306/',
    avatar: 'https://i.pravatar.cc/150?u=user5',
    isSeen: false,
    time: '1 ngày trước'
  },
  {
    id: '6',
    name: 'Minh Tuấn',
    video: 'https://www.pexels.com/download/video/35308890/',
    avatar: 'https://i.pravatar.cc/150?u=user6',
    isSeen: true,
    time: '2 ngày trước'
  },
];

const { width, height } = Dimensions.get('window');

export default function StoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Find initial index based on ID
  useEffect(() => {
    const index = MOCK_STORIES.findIndex(s => s.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [id]);

  const currentStory = MOCK_STORIES[currentIndex];

  const player = useVideoPlayer(currentStory?.video, player => {
    player.loop = true;
    player.play();
  });

  const handleNext = () => {
    if (currentIndex < MOCK_STORIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      router.back();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  if (!currentStory) return <View className="flex-1 bg-black" />;

  return (
    <View className="flex-1 bg-black">
      {/* Video Background */}
      <VideoView
        player={player}
        style={{ width, height, position: 'absolute' }}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Overlay Content */}
      <SafeAreaView className="flex-1 justify-between">
        {/* Header */}
        <View className="pt-2 px-4">
          {/* Progress Bar */}
          <View className="flex-row gap-1 mb-4">
            {MOCK_STORIES.map((_, index) => (
              <View 
                key={index} 
                className={`h-1 flex-1 rounded-full ${index < currentIndex ? 'bg-white' : index === currentIndex ? 'bg-white/80' : 'bg-white/30'}`}
              />
            ))}
          </View>

          {/* User Info */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
               <TouchableOpacity onPress={() => router.back()}>
                  <Image 
                    source={{ uri: currentStory.avatar }} 
                    className="w-10 h-10 rounded-full border border-white"
                  />
               </TouchableOpacity>
               <View>
                 <Text className="text-white font-bold text-base">{currentStory.name}</Text>
                 <Text className="text-white/80 text-xs">{currentStory.time}</Text>
               </View>
            </View>
            <View className="flex-row items-center gap-4">
               <TouchableOpacity>
                  <MoreHorizontal color="white" size={24} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => router.back()}>
                  <X color="white" size={28} />
               </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Navigation Touch Areas */}
        <View className="absolute top-24 bottom-24 left-0 right-0 flex-row">
            <TouchableOpacity className="flex-1" onPress={handlePrev} />
            <TouchableOpacity className="flex-1" onPress={handleNext} />
        </View>

        {/* Footer Input */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="px-4 pb-4"
        >
           <View className="flex-row items-center gap-4">
              <View className="flex-1 bg-black/20 border border-white/30 rounded-full px-4 py-3 flex-row items-center justify-between">
                  <TextInput 
                    placeholder="Gửi tin nhắn..." 
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    className="text-white flex-1 mr-2"
                  />
              </View>
              <TouchableOpacity>
                  <Heart color="white" size={28} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Send color="white" size={28} />
              </TouchableOpacity>
           </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
