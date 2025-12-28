import { CreatePostWidget } from '@/components/feed/CreatePostWidget';
import { FeedItem } from '@/components/feed/FeedItem';
import { usePosts } from '@/context/PostContext';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export const DiaryFeed = () => {
  const router = useRouter();
  const { posts } = usePosts();
  // Filter posts for the current user (mocked as 'current_user' in PostContext)
  
  const myPosts = posts.filter(post => post.userId === 'current_user');

  if (myPosts.length === 0) {
      return (
          <View className="flex-1 items-center justify-center py-20 px-4">
              <Text className="text-gray-500 text-center mb-4 text-base">Bạn chưa có bài viết nào.</Text>
              <TouchableOpacity 
                  className="bg-[#256DC2] flex-row items-center px-6 py-3 rounded-full"
                  onPress={() => router.push('/feed/create')}
              >
                  <Plus size={20} color="white" className="mr-2" />
                  <Text className="text-white font-bold text-base">Đăng bài ngay</Text>
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
