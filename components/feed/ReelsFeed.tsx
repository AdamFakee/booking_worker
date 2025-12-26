import { useIsFocused } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Heart, MessageCircle, Play, Send, Volume2, VolumeX, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, TouchableOpacity, View, ViewToken } from 'react-native';

const { width } = Dimensions.get('window');

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
}

const MOCK_REELS = [
  {
    id: '1',
    url: require('@/assets/videos/166808-835670743_tiny.mp4'),
    user: 'TravelVibes',
    avatar: 'https://i.pravatar.cc/150?u=travel',
    desc: 'Exploring the mountains! 🏔️ #travel #nature',
    likesRaw: 1200,
    likes: '1.2K',
    comments: '158'
  },
  {
    id: '2',
    url: require('@/assets/videos/214669_tiny.mp4'),
    user: 'FoodieLife',
    avatar: 'https://i.pravatar.cc/150?u=food',
    desc: 'Late night snacks are the best 🍜 #food #ramen',
    likesRaw: 8500,
    likes: '8.5K',
    comments: '442'
  },
  {
    id: '3',
    url: require('@/assets/videos/21964-323495891_tiny.mp4'),
    user: 'FitnessPro',
    avatar: 'https://i.pravatar.cc/150?u=fitness',
    desc: 'Morning workout routine 💪 #gym #fitness',
    likesRaw: 25000,
    likes: '25K',
    comments: '1.2K'
  },
  {
    id: '4',
    url: require('@/assets/videos/254787_tiny.mp4'),
    user: 'DanceCrew',
    avatar: 'https://i.pravatar.cc/150?u=dance',
    desc: 'New choreography! 💃 #dance #music',
    likesRaw: 50000,
    likes: '50K',
    comments: '3K'
  },
  {
    id: '5',
    url: require('@/assets/videos/270940_tiny.mp4'),
    user: 'NatureLover',
    avatar: 'https://i.pravatar.cc/150?u=nature2',
    desc: 'Peaceful moments ✨',
    likesRaw: 3000,
    likes: '3K',
    comments: '45'
  }
];

const INITIAL_COMMENTS: Record<string, Comment[]> = {
    '1': [
        { id: 'c1', user: 'Mike', avatar: 'https://i.pravatar.cc/150?u=1', content: 'Awesome view! 😍', time: '2 giờ' },
        { id: 'c2', user: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2', content: 'Where is this?', time: '5 giờ' },
    ],
    '2': [
        { id: 'c3', user: 'John', avatar: 'https://i.pravatar.cc/150?u=3', content: 'Yummy! 😋', time: '1 giờ' },
    ]
};

const ReelItemComponent = ({ item, isActive, containerHeight, onFinish, onShowComments }: { 
    item: typeof MOCK_REELS[0], 
    isActive: boolean, 
    containerHeight: number,
    onFinish: () => void,
    onShowComments: () => void
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likesRaw);
  
  const player = useVideoPlayer(item.url, player => {
    player.loop = false;
  });

  const [isPlaying, setIsPlaying] = useState(isActive);

  useEffect(() => {
    setIsPlaying(isActive);
  }, [isActive]);

  useEffect(() => {
    if (isActive && isPlaying) {
      player.play();
    } else {
      player.pause();
      if (!isActive) {
          player.currentTime = 0;
      }
    }
  }, [isActive, isPlaying, player]);

  const togglePlay = () => {
      setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    const subscription = player.addListener('playToEnd', () => {
        onFinish();
    });
    return () => subscription.remove();
  }, [player, onFinish]);

  const toggleMute = () => {
      player.muted = !player.muted;
      setIsMuted(player.muted);
  };

  const handleLike = () => {
      setLiked(!liked);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatLikeCount = (num: number) => {
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toString();
  };

  return (
    <Pressable onPress={togglePlay} style={{ width, height: containerHeight, backgroundColor: 'black' }}>
      <VideoView
        player={player}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        nativeControls={false}
      />
      
      {!isPlaying && (
        <View className="absolute inset-0 items-center justify-center bg-black/20">
            <Play size={50} color="white" fill="white" className="opacity-80" />
        </View>
      )}
      
      {/* Overlay UI */}
      <View style={{ position: 'absolute', bottom: 20, left: 10, right: 10, paddingBottom: 20 }}>
          <View className="flex-row items-center mb-3">
              <Image source={{ uri: item.avatar }} className="w-10 h-10 rounded-full border border-white" />
              <Text className="text-white font-bold text-base ml-2">{item.user}</Text>
          </View>
          <Text className="text-white text-sm mb-4" numberOfLines={2}>{item.desc}</Text>
          <View className="flex-row items-center bg-white/20 self-start px-3 py-1 rounded-full">
              <Text className="text-white text-xs">🎵 Original Audio</Text>
          </View>
      </View>

      <View style={{ position: 'absolute', bottom: 40, right: 10, alignItems: 'center', gap: 20 }}>
          <TouchableOpacity className="items-center" onPress={handleLike}>
              <Heart color={liked ? "#ef4444" : "white"} size={35} fill={liked ? "#ef4444" : "transparent"} />
              <Text className="text-white text-xs font-bold mt-1">{formatLikeCount(likeCount)}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={onShowComments}>
              <MessageCircle color="white" size={35} />
              <Text className="text-white text-xs font-bold mt-1">{item.comments}</Text>
          </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={{ position: 'absolute', top: 20, right: 20, padding: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 }}
        onPress={toggleMute}
      >
          {isMuted ? <VolumeX color="white" size={20} /> : <Volume2 color="white" size={20} />}
      </TouchableOpacity>
    </Pressable>
  );
};
const ReelItem = React.memo(ReelItemComponent);

export const ReelsFeed = ({ isActiveTab }: { isActiveTab: boolean }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string; user: string } | null>(null);
  const inputRef = useRef<TextInput>(null);
  
  const flatListRef = useRef<FlatList>(null);
  const isFocused = useIsFocused();
  const isReviewActive = isFocused && isActiveTab;

  const activeReelId = MOCK_REELS[activeReelIndex]?.id;
  const currentComments = comments[activeReelId] || [];

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveReelIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const handleVideoFinish = useCallback(() => {
    if (showComments) return;
    const nextIndex = activeReelIndex + 1;
    if (nextIndex < MOCK_REELS.length) {
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
        flatListRef.current?.scrollToIndex({ index: 0, animated: false });
    }
  }, [activeReelIndex, showComments]);

  const handleAddComment = () => {
      if (!inputText.trim()) return;

      const newComment: Comment = {
          id: Date.now().toString(),
          user: 'Bạn', // Simplified current user
          avatar: 'https://i.pravatar.cc/150?u=me',
          content: replyingTo ? `@${replyingTo.user} ${inputText.trim()}` : inputText.trim(),
          time: 'Vừa xong'
      };

      setComments(prev => ({
          ...prev,
          [activeReelId]: [newComment, ...(prev[activeReelId] || [])]
      }));
      setInputText('');
      setReplyingTo(null);
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo({ id: comment.id, user: comment.user });
    inputRef.current?.focus();
  };

  return (
    <View 
      className="flex-1 bg-black"
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      {containerHeight > 0 && (
          <FlatList
            ref={flatListRef}
            data={MOCK_REELS}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
                <ReelItem 
                    item={item} 
                    containerHeight={containerHeight}
                    isActive={activeReelIndex === index && isReviewActive && !showComments} 
                    onFinish={handleVideoFinish}
                    onShowComments={() => setShowComments(true)}
                />
            )}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={3}
            getItemLayout={(data, index) => ({
                length: containerHeight,
                offset: containerHeight * index,
                index,
            })}
          />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showComments}
        onRequestClose={() => setShowComments(false)}
      >
        <Pressable 
            className="flex-1 bg-black/50 justify-end"
            onPress={() => setShowComments(false)}
        >
            <Pressable 
                className="bg-white dark:bg-slate-900 rounded-t-3xl w-full h-[60%] flex text-gray-900 dark:text-white overflow-hidden"
                onPress={e => e.stopPropagation()}
            >
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <Text className="text-gray-900 dark:text-white font-bold text-lg text-center flex-1">
                        Bình luận ({currentComments.length})
                    </Text>
                    <TouchableOpacity onPress={() => setShowComments(false)}>
                        <X size={24} className="text-gray-500" />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >

                    {currentComments.length === 0 ? (
                        <View className="flex-1 items-center justify-center p-4">
                            <Text className="text-gray-500 dark:text-gray-400 text-center">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={currentComments}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ padding: 16 }}
                            renderItem={({ item }) => (
                                <View className="flex-row gap-3 mb-4">
                                    <Image source={{ uri: item.avatar }} className="w-8 h-8 rounded-full bg-gray-200" />
                                    <View className="flex-1">
                                        <View className="flex-row items-center gap-2">
                                            <Text className="text-gray-900 dark:text-white font-bold text-sm">{item.user}</Text>
                                            <Text className="text-gray-500 text-xs">{item.time}</Text>
                                        </View>
                                        <Text className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.content}</Text>
                                        <TouchableOpacity onPress={() => handleReply(item)} className="mt-1">
                                            <Text className="text-xs font-semibold text-gray-500">Trả lời</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    )}

                    {replyingTo && (
                        <View className="flex-row items-center justify-between px-4 py-2 bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
                            <Text className="text-sm text-gray-500">
                                Đang trả lời <Text className="font-bold text-gray-700 dark:text-gray-300">{replyingTo.user}</Text>
                            </Text>
                            <TouchableOpacity onPress={() => setReplyingTo(null)}>
                                <X size={16} className="text-gray-400" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View className="border-t border-gray-100 dark:border-gray-800 p-3 bg-white dark:bg-slate-900 pb-5">
                        <View className="flex-row items-center gap-3">
                            <Image 
                                source={{ uri: 'https://i.pravatar.cc/150?u=me' }} 
                                className="w-8 h-8 rounded-full bg-gray-200"
                            />
                            <View className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2 flex-row items-center border border-gray-200 dark:border-slate-700">
                                <TextInput 
                                    ref={inputRef}
                                    placeholder={replyingTo ? `Trả lời ${replyingTo.user}...` : "Thêm bình luận..."}
                                    placeholderTextColor="#9ca3af"
                                    className="flex-1 text-gray-900 dark:text-white mr-2"
                                    value={inputText}
                                    onChangeText={setInputText}
                                />
                                <TouchableOpacity onPress={handleAddComment}>
                                    <Send size={20} color={inputText.trim() ? "#3b82f6" : "#9ca3af"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
