import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Transaction } from '../data/mockData';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const isPositive = transaction.amount > 0;
  const formattedAmount = `${isPositive ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}`;

  const getCategoryIcon = () => {
    switch (transaction.category) {
      case 'salary':
        return { name: 'briefcase-outline' as const, color: '#10B981', bg: '#064E3B' };
      case 'shopping':
        return { name: 'cart-outline' as const, color: '#F59E0B', bg: '#78350F' };
      case 'utilities':
        return { name: 'flash-outline' as const, color: '#8B5CF6', bg: '#4C1D95' };
      case 'transfer':
      default:
        return isPositive
          ? { name: 'arrow-down-outline' as const, color: '#38BDF8', bg: '#0369A1' }
          : { name: 'arrow-up-outline' as const, color: '#F43F5E', bg: '#881337' };
    }
  };

  const iconInfo = getCategoryIcon();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrapper, { backgroundColor: iconInfo.bg }]}>
        <Ionicons name={iconInfo.name} size={20} color={iconInfo.color} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text style={styles.subtitle}>
          {transaction.date} • {transaction.subtitle}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: isPositive ? '#10B981' : '#F8FAFC' },
          ]}
        >
          {formattedAmount}
        </Text>
        <Text style={styles.currency}>{transaction.currency}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  currency: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
