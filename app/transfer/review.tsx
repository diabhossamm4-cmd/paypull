import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWalletStore } from '../../store/useWalletStore';

export default function ReviewTransferScreen() {
  const router = useRouter();
  const { draft, executeTransfer } = useWalletStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmountToPay = draft.sendAmount + draft.fee;

  const handleConfirmTransfer = async () => {
    try {
      setIsProcessing(true);
      // Simulate real bank gateway processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      executeTransfer();
      setIsProcessing(false);
      router.replace('/transfer/success');
    } catch (err: any) {
      setIsProcessing(false);
      Alert.alert('Transfer Failed', err?.message || 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          disabled={isProcessing}
        >
          <Ionicons name="arrow-back" size={22} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Details</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '75%' }]} />
      </View>
      <Text style={styles.stepText}>Step 3 of 4 • Confirm transaction</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Total deduction overview */}
        <View style={styles.amountSummaryBox}>
          <Text style={styles.totalPayLabel}>Total to pay</Text>
          <Text style={styles.totalPayAmount}>
            ${totalAmountToPay.toFixed(2)} {draft.sendCurrency}
          </Text>
          <View style={styles.speedBadge}>
            <Ionicons name="flash" size={14} color="#38BDF8" />
            <Text style={styles.speedText}>Instant Transfer Delivery</Text>
          </View>
        </View>

        {/* Breakdown Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Recipient Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Recipient Name</Text>
            <Text style={styles.value}>{draft.recipient?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bank / Institution</Text>
            <Text style={styles.value}>{draft.recipient?.bankName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account Number</Text>
            <Text style={styles.value}>{draft.recipient?.accountNumber}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Transfer Breakdown</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Sending Amount</Text>
            <Text style={styles.value}>${draft.sendAmount.toFixed(2)} USD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transfer Fee</Text>
            <Text style={styles.value}>${draft.fee.toFixed(2)} USD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Exchange Rate</Text>
            <Text style={styles.value}>
              1 USD = {draft.exchangeRate} {draft.receiveCurrency}
            </Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0, paddingTop: 12 }]}>
            <Text style={[styles.label, { color: '#F8FAFC', fontWeight: '700' }]}>
              Recipient Receives
            </Text>
            <Text style={[styles.value, { color: '#10B981', fontSize: 16, fontWeight: '800' }]}>
              {draft.receiveAmount.toLocaleString()} {draft.receiveCurrency}
            </Text>
          </View>
        </View>

        {draft.note ? (
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Reference Note</Text>
            <Text style={{ color: '#CBD5E1', fontSize: 14 }}>{draft.note}</Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, isProcessing && { opacity: 0.7 }]}
          onPress={handleConfirmTransfer}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#0F172A" />
          ) : (
            <>
              <Ionicons name="lock-closed" size={18} color="#0F172A" />
              <Text style={styles.confirmText}>Confirm & Send Now</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  amountSummaryBox: {
    alignItems: 'center',
    marginVertical: 16,
  },
  totalPayLabel: {
    color: '#94A3B8',
    fontSize: 13,
  },
  totalPayAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#F8FAFC',
    marginVertical: 4,
  },
  speedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  speedText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  label: {
    color: '#94A3B8',
    fontSize: 14,
  },
  value: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  confirmBtn: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  confirmText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
});
