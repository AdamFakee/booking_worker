import { CreatePostWidget } from '@/components/feed/CreatePostWidget';
import { FeedItem } from '@/components/feed/FeedItem';
import { StoriesWidget } from '@/components/feed/StoriesWidget';
import { usePosts } from '@/context/PostContext';
import React from 'react';
import { FlatList } from 'react-native';

export const NewsFeed = () => {
  const { posts } = usePosts();

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem post={item} />}
      ListHeaderComponent={() => (
          <>
              <CreatePostWidget />
              <StoriesWidget />
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
