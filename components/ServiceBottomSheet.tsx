import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Search, ChevronRight, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

const { height } = Dimensions.get('window');

// Mock Data for Sub-services
const SUB_SERVICES: Record<string, string[]> = {
  'Điện': ['Sửa chữa điện dân dụng', 'Lắp đặt đèn LED', 'Thi công điện âm tường', 'Sửa chập cháy điện', 'Thay thế aptomat', 'Lắp quạt trần'],
  'Nước': ['Sửa ống nước rò rỉ', 'Thông tắc cống', 'Lắp đặt máy bơm', 'Vệ sinh bể nước', 'Sửa vòi nước, lavabo'],
  'Điện lạnh': ['Vệ sinh máy lạnh', 'Bơm ga máy lạnh', 'Sửa máy giặt', 'Sửa tủ lạnh', 'Lắp đặt máy lạnh mới'],
  'Xây sửa': ['Sơn sửa nhà', 'Chống thấm trần/tường', 'Lát gạch nền', 'Sửa chữa trần thạch cao', 'Cải tạo nhà bếp'],
  'Thông nghẹt': ['Thông nghẹt bồn cầu', 'Thông nghẹt lavabo', 'Thông cống nghẹt', 'Hút hầm cầu'],
  'Sơn nhà': ['Sơn nước trọn gói', 'Sơn chống thấm', 'Sơn lại cửa sắt/gỗ', 'Vẽ tranh tường'],
  'Chuyển nhà': ['Chuyển nhà trọn gói', 'Chuyển văn phòng', 'Thuê xe tải chở đồ', 'Bốc xếp hàng hóa'],
  'Khác': ['Dịch vụ giúp việc', 'Chăm sóc cây cảnh', 'Diệt mối côn trùng', 'Sửa khóa tại nhà']
};

interface ServiceBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  service: { title: string; icon: any; color: string; iconColor: string } | null;
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

  const handleSelectSubService = (subService: string) => {
    // Navigate to booking with pre-filled info
    handleClose();
    // Small delay to allow animation to start
    setTimeout(() => {
        router.push({
            pathname: `/find-worker/${encodeURIComponent(subService)}` as any,
        });
    }, 300);
  };

  if (!service && !visible) return null;

  const currentSubServices = service ? (SUB_SERVICES[service.title] || []) : [];
  const filteredServices = currentSubServices.filter(s => 
    s.toLowerCase().includes(searchText.toLowerCase())
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
                       className="w-16 h-16 rounded-full items-center justify-center mr-4"
                       style={{ backgroundColor: service?.color || '#F5F5F5' }}
                    >
                        {service?.icon && <service.icon size={32} color={service.iconColor} />}
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dịch vụ</Text>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white leading-9">{service?.title}</Text>
                        <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">Chọn dịch vụ Quý Khách cần</Text>
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
                          placeholder="Tìm kiếm dịch vụ..."
                          placeholderTextColor="#9BA1A6"
                          value={searchText}
                          onChangeText={setSearchText}
                        />
                     </View>
                     <Text className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">
                         Gợi ý: máy lạnh, máy giặt, tủ lạnh, đèn, điện, ống nước...
                     </Text>
                </View>

                {/* List */}
                <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                    {filteredServices.map((item, index) => (
                        <TouchableOpacity 
                            key={index}
                            className="bg-white dark:bg-slate-800 mb-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex-row items-center shadow-sm active:bg-gray-50 dark:active:bg-slate-700"
                            onPress={() => handleSelectSubService(item)}
                        >
                            <View className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 items-center justify-center mr-3">
                                {/* Use a generic Wrench icon for sub-services or specific logic if needed */}
                                {service?.icon && <service.icon size={18} color="#FFB300" />}
                            </View>
                            <Text className="flex-1 text-body font-bold text-gray-800 dark:text-gray-200">{item}</Text>
                            <ChevronRight size={20} color="#CFD8DC" />
                        </TouchableOpacity>
                    ))}
                    
                    {filteredServices.length === 0 && (
                        <View className="items-center py-10">
                            <Text className="text-gray-400">Không tìm thấy dịch vụ phù hợp</Text>
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
