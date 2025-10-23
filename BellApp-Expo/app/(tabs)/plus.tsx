/**
 * หน้าเพิ่มเติม - More Tab
 * ใช้สำหรับทดสอบและเปรียบเทียบการแสดงผลของ ThaiText กับ Text component
 * เพื่อหาสาเหตุที่แท้จริงของปัญหาการแสดงผลตัวหนังสือภาษาไทย
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThaiText } from '@/components/ThaiText';
import { TempleColors } from '@/constants/theme';

export default function PlusScreen() {
  const [testText, setTestText] = useState('เพิ่มนาฬิกา');
  const [testTime, setTestTime] = useState('06:59');
  const [useThaiText, setUseThaiText] = useState(true);

  // Test cases สำหรับเปรียบเทียบ
  const testCases = [
    { text: 'เพิ่มนาฬิกา', label: 'หัวข้อหลัก' },
    { text: 'ทำสมาธิ', label: 'ชื่อนาฬิกา' },
    { text: 'ตั้งเวลาสำหรับการทำสมาธิและฟังธรรม', label: 'คำอธิบาย' },
    { text: 'จันทร์ อังคาร พุธ พฤหัสบดี ศุกร์ เสาร์ อาทิตย์', label: 'วันทั้งหมด' },
    { text: '06:59', label: 'เวลา' },
    { text: 'สวดมนต์', label: 'คำสั้น' },
    { text: 'ระฆังวัด', label: 'เสียงนาฬิกา' },
  ];

  const timeNumbers = ['01', '06', '10', '15', '23', '30', '45', '59'];

  const TestComponent = ({ children, style, ...props }: any) => {
    if (useThaiText) {
      return (
        <ThaiText style={style} {...props}>
          {children}
        </ThaiText>
      );
    } else {
      return (
        <Text style={style} {...props}>
          {children}
        </Text>
      );
    }
  };

  const renderTestCase = (testCase: typeof testCases[0], index: number) => (
    <View key={index} style={styles.testCase}>
      <View style={styles.testCaseHeader}>
        <TestComponent weight="semibold" style={styles.testCaseLabel}>
          {testCase.label}
        </TestComponent>
      </View>
      <View style={styles.testCases}>
        <View style={styles.testCaseColumn}>
          <TestComponent weight="regular" style={styles.testTextRegular}>
            {testCase.text}
          </TestComponent>
        </View>
        <View style={styles.testCaseColumn}>
          <TestComponent weight="semibold" style={styles.testTextSemibold}>
            {testCase.text}
          </TestComponent>
        </View>
        <View style={styles.testCaseColumn}>
          <TestComponent weight="bold" style={styles.testTextBold}>
            {testCase.text}
          </TestComponent>
        </View>
      </View>
    </View>
  );

  const renderTimeTest = () => (
    <View style={styles.section}>
      <TestComponent weight="bold" style={styles.sectionTitle}>
        ทดสอบการแสดงผลตัวเลขเวลา
      </TestComponent>
      <View style={styles.timeTestGrid}>
        {timeNumbers.map((time, index) => (
          <View key={index} style={styles.timeTestItem}>
            <TestComponent weight="bold" style={styles.timeTestNumber}>
              {time}
            </TestComponent>
          </View>
        ))}
      </View>
      <View style={styles.timeComparison}>
        <View style={styles.timeComparisonItem}>
          <TestComponent weight="bold" style={styles.timeLarge}>
            06:59
          </TestComponent>
        </View>
        <View style={styles.timeComparisonItem}>
          <TestComponent weight="bold" style={styles.timeLarge2}>
            18:30
          </TestComponent>
        </View>
        <View style={styles.timeComparisonItem}>
          <TestComponent weight="bold" style={styles.timeLarge3}>
            23:45
          </TestComponent>
        </View>
      </View>
    </View>
  );

  const renderHeaderTest = () => (
    <View style={styles.section}>
      <TestComponent weight="bold" style={styles.sectionTitle}>
        ทดสอบหัวข้อ (เทียบกับหน้าอื่น)
      </TestComponent>

      {/* Header แบบที่ 1: คล้ายหน้า Alarms */}
      <View style={[styles.testHeader, { backgroundColor: TempleColors.primary }]}>
        <TestComponent weight="bold" style={[styles.testHeaderTitle, { color: TempleColors.text }]}>
          นาฬิกาปลุก
        </TestComponent>
        <TestComponent style={[styles.testHeaderSubtitle, { color: TempleColors.textLight }]}>
          จัดการเวลาสำหรับทำสมาธิและฟังธรรม
        </TestComponent>
      </View>

      {/* Header แบบที่ 2: คล้ายหน้า Add Alarm */}
      <View style={[styles.testHeader, { backgroundColor: TempleColors.secondary }]}>
        <TestComponent weight="bold" style={[styles.testHeaderTitle, { color: '#FFFFFF' }]}>
          เพิ่มนาฬิกา
        </TestComponent>
        <TestComponent style={[styles.testHeaderSubtitle, { color: '#FFFFFF', opacity: 0.9 }]}>
          ตั้งเวลาสำหรับการทำสมาธิและฟังธรรม
        </TestComponent>
      </View>

      {/* Header แบบที่ 3: ขนาดใหญ่ขึ้น */}
      <View style={[styles.testHeader, { backgroundColor: '#2C3E50', minHeight: 160 }]}>
        <TestComponent weight="bold" style={[styles.testHeaderTitle, { color: '#FFFFFF', fontSize: 32 }]}>
          ทดสอบหัวข้อใหญ่
        </TestComponent>
        <TestComponent style={[styles.testHeaderSubtitle, { color: '#FFFFFF', fontSize: 17 }]}>
          ทดสอบการแสดงผลตัวหนังสือภาษาไทยขนาดใหญ่
        </TestComponent>
      </View>
    </View>
  );

  const renderLayoutTest = () => (
    <View style={styles.section}>
      <TestComponent weight="bold" style={styles.sectionTitle}>
        ทดสอบการจัด Layout
      </TestComponent>

      <View style={styles.layoutTest}>
        <View style={styles.layoutItem}>
          <TestComponent weight="bold" style={styles.layoutTitle}>
            ชื่อรายการ
          </TestComponent>
          <TestComponent style={styles.layoutSubtitle}>
            คำอธิบายสั้นๆ
          </TestComponent>
        </View>

        <View style={styles.layoutActions}>
          <TestComponent style={styles.layoutTime}>
            06:59
          </TestComponent>
          <View style={styles.layoutSwitch}>
            <View style={[styles.switchKnob, { backgroundColor: '#FFA500' }]} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={TempleColors.primary} />

      <View style={styles.header}>
        <TestComponent weight="bold" style={styles.title}>
          ทดสอบการแสดงผล
        </TestComponent>
        <TestComponent style={styles.subtitle}>
          เปรียบเทียบ ThaiText กับ Text Component
        </TestComponent>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, useThaiText && styles.controlButtonActive]}
          onPress={() => setUseThaiText(true)}
        >
          <TestComponent weight="semibold" style={[styles.controlButtonText, useThaiText && styles.controlButtonTextActive]}>
            ThaiText
          </TestComponent>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, !useThaiText && styles.controlButtonActive]}
          onPress={() => setUseThaiText(false)}
        >
          <TestComponent weight="semibold" style={[styles.controlButtonText, !useThaiText && styles.controlButtonTextActive]}>
            Text
          </TestComponent>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ทดสอบตัวหนังสือพื้นฐาน */}
        <View style={styles.section}>
          <TestComponent weight="bold" style={styles.sectionTitle}>
            ทดสอบตัวหนังสือพื้นฐาน
          </TestComponent>
          <View style={styles.componentInfo}>
            <TestComponent style={styles.componentType}>
              กำลังใช้: {useThaiText ? 'ThaiText Component' : 'Text Component'}
            </TestComponent>
          </View>
          {testCases.map(renderTestCase)}
        </View>

        {renderTimeTest()}
        {renderHeaderTest()}
        {renderLayoutTest()}

        {/* ทดสอบแบบกำหนดเอง */}
        <View style={styles.section}>
          <TestComponent weight="bold" style={styles.sectionTitle}>
            ทดสอบแบบกำหนดเอง
          </TestComponent>
          <TextInput
            style={styles.textInput}
            value={testText}
            onChangeText={setTestText}
            placeholder="ใส่ข้อความทดสอบ..."
            placeholderTextColor={TempleColors.textMuted}
          />
          <View style={styles.customTest}>
            <TestComponent weight="regular" style={styles.customTestText}>
              Regular: {testText}
            </TestComponent>
            <TestComponent weight="semibold" style={styles.customTestText}>
              Semibold: {testText}
            </TestComponent>
            <TestComponent weight="bold" style={styles.customTestText}>
              Bold: {testText}
            </TestComponent>
          </View>
        </View>

        {/* ข้อมูลระบบ */}
        <View style={styles.section}>
          <TestComponent weight="bold" style={styles.sectionTitle}>
            ข้อมูลระบบ
          </TestComponent>
          <View style={styles.systemInfo}>
            <TestComponent style={styles.systemInfoText}>
              Platform: {Platform.OS}
            </TestComponent>
            <TestComponent style={styles.systemInfoText}>
              Font Family: {useThaiText ? 'Sarabun (ThaiText)' : 'System (Text)'}
            </TestComponent>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 140,
    width: '100%',
    alignItems: 'flex-start',
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
    fontSize: 28,
    color: TempleColors.text,
    marginBottom: 5,
    lineHeight: 34,
    width: '100%',
    flexShrink: 0,
  },
  subtitle: {
    fontSize: 15,
    color: TempleColors.textLight,
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    gap: 10,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: TempleColors.secondary,
  },
  controlButtonText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  controlButtonTextActive: {
    color: '#FFFFFF',
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
  componentInfo: {
    backgroundColor: '#E8F4FD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  componentType: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
  },
  testCase: {
    marginBottom: 15,
  },
  testCaseHeader: {
    marginBottom: 8,
  },
  testCaseLabel: {
    fontSize: 14,
    color: TempleColors.textLight,
    marginBottom: 5,
  },
  testCases: {
    flexDirection: 'row',
    gap: 10,
  },
  testCaseColumn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  testTextRegular: {
    fontSize: 16,
    color: TempleColors.text,
    textAlign: 'center',
  },
  testTextSemibold: {
    fontSize: 16,
    color: TempleColors.text,
    textAlign: 'center',
  },
  testTextBold: {
    fontSize: 16,
    color: TempleColors.text,
    textAlign: 'center',
  },
  timeTestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  timeTestItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 70,
    alignItems: 'center',
  },
  timeTestNumber: {
    fontSize: 24,
    color: TempleColors.text,
  },
  timeComparison: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timeComparisonItem: {
    alignItems: 'center',
  },
  timeLarge: {
    fontSize: 36,
    color: TempleColors.text,
    fontWeight: 'bold',
  },
  timeLarge2: {
    fontSize: 42,
    color: TempleColors.text,
    fontWeight: 'bold',
  },
  timeLarge3: {
    fontSize: 48,
    color: TempleColors.text,
    fontWeight: 'bold',
  },
  testHeader: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    alignItems: 'flex-start',
  },
  testHeaderTitle: {
    fontSize: 28,
    marginBottom: 5,
    lineHeight: 34,
    width: '100%',
    flexShrink: 0,
  },
  testHeaderSubtitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  layoutTest: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  layoutItem: {
    flex: 1,
  },
  layoutTitle: {
    fontSize: 17,
    color: TempleColors.text,
    marginBottom: 5,
  },
  layoutSubtitle: {
    fontSize: 14,
    color: TempleColors.textLight,
  },
  layoutActions: {
    alignItems: 'center',
    gap: 15,
  },
  layoutTime: {
    fontSize: 16,
    color: TempleColors.secondary,
    fontWeight: 'bold',
  },
  layoutSwitch: {
    width: 44,
    height: 26,
    backgroundColor: '#E0E0E0',
    borderRadius: 13,
    justifyContent: 'center',
  },
  switchKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignSelf: 'flex-start',
    marginLeft: 2,
  },
  textInput: {
    backgroundColor: TempleColors.surface,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
  },
  customTest: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 10,
  },
  customTestText: {
    fontSize: 16,
    color: TempleColors.text,
  },
  systemInfo: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    gap: 5,
  },
  systemInfoText: {
    fontSize: 14,
    color: TempleColors.textLight,
  },
});