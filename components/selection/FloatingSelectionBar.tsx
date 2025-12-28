import { useSelectionStore } from '@/store/selectionStore';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SelectionBottomSheet from './SelectionBottomSheet';

export default function FloatingSelectionBar() {
  const { selectedWorkers } = useSelectionStore();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  if (selectedWorkers.length === 0) return null;

  return (
    <>
      <TouchableOpacity 
        className="absolute right-4 bg-[#256DC2] rounded-full shadow-lg shadow-blue-900/40 flex-row items-center p-3 px-5 z-50"
        style={{ bottom: Math.max(insets.bottom, 20) + (Platform.OS === 'ios' ? 0 : 10), right: 16 }}
        onPress={() => setModalVisible(true)}
      >
        <View className="bg-white/20 w-8 h-8 rounded-full items-center justify-center mr-3">
            <Text className="font-bold text-white">{selectedWorkers.length}</Text>
        </View>
        <Text className="text-white font-bold text-base">Danh sách đã chọn</Text>
      </TouchableOpacity>

      <SelectionBottomSheet 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </>
  );
}
