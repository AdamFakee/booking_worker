import { CreatePostWidget } from '@/components/feed/CreatePostWidget';
import { FeedItem } from '@/components/feed/FeedItem';
import { usePosts } from '@/context/PostContext';
import { useRouter } from 'expo-router';
import { FileText, Plus } from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export const DiaryFeed = () => {
  const router = useRouter();
  const { posts } = usePosts();
  // Filter posts for the current user (mocked as 'current_user' in PostContext)
  
  const myPosts = posts.filter(post => post.userId === 'current_user');

  if (myPosts.length === 0) {
      return (
          <View className="flex-1 items-center justify-center px-8">
              <View className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-full items-center justify-center mb-6">
                  <FileText size={40} color="#256DC2" />
              </View>
              <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 leading-6">
                  Hãy chia sẻ những khoảnh khắc, kinh nghiệm làm việc hoặc câu hỏi của bạn với mọi người nhé!
              </Text>
              <TouchableOpacity 
                  className="bg-[#256DC2] flex-row items-center px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/30"
                  activeOpacity={0.8}
                  onPress={() => router.push('/feed/create')}
              >
                  <Plus size={22} color="white" className="mr-2" />
                  <Text className="text-white font-bold text-base">Viết bài ngay</Text>
              </TouchableOpacity>
          </View>
      );
  }

  return (
    <FlatList
      data={myPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem post={item} />}
      ListHeaderComponent={() => (
          <>
              <CreatePostWidget />
          </>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      windowSize={3}
      removeClippedSubviews={true}
    />
  );
};
