import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipient } from '../../data/mockData';
import { useWalletStore } from '../../store/useWalletStore';

export default function SelectRecipientScreen() {
  const router = useRouter();
  const { recipients, setDraftRecipient } = useWalletStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipients = recipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (recipient: Recipient) => {
    setDraftRecipient(recipient);
    router.push('/transfer/amount');
  };

  const handleAddNewRecipient = () => {
    Alert.prompt
      ? Alert.prompt('Add Recipient', 'Enter recipient full name:', (name) => {
          if (!name) return;
          const newRec: Recipient = {
            id: `rec_${Date.now()}`,
            name,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            email: `${name.toLowerCase().replace(/\s+/g, '.')}@bank.com`,
            bankName: 'International Wire',
            accountNumber: `•••• ${Math.floor(1000 + Math.random() * 9000)}`,
            country: 'Global',
            currency: 'USD',
          };
          handleSelect(newRec);
        })
      : Alert.alert('Add Recipient', 'New recipient form');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Recipient</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '25%' }]} />
      </View>
      <Text style={styles.stepText}>Step 1 of 4 • Choose recipient</Text>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Name, email, phone, or IBAN..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Add New Recipient Button */}
      <TouchableOpacity style={styles.addNewRow} onPress={handleAddNewRecipient}>
        <View style={styles.addIconCircle}>
          <Ionicons name="person-add-outline" size={20} color="#38BDF8" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.addNewTitle}>Send to someone new</Text>
          <Text style={styles.addNewSub}>Bank account, card, or wallet tag</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#64748B" />
      </TouchableOpacity>

      {/* Recipients List */}
      <Text style={styles.listHeader}>Recent Beneficiaries</Text>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {filteredRecipients.map((rec) => (
          <TouchableOpacity
            key={rec.id}
            style={styles.recipientCard}
            onPress={() => handleSelect(rec)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: rec.avatar }} style={styles.avatar} />
            <View style={styles.recDetails}>
              <Text style={styles.recName}>{rec.name}</Text>
              <Text style={styles.recBank}>
                {rec.bankName} • {rec.accountNumber}
              </Text>
              <Text style={styles.recCountry}>{rec.country}</Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={24} color="#38BDF8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  progressContainer: {
    height: 3,
    backgroundColor: '#1E293B',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#38BDF8',
  },
  stepText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
  },
  addNewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  addIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  addNewSub: {
    color: '#94A3B8',
    fontSize: 12,
  },
  listHeader: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  recDetails: {
    flex: 1,
  },
  recName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  recBank: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 2,
  },
  recCountry: {
    color: '#64748B',
    fontSize: 11,
  },
});
