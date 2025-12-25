import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Bell, MessageSquare } from 'lucide-react-native';
import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from 'nativewind';

const NotificationTabButton = (props: any) => {
  const { onPress, accessibilityState } = props || {};
  const focused = accessibilityState?.selected; // Safety check

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: focused ? -5 : 0, 
      }}>
      {focused ? (
        <View className="flex-row items-center bg-[#0068FF] px-4 py-2.5 rounded-full shadow-lg shadow-blue-500/40">
          <View className="relative">
            <Bell size={20} color="white" strokeWidth={2.5} />
            <View className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-blue-600" />
          </View>
          <Text className="text-white font-bold ml-2 text-xs" numberOfLines={1}>
            Thông báo
          </Text>
        </View>
      ) : (
        <View className="items-center justify-center pt-1.5">
           <View className="relative">
             <Bell size={24} color="#9BA1A6" />
             <View className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
           </View>
           <Text style={{ fontFamily: 'BeVietnamPro_500Medium', fontSize: 10, color: '#9BA1A6', marginTop: 4 }}>
             Thông báo
           </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function WorkerHomeLayout() {
  const { colorScheme } = useColorScheme();
  const activeColor = '#0068FF'; 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: '#9BA1A6',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#FFFFFF',
          borderTopWidth: colorScheme === 'dark' ? 1 : 0,
          borderTopColor: '#1e293b', 
          elevation: 0,
          shadowOpacity: 0,
          height: 65,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'BeVietnamPro_500Medium',
          fontSize: 12,
        }
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: 'Thông báo',
          tabBarLabel: () => null,
          tabBarButton: (props) => <NotificationTabButton {...props} />,
        }}
      />

    </Tabs>
  );
}
