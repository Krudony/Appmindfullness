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

  const getOptimalLineHeight = () => {
    if (lineHeight) return lineHeight;

    // Use consistent line height for all weights
    // Increased line height for better Thai text rendering
    // Thai voweled characters (สระ อุ, ุ, etc.) need more vertical space
    return Platform.OS === 'web' ? 1.8 : 28;
  };

  return (
    <Text
      style={[
        {
          // Simplified font family approach
          ...(Platform.OS === 'web' ? {
            fontFamily: "'Sarabun', 'Kanit', 'Prompt', sans-serif",
            fontWeight: weight === 'regular' ? '400' :
                       weight === 'light' ? '300' :
                       weight === 'medium' ? '500' :
                       weight === 'semibold' ? '600' : '700',
            // Extra padding for Thai voweled characters
            paddingTop: 1,
            paddingBottom: 1,
          } : {
            fontFamily: getFontFamily(),
            // Extra padding for Thai voweled characters on mobile
            paddingTop: 1,
            paddingBottom: 1,
          }),
          // Consistent line height for better layout stability
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