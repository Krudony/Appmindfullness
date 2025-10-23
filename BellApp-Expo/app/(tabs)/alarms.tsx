/**
 * หน้ารายการนาฬิกาปลุก - Alarms Tab
 * หน้าหลักของแอป BellApp
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Alarm } from '@/types/alarm.types';
import { ThaiText } from '@/components/ThaiText';
import { TempleColors } from '@/constants/theme';

// Mock data สำหรับการทดสอบ
const mockAlarms: Alarm[] = [
  {
    id: '1',
    name: 'ทำสมาธิเช้า',
    time: new Date(2025, 0, 1, 6, 0), // 6:00 AM
    sound: 'temple-bell',
    repeat: ['monday', 'wednesday', 'friday'],
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'ฟังธรรมเย็น',
    time: new Date(2025, 0, 1, 18, 30), // 6:30 PM
    sound: 'evening-chant',
    repeat: ['sunday'],
    enabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AlarmsScreen() {
  const [alarms, setAlarms] = useState<Alarm[]>(mockAlarms);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatRepeat = (repeatDays: string[]) => {
    if (repeatDays.length === 7) return 'ทุกวัน';
    if (repeatDays.length === 0) return 'ครั้งเดียว';

    const dayNames: { [key: string]: string } = {
      monday: 'จ',
      tuesday: 'อ',
      wednesday: 'พ',
      thursday: 'พฤ',
      friday: 'ศ',
      saturday: 'ส',
      sunday: 'อา',
    };

    return repeatDays.map(day => dayNames[day]).join(', ');
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prevAlarms =>
      prevAlarms.map(alarm =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  const deleteAlarm = (id: string) => {
    Alert.alert(
      'ลบนาฬิกา',
      'คุณต้องการลบนาฬิกานี้หรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: () => {
            setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== id));
          },
        },
      ]
    );
  };

  const renderAlarmItem = ({ item }: { item: Alarm }) => (
    <View style={styles.alarmCard}>
      <View style={styles.alarmInfo}>
        <ThaiText weight="bold" style={styles.alarmTime}>{formatTime(item.time)}</ThaiText>
        <ThaiText weight="semibold" style={styles.alarmName}>{item.name}</ThaiText>
        <ThaiText style={styles.alarmRepeat}>{formatRepeat(item.repeat)}</ThaiText>
        <ThaiText style={styles.alarmSound}>🔔 {item.sound}</ThaiText>
      </View>

      <View style={styles.alarmActions}>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleAlarm(item.id)}
          trackColor={{ false: '#E0E0E0', true: TempleColors.primary }}
          thumbColor={item.enabled ? TempleColors.secondary : '#F5F5F5'}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAlarm(item.id)}
        >
          <AntDesign name="delete" size={20} color={TempleColors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <AntDesign name="clockcircleo" size={80} color={TempleColors.textMuted} />
      <ThaiText weight="bold" style={styles.emptyTitle}>ยังไม่มีนาฬิกา</ThaiText>
      <ThaiText style={styles.emptyDescription}>
        แตะที่ปุ่ม "เพิ่ม" เพื่อสร้างนาฬิกาปลุกแรกของคุณ
      </ThaiText>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThaiText weight="bold" style={styles.title}>นาฬิกาปลุก</ThaiText>
        <ThaiText style={styles.subtitle}>จัดการเวลาสำหรับทำสมาธิและฟังธรรม</ThaiText>
      </View>

      <View style={styles.content}>
        {alarms.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={alarms}
            renderItem={renderAlarmItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TempleColors.background,
  },
  header: {
    backgroundColor: TempleColors.primary,
    paddingTop: 65,
    paddingBottom: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 200,
    width: '100%',
    alignItems: 'flex-start',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      minWidth: '100%',
    } : {
      shadowColor: TempleColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  title: {
    fontSize: 28,
    color: TempleColors.text,
    marginBottom: 5,
    lineHeight: 40,
    width: '100%',
    flexShrink: 0,
    paddingTop: 4,
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: TempleColors.textLight,
    lineHeight: 25,
    paddingTop: 2,
    paddingBottom: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  alarmCard: {
    backgroundColor: TempleColors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: TempleColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    }),
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTime: {
    fontSize: 30,
    color: TempleColors.text,
    marginBottom: 5,
    lineHeight: 36,
    minWidth: 80,
  },
  alarmName: {
    fontSize: 17,
    color: TempleColors.text,
    marginBottom: 5,
    lineHeight: 22,
  },
  alarmRepeat: {
    fontSize: 14,
    color: TempleColors.textLight,
    marginBottom: 3,
  },
  alarmSound: {
    fontSize: 14,
    color: TempleColors.secondary,
    fontStyle: 'italic',
  },
  alarmActions: {
    alignItems: 'center',
    gap: 15,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    color: TempleColors.textLight,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: TempleColors.textMuted,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 40,
  },
});