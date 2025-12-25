import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F5F5F5',
    tint: '#0068FF',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0068FF',
    secondary: '#FF6600',
    success: '#00C853',
    error: '#D50000',
    surface: '#F5F5F5',
    card: '#FFFFFF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#0068FF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#0068FF',
    secondary: '#FF6600',
    success: '#00C853',
    error: '#D50000',
    surface: '#151718',
    card: '#25292e',
  },
};

export const Typography = {
  fontFamily: 'BeVietnamPro_400Regular',
  h1: {
    fontSize: 24,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  h2: {
    fontSize: 20,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  body: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'BeVietnamPro_500Medium',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'BeVietnamPro_400Regular',
  },
  default: {
    sans: 'BeVietnamPro_400Regular',
  },
  web: {
    sans: "'Be Vietnam Pro', system-ui, sans-serif",
  },
});

