import { useSelectionStore, Worker } from '@/store/selectionStore';
import { useRouter } from 'expo-router';
import { Trash2, X } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SelectionBottomSheet({ visible, onClose }: Props) {
  const { selectedWorkers, removeWorker, clearSelection } = useSelectionStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleProfilePress = (id: string) => {
    onClose();
    router.push(`/find-worker/profile/${id}`);
  };

  const renderItem = ({ item }: { item: Worker }) => (
    <View className="flex-row items-center bg-white p-3 mb-3 rounded-xl border border-gray-100 shadow-sm">
      <TouchableOpacity onPress={() => handleProfilePress(item.id)} className="flex-row flex-1 items-center">
        <Image 
            source={{ uri: item.avatar }} 
            className="w-12 h-12 rounded-full bg-gray-200"
        />
        <View className="ml-3 flex-1">
            <Text className="font-bold text-gray-900 text-base">{item.name}</Text>
            <Text className="text-gray-500 text-sm">{item.service} • {item.rating} ⭐</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => removeWorker(item.id)}
        className="p-2 bg-red-50 rounded-full ml-2"
      >
        <Trash2 size={18} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <View className="flex-1 bg-black/50 justify-end">
                <TouchableWithoutFeedback>
                    <View 
                        className="bg-white rounded-t-3xl"
                        style={{ height: '70%', paddingBottom: Math.max(insets.bottom, 20) }}
                    >
                        {/* Header */}
                        <View className="flex-row justify-between items-center p-5 border-b border-gray-100">
                            <View>
                                <Text className="text-xl font-bold text-gray-900">Danh sách đã chọn</Text>
                                <Text className="text-gray-500">{selectedWorkers.length} thợ đang được quan tâm</Text>
                            </View>
                            <View className="flex-row items-center">
                                {selectedWorkers.length > 0 && (
                                    <TouchableOpacity onPress={clearSelection} className="mr-4">
                                        <Text className="text-red-500 font-medium">Xóa tất cả</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={onClose} className="bg-gray-100 p-2 rounded-full">
                                    <X size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* List */}
                        <View className="flex-1 bg-gray-50 p-4">
                            {selectedWorkers.length === 0 ? (
                                <View className="flex-1 items-center justify-center">
                                    <Text className="text-gray-400">Chưa có thợ nào được chọn.</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={selectedWorkers}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderItem}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                />
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  );
}
