/**
 * Font Loading Hook
 * จัดการการโหลดฟอนท์ภาษาไทยสำหรับ BellApp
 */

import React from 'react';
import { useFonts as useExpoFonts } from 'expo-font';
import {
  Sarabun_300Light,
  Sarabun_400Regular,
  Sarabun_500Medium,
  Sarabun_600SemiBold,
  Sarabun_700Bold,
} from '@expo-google-fonts/sarabun';
import { Platform } from 'react-native';

export function useFonts() {
  const [fontsLoaded] = useExpoFonts({
    SarabunLight: Sarabun_300Light,
    SarabunRegular: Sarabun_400Regular,
    SarabunMedium: Sarabun_500Medium,
    SarabunSemiBold: Sarabun_600SemiBold,
    SarabunBold: Sarabun_700Bold,
  });

  // For web, use timeout fallback to prevent infinite loading
  const [isFontTimeout, setIsFontTimeout] = React.useState(false);

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const timer = setTimeout(() => {
        if (!fontsLoaded) {
          console.warn('Font loading timeout - using system fonts');
          setIsFontTimeout(true);
        }
      }, 3000); // 3 second timeout for web

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  // Return true if fonts are loaded OR if we're on web and timeout occurred
  return fontsLoaded || (Platform.OS === 'web' && isFontTimeout);
}