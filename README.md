# 🔔 BellApp - แอปแจ้งเตือนระฆังวัด

แอปปลุกเพื่อการทำสมาธิและฟังธรรมในวัด พัฒนาด้วย React Native + Expo

## ✨ เวอร์ชันที่พร้อมใช้งาน

### 🚀 BellApp-Expo (แนะนำ)
- ✅ **Phase 1: App Structure** เสร็จสมบูรณ์
- ✅ 4 tabs พร้อม UI สวยงามแบบ Temple Modern Theme
- ✅ เข้ากันได้กับ iOS, Android, และ Web
- ✅ QR Code Development ทำงานได้
- ✅ พร้อมพัฒนาต่อ Phase 2: Alarm Logic

## 🏛️ ฟีเจอร์หลัก

### **📱 4 Tabs หลัก**
- **🕐 นาฬิกา** - รายการนาฬิกาปลุกทั้งหมด
- **➕ เพิ่ม** - สร้างนาฬิกาปลุกใหม่
- **⚙️ ตั้งค่า** - ปรับแต่งแอปตามต้องการ
- **💫 เพิ่มเติม** - ฟีเจอร์พรีเมียมและสถิติ

### **🎨 Temple Modern Theme**
- สีทอง/สีส้น (สีพระพุทธศาสนา)
- Card-based layouts สวยงาม
- Empty states สมบูรณ์
- ภาษาไทยทั่วทั้งแอป

## 🚀 วิธีติดตั้งและใช้งาน

### **1. Clone Repository**
```bash
git clone https://github.com/Krudony/Appmindfullness.git
cd Appmindfullness
```

### **2. เข้าโฟลเดอร์ BellApp-Expo**
```bash
cd BellApp-Expo
```

### **3. ติดตั้ง Dependencies**
```bash
npm install
```

### **4. เริ่ม Development Server**
```bash
npx expo start
```

### **5. เปิดบนมือถือ**
- เปิด **Expo Go** app บนมือถือ
- สแกน **QR code** จาก terminal
- แอปจะทำงานทันที!

## 📱 QR Code Development

BellApp-Expo ใช้ **Expo Go QR Code Development** ที่ทำงานได้ 100%:

```
🔔 BellApp Expo Development Server
📱 QR Code: สแกนด้วย Expo Go
🚀 Hot Reload: ทำงานทันที
✅ Working: Guaranteed!
```

## 🏗️ โครงสร้างโปรเจค

```
BellApp-Expo/
├── app/(tabs)/           # 4 หน้าหลัก
│   ├── alarms.tsx       # รายการนาฬิกา
│   ├── add-alarm.tsx    # สร้างนาฬิกาใหม่
│   ├── settings.tsx     # ตั้งค่าแอป
│   └── plus.tsx         # ฟีเจอร์พิเศษ
├── components/          # UI Components
├── types/              # TypeScript Types
├── assets/             # Images & Icons
├── package.json        # Dependencies
└── app.json           # Expo Config
```

## 📋 สถานะการพัฒนา

### **✅ Phase 1: App Structure (เสร็จแล้ว)**
- [x] 4 tabs navigation สมบูรณ์
- [x] UI/UX สวยงามแบบ Temple Modern Theme
- [x] TypeScript types ครบถ้วน
- [x] Export สำเร็จ (15 static routes)
- [x] QR Code Development ทำงาน

### **🔄 Phase 2: Alarm Logic (ถัดไป)**
- [ ] CRUD operations สำหรับ alarms
- [ ] AsyncStorage สำหรับเก็บข้อมูล
- [ ] Form validation และ error handling
- [ ] State management (Context/Reducer)

### **📅 Phase 3: Background Service**
- [ ] Background task implementation
- [ ] Audio playback ในพื้นหลัง
- [ ] Real notifications
- [ ] Alarm triggering logic

## 🔧 Technology Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router (Tabs Navigation)
- **Language**: TypeScript
- **Styling**: StyleSheet + Temple Theme
- **Audio**: expo-av
- **Notifications**: expo-notifications
- **Background Tasks**: expo-background-fetch

## 📱 รองรับ

- **iOS** 11.0+ ผ่าน Expo Go
- **Android** 5.0+ ผ่าน Expo Go
- **Web** ผ่าน Expo Web

## 🤝 การมีส่วนร่วม

BellApp เป็นโปรเจค์ open-source สำหรับชุมชนพุทธศาสนา:

1. Fork โปรเจค์
2. สร้าง feature branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ไป branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

## 📄 License

MIT License - ดู [LICENSE](LICENSE) สำหรับรายละเอียด

## 🙏 ขอบคุณ

พัฒนาด้วย ❤️ สำหรับชุมชนพุทธศาสนาและผู้ที่สนใจการทำสมาธิ

## 📞 ติดต่อ

- **Issues**: [GitHub Issues](https://github.com/Krudony/Appmindfullness/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Krudony/Appmindfullness/discussions)

---

🔔 **BellApp** - แจ้งเตือนเวลาทำสมาธิและฟังธรรม
🚀 **Powered by Expo Go + QR Code Development**
📱 **Download และทดลองได้วย QR Code**