import { usePosts } from '@/context/PostContext';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, Image as ImageIcon, MapPin, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreatePostScreen() {
  const router = useRouter();
  const { addPost } = usePosts();
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  
  // Mock user
  const userAvatar = 'https://i.pravatar.cc/150?u=me';
  const userName = 'Tôi';

  const handlePost = () => {
    if (content.trim() || selectedImages.length > 0) {
      addPost(
        content.trim(),
        selectedImages.length > 0 ? selectedImages : undefined,
        undefined
      );
      router.back();
    }
  };

  const pickMedia = async (source: 'camera' | 'library') => {
    let result;
    const type = ImagePicker.MediaTypeOptions.Images;
    
    if (source === 'camera') {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Cần quyền truy cập', 'Bạn cần cấp quyền truy cập máy ảnh để chụp ảnh.');
        return;
      }
      
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: type,
        allowsEditing: true, 
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: type,
        allowsMultipleSelection: true,
        allowsEditing: false, 
        quality: 1,
      });
    }

    if (!result.canceled) {
      const newItems = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...newItems]);
    }
  };

  const handleMediaSelect = () => {
    setShowMediaPicker(true);
  };

  const handleSourceSelect = (source: 'camera' | 'library') => {
    setShowMediaPicker(false);
    setTimeout(() => {
        pickMedia(source);
    }, 200);
  };

  const removeMedia = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
          disabled={!content.trim() && selectedImages.length === 0}
          className={`${content.trim() || selectedImages.length > 0 ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-800'} px-4 py-2 rounded-full`}
        >
          <Text className={`${content.trim() || selectedImages.length > 0 ? 'text-white' : 'text-gray-500'} font-bold`}>Đăng</Text>
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
          {selectedImages.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
               <View className="flex-row gap-3">
                  {selectedImages.map((uri, index) => (
                      <View key={index} className="relative w-40 h-40">
                          <TouchableOpacity 
                              onPress={() => removeMedia(index)}
                              className="absolute top-1 right-1 z-10 bg-black/50 p-1 rounded-full"
                          >
                              <X size={16} color="white" />
                          </TouchableOpacity>
                          <Image 
                              source={{ uri: uri }} 
                              className="w-full h-full rounded-xl bg-gray-100 dark:bg-slate-800"
                              resizeMode="cover"
                          />
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
                 <TouchableOpacity onPress={handleMediaSelect}>
                     <ImageIcon size={24} color="#10b981" />
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
                    Đăng ảnh
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
                                 Chụp ảnh mới
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
                             <Text className="text-sm text-gray-500">Ảnh có sẵn</Text>
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
