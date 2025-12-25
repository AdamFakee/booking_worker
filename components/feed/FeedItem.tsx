import { Post, usePosts } from '@/context/PostContext';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const PostVideo = ({ uri }: { uri: string }) => {
  const player = useVideoPlayer(uri, player => {
    player.loop = true;
    player.play();
  });

  console.log(uri);

  return (
    <View style={{ width: '100%', height: 320, backgroundColor: '#000', marginBottom: 12, borderRadius: 12, overflow: 'hidden' }}>
      <VideoView
        player={player}
        style={{ width: '100%', height: '100%' }}
        contentFit="contain"
        nativeControls={true}
        allowsFullscreen={true}
      />
    </View>
  );
};

interface FeedItemProps {
  post: Post;
  isDetail?: boolean;
}

export const FeedItem = ({ post, isDetail = false }: FeedItemProps) => {
  const router = useRouter();
  const { likePost } = usePosts();

  const handleLike = () => {
    likePost(post.id);
  };

  const handlePress = () => {
    if (!isDetail) {
      router.push({ pathname: '/feed/[id]', params: { id: post.id } });
    }
  };

  return (
    <View className="bg-white dark:bg-slate-900 mb-2 border-b border-gray-100 dark:border-gray-800 pb-4">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Image 
            source={{ uri: post.userAvatar }} 
            className="w-10 h-10 rounded-full bg-gray-200"
          />
          <View>
            <Text className="font-bold text-gray-900 dark:text-gray-100 text-base">{post.userName}</Text>
            <Text className="text-gray-500 text-xs">{post.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity>
            <MoreHorizontal size={20} className="text-gray-500" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="px-4 mb-3">
        <Text className="text-gray-800 dark:text-gray-200 text-base leading-6">{post.content}</Text>
      </View>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <View className="flex-row flex-wrap gap-1 mb-3 px-4">
            {post.images.length === 1 && (
                 <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="w-full">
                    <Image 
                        source={{ uri: post.images[0] }} 
                        className="w-full h-80 bg-gray-100 dark:bg-slate-800 rounded-lg"
                        resizeMode="cover"
                    />
                 </TouchableOpacity>
            )}

            {post.images.length === 2 && (
                <>
                    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1 h-60">
                         <Image source={{ uri: post.images[0] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-l-lg" resizeMode="cover" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1 h-60">
                         <Image source={{ uri: post.images[1] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-r-lg" resizeMode="cover" />
                    </TouchableOpacity>
                </>
            )}

            {post.images.length === 3 && (
                <View className="w-full h-80 flex-row gap-1">
                    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1 h-full">
                        <Image source={{ uri: post.images[0] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-l-lg" resizeMode="cover" />
                    </TouchableOpacity>
                    <View className="flex-1 h-full gap-1">
                        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1">
                             <Image source={{ uri: post.images[1] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-tr-lg" resizeMode="cover" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1">
                             <Image source={{ uri: post.images[2] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-br-lg" resizeMode="cover" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {post.images.length >= 4 && (
                <View className="w-full h-80 flex-row gap-1">
                     <View className="flex-1 h-full gap-1">
                        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1">
                             <Image source={{ uri: post.images[0] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-tl-lg" resizeMode="cover" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1">
                             <Image source={{ uri: post.images[2] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-bl-lg" resizeMode="cover" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 h-full gap-1">
                        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1">
                             <Image source={{ uri: post.images[1] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-tr-lg" resizeMode="cover" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} className="flex-1 relative">
                             <Image source={{ uri: post.images[3] }} className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-br-lg" resizeMode="cover" />
                             {post.images.length > 4 && (
                                <View className="absolute inset-0 bg-black/50 items-center justify-center rounded-br-lg">
                                    <Text className="text-white text-xl font-bold">+{post.images.length - 4}</Text>
                                </View>
                             )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
      )}

      {/* Video */}
      {post.video && (
        <View>
            <Text style={{ fontSize: 10, color: 'red', marginBottom: 4 }}>Debug URI: {post.video}</Text>
            <PostVideo key={post.video} uri={post.video} />
        </View>
      )}

      {/* Footer Actions */}
      <View className="flex-row items-center justify-between px-4 pt-2">
        <View className="flex-row items-center gap-6">
          <TouchableOpacity 
            className="flex-row items-center gap-2" 
            onPress={handleLike}
          >
            <Heart 
              size={24} 
              color={post.isLiked ? '#ef4444' : '#64748b'} 
              fill={post.isLiked ? '#ef4444' : 'transparent'}
            />
            <Text className={`${post.isLiked ? 'text-red-500' : 'text-gray-500'} font-medium`}>
              {post.likes > 0 ? post.likes : 'Thích'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center gap-2"
            onPress={handlePress}
          >
            <MessageCircle size={24} color="#64748b" />
            <Text className="text-gray-500 font-medium">
              {post.comments.length > 0 ? post.comments.length : 'Bình luận'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
            <Share2 size={22} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
