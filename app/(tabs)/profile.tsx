import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [pushNotifsEnabled, setPushNotifsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileBox}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Hossam Diab</Text>
          <Text style={styles.userEmail}>hossam.diab@paypull.io</Text>
          <View style={styles.tierBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#10B981" />
            <Text style={styles.tierText}>Tier 2 Verified</Text>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Privacy</Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#334155' }]}>
                <Ionicons name="finger-print-outline" size={20} color="#38BDF8" />
              </View>
              <View>
                <Text style={styles.rowTitle}>Face ID / Biometrics</Text>
                <Text style={styles.rowSubtitle}>Fast & secure login</Text>
              </View>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: '#334155', true: '#38BDF8' }}
              thumbColor={biometricsEnabled ? '#0F172A' : '#94A3B8'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#334155' }]}>
                <Ionicons name="key-outline" size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.rowTitle}>Two-Factor Authentication (2FA)</Text>
                <Text style={styles.rowSubtitle}>OTP via Authenticator app</Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: '#334155', true: '#38BDF8' }}
              thumbColor={twoFactorEnabled ? '#0F172A' : '#94A3B8'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#334155' }]}>
                <Ionicons name="notifications-outline" size={20} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.rowTitle}>Push Notifications</Text>
                <Text style={styles.rowSubtitle}>Instant transfer alerts</Text>
              </View>
            </View>
            <Switch
              value={pushNotifsEnabled}
              onValueChange={setPushNotifsEnabled}
              trackColor={{ false: '#334155', true: '#38BDF8' }}
              thumbColor={pushNotifsEnabled ? '#0F172A' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Preferences</Text>

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={() => Alert.alert('Default Currency', 'Your default currency is set to USD')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#334155' }]}>
                <Ionicons name="globe-outline" size={20} color="#38BDF8" />
              </View>
              <View>
                <Text style={styles.rowTitle}>Default Currency</Text>
                <Text style={styles.rowSubtitle}>USD ($)</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={() => Alert.alert('Bank Accounts', 'Linked: JPMorgan Chase (•••• 8921)')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#334155' }]}>
                <Ionicons name="business-outline" size={20} color="#A855F7" />
              </View>
              <View>
                <Text style={styles.rowTitle}>Linked Bank Accounts</Text>
                <Text style={styles.rowSubtitle}>1 Active Bank Account</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={() => Alert.alert('Help & Support', 'Reach out 24/7 at support@paypull.io')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#334155' }]}>
                <Ionicons name="help-circle-outline" size={20} color="#F43F5E" />
              </View>
              <View>
                <Text style={styles.rowTitle}>Support & FAQ</Text>
                <Text style={styles.rowSubtitle}>Get 24/7 assistance</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => Alert.alert('Sign Out', 'Are you sure you want to log out of PayPull?', [
            { text: 'Log Out', style: 'destructive' },
            { text: 'Cancel', style: 'cancel' },
          ])}
        >
          <Ionicons name="log-out-outline" size={20} color="#F43F5E" />
          <Text style={styles.signOutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#38BDF8',
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  tierText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  clickableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  rowSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    marginTop: 30,
  },
  signOutText: {
    color: '#F43F5E',
    fontSize: 15,
    fontWeight: '700',
  },
});
