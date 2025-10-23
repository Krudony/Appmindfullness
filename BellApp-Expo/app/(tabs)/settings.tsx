/**
 * หน้าตั้งค่า - Settings Tab
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  Slider,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [snoozeTime, setSnoozeTime] = useState(5);

  const handleAbout = () => {
    Alert.alert(
      'เกี่ยวกับ BellApp',
      'BellApp v1.0.0\n\n' +
      'แอปแจ้งเตือนระฆังสำหรับทำสมาธิและฟังธรรม\n\n' +
      'พัฒนาด้วย ❤️ สำหรับชุมชนพุทธศาสนา\n\n' +
      '© 2025 BellApp Project',
      [{ text: 'ตกลง', style: 'default' }]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'รีเซ็ตการตั้งค่า',
      'คุณต้องการคืนค่าการตั้งค่าทั้งหมดหรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'รีเซ็ต',
          style: 'destructive',
          onPress: () => {
            setNotificationsEnabled(true);
            setSoundEnabled(true);
            setVibrationEnabled(true);
            setDarkMode(false);
            setVolume(0.8);
            setSnoozeTime(5);
            Alert.alert('สำเร็จ', 'การตั้งค่าถูกรีเซ็ตเรียบร้อยแล้ว');
          },
        },
      ]
    );
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const renderSettingItem = (
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ตั้งค่า</Text>
        <Text style={styles.subtitle}>ปรับแต่งแอปตามที่คุณต้องการ</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSection(
          'การแจ้งเตือน',
          <>
            {renderSettingItem(
              'เปิดการแจ้งเตือน',
              'แสดงการแจ้งเตือนเมื่อถึงเวลานาฬิกา',
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
                thumbColor={notificationsEnabled ? '#FFA500' : '#F5F5F5'}
              />
            )}
            {renderSettingItem(
              'เวลาสลีป',
              `${snoozeTime} นาที`,
              <View style={styles.snoozeButtons}>
                <TouchableOpacity
                  style={[styles.snoozeButton, snoozeTime === 1 && styles.snoozeButtonActive]}
                  onPress={() => setSnoozeTime(1)}
                >
                  <Text style={[styles.snoozeButtonText, snoozeTime === 1 && styles.snoozeButtonTextActive]}>
                    1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.snoozeButton, snoozeTime === 5 && styles.snoozeButtonActive]}
                  onPress={() => setSnoozeTime(5)}
                >
                  <Text style={[styles.snoozeButtonText, snoozeTime === 5 && styles.snoozeButtonTextActive]}>
                    5
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.snoozeButton, snoozeTime === 10 && styles.snoozeButtonActive]}
                  onPress={() => setSnoozeTime(10)}
                >
                  <Text style={[styles.snoozeButtonText, snoozeTime === 10 && styles.snoozeButtonTextActive]}>
                    10
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {renderSection(
          'เสียง',
          <>
            {renderSettingItem(
              'เปิดเสียง',
              'เล่นเสียงเมื่อถึงเวลานาฬิกา',
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
                thumbColor={soundEnabled ? '#FFA500' : '#F5F5F5'}
              />
            )}
            {renderSettingItem(
              'ระดับเสียง',
              `${Math.round(volume * 100)}%`,
              <View style={styles.volumeContainer}>
                <Text style={styles.volumeIcon}>🔊</Text>
                <View style={styles.volumeSlider}>
                  <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
                </View>
              </View>
            )}
            {renderSettingItem(
              'สั่นสะเทือน',
              'สั่นเมื่อมีการแจ้งเตือน',
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
                thumbColor={vibrationEnabled ? '#FFA500' : '#F5F5F5'}
              />
            )}
          </>
        )}

        {renderSection(
          'การแสดงผล',
          <>
            {renderSettingItem(
              'โหมดมืด',
              'ใช้สี主题มืดในแอป',
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
                thumbColor={darkMode ? '#FFA500' : '#F5F5F5'}
              />
            )}
          </>
        )}

        {renderSection(
          'ข้อมูล',
          <>
            {renderSettingItem(
              'เกี่ยวกับแอป',
              'เวอร์ชัน 1.0.0',
              <AntDesign name="right" size={20} color="#BDC3C7" />,
              handleAbout
            )}
            {renderSettingItem(
              'นโยบายความเป็นส่วนตัว',
              'อ่านนโยบายของเรา',
              <AntDesign name="right" size={20} color="#BDC3C7" />,
              () => Alert.alert('นโยบายความเป็นส่วนตัว', 'Coming soon...')
            )}
          </>
        )}

        {renderSection(
          'อันตราย',
          <>
            {renderSettingItem(
              'รีเซ็ตการตั้งค่า',
              'คืนค่าการตั้งค่าทั้งหมด',
              <AntDesign name="right" size={20} color="#E74C3C" />,
              handleResetSettings
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#9B59B6',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  snoozeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  snoozeButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snoozeButtonActive: {
    backgroundColor: '#FFD700',
  },
  snoozeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  snoozeButtonTextActive: {
    color: '#2C3E50',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  volumeIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  volumeSlider: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 2,
  },
});