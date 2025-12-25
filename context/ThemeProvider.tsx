import React, { useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { ThemeContext, ThemeMode } from './ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [theme, setTheme] = React.useState<ThemeMode>(deviceColorScheme ?? 'light');

  React.useEffect(() => {
    if (deviceColorScheme) {
      setTheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    isDark
  }), [theme, isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
