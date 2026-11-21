export interface Recipient {
  id: string;
  name: string;
  avatar: string;
  email: string;
  bankName: string;
  accountNumber: string;
  country: string;
  currency: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  type: 'send' | 'receive' | 'exchange' | 'card_payment';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  category: 'transfer' | 'shopping' | 'salary' | 'utilities' | 'entertainment';
  recipient?: {
    name: string;
    account: string;
    bank: string;
  };
  referenceNumber: string;
  fee: number;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardType: 'visa' | 'mastercard';
  balance: number;
  currency: string;
  isFrozen: boolean;
  colorScheme: 'slate' | 'emerald' | 'indigo';
}

export const INITIAL_RECIPIENTS: Recipient[] = [
  {
    id: 'rec_1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    email: 'sarah.j@gmail.com',
    bankName: 'JPMorgan Chase',
    accountNumber: '•••• 8921',
    country: 'United States',
    currency: 'USD',
  },
  {
    id: 'rec_2',
    name: 'Ahmed Hassan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    email: 'ahmed.hassan@example.com',
    bankName: 'National Bank of Egypt',
    accountNumber: '•••• 4310',
    country: 'Egypt',
    currency: 'EGP',
  },
  {
    id: 'rec_3',
    name: 'Emma Lindqvist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    email: 'emma.l@nordicfin.se',
    bankName: 'Swedbank',
    accountNumber: '•••• 1109',
    country: 'Sweden',
    currency: 'EUR',
  },
  {
    id: 'rec_4',
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    email: 'david.chen@singfin.sg',
    bankName: 'DBS Bank',
    accountNumber: '•••• 6542',
    country: 'Singapore',
    currency: 'USD',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    title: 'Sarah Jenkins',
    subtitle: 'Money Transfer',
    amount: -250.0,
    currency: 'USD',
    type: 'send',
    status: 'completed',
    date: 'Today, 11:42 AM',
    category: 'transfer',
    recipient: {
      name: 'Sarah Jenkins',
      account: '•••• 8921',
      bank: 'JPMorgan Chase',
    },
    referenceNumber: 'PP-98234-US',
    fee: 1.5,
  },
  {
    id: 'tx_2',
    title: 'TechCorp Salary',
    subtitle: 'Direct Deposit',
    amount: 4850.0,
    currency: 'USD',
    type: 'receive',
    status: 'completed',
    date: 'Yesterday, 09:00 AM',
    category: 'salary',
    referenceNumber: 'SAL-102934-TX',
    fee: 0,
  },
  {
    id: 'tx_3',
    title: 'Apple Store',
    subtitle: 'Subscription iCloud 2TB',
    amount: -9.99,
    currency: 'USD',
    type: 'card_payment',
    status: 'completed',
    date: '18 Nov 2026',
    category: 'utilities',
    referenceNumber: 'APL-54201-APP',
    fee: 0,
  },
  {
    id: 'tx_4',
    title: 'Ahmed Hassan',
    subtitle: 'Family Support',
    amount: -400.0,
    currency: 'USD',
    type: 'send',
    status: 'completed',
    date: '15 Nov 2026',
    category: 'transfer',
    recipient: {
      name: 'Ahmed Hassan',
      account: '•••• 4310',
      bank: 'National Bank of Egypt',
    },
    referenceNumber: 'PP-77123-EG',
    fee: 2.5,
  },
  {
    id: 'tx_5',
    title: 'Refund - Nike Store',
    subtitle: 'Order Return #9812',
    amount: 120.0,
    currency: 'USD',
    type: 'receive',
    status: 'completed',
    date: '12 Nov 2026',
    category: 'shopping',
    referenceNumber: 'RF-43091-NK',
    fee: 0,
  },
];

export const INITIAL_CARDS: VirtualCard[] = [
  {
    id: 'card_1',
    cardNumber: '4532 •••• •••• 9821',
    cardHolder: 'HOSSAM DIAB',
    expiryDate: '09/29',
    cvv: '842',
    cardType: 'visa',
    balance: 5420.5,
    currency: 'USD',
    isFrozen: false,
    colorScheme: 'slate',
  },
  {
    id: 'card_2',
    cardNumber: '5310 •••• •••• 4410',
    cardHolder: 'HOSSAM DIAB',
    expiryDate: '11/30',
    cvv: '193',
    cardType: 'mastercard',
    balance: 1850.0,
    currency: 'EUR',
    isFrozen: false,
    colorScheme: 'indigo',
  },
];

export const EXCHANGE_RATES: Record<string, number> = {
  USD_TO_EGP: 49.65,
  USD_TO_EUR: 0.94,
  USD_TO_GBP: 0.81,
  USD_TO_AED: 3.67,
  USD_TO_SAR: 3.75,
};
