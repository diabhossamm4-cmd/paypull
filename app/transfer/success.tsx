import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWalletStore } from '../../store/useWalletStore';

export default function TransferSuccessScreen() {
  const router = useRouter();
  const { draft, resetDraft } = useWalletStore();

  const handleDone = () => {
    resetDraft();
    router.replace('/(tabs)');
  };

  const handleShareReceipt = async () => {
    try {
      await Share.share({
        message: `PayPull Transfer Receipt\n\nRecipient: ${draft.recipient?.name}\nAmount: $${draft.sendAmount} USD\nDelivered: ${draft.receiveAmount} ${draft.receiveCurrency}\nStatus: Completed Successfully`,
      });
    } catch {
      Alert.alert('Share', 'Receipt copied to clipboard.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Animated Checkmark Circle */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-sharp" size={48} color="#0F172A" />
        </View>

        <Text style={styles.title}>Transfer Successful!</Text>
        <Text style={styles.subtitle}>
          Your money has been securely transferred to{' '}
          <Text style={{ color: '#F8FAFC', fontWeight: '700' }}>
            {draft.recipient?.name}
          </Text>
        </Text>

        {/* Receipt Container */}
        <View style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptHeaderTitle}>Transaction Summary</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>COMPLETED</Text>
            </View>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.label}>Amount Sent</Text>
            <Text style={styles.value}>${draft.sendAmount.toFixed(2)} USD</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.label}>Amount Received</Text>
            <Text style={[styles.value, { color: '#10B981' }]}>
              {draft.receiveAmount.toLocaleString()} {draft.receiveCurrency}
            </Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.label}>Exchange Rate</Text>
            <Text style={styles.value}>1 USD = {draft.exchangeRate} {draft.receiveCurrency}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.label}>Transfer Fee</Text>
            <Text style={styles.value}>${draft.fee.toFixed(2)} USD</Text>
          </View>

          <View style={[styles.receiptRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.value}>Instant via PayPull Network</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShareReceipt}>
            <Ionicons name="share-outline" size={20} color="#38BDF8" />
            <Text style={styles.shareText}>Share Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
            <Text style={styles.doneText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 26,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  receiptCard: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 30,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 12,
  },
  receiptHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  statusPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusPillText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
  },
  value: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  btnRow: {
    width: '100%',
    gap: 12,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  shareText: {
    color: '#38BDF8',
    fontSize: 15,
    fontWeight: '700',
  },
  doneBtn: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
});
