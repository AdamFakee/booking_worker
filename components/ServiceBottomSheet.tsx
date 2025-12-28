import { useRouter } from 'expo-router';
import { Search, Star, X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const { height } = Dimensions.get('window');

// Mock Data for Workers by Category
const WORKERS: Record<string, {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  hourlyRate: string;
  experience: string;
  avatar: string;
}[]> = {
  'Điện nước': [
    { id: '1', name: 'Nguyễn Văn A', rating: 4.8, reviews: 127, distance: '1.2 km', hourlyRate: '50,000đ/giờ', experience: '5 năm', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Trần Văn B', rating: 4.9, reviews: 203, distance: '0.8 km', hourlyRate: '60,000đ/giờ', experience: '7 năm', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Lê Văn C', rating: 4.7, reviews: 89, distance: '2.1 km', hourlyRate: '45,000đ/giờ', experience: '4 năm', avatar: 'https://i.pravatar.cc/150?img=3' },
  ],
  'Công nhân': [
    { id: '4', name: 'Phạm Văn D', rating: 4.6, reviews: 156, distance: '1.5 km', hourlyRate: '55,000đ/giờ', experience: '6 năm', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Hoàng Văn E', rating: 4.8, reviews: 134, distance: '1.8 km', hourlyRate: '50,000đ/giờ', experience: '5 năm', avatar: 'https://i.pravatar.cc/150?img=5' },
  ],
  'Điện lạnh': [
    { id: '6', name: 'Nguyễn Văn F', rating: 4.9, reviews: 234, distance: '0.5 km', hourlyRate: '70,000đ/giờ', experience: '8 năm', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Trần Thị G', rating: 4.7, reviews: 178, distance: '1.3 km', hourlyRate: '65,000đ/giờ', experience: '6 năm', avatar: 'https://i.pravatar.cc/150?img=7' },
  ],
  'Giúp việc, bán hàng': [
    { id: '8', name: 'Lê Thị H', rating: 4.8, reviews: 145, distance: '0.9 km', hourlyRate: '40,000đ/giờ', experience: '3 năm', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: '9', name: 'Phạm Thị I', rating: 4.6, reviews: 98, distance: '1.7 km', hourlyRate: '38,000đ/giờ', experience: '2 năm', avatar: 'https://i.pravatar.cc/150?img=9' },
  ],
  'Sinh viên': [
    { id: '10', name: 'Nguyễn Văn K', rating: 4.5, reviews: 67, distance: '1.1 km', hourlyRate: '35,000đ/giờ', experience: '1 năm', avatar: 'https://i.pravatar.cc/150?img=10' },
    { id: '11', name: 'Trần Văn L', rating: 4.7, reviews: 89, distance: '1.4 km', hourlyRate: '40,000đ/giờ', experience: '2 năm', avatar: 'https://i.pravatar.cc/150?img=11' },
  ],
  'Part-time': [
    { id: '12', name: 'Lê Văn M', rating: 4.6, reviews: 112, distance: '0.7 km', hourlyRate: '42,000đ/giờ', experience: '3 năm', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '13', name: 'Hoàng Thị N', rating: 4.8, reviews: 134, distance: '1.6 km', hourlyRate: '45,000đ/giờ', experience: '4 năm', avatar: 'https://i.pravatar.cc/150?img=13' },
  ],
  'Phổ thông': [
    { id: '14', name: 'Phạm Văn O', rating: 4.5, reviews: 78, distance: '1.9 km', hourlyRate: '38,000đ/giờ', experience: '2 năm', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '15', name: 'Nguyễn Văn P', rating: 4.7, reviews: 156, distance: '1.2 km', hourlyRate: '42,000đ/giờ', experience: '5 năm', avatar: 'https://i.pravatar.cc/150?img=15' },
  ],
};

interface ServiceBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  service: { title: string; icon: any; color: string } | null;
}

export default function ServiceBottomSheet({ visible, onClose, service }: ServiceBottomSheetProps) {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (visible) {
      // Reset search on open
      setSearchText('');
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleSelectWorker = (workerId: string) => {
    // Navigate to worker profile
    handleClose();
    setTimeout(() => {
      router.push(`/find-worker/profile/${workerId}` as any);
    }, 300);
  };

  if (!service && !visible) return null;

  const currentWorkers = service ? (WORKERS[service.title] || []) : [];
  const filteredWorkers = currentWorkers.filter(w => 
    w.name.toLowerCase().includes(searchText.toLowerCase()) ||
    w.experience.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={handleClose}
      animationType="none"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableWithoutFeedback>
            <Animated.View 
              style={{ transform: [{ translateY: slideAnim }] }}
              className="bg-white dark:bg-slate-900 rounded-t-3xl h-[85%] shadow-xl overflow-hidden"
            >
                {/* Handle Bar */}
                <View className="items-center pt-3 pb-2">
                    <View className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </View>

                {/* Header Info */}
                <View className="px-5 pb-4 flex-row items-center border-b border-gray-100 dark:border-gray-800">
                    <View 
                       className="w-16 h-16 rounded-full items-center justify-center mr-4 overflow-hidden"
                       style={{ backgroundColor: service?.color || '#F5F5F5' }}
                    >
                        {service?.icon && (
                          <Image 
                            source={service.icon} 
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                          />
                        )}
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thợ</Text>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white leading-9">{service?.title}</Text>
                        <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">Chọn thợ bạn thấy ưng ý.</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full">
                        <X size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="px-5 py-4">
                     <View className="flex-row items-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 h-12">
                        <Search size={20} color="#9BA1A6" />
                        <TextInput 
                          className="flex-1 ml-3 font-medium text-body text-gray-900 dark:text-white"
                          placeholder="Tìm thợ theo tên..."
                          placeholderTextColor="#9BA1A6"
                          value={searchText}
                          onChangeText={setSearchText}
                        />
                     </View>
                     <Text className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">
                         {filteredWorkers.length} thợ có sẵn gần bạn
                     </Text>
                </View>

                {/* Worker List */}
                <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                    {filteredWorkers.map((worker) => (
                        <TouchableOpacity 
                            key={worker.id}
                            className="bg-white dark:bg-slate-800 mb-3 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm active:bg-gray-50 dark:active:bg-slate-700"
                            onPress={() => handleSelectWorker(worker.id)}
                        >
                            <View className="flex-row">
                                {/* Avatar */}
                                <Image
                                    source={{ uri: worker.avatar }}
                                    className="w-14 h-14 rounded-full bg-gray-200"
                                />

                                {/* Info */}
                                <View className="flex-1 ml-3">
                                    <View className="flex-row items-start justify-between mb-1">
                                        <Text className="text-base font-bold text-gray-900 dark:text-white">
                                            {worker.name}
                                        </Text>
                                        <Text className="text-xs text-gray-400">{worker.distance}</Text>
                                    </View>
                                    
                                    <View className="flex-row items-center mb-2">
                                        <Star size={14} color="#FFD700" fill="#FFD700" />
                                        <Text className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1">{worker.rating}</Text>
                                        <Text className="text-xs text-gray-400 ml-1">({worker.reviews} đánh giá)</Text>
                                    </View>

                                    <View className="flex-row items-center">
                                        <View className="bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md mr-2">
                                            <Text className="text-xs text-green-700 dark:text-green-400 font-medium">Đang rảnh</Text>
                                        </View>
                                        <View className="bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                                            <Text className="text-xs text-gray-500 dark:text-gray-400">{worker.experience} kn</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    
                    {filteredWorkers.length === 0 && (
                        <View className="items-center py-10">
                            <Text className="text-gray-400">Không tìm thấy thợ phù hợp</Text>
                        </View>
                    )}
                    
                    <View className="h-20" />
                </ScrollView>

            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
