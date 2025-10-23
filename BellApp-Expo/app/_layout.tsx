import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFonts } from '@/hooks/useFonts';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const fontsLoaded = useFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Debug for web deployment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🌐 Web deployment detected');
      console.log('📝 Fonts loaded:', fontsLoaded);

      // Force hide splash screen after timeout for web
      const timeout = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Show a loading state instead of null for better UX
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C3E50' }}>
        <Text style={{ color: '#ECF0F1', fontSize: 18 }}>Loading BellApp...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
