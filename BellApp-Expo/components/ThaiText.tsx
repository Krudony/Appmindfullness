/**
 * ThaiText Component
 * คอมโพเนนต์สำหรับแสดงข้อความภาษาไทยที่รองรับฟอนท์ Sarabun
 */

import React from 'react';
import { Text, TextProps, StyleSheet, Platform } from 'react-native';

type ThaiTextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

interface ThaiTextProps extends TextProps {
  weight?: ThaiTextWeight;
  lineHeight?: number;
  numberOfLines?: number;
  children: React.ReactNode;
}

export function ThaiText({
  weight = 'regular',
  lineHeight,
  numberOfLines,
  style,
  children,
  ...props
}: ThaiTextProps) {
  const getFontFamily = () => {
    switch (weight) {
      case 'light': return 'SarabunLight';
      case 'medium': return 'SarabunMedium';
      case 'semibold': return 'SarabunSemiBold';
      case 'bold': return 'SarabunBold';
      default: return 'SarabunRegular';
    }
  };

  const getWebFallback = () => {
    switch (weight) {
      case 'light': return '300';
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return '700';
      default: return '400';
    }
  };

  const getOptimalLineHeight = () => {
    if (lineHeight) return lineHeight;

    // Default line heights based on font weight and platform
    if (Platform.OS === 'web') {
      switch (weight) {
        case 'light': return 1.5;
        case 'medium': return 1.6;
        case 'semibold': return 1.6;
        case 'bold': return 1.5;
        default: return 1.6;
      }
    }

    // Mobile: pixel values
    switch (weight) {
      case 'light': return 22;
      case 'medium': return 24;
      case 'semibold': return 24;
      case 'bold': return 22;
      default: return 24;
    }
  };

  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(),
          // Web fallback for better compatibility
          ...(Platform.OS === 'web' && {
            fontFamily: "'Sarabun', 'Kanit', 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: getWebFallback(),
          }),
          // Optimal line height for Thai text
          lineHeight: getOptimalLineHeight(),
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
}