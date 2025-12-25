import { CommentItem } from '@/components/feed/CommentItem';
import { FeedItem } from '@/components/feed/FeedItem';
import { Comment, usePosts } from '@/context/PostContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Send, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { posts, addComment } = usePosts();
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [replyDepth, setReplyDepth] = useState<number>(0);
  const inputRef = useRef<TextInput>(null);

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-950">
        <Text className="text-gray-500">Bài viết không tồn tại</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
             <Text className="text-primary font-bold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSendComment = () => {
    if (commentText.trim()) {
      let parentId = replyingTo?.id;
      
      // If replying to a comment at depth 2 (level 3) or deeper, 
      // add the new comment as a sibling (same level) instead of child.
      if (replyDepth >= 2 && replyingTo?.parentId) {
        parentId = replyingTo.parentId;
      }

      addComment(post.id, commentText.trim(), parentId);
      setCommentText('');
      setReplyingTo(null);
      setReplyDepth(0);
      Keyboard.dismiss();
    }
  };

  const handleReply = (comment: Comment, depth: number) => {
    setReplyingTo(comment);
    setReplyDepth(depth);
    inputRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyDepth(0);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">Bài viết của {post.userName}</Text>
      </View>

      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4">
            <CommentItem 
              comment={item} 
              onReply={handleReply} 
              depth={0} 
            />
          </View>
        )}
        ListHeaderComponent={() => (
           <View className="mb-4 bg-gray-50 dark:bg-slate-900/50">
             <FeedItem post={post} isDetail />
             <Text className="font-bold text-gray-500 px-4 py-2 border-b border-gray-100 dark:border-gray-800">
               Bình luận ({post.comments.length})
             </Text>
           </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Comment Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800"
      >
        {replyingTo && (
          <View className="flex-row items-center justify-between px-4 py-2 bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-gray-500 text-xs">
              Đang trả lời <Text className="font-bold">{replyingTo.userName}</Text>
            </Text>
            <TouchableOpacity onPress={cancelReply}>
              <X size={16} className="text-gray-500" />
            </TouchableOpacity>
          </View>
        )}
        <View className="flex-row items-center gap-2 p-3">
           <TextInput
             ref={inputRef}
             className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2 min-h-[40px] max-h-[100px] text-gray-900 dark:text-white"
             placeholder={replyingTo ? `Trả lời ${replyingTo.userName}...` : "Viết bình luận..."}
             placeholderTextColor="#9ca3af"
             multiline
             value={commentText}
             onChangeText={setCommentText}
           />
           <TouchableOpacity 
             onPress={handleSendComment}
             disabled={!commentText.trim()}
             className={`${commentText.trim() ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-700'} w-10 h-10 rounded-full items-center justify-center`}
           >
             <Send size={20} color={commentText.trim() ? 'white' : '#9ca3af'} />
           </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
