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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Alarm, DayOfWeek, AlarmSound } from '@/types/alarm.types';

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
          <AntDesign name="up" size={24} color="#FFA500" />
        </TouchableOpacity>

        <Text style={styles.timeText}>{String(selectedHour).padStart(2, '0')}</Text>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedHour((prev) => (prev === 0 ? 23 : prev - 1))}
        >
          <AntDesign name="down" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>

      <Text style={styles.timeSeparator}>:</Text>

      <View style={styles.timeColumn}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedMinute((prev) => (prev === 59 ? 0 : prev + 1))}
        >
          <AntDesign name="up" size={24} color="#FFA500" />
        </TouchableOpacity>

        <Text style={styles.timeText}>{String(selectedMinute).padStart(2, '0')}</Text>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setSelectedMinute((prev) => (prev === 0 ? 59 : prev - 1))}
        >
          <AntDesign name="down" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDaySelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>เลือกวัน</Text>
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
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(day.key) && styles.dayTextSelected,
              ]}
            >
              {day.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSoundSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>เลือกเสียง</Text>
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
            <Text style={styles.soundIcon}>{sound.icon}</Text>
            <Text
              style={[
                styles.soundText,
                selectedSound === sound.key && styles.soundTextSelected,
              ]}
            >
              {sound.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>เพิ่มนาฬิกา</Text>
        <Text style={styles.subtitle}>ตั้งเวลาสำหรับการทำสมาธิและฟังธรรม</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ชื่อนาฬิกา</Text>
          <TextInput
            style={styles.textInput}
            value={alarmName}
            onChangeText={setAlarmName}
            placeholder="ใส่ชื่อนาฬิกา..."
            placeholderTextColor="#BDC3C7"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>เวลา</Text>
          {renderTimePicker()}
        </View>

        {renderDaySelector()}
        {renderSoundSelector()}

        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>เปิดใช้งานนาฬิกา</Text>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
              thumbColor={isEnabled ? '#FFA500' : '#F5F5F5'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveAlarm}>
          <Text style={styles.saveButtonText}>บันทึกนาฬิกา</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFA500',
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
  textInput: {
    backgroundColor: '#FFFFFF',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginVertical: 10,
  },
  timeSeparator: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFA500',
    marginHorizontal: 15,
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
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});