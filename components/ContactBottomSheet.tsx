import { Phone } from 'lucide-react-native';
import React from 'react';
import { Linking, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface ContactBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  workerName: string;
  phoneNumber: string;
}

export const ContactBottomSheet = ({ visible, onClose, workerName, phoneNumber }: ContactBottomSheetProps) => {
  const handleCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
    onClose();
  };

  const handleZalo = () => {
    // Zalo URL scheme - opens Zalo app with phone number
    const zaloUrl = `https://zalo.me/${phoneNumber}`;
    Linking.openURL(zaloUrl).catch(() => {
      // Fallback if Zalo is not installed
      Linking.openURL(`https://chat.zalo.me/`);
    });
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableWithoutFeedback>
            <View className="bg-white dark:bg-slate-900 rounded-t-3xl p-5 pb-8">
              {/* Header */}
              <View className="items-center mb-5">
                <Text className="text-lg font-bold text-gray-900 dark:text-white">
                  Liên hệ với {workerName}
                </Text>
              </View>

              {/* Call Button */}
              <TouchableOpacity
                className="bg-green-500 rounded-2xl p-4 mb-3 flex-row items-center"
                onPress={handleCall}
                activeOpacity={0.8}
              >
                <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Phone size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base">Gọi điện thoại</Text>
                  <Text className="text-white/80 text-sm">{phoneNumber}</Text>
                </View>
              </TouchableOpacity>

              {/* Zalo Button */}
              <TouchableOpacity
                className="bg-blue-500 rounded-2xl p-4 mb-3 flex-row items-center"
                onPress={handleZalo}
                activeOpacity={0.8}
              >
                <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold text-lg">Z</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base">Liên hệ qua Zalo</Text>
                  <Text className="text-white/80 text-sm">{phoneNumber}</Text>
                </View>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity
                className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4 items-center"
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text className="text-gray-900 dark:text-white font-bold text-base">Đóng</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
