import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXCHANGE_RATES } from '../../data/mockData';
import { useWalletStore } from '../../store/useWalletStore';

export default function EnterAmountScreen() {
  const router = useRouter();
  const { draft, balance, setDraftAmounts, setDraftNote } = useWalletStore();

  const [sendAmountStr, setSendAmountStr] = useState(draft.sendAmount.toString());
  const [note, setNote] = useState('');

  const sendAmount = parseFloat(sendAmountStr) || 0;
  const rateKey = `${draft.sendCurrency}_TO_${draft.recipient?.currency || 'EGP'}`;
  const exchangeRate = EXCHANGE_RATES[rateKey] || 49.65;
  const receiveAmount = (sendAmount * exchangeRate).toFixed(2);
  const fee = 1.5;

  const handleContinue = () => {
    if (sendAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid transfer amount.');
      return;
    }

    if (sendAmount + fee > balance) {
      Alert.alert('Insufficient Balance', 'You do not have enough funds in your wallet.');
      return;
    }

    setDraftAmounts(
      sendAmount,
      draft.sendCurrency,
      parseFloat(receiveAmount),
      draft.recipient?.currency || 'EGP',
      exchangeRate,
      fee
    );
    setDraftNote(note);
    router.push('/transfer/review');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F8FAFC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Amount</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '50%' }]} />
        </View>
        <Text style={styles.stepText}>Step 2 of 4 • Set transfer amount</Text>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Recipient summary banner */}
          <View style={styles.recipientBadge}>
            <Text style={styles.sendingToText}>Sending to</Text>
            <Text style={styles.recipientName}>{draft.recipient?.name}</Text>
            <Text style={styles.recipientBank}>{draft.recipient?.bankName}</Text>
          </View>

          {/* Amount Input Box (You send) */}
          <View style={styles.inputCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>You send</Text>
              <Text style={styles.availableBalance}>
                Balance: ${balance.toFixed(2)}
              </Text>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="decimal-pad"
                value={sendAmountStr}
                onChangeText={setSendAmountStr}
                placeholder="0"
                placeholderTextColor="#475569"
                autoFocus
              />
              <View style={styles.currencyTag}>
                <Text style={styles.currencyTagText}>{draft.sendCurrency}</Text>
              </View>
            </View>
          </View>

          {/* Rate conversion info */}
          <View style={styles.conversionBox}>
            <View style={styles.rateRow}>
              <Ionicons name="swap-vertical" size={18} color="#38BDF8" />
              <Text style={styles.rateText}>
                1 {draft.sendCurrency} = {exchangeRate} {draft.recipient?.currency || 'EGP'}
              </Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Transfer Fee</Text>
              <Text style={styles.feeValue}>${fee.toFixed(2)} USD</Text>
            </View>
          </View>

          {/* Recipient gets */}
          <View style={[styles.inputCard, { borderColor: '#10B981' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>Recipient gets</Text>
              <Text style={styles.guaranteedRate}>Guaranteed Rate</Text>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.convertedAmount}>{receiveAmount}</Text>
              <View style={[styles.currencyTag, { backgroundColor: '#064E3B' }]}>
                <Text style={[styles.currencyTagText, { color: '#34D399' }]}>
                  {draft.recipient?.currency || 'EGP'}
                </Text>
              </View>
            </View>
          </View>

          {/* Optional Note */}
          <View style={styles.noteBox}>
            <Ionicons name="chatbox-ellipses-outline" size={18} color="#94A3B8" />
            <TextInput
              style={styles.noteInput}
              placeholder="Add reference note (e.g., Dinner, Rent)..."
              placeholderTextColor="#64748B"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>Review Transfer</Text>
            <Ionicons name="arrow-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  },
  recipientBadge: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sendingToText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  recipientName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 2,
  },
  recipientBank: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  availableBalance: {
    color: '#64748B',
    fontSize: 12,
  },
  guaranteedRate: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '700',
    color: '#94A3B8',
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 34,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  convertedAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: '#10B981',
  },
  currencyTag: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  currencyTagText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 14,
  },
  conversionBox: {
    marginVertical: 14,
    paddingHorizontal: 10,
    gap: 8,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rateText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  feeValue: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginTop: 16,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 10,
  },
  noteInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
  },
  footer: {
    padding: 16,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  continueBtn: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  continueText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
});
