import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWalletStore } from '../store/useWalletStore';

interface BalanceCardProps {
  onSendPress: () => void;
  onReceivePress: () => void;
  onAddFundsPress: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  onSendPress,
  onReceivePress,
  onAddFundsPress,
}) => {
  const { balance, currency, isBalanceVisible, toggleBalanceVisibility } = useWalletStore();

  const formattedBalance = isBalanceVisible
    ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '••••••••';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E293B', '#0F172A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Card Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.label}>Total Balance</Text>
            <View style={styles.badgeRow}>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyBadgeText}>{currency} • Active</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleBalanceVisibility}
            style={styles.eyeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>

        {/* Balance Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.balanceText}>{formattedBalance}</Text>
          {isBalanceVisible && (
            <View style={styles.trendRow}>
              <Ionicons name="trending-up" size={14} color="#10B981" />
              <Text style={styles.trendText}>+12.4% this month</Text>
            </View>
          )}
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={onSendPress}>
            <View style={[styles.iconCircle, { backgroundColor: '#38BDF8' }]}>
              <Ionicons name="arrow-up" size={18} color="#0F172A" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={onReceivePress}>
            <View style={[styles.iconCircle, { backgroundColor: '#334155' }]}>
              <Ionicons name="arrow-down" size={18} color="#38BDF8" />
            </View>
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={onAddFundsPress}>
            <View style={[styles.iconCircle, { backgroundColor: '#334155' }]}>
              <Ionicons name="add" size={20} color="#F8FAFC" />
            </View>
            <Text style={styles.actionText}>Top Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  currencyBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  currencyBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  eyeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  amountContainer: {
    marginVertical: 18,
  },
  balanceText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  trendText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  actionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
});
