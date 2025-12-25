

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F5F5F5', // Surface
    tint: '#0068FF',       // Primary (Zalo Blue)
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0068FF',
    secondary: '#FF6600',   // Secondary (Orange)
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

export type ThemeColors = typeof Colors.light;

