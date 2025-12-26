import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { ArrowLeft, Droplets, Hammer, PaintBucket, ShieldCheck, Snowflake, Star, Truck, Wrench, Zap } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

// Service Configuration (Icon & Color Mapping)
const SERVICES_CONFIG: Record<string, { icon: any, color: string, iconColor: string }> = {
  'Điện': { icon: Zap, color: '#E3F2FD', iconColor: '#2196F3' },
  'Nước': { icon: Droplets, color: '#E0F7FA', iconColor: '#00BCD4' },
  'Điện lạnh': { icon: Snowflake, color: '#E8F5E9', iconColor: '#4CAF50' },
  'Xây sửa': { icon: Hammer, color: '#FFF3E0', iconColor: '#FF9800' },
  'Thông nghẹt': { icon: Wrench, color: '#F3E5F5', iconColor: '#9C27B0' },
  'Sơn nhà': { icon: PaintBucket, color: '#FCE4EC', iconColor: '#E91E63' },
  'Chuyển nhà': { icon: Truck, color: '#EFEBE9', iconColor: '#795548' },
  'Khác': { icon: ShieldCheck, color: '#FAFAFA', iconColor: '#9E9E9E' },
};

const SERVICE_KEYS = Object.keys(SERVICES_CONFIG);

const INITIAL_REGION = {
  latitude: 10.7769,
  longitude: 106.7009,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Generate some random workers around the center
const generateMockWorkers = (count: number) => {
  const workers = [];
  for (let i = 0; i < count; i++) {
    // Random offset
    const latOffset = (Math.random() - 0.5) * 0.08;
    const lngOffset = (Math.random() - 0.5) * 0.08;
    const randomService = SERVICE_KEYS[Math.floor(Math.random() * SERVICE_KEYS.length)];
    
    workers.push({
      id: `w-${i}`,
      name: `Thợ ${randomService} ${i + 1}`,
      service: randomService,
      latitude: INITIAL_REGION.latitude + latOffset,
      longitude: INITIAL_REGION.longitude + lngOffset,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      reviews: Math.floor(Math.random() * 200),
      avatar: 'https://i.pravatar.cc/150?u=' + i,
      distance: (Math.random() * 5).toFixed(1) + ' km'
    });
  }
  return workers;
};

const MOCK_WORKERS = generateMockWorkers(20);

export default function WorkerMapScreen() {
  const router = useRouter();
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation(location.coords);
      
      if (location.coords && mapRef.current) {
        mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });
      }
    })();
  }, []);

  const handleMarkerPress = (worker: any) => {
    setSelectedWorker(worker);
  };

  const handleCloseModal = () => {
    setSelectedWorker(null);
  };

  const handleViewProfile = () => {
    if (selectedWorker) {
        router.push(`/find-worker/profile/${selectedWorker.id}` as any);
        setSelectedWorker(null);
    }
  };

  return (
    <View className="flex-1">
      {/* Map */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {MOCK_WORKERS.map((worker) => {
          const config = SERVICES_CONFIG[worker.service] || SERVICES_CONFIG['Khác'];
          const IconComponent = config.icon;

          return (
            <Marker
              key={worker.id}
              coordinate={{ latitude: worker.latitude, longitude: worker.longitude }}
              onPress={() => handleMarkerPress(worker)}
            >
               <View 
                  style={{ 
                    backgroundColor: config.color, 
                    padding: 8, 
                    borderRadius: 20, 
                    borderWidth: 2, 
                    borderColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
               >
                  <IconComponent size={20} color={config.iconColor} />
               </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Header Overlay */}
      <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
          <View className="flex-row items-center px-4 py-2 mt-2">
             <TouchableOpacity 
               onPress={() => router.back()} 
               className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md shadow-black/20"
             >
                <ArrowLeft size={20} color="black" />
             </TouchableOpacity>
             <View className="flex-1 items-center mr-10">
                <View className="bg-white px-4 py-2 rounded-full shadow-md shadow-black/10">
                    <Text className="font-bold text-gray-800">Khu vực làm việc</Text>
                </View>
             </View>
          </View>
      </SafeAreaView>

      {/* Worker Detail Modal (Bottom Sheet style) */}
      {selectedWorker && (
        <View className="absolute bottom-0 left-0 right-0">
            <TouchableWithoutFeedback onPress={handleCloseModal}>
                <View className="absolute top-[-1000] bottom-0 left-0 right-0 bg-transparent" />
            </TouchableWithoutFeedback>
            
            <View className="bg-white rounded-t-3xl p-5 shadow-2xl shadow-black">
                <View className="flex-row">
                    <Image 
                      source={{ uri: selectedWorker.avatar }} 
                      className="w-16 h-16 rounded-2xl bg-gray-200"
                    />
                    <View className="flex-1 ml-4">
                        <Text className="text-xl font-bold text-gray-900">{selectedWorker.name}</Text>
                        <Text className="text-gray-500 font-medium">{selectedWorker.service}</Text>
                        <View className="flex-row items-center mt-1">
                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                            <Text className="text-sm font-bold ml-1">{selectedWorker.rating}</Text>
                            <Text className="text-xs text-gray-400 ml-1">({selectedWorker.reviews} đánh giá)</Text>
                        </View>
                    </View>
                    <View className="items-end">
                       <Text className="font-bold text-blue-600">{selectedWorker.distance}</Text>
                    </View>
                </View>

                <View className="flex-row mt-4 gap-3">
                    <TouchableOpacity 
                      className="flex-1 bg-gray-100 py-3 rounded-xl items-center"
                      onPress={handleCloseModal}
                    >
                        <Text className="font-bold text-gray-700">Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                       className="flex-1 bg-blue-600 py-3 rounded-xl items-center shadow-lg shadow-blue-200"
                       onPress={handleViewProfile}
                    >
                        <Text className="font-bold text-white">Xem hồ sơ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      )}
    </View>
  );
}
