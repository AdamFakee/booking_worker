import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Camera, Video as VideoIcon, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateStoryScreen() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(true); // Open picker immediately or ensure it opens

  const player = useVideoPlayer(selectedVideo, player => {
    player.loop = true;
    player.muted = false;
    player.play();
  });

  const pickMedia = async (source: 'camera' | 'library') => {
    let result;
    const type = ImagePicker.MediaTypeOptions.Videos; // Enforce Videos only
    
    try {
        if (source === 'camera') {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
              Alert.alert('Cần quyền truy cập', 'Bạn cần cấp quyền truy cập máy ảnh để quay video.');
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
              allowsMultipleSelection: false, // Stories usually one at a time for simplicity
              allowsEditing: true, 
              quality: 1,
            });
          }
      
          if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedVideo(result.assets[0].uri);
            setShowMediaPicker(false);
          }
    } catch (error) {
        console.error("Error picking media:", error);
    }
  };

  const handlePost = () => {
    // In a real app, this would upload the story
    // For now, we just go back
    if (selectedVideo) {
        Alert.alert("Thành công", "Tin của bạn đã được đăng!");
        router.back();
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-20 flex-row items-center justify-between px-4 py-2">
         <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-black/40"
         >
            <X size={24} color="white" />
         </TouchableOpacity>
         
         {selectedVideo && (
             <TouchableOpacity 
                onPress={handlePost}
                className="bg-blue-600 px-6 py-2 rounded-full"
             >
                <Text className="text-white font-bold">Chia sẻ</Text>
             </TouchableOpacity>
         )}
      </SafeAreaView>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center">
         {selectedVideo ? (
             <VideoView
                player={player}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                nativeControls={false}
             />
         ) : (
             <View className="items-center">
                 <Text className="text-gray-400 mb-4">Chọn video để tạo tin</Text>
                 <TouchableOpacity 
                    onPress={() => setShowMediaPicker(true)}
                    className="bg-white/20 px-6 py-3 rounded-full"
                 >
                     <Text className="text-white font-bold">Chọn Video</Text>
                 </TouchableOpacity>
             </View>
         )}
      </View>

      {/* Media Source Picker Modal */}
      <Modal
        visible={showMediaPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
            if (selectedVideo) setShowMediaPicker(false);
            else router.back();
        }}
      >
        <Pressable 
            className="flex-1 bg-black/50 justify-end"
            onPress={() => {
                if (selectedVideo) setShowMediaPicker(false);
                else router.back();
            }}
        >
            <Pressable className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 w-full shadow-lg" onPress={e => e.stopPropagation()}>
                <Text className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                    Tạo tin mới
                </Text>
                
                <View className="gap-4">
                    <TouchableOpacity 
                        className="flex-row items-center bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                        onPress={() => pickMedia('camera')}
                    >
                        <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-4">
                            <Camera size={24} className="text-blue-600 dark:text-blue-400" />
                        </View>
                        <View>
                             <Text className="text-base font-bold text-gray-900 dark:text-white">
                                 Quay video mới
                             </Text>
                             <Text className="text-sm text-gray-500">Sử dụng máy ảnh</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                        onPress={() => pickMedia('library')}
                    >
                        <View className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mr-4">
                            <VideoIcon size={24} className="text-red-600 dark:text-red-400" />
                        </View>
                        <View>
                             <Text className="text-base font-bold text-gray-900 dark:text-white">Chọn video</Text>
                             <Text className="text-sm text-gray-500">Video từ thư viện</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
