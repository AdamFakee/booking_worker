import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react-native';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onHide: () => void;
}

export const Toast = ({ message, type = 'info', onHide }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 3000); // Auto hide after 3 seconds

    return () => clearTimeout(timer);
  }, [onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-error';
      default: return 'bg-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={24} color="white" />;
      case 'error': return <AlertCircle size={24} color="white" />;
      default: return <Info size={24} color="white" />;
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp.springify()} 
      exiting={FadeOutUp}
      className={`absolute top-12 left-5 right-5 ${getBackgroundColor()} px-4 py-4 rounded-2xl flex-row items-center shadow-lg z-50`}
    >
      <View className="mr-3">
        {getIcon()}
      </View>
      <Text className="flex-1 text-white font-medium text-body leading-5">
        {message}
      </Text>
      <TouchableOpacity onPress={onHide} className="ml-2 bg-white/20 p-1 rounded-full">
        <X size={16} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};
