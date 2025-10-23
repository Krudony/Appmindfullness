/**
 * หน้าเพิ่มนาฬิกาปลุกใหม่ - Add Alarm Tab
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Alarm, DayOfWeek, AlarmSound } from '@/types/alarm.types';
import { ThaiText } from '@/components/ThaiText';
import { TempleColors } from '@/constants/theme';

const DAYS_OF_WEEK: { key: DayOfWeek; label: string }[] = [
  { key: 'monday', label: 'จันทร์' },
  { key: 'tuesday', label: 'อังคาร' },
  { key: 'wednesday', label: 'พุธ' },
  { key: 'thursday', label: 'พฤหัสบดี' },
  { key: 'friday', label: 'ศุกร์' },
  { key: 'saturday', label: 'เสาร์' },
  { key: 'sunday', label: 'อาทิตย์' },
];

const ALARM_SOUNDS: { key: AlarmSound; label: string; icon: string }[] = [
  { key: 'temple-bell', label: 'ระฆังวัด', icon: '🔔' },
  { key: 'morning-chant', label: 'บทสวดเช้า', icon: '🌅' },
  { key: 'evening-chant', label: 'บทสวดเย็น', icon: '🌙' },
  { key: 'meditation-bell', label: 'กระดิ่งทำสมาธิ', icon: '🧘' },
  { key: 'custom', label: 'เสียงอื่นๆ', icon: '🎵' },
];

export default function AddAlarmScreen() {
  const [alarmName, setAlarmName] = useState('ทำสมาธิ');
  const [selectedHour, setSelectedHour] = useState(6);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(['monday']);
  const [selectedSound, setSelectedSound] = useState<AlarmSound>('temple-bell');
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const saveAlarm = () => {
    if (!alarmName.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณาใส่ชื่อนาฬิกา');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert('ข้อผิดพลาด', 'กรุณาเลือกวันที่จะให้นาฬิกาทำงาน');
      return;
    }

    // ในอนาคตจะบันทึกลงฐานข้อมูลจริง
    Alert.alert(
      'บันทึกสำเร็จ',
      `นาฬิกา "${alarmName}" ถูกบันทึกเรียบร้อยแล้ว`,
      [{ text: 'ตกลง', style: 'default' }]
    );

    // Reset form
    setAlarmName('ทำสมาธิ');
    setSelectedHour(6);
    setSelectedMinute(0);
    setSelectedDays(['monday']);
    setSelectedSound('temple-bell');
    setIsEnabled(true);
  };

  const renderTimePicker = () => (
    <View style={styles.timePickerContainer}>
      <View style={styles.timeColumn}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedHour((prev) => (prev === 23 ? 0 : prev + 1))}
        >
          <AntDesign name="up" size={24} color={TempleColors.secondary} />
        </TouchableOpacity>

        <ThaiText weight="bold" style={styles.timeText}>{String(selectedHour).padStart(2, '0')}</ThaiText>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedHour((prev) => (prev === 0 ? 23 : prev - 1))}
        >
          <AntDesign name="down" size={24} color={TempleColors.secondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.timeSeparator}>:</Text>

      <View style={styles.timeColumn}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedMinute((prev) => (prev === 59 ? 0 : prev + 1))}
        >
          <AntDesign name="up" size={24} color={TempleColors.secondary} />
        </TouchableOpacity>

        <ThaiText weight="bold" style={styles.timeText}>{String(selectedMinute).padStart(2, '0')}</ThaiText>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedMinute((prev) => (prev === 0 ? 59 : prev - 1))}
        >
          <AntDesign name="down" size={24} color={TempleColors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDaySelector = () => (
    <View style={styles.section}>
      <ThaiText weight="semibold" style={styles.sectionTitle}>เลือกวัน</ThaiText>
      <View style={styles.dayContainer}>
        {DAYS_OF_WEEK.map((day) => (
          <TouchableOpacity
            key={day.key}
            style={[
              styles.dayButton,
              selectedDays.includes(day.key) && styles.dayButtonSelected,
            ]}
            onPress={() => toggleDay(day.key)}
          >
            <ThaiText
              style={[
                styles.dayText,
                selectedDays.includes(day.key) && styles.dayTextSelected,
              ]}
            >
              {day.label}
            </ThaiText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSoundSelector = () => (
    <View style={styles.section}>
      <ThaiText weight="semibold" style={styles.sectionTitle}>เลือกเสียง</ThaiText>
      <View style={styles.soundContainer}>
        {ALARM_SOUNDS.map((sound) => (
          <TouchableOpacity
            key={sound.key}
            style={[
              styles.soundButton,
              selectedSound === sound.key && styles.soundButtonSelected,
            ]}
            onPress={() => setSelectedSound(sound.key)}
          >
            <ThaiText style={styles.soundIcon}>{sound.icon}</ThaiText>
            <ThaiText
              style={[
                styles.soundText,
                selectedSound === sound.key && styles.soundTextSelected,
              ]}
            >
              {sound.label}
            </ThaiText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThaiText weight="bold" style={styles.title}>เพิ่มนาฬิกา</ThaiText>
        <ThaiText style={styles.subtitle}>ตั้งเวลาสำหรับการทำสมาธิและฟังธรรม</ThaiText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThaiText weight="semibold" style={styles.sectionTitle}>ชื่อนาฬิกา</ThaiText>
          <TextInput
            style={styles.textInput}
            value={alarmName}
            onChangeText={setAlarmName}
            placeholder="ใส่ชื่อนาฬิกา..."
            placeholderTextColor={TempleColors.textMuted}
          />
        </View>

        <View style={styles.section}>
          <ThaiText weight="semibold" style={styles.sectionTitle}>เวลา</ThaiText>
          {renderTimePicker()}
        </View>

        {renderDaySelector()}
        {renderSoundSelector()}

        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <ThaiText style={styles.switchLabel}>เปิดใช้งานนาฬิกา</ThaiText>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{ false: '#E0E0E0', true: TempleColors.primary }}
              thumbColor={isEnabled ? TempleColors.secondary : '#F5F5F5'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveAlarm}>
          <ThaiText weight="semibold" style={styles.saveButtonText}>บันทึกนาฬิกา</ThaiText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TempleColors.background,
  },
  header: {
    backgroundColor: TempleColors.secondary,
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 120,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: TempleColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  title: {
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 5,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
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
    color: TempleColors.text,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: TempleColors.surface,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    }),
  },
  timeColumn: {
    alignItems: 'center',
  },
  timeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFF5E5',
  },
  timeText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginVertical: 8,
    minWidth: 70,
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginHorizontal: 12,
    lineHeight: 42,
  },
  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dayButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dayButtonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#FFA500',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  dayTextSelected: {
    color: '#2C3E50',
  },
  soundContainer: {
    gap: 10,
  },
  soundButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  soundButtonSelected: {
    backgroundColor: '#FFF5E5',
    borderColor: '#FFA500',
  },
  soundIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  soundText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  soundTextSelected: {
    color: '#2C3E50',
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  switchLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
  saveButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 60,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
  },
});