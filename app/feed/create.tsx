import { usePosts } from '@/context/PostContext';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Camera, Image as ImageIcon, MapPin, Video as VideoIcon, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VideoPreview = ({ uri }: { uri: string }) => {
  const player = useVideoPlayer(uri, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <VideoView
      player={player}
      style={{ width: '100%', height: '100%' }}
      contentFit="cover"
      nativeControls={false}
    />
  );
};

export default function CreatePostScreen() {
  const router = useRouter();
  const { addPost } = usePosts();
  const [content, setContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<{ uri: string; type: 'image' | 'video' }[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [pickerMediaType, setPickerMediaType] = useState<ImagePicker.MediaTypeOptions>(ImagePicker.MediaTypeOptions.Images);
  
  // Mock user
  const userAvatar = 'https://i.pravatar.cc/150?u=me';
  const userName = 'Tôi';

  const handlePost = () => {
    if (content.trim() || selectedMedia.length > 0) {
      const images = selectedMedia.filter(m => m.type === 'image').map(m => m.uri);
      const video = selectedMedia.find(m => m.type === 'video')?.uri;

      addPost(
        content.trim(),
        images.length > 0 ? images : undefined,
        video
      );
      router.back();
    }
  };

  const pickMedia = async (type: ImagePicker.MediaTypeOptions, source: 'camera' | 'library') => {
    let result;
    
    if (source === 'camera') {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Cần quyền truy cập', 'Bạn cần cấp quyền truy cập máy ảnh để chụp ảnh/quay video.');
        return;
      }
      
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: type,
        allowsEditing: type === ImagePicker.MediaTypeOptions.Images, // Only edit if single image/standard camera
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: type,
        allowsMultipleSelection: type === ImagePicker.MediaTypeOptions.Images, // Allow multiple for images
        allowsEditing: false, // Usually false when allowing multiple
        quality: 1,
      });
    }

    if (!result.canceled) {
      const newItems = result.assets.map(asset => ({
        uri: asset.uri,
        type: (type === ImagePicker.MediaTypeOptions.Images ? 'image' : 'video') as 'image' | 'video',
      }));
      setSelectedMedia(prev => [...prev, ...newItems]);
    }
  };

  const handleMediaSelect = (type: ImagePicker.MediaTypeOptions) => {
    setPickerMediaType(type);
    setShowMediaPicker(true);
  };

  const handleSourceSelect = (source: 'camera' | 'library') => {
    setShowMediaPicker(false);
    setTimeout(() => {
        pickMedia(pickerMediaType, source);
    }, 200);
  };

  const removeMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
               <X size={24} className="text-gray-900 dark:text-white" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">Tạo bài viết</Text>
        </View>
        <TouchableOpacity 
          onPress={handlePost}
          disabled={!content.trim() && selectedMedia.length === 0}
          className={`${content.trim() || selectedMedia.length > 0 ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-800'} px-4 py-2 rounded-full`}
        >
          <Text className={`${content.trim() || selectedMedia.length > 0 ? 'text-white' : 'text-gray-500'} font-bold`}>Đăng</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} 
      >
        <ScrollView className="flex-1 px-4 pt-4">
          {/* User Info */}
          <View className="flex-row items-center gap-3 mb-4">
            <Image source={{ uri: userAvatar }} className="w-12 h-12 rounded-full" />
            <View>
              <Text className="font-bold text-gray-900 dark:text-white text-base">{userName}</Text>
              <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md mt-1 self-start">
                 <Text className="text-xs text-gray-500 dark:text-gray-400">Công khai</Text>
              </View>
            </View>
          </View>

          {/* Input */}
          <TextInput
            className="text-lg text-gray-900 dark:text-white h-40"
            placeholder="Bạn đang nghĩ gì?"
            placeholderTextColor="#9ca3af"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            autoFocus={true}
          />

          {/* Media Preview List */}
          {selectedMedia.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
               <View className="flex-row gap-3">
                  {selectedMedia.map((media, index) => (
                      <View key={index} className="relative w-40 h-40">
                          <TouchableOpacity 
                              onPress={() => removeMedia(index)}
                              className="absolute top-1 right-1 z-10 bg-black/50 p-1 rounded-full"
                          >
                              <X size={16} color="white" />
                          </TouchableOpacity>
                          {media.type === 'image' ? (
                              <Image 
                                  source={{ uri: media.uri }} 
                                  className="w-full h-full rounded-xl bg-gray-100 dark:bg-slate-800"
                                  resizeMode="cover"
                              />
                          ) : (
                               <View className="w-full h-full rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                                   <VideoPreview uri={media.uri} />
                               </View>
                          )}
                      </View>
                  ))}
               </View>
            </ScrollView>
          )}
        </ScrollView>

        {/* Toolbar */}
        <View className="border-t border-gray-100 dark:border-gray-800 p-4">
           <View className="flex-row items-center justify-between">
              <Text className="text-gray-900 dark:text-white font-medium">Thêm vào bài viết</Text>
              <View className="flex-row gap-4">
                 <TouchableOpacity onPress={() => handleMediaSelect(ImagePicker.MediaTypeOptions.Images)}>
                     <ImageIcon size={24} color="#10b981" />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => handleMediaSelect(ImagePicker.MediaTypeOptions.Videos)}>
                     <VideoIcon size={24} color="#f43f5e" />
                 </TouchableOpacity>
                 <TouchableOpacity>
                     <MapPin size={24} color="#ef4444" />
                 </TouchableOpacity>
              </View>
           </View>
        </View>
      </KeyboardAvoidingView>

      {/* Media Source Picker Modal */}
      <Modal
        visible={showMediaPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMediaPicker(false)}
      >
        <Pressable 
            className="flex-1 bg-black/50 justify-end"
            onPress={() => setShowMediaPicker(false)}
        >
            <Pressable className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 w-full shadow-lg" onPress={e => e.stopPropagation()}>
                <Text className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                    {pickerMediaType === ImagePicker.MediaTypeOptions.Images ? 'Đăng ảnh' : 'Đăng video'}
                </Text>
                
                <View className="gap-4">
                    <TouchableOpacity 
                        className="flex-row items-center bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                        onPress={() => handleSourceSelect('camera')}
                    >
                        <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-4">
                            <Camera size={24} className="text-blue-600 dark:text-blue-400" />
                        </View>
                        <View>
                             <Text className="text-base font-bold text-gray-900 dark:text-white">
                                 {pickerMediaType === ImagePicker.MediaTypeOptions.Images ? 'Chụp ảnh mới' : 'Quay video mới'}
                             </Text>
                             <Text className="text-sm text-gray-500">Sử dụng máy ảnh</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                        onPress={() => handleSourceSelect('library')}
                    >
                        <View className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full items-center justify-center mr-4">
                            <ImageIcon size={24} className="text-purple-600 dark:text-purple-400" />
                        </View>
                        <View>
                             <Text className="text-base font-bold text-gray-900 dark:text-white">Chọn từ thư viện</Text>
                             <Text className="text-sm text-gray-500">Ảnh và video có sẵn</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    className="mt-6 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl items-center"
                    onPress={() => setShowMediaPicker(false)}
                >
                    <Text className="font-bold text-gray-900 dark:text-white">Hủy</Text>
                </TouchableOpacity>
            </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
