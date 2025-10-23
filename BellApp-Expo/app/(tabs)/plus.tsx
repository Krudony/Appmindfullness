/**
 * หน้าฟีเจอร์พิเศษ - Plus Tab
 * สำหรับ premium features, statistics และข้อมูลเพิ่มเติม
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function PlusScreen() {
  const handlePremiumFeature = (feature: string) => {
    Alert.alert(
      'ฟีเจอร์พรีเมียม',
      `${feature}\n\n` +
      'ฟีเจอร์นี้จะพร้อมใช้งานในเวอร์ชันพรีเมียมเร็วๆ นี้!\n\n' +
      'รอติดตามอัปเดตจากเรา',
      [{ text: 'ตกลง', style: 'default' }]
    );
  };

  const handleStatistics = () => {
    Alert.alert(
      'สถิติการใช้งาน',
      '📊 สถิติของคุณ\n\n' +
      'จำนวนนาฬิกา: 2\n' +
      'ทำงานทั้งหมด: 12 ครั้ง\n' +
      'เปิดใช้งาน: 5 วัน\n\n' +
      'สถิติจะพร้อมใช้งานในเวอร์ชันถัดไป',
      [{ text: 'ตกลง', style: 'default' }]
    );
  };

  const handleMeditationGuide = () => {
    Alert.alert(
      'คู่มือการทำสมาธิ',
      '🧘‍♀️ คำแนะนำการทำสมาธิ\n\n' +
      '1. หาที่สงบและนั่งสมาธิ\n' +
      '2. ปิดตาและหายใจเข้าออกลึกๆ\n' +
      '3. มุ่งความสนใจไปที่ลมหายใจ\n' +
      '4. เริ่มต้น 5-10 นาทีต่อครั้ง\n' +
      '5. ทำประจำทุกวันเพื่อผลดีกว่า\n\n' +
      'คู่มือฉบับเต็มจะมาในเร็วๆ นี้',
      [{ text: 'ตกลง', style: 'default' }]
    );
  };

  const handleTempleInfo = () => {
    Alert.alert(
      'ข้อมูลวัด',
      '🏯 วัดใกล้คุณ\n\n' +
      'กำลังพัฒนาฟีเจอร์ค้นหาวัดใกล้ๆ\n' +
      'และข้อมูลกำหนดการทำบุญ\n\n' +
      'จะพร้อมใช้งานในเวอร์ชันถัดไป',
      [{ text: 'ตกลง', style: 'default' }]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'แชร์แอป',
      'ขอบคุณที่สนใจแชร์ BellApp!\n\n' +
      'ฟีเจอร์แชร์จะมาในเวอร์ชันถัดไป\n\n' +
      'ช่วยเหลือเราให้แอปเติบโตขึ้น',
      [{ text: 'ตกลง', style: 'default' }]
    );
  };

  const FeatureCard = ({
    icon,
    title,
    description,
    onPress,
    isPremium = false
  }: {
    icon: string;
    title: string;
    description: string;
    onPress: () => void;
    isPremium?: boolean;
  }) => (
    <TouchableOpacity style={styles.featureCard} onPress={onPress}>
      <View style={styles.featureHeader}>
        <Text style={styles.featureIcon}>{icon}</Text>
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
      <View style={styles.featureFooter}>
        <Text style={styles.featureAction}>
          {isPremium ? 'อัปเกรด' : 'ดูเพิ่มเติม'}
        </Text>
        <AntDesign name="right" size={16} color="#FFA500" />
      </View>
    </TouchableOpacity>
  );

  const StatsCard = ({
    label,
    value,
    icon
  }: {
    label: string;
    value: string;
    icon: string;
  }) => (
    <View style={styles.statsCard}>
      <Text style={styles.statsIcon}>{icon}</Text>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>เพิ่มเติม</Text>
        <Text style={styles.subtitle}>ฟีเจอร์พิเศษและข้อมูลเพิ่มเติม</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>สถิติการใช้งาน</Text>
          <View style={styles.statsContainer}>
            <StatsCard label="นาฬิกาทั้งหมด" value="2" icon="⏰" />
            <StatsCard label="ทำงานแล้ว" value="12" icon="✅" />
            <StatsCard label="วันที่ใช้" value="5" icon="📅" />
          </View>
          <TouchableOpacity style={styles.viewAllButton} onPress={handleStatistics}>
            <Text style={styles.viewAllText}>ดูสถิติทั้งหมด</Text>
            <AntDesign name="right" size={16} color="#FFA500" />
          </TouchableOpacity>
        </View>

        {/* Premium Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ฟีเจอร์พรีเมียม</Text>
          <FeatureCard
            icon="🎵"
            title="เสียงระฆังแบบกำหนดเอง"
            description="อัปโหลดเสียงระฆังจากวัดที่คุณชื่นชอบ"
            onPress={() => handlePremiumFeature('เสียงระฆังแบบกำหนดเอง')}
            isPremium
          />
          <FeatureCard
            icon="☁️"
            title="สัญซิงค์ข้อมูล"
            description="ซิงค์ข้อมูลนาฬิกาข้ามอุปกรณ์ทั้งหมดของคุณ"
            onPress={() => handlePremiumFeature('สัญซิงค์ข้อมูล')}
            isPremium
          />
          <FeatureCard
            icon="📈"
            title="รายงานการทำสมาธิ"
            description="ติดตามความคืบหน้าและสถิติการทำสมาธิของคุณ"
            onPress={() => handlePremiumFeature('รายงานการทำสมาธิ')}
            isPremium
          />
        </View>

        {/* Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>เครื่องมือ</Text>
          <FeatureCard
            icon="🧘"
            title="คู่มือการทำสมาธิ"
            description="เรียนรู้วิธีการทำสมาธิสำหรับผู้เริ่มต้น"
            onPress={handleMeditationGuide}
          />
          <FeatureCard
            icon="🏯"
            title="ข้อมูลวัด"
            description="ค้นหาวัดใกล้คุณและกำหนดการทำบุญ"
            onPress={handleTempleInfo}
          />
          <FeatureCard
            icon="📤"
            title="แชร์แอป"
            description="แชร์ BellApp ให้เพื่อนและครอบครัว"
            onPress={handleShareApp}
          />
        </View>

        {/* Upgrade Banner */}
        <View style={styles.upgradeBanner}>
          <Text style={styles.upgradeTitle}>อัปเกรดเป็น BellApp Pro</Text>
          <Text style={styles.upgradeDescription}>
            ปลดล็อคฟีเจอร์พรีเมียมทั้งหมดและสนับสนุนการพัฒนาแอป
          </Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => handlePremiumFeature('BellApp Pro')}
          >
            <Text style={styles.upgradeButtonText}>อัปเกรดตอนนี้</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#1ABC9C',
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
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statsIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 16,
    color: '#FFA500',
    marginRight: 8,
    fontWeight: '500',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 28,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12,
  },
  featureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featureAction: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '500',
  },
  upgradeBanner: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#764ba2',
  },
});