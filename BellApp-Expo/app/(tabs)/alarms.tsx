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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Alarm } from '@/types/alarm.types';

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
        <Text style={styles.alarmTime}>{formatTime(item.time)}</Text>
        <Text style={styles.alarmName}>{item.name}</Text>
        <Text style={styles.alarmRepeat}>{formatRepeat(item.repeat)}</Text>
        <Text style={styles.alarmSound}>🔔 {item.sound}</Text>
      </View>

      <View style={styles.alarmActions}>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleAlarm(item.id)}
          trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
          thumbColor={item.enabled ? '#FFA500' : '#F5F5F5'}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAlarm(item.id)}
        >
          <AntDesign name="delete" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <AntDesign name="clockcircleo" size={80} color="#BDC3C7" />
      <Text style={styles.emptyTitle}>ยังไม่มีนาฬิกา</Text>
      <Text style={styles.emptyDescription}>
        แตะที่ปุ่ม "เพิ่ม" เพื่อสร้างนาฬิกาปลุกแรกของคุณ
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>นาฬิกาปลุก</Text>
        <Text style={styles.subtitle}>จัดการเวลาสำหรับทำสมาธิและฟังธรรม</Text>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFD700',
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
    color: '#2C3E50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  alarmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  alarmName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 5,
  },
  alarmRepeat: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 3,
  },
  alarmSound: {
    fontSize: 14,
    color: '#FFA500',
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
    fontWeight: 'bold',
    color: '#7F8C8D',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 40,
  },
});