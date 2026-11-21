import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWalletStore } from '../../store/useWalletStore';

export default function CardsScreen() {
  const { cards, toggleCardFreeze } = useWalletStore();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showCvv, setShowCvv] = useState(false);

  const activeCard = cards[activeCardIndex] || cards[0];

  const handleOrderNewCard = () => {
    Alert.alert('Virtual Card', 'A new digital PayPull Visa card will be issued instantly.', [
      { text: 'Issue Card', onPress: () => Alert.alert('Success', 'New virtual card added!') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cards</Text>
          <TouchableOpacity style={styles.addCardBtn} onPress={handleOrderNewCard}>
            <Ionicons name="add" size={20} color="#38BDF8" />
            <Text style={styles.addCardText}>New Card</Text>
          </TouchableOpacity>
        </View>

        {/* Card Carousel Tabs */}
        <View style={styles.cardSelector}>
          {cards.map((card, idx) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.selectorPill,
                activeCardIndex === idx && styles.selectorPillActive,
              ]}
              onPress={() => setActiveCardIndex(idx)}
            >
              <Text
                style={[
                  styles.selectorText,
                  activeCardIndex === idx && styles.selectorTextActive,
                ]}
              >
                {card.cardType.toUpperCase()} (•••• {card.cardNumber.slice(-4)})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interactive Virtual Card */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={
              activeCard.isFrozen
                ? ['#475569', '#1E293B']
                : activeCard.colorScheme === 'indigo'
                ? ['#4F46E5', '#1E1B4B']
                : ['#0284C7', '#0F172A']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardTop}>
              <View style={styles.chipRow}>
                <Ionicons name="hardware-chip-outline" size={32} color="#F1F5F9" />
                <Ionicons name="wifi-outline" size={24} color="#CBD5E1" />
              </View>
              <Text style={styles.cardBrand}>{activeCard.cardType.toUpperCase()}</Text>
            </View>

            <View style={styles.numberRow}>
              <Text style={styles.cardNumberText}>
                {activeCard.isFrozen ? '•••• •••• •••• ••••' : activeCard.cardNumber}
              </Text>
            </View>

            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                <Text style={styles.cardValue}>{activeCard.cardHolder}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>EXPIRES</Text>
                <Text style={styles.cardValue}>{activeCard.expiryDate}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
                <Text style={styles.cardLabel}>CVV</Text>
                <Text style={styles.cardValue}>{showCvv ? activeCard.cvv : '•••'}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Card Controls */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionHeader}>Security & Controls</Text>

          <View style={styles.controlRow}>
            <View style={styles.controlInfo}>
              <View style={[styles.controlIcon, { backgroundColor: '#334155' }]}>
                <Ionicons name="snow-outline" size={20} color="#38BDF8" />
              </View>
              <View>
                <Text style={styles.controlTitle}>Freeze Card</Text>
                <Text style={styles.controlSub}>Instantly block all card transactions</Text>
              </View>
            </View>
            <Switch
              value={activeCard.isFrozen}
              onValueChange={() => toggleCardFreeze(activeCard.id)}
              trackColor={{ false: '#334155', true: '#38BDF8' }}
              thumbColor={activeCard.isFrozen ? '#0F172A' : '#94A3B8'}
            />
          </View>

          <View style={styles.controlRow}>
            <View style={styles.controlInfo}>
              <View style={[styles.controlIcon, { backgroundColor: '#334155' }]}>
                <Ionicons name="globe-outline" size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.controlTitle}>Online Payments</Text>
                <Text style={styles.controlSub}>Enable e-commerce & in-app purchases</Text>
              </View>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#334155', true: '#38BDF8' }}
              thumbColor="#0F172A"
            />
          </View>

          <View style={styles.controlRow}>
            <View style={styles.controlInfo}>
              <View style={[styles.controlIcon, { backgroundColor: '#334155' }]}>
                <Ionicons name="speedometer-outline" size={20} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.controlTitle}>Monthly Limit</Text>
                <Text style={styles.controlSub}>$5,000 / $10,000 used</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Adjust Limit', 'Spending limit configuration')}>
              <Text style={styles.editBtn}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  addCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  addCardText: {
    color: '#38BDF8',
    fontWeight: '600',
    fontSize: 13,
  },
  cardSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 10,
    gap: 10,
  },
  selectorPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectorPillActive: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  selectorText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  selectorTextActive: {
    color: '#FFFFFF',
  },
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    height: 210,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    padding: 22,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardBrand: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 1,
  },
  numberRow: {
    marginVertical: 10,
  },
  cardNumberText: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  controlsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  controlInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  controlIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  controlSub: {
    color: '#94A3B8',
    fontSize: 12,
  },
  editBtn: {
    color: '#38BDF8',
    fontWeight: '600',
    fontSize: 13,
  },
});
