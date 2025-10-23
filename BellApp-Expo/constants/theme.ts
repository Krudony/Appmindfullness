/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
    /** Thai fonts */
    thai: 'SarabunRegular',
    thaiMedium: 'SarabunMedium',
    thaiBold: 'SarabunBold',
    thaiLight: 'SarabunLight',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    /** Thai fonts */
    thai: 'SarabunRegular',
    thaiMedium: 'SarabunMedium',
    thaiBold: 'SarabunBold',
    thaiLight: 'SarabunLight',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Sarabun', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    /** Thai fonts for web */
    thai: "'Sarabun', 'Kanit', 'Prompt', sans-serif",
  },
});

// Temple Modern Theme Colors
export const TempleColors = {
  primary: '#FFD700',    // สีทอง
  secondary: '#FFA500',  // สีส้ม
  accent: '#FF6B35',     // สีส้มเข้ม
  background: '#FFF8E1', // สีครีมอ่อน
  surface: '#FFFFFF',    // สีขาว
  text: '#2C3E50',       // สีดำเข้ม
  textLight: '#7F8C8D',  // สีเทา
  textMuted: '#BDC3C7',  // สีเทาอ่อน
  success: '#27AE60',    // สีเขียว
  error: '#E74C3C',      // สีแดง
  warning: '#F39C12',    // สีเหลือง
  shadow: 'rgba(0, 0, 0, 0.1)',
};
