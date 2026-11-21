import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BalanceCard } from '../../components/BalanceCard';
import { TransactionItem } from '../../components/TransactionItem';
import { Transaction } from '../../data/mockData';
import { useWalletStore } from '../../store/useWalletStore';

export default function HomeScreen() {
  const router = useRouter();
  const { transactions, recipients, setDraftRecipient, addFunds } = useWalletStore();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleSendPress = () => {
    router.push('/transfer');
  };

  const handleReceivePress = () => {
    Alert.alert(
      'Receive Money',
      'Share your PayPull ID or IBAN with the sender:\n\nPayPull ID: @hossam.diab\nIBAN: EG9200000001092837465019',
      [{ text: 'Copy Details', onPress: () => {} }, { text: 'Done', style: 'cancel' }]
    );
  };

  const handleTopUpPress = () => {
    Alert.alert('Quick Top Up', 'Select amount to add to your balance:', [
      { text: '+$100', onPress: () => addFunds(100) },
      { text: '+$500', onPress: () => addFunds(500) },
      { text: '+$1,000', onPress: () => addFunds(1000) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleQuickSend = (recipient: typeof recipients[0]) => {
    setDraftRecipient(recipient);
    router.push('/transfer/amount');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* User Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>Hossam Diab</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => Alert.alert('Notifications', 'No new alerts.')}>
            <Ionicons name="notifications-outline" size={22} color="#F8FAFC" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard
          onSendPress={handleSendPress}
          onReceivePress={handleReceivePress}
          onAddFundsPress={handleTopUpPress}
        />

        {/* Quick Send to Recent Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Send Again</Text>
            <TouchableOpacity onPress={() => router.push('/transfer')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {recipients.map((rec) => (
              <TouchableOpacity
                key={rec.id}
                style={styles.contactItem}
                onPress={() => handleQuickSend(rec)}
              >
                <Image source={{ uri: rec.avatar }} style={styles.contactAvatar} />
                <Text style={styles.contactName} numberOfLines={1}>
                  {rec.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/activity')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.slice(0, 5).map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              onPress={() => setSelectedTx(tx)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Transaction Details Modal */}
      <Modal
        visible={!!selectedTx}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTx(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Transaction Details</Text>
              <TouchableOpacity onPress={() => setSelectedTx(null)}>
                <Ionicons name="close" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {selectedTx && (
              <View style={styles.modalBody}>
                <View style={styles.modalAmountBox}>
                  <Text style={styles.modalAmount}>
                    {selectedTx.amount > 0 ? '+' : ''}${Math.abs(selectedTx.amount).toFixed(2)}
                  </Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{selectedTx.status.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Recipient / Sender</Text>
                  <Text style={styles.receiptValue}>{selectedTx.title}</Text>
                </View>

                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Date & Time</Text>
                  <Text style={styles.receiptValue}>{selectedTx.date}</Text>
                </View>

                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Reference No.</Text>
                  <Text style={styles.receiptValue}>{selectedTx.referenceNumber}</Text>
                </View>

                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Fee</Text>
                  <Text style={styles.receiptValue}>${selectedTx.fee.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedTx(null)}
                >
                  <Text style={styles.modalCloseBtnText}>Close Receipt</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  welcomeText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    color: '#F8FAFC',
    fontWeight: '800',
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  seeAllText: {
    fontSize: 14,
    color: '#38BDF8',
    fontWeight: '600',
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  contactItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  contactAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#334155',
    marginBottom: 6,
  },
  contactName: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  modalBody: {
    alignItems: 'center',
  },
  modalAmountBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  modalAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  statusBadge: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  statusText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  receiptLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },
  receiptValue: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  modalCloseBtn: {
    backgroundColor: '#38BDF8',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseBtnText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
});
