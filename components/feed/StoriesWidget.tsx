import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { Image, InteractionManager, ScrollView, Text, TouchableOpacity, View } from 'react-native';



const MOCK_STORIES = [
  {
    id: '1',
    name: 'Lộc Tây Hair...',
    video: require('@/assets/videos/166808-835670743_tiny.mp4'), 
    avatar: 'https://i.pravatar.cc/150?u=user1',
    isSeen: false,
  },
  {
    id: '2',
    name: 'Linh Lee',
    video: require('@/assets/videos/214669_tiny.mp4'),
    avatar: 'https://i.pravatar.cc/150?u=user2',
    isSeen: false,
  },
  {
    id: '3',
    name: 'E. Tú . 25',
    video: require('@/assets/videos/21964-323495891_tiny.mp4'),
    avatar: 'https://i.pravatar.cc/150?u=user3',
    isSeen: true,
  },
  {
    id: '4',
    name: 'Hoàng Minh',
    video: require('@/assets/videos/254787_tiny.mp4'),
    avatar: 'https://i.pravatar.cc/150?u=user4',
    isSeen: false,
  },
  {
    id: '5',
    name: 'Thảo Trang',
    video: require('@/assets/videos/270940_tiny.mp4'),
    avatar: 'https://i.pravatar.cc/150?u=user5',
    isSeen: false,
  },
  {
    id: '6',
    name: 'Minh Tuấn',
    video: require('@/assets/videos/3612-172488334_tiny.mp4'),
    avatar: 'https://i.pravatar.cc/150?u=user6',
    isSeen: true,
  },
];

const StoryItem = React.memo(({ story }: { story: typeof MOCK_STORIES[0] }) => {
  const router = useRouter();
  
  const player = useVideoPlayer(story.video, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <TouchableOpacity 
        className="relative w-24 h-36 rounded-xl overflow-hidden bg-gray-200 dark:bg-slate-800 border border-gray-100 dark:border-gray-800"
        onPress={() => router.push({ pathname: '/feed/story', params: { id: story.id } })}
    >
        <VideoView
          player={player}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          nativeControls={false}
        />
        <View className="absolute inset-0 bg-black/10" />
        
        {/* Avatar Overlay */}
        <View className={`absolute bottom-8 left-1/2 -ml-4 w-8 h-8 rounded-full border-2 ${story.isSeen ? 'border-gray-300' : 'border-blue-500'} items-center justify-center bg-white`}>
              <Image 
                source={{ uri: story.avatar }} 
                className="w-full h-full rounded-full"
              />
        </View>
        
        {/* Name */}
        <View className="absolute bottom-2 w-full items-center px-1">
              <Text className="text-white text-xs font-bold text-center drop-shadow-md" numberOfLines={1}>
                {story.name}
              </Text>
        </View>
    </TouchableOpacity>
  );
});

export const StoriesWidget = () => {
    // Mock current user
    const userAvatar = 'https://i.pravatar.cc/150?u=me';

    // Only using the first 5 stories to avoid overloading the video decoders
    const displayStories = MOCK_STORIES.slice(0, 5);

    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            setReady(true);
        });

        return () => task.cancel();
    }, []);

    if (!ready) {
        return (
            <View className="bg-white dark:bg-slate-900 mb-2 py-3 h-48 justify-center items-center">
                 <Text className="text-gray-400 text-xs">Loading stories...</Text>
            </View>
        );
    }

    return (
        <View className="bg-white dark:bg-slate-900 mb-2 py-3">
            <View className="px-4 mb-2 flex-row justify-between items-center">
                 <Text className="font-bold text-gray-900 dark:text-white text-base">Khoảnh khắc</Text>
            </View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
            >
                {/* Create New Story */}
                <TouchableOpacity className="relative w-24 h-36 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 mr-1">
                    <Image 
                        source={{ uri: userAvatar }} 
                        className="w-full h-24"
                        resizeMode="cover"
                    />
                    <View className="absolute bottom-0 w-full h-12 bg-white dark:bg-slate-900 items-center justify-end pb-2">
                        <Text className="text-xs font-medium text-gray-900 dark:text-white">Tạo mới</Text>
                    </View>
                    <View className="absolute top-20 left-1/2 -ml-3.5 w-7 h-7 bg-white dark:bg-slate-900 rounded-full items-center justify-center">
                         <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center border-2 border-white dark:border-slate-900">
                             <Plus size={14} color="white" strokeWidth={3} />
                         </View>
                    </View>
                </TouchableOpacity>

                {/* Friend Stories */}
                {displayStories.map((story) => (
                    <StoryItem key={story.id} story={story} />
                ))}
            </ScrollView>
        </View>
    );
};
