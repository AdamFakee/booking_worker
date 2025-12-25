import { Comment } from '@/context/PostContext';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CommentItemProps {
  comment: Comment;
  onReply: (comment: Comment, depth: number) => void;
  depth: number;
}

export const CommentItem = ({ comment, onReply, depth }: CommentItemProps) => {
  return (
    <View className="mb-4">
      <View className="flex-row gap-3">
        <Image 
          source={{ uri: comment.userAvatar }} 
          className="w-8 h-8 rounded-full bg-gray-200"
        />
        <View className="flex-1">
          <View className="bg-gray-100 dark:bg-slate-800 rounded-2xl px-3 py-2 self-start">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="font-bold text-gray-900 dark:text-white text-sm">{comment.userName}</Text>
              {comment.role === 'worker' ? (
                <View className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded">
                  <Text className="text-[10px] font-bold text-blue-700 dark:text-blue-300">Thợ</Text>
                </View>
              ) : (
                <View className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  <Text className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Khách</Text>
                </View>
              )}
            </View>
            <Text className="text-gray-800 dark:text-gray-200 text-sm">{comment.content}</Text>
          </View>
          <View className="flex-row items-center gap-4 mt-1 ml-1">
            <Text className="text-gray-400 text-xs">{comment.timestamp}</Text>
            <TouchableOpacity onPress={() => onReply(comment, depth)}>
              <Text className="text-gray-500 font-bold text-xs">Trả lời</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recursive replies */}
      {comment.replies && comment.replies.length > 0 && (
        <View className="pl-11 mt-2">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};
