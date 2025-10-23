# 📖 BellApp Development Guide

คู่มือสำหรับนักพัฒนาที่ต้องการมีส่วนร่วมกับ BellApp

## 🚀 เริ่มต้นการพัฒนา

### **Prerequisites**
```bash
# ตรวจสอบ Node.js และ npm
node --version  # >= 18.0.0
npm --version   # >= 8.0.0

# ตรวจสอบ Expo CLI
npx expo --version
```

### **Setup Development Environment**
```bash
# 1. Clone repository
git clone https://github.com/Krudony/Appmindfullness.git
cd Appmindfullness

# 2. เข้าโฟลเดอร์ BellApp-Expo
cd BellApp-Expo

# 3. ติดตั้ง dependencies
npm install

# 4. เริ่ม development server
npx expo start
```

## 📱 วิธีการทำงานกับ Expo

### **Development QR Code**
```bash
npx expo start --tunnel
```
- สแกน QR code ด้วย **Expo Go** app
- Hot reload ทำงานทันที
- พัฒนาบน iOS/Android จริง

### **การเลือก Platform**
```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

## 🏗️ โครงสร้างโปรเจค

```
BellApp-Expo/
├── app/                     # Expo Router screens
│   ├── (tabs)/             # Tab navigation
│   │   ├── _layout.tsx    # Tab configuration
│   │   ├── alarms.tsx     # รายการนาฬิกา
│   │   ├── add-alarm.tsx  # สร้างนาฬิกาใหม่
│   │   ├── settings.tsx   # ตั้งค่า
│   │   └── plus.tsx       # ฟีเจอร์พิเศษ
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screen
├── components/            # Reusable components
│   ├── themed-*.tsx      # Theme-aware components
│   ├── haptic-tab.tsx    # Haptic feedback tab
│   └── ui/               # UI components
├── types/                # TypeScript definitions
│   └── alarm.types.ts    # Alarm interface
├── constants/            # App constants
│   └── theme.ts          # Color themes
├── hooks/                # Custom hooks
│   └── use-*.ts          # Theme and color hooks
├── assets/               # Static assets
└── scripts/              # Build scripts
```

## 🎨 Design System

### **Color Theme (Temple Modern)**
```typescript
const colors = {
  primary: '#FFD700',      // ทอง
  secondary: '#FFA500',    // ส้ม
  background: '#F8F9FA',   // ขาว
  surface: '#FFFFFF',      // ขาว
  text: '#2C3E50',         // ดำ
  textSecondary: '#7F8C8D' // เทา
};
```

### **Typography**
- **Primary**: SF Pro Display/Roboto
- **Thai**: ฟอนท์ที่รองรับภาษาไทย
- **Sizes**: 12px - 32px

### **Component Patterns**
```typescript
// Themed component pattern
import { ThemedView } from '@/components/themed-view';

export const CustomCard = ({ children, style }) => {
  return (
    <ThemedView style={[styles.card, style]}>
      {children}
    </ThemedView>
  );
};
```

## 🔧 การพัฒนา Phase 2: Alarm Logic

### **1. State Management**
```typescript
// Context + Reducer pattern
interface AlarmState {
  alarms: Alarm[];
  isLoading: boolean;
  error: string | null;
}
```

### **2. Data Persistence**
```typescript
// AsyncStorage helpers
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALARMS_KEY = '@bellapp_alarms';

export const saveAlarms = async (alarms: Alarm[]) => {
  await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(alarms));
};
```

### **3. Form Validation**
```typescript
// Alarm validation rules
const validateAlarm = (alarm: Partial<Alarm>) => {
  if (!alarm.name?.trim()) return 'กรุณาระบุชื่อนาฬิกา';
  if (!alarm.repeat?.length) return 'กรุณาเลือกวันที่จะทำงาน';
  return null;
};
```

## 📱 Navigation Patterns

### **Tab Navigation**
```typescript
// app/(tabs)/_layout.tsx
<Tabs screenOptions={{
  tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
  headerShown: false,
  tabBarButton: HapticTab,
}}>
  <Tabs.Screen name="alarms" options={{
    title: 'นาฬิกา',
    tabBarIcon: ({ color }) => <IconSymbol name="bell.fill" color={color} />,
  }} />
</Tabs>
```

### **Modal Navigation**
```typescript
// Open modal
router.push('/modal');

// Close modal
router.back();
```

## 🧪 การทดสอบ

### **Manual Testing Checklist**
- [ ] Navigation ระหว่าง tabs ราบรื่น
- [ ] Haptic feedback ทำงาน
- [ ] Theme switching ทำงาน (light/dark)
- [ ] Form validation แสดงผลถูกต้อง
- [ ] Empty states สวยงาม
- [ ] Responsive design บนขนาดหน้าจอต่างๆ

### **Debugging**
```bash
# Metro debugger
npx expo start --dev-client

# Log device
npx expo start --device
```

## 📝 การ Commit Code

### **Commit Format**
```
[type]: [brief description]

- What: [specific changes]
- Why: [motivation]
- Impact: [affected areas]

Closes #[issue-number]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### **Pre-commit Checklist**
- [ ] Code passes ESLint
- [ ] TypeScript ไม่มี errors
- [ ] ทดสอบบน device จริง
- [ ] Thai language แสดงถูกต้อง
- [ ] Responsive design

## 🚀 Production Build

### **Build Commands**
```bash
# Export for production
npx expo export

# Build for stores (ถ้าต้องการ)
npx eas build --platform android
npx eas build --platform ios
```

### **Environment Variables**
```bash
# .env
EXPO_PUBLIC_API_URL=your-api-url
EXPO_PUBLIC_ENVIRONMENT=production
```

## 🔍 Troubleshooting

### **ปัญหาที่พบบ่อย**

#### **Metro bundler ช้า**
```bash
npx expo start --clear
```

#### **QR Code ไม่ทำงาน**
```bash
# ใช้ tunnel mode
npx expo start --tunnel
```

#### **Thai fonts ไม่แสดง**
```typescript
// ตรวจสอบ fontFamily ใน StyleSheet
textStyle: {
  fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
}
```

#### **Haptic feedback ไม่ทำงาน**
```typescript
// เพิ่มการตรวจสอบ
if (Platform.OS === 'ios') {
  ExpoHaptics.notificationAsync(ExpoHaptics.NotificationFeedbackType.Success);
}
```

## 📚 Resources

### **เอกสารอ้างอิง**
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### **Tools**
- [Expo Go](https://expo.dev/expo-go)
- [Expo Snack](https://snack.expo.dev/)
- [Reactotron](https://github.com/infinitered/reactotron)

## 🤝 การมีส่วนร่วม

### **การสร้าง Feature**
1. อ่าน [Issues](https://github.com/Krudony/Appmindfullness/issues) ก่อน
2. สร้าง branch จาก main
3. เขียน code ตาม patterns
4. Add tests ถ้าจำเป็น
5. Pull request พร้อม description

### **Code Review Guidelines**
- ตรวจสอบ TypeScript types
- ตรวจสอบ UI consistency
- ตรวจสอบ performance
- ตรวจสอบ accessibility

---

Happy coding! 🚀

**ข้อสงสัย**: ถามใน [GitHub Discussions](https://github.com/Krudony/Appmindfullness/discussions)