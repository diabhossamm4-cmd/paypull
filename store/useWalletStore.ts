import { create } from 'zustand';
import {
  INITIAL_CARDS,
  INITIAL_RECIPIENTS,
  INITIAL_TRANSACTIONS,
  Recipient,
  Transaction,
  VirtualCard,
} from '../data/mockData';

interface TransferDraft {
  recipient: Recipient | null;
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  fee: number;
  note: string;
}

interface WalletState {
  balance: number;
  currency: string;
  isBalanceVisible: boolean;
  recipients: Recipient[];
  transactions: Transaction[];
  cards: VirtualCard[];
  draft: TransferDraft;

  // Actions
  toggleBalanceVisibility: () => void;
  setDraftRecipient: (recipient: Recipient) => void;
  setDraftAmounts: (sendAmount: number, sendCurrency: string, receiveAmount: number, receiveCurrency: string, exchangeRate: number, fee: number) => void;
  setDraftNote: (note: string) => void;
  resetDraft: () => void;
  executeTransfer: () => Transaction;
  toggleCardFreeze: (cardId: string) => void;
  addFunds: (amount: number) => void;
}

const initialDraft: TransferDraft = {
  recipient: null,
  sendAmount: 100,
  sendCurrency: 'USD',
  receiveAmount: 4965,
  receiveCurrency: 'EGP',
  exchangeRate: 49.65,
  fee: 1.5,
  note: '',
};

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 14250.75,
  currency: 'USD',
  isBalanceVisible: true,
  recipients: INITIAL_RECIPIENTS,
  transactions: INITIAL_TRANSACTIONS,
  cards: INITIAL_CARDS,
  draft: initialDraft,

  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible })),

  setDraftRecipient: (recipient) =>
    set((state) => ({
      draft: { ...state.draft, recipient },
    })),

  setDraftAmounts: (sendAmount, sendCurrency, receiveAmount, receiveCurrency, exchangeRate, fee) =>
    set((state) => ({
      draft: {
        ...state.draft,
        sendAmount,
        sendCurrency,
        receiveAmount,
        receiveCurrency,
        exchangeRate,
        fee,
      },
    })),

  setDraftNote: (note) =>
    set((state) => ({
      draft: { ...state.draft, note },
    })),

  resetDraft: () => set({ draft: initialDraft }),

  executeTransfer: () => {
    const { draft, balance, transactions } = get();
    if (!draft.recipient) {
      throw new Error('No recipient selected');
    }

    const totalDeducted = draft.sendAmount + draft.fee;
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      title: draft.recipient.name,
      subtitle: draft.note || 'Money Transfer',
      amount: -draft.sendAmount,
      currency: draft.sendCurrency,
      type: 'send',
      status: 'completed',
      date: 'Just now',
      category: 'transfer',
      recipient: {
        name: draft.recipient.name,
        account: draft.recipient.accountNumber,
        bank: draft.recipient.bankName,
      },
      referenceNumber: `PP-${Math.floor(10000 + Math.random() * 90000)}-${draft.receiveCurrency}`,
      fee: draft.fee,
    };

    set({
      balance: balance - totalDeducted,
      transactions: [newTx, ...transactions],
    });

    return newTx;
  },

  toggleCardFreeze: (cardId) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === cardId ? { ...card, isFrozen: !card.isFrozen } : card
      ),
    })),

  addFunds: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
      transactions: [
        {
          id: `tx_${Date.now()}`,
          title: 'Added Funds',
          subtitle: 'Instant Top Up',
          amount: amount,
          currency: state.currency,
          type: 'receive',
          status: 'completed',
          date: 'Just now',
          category: 'transfer',
          referenceNumber: `DEP-${Math.floor(10000 + Math.random() * 90000)}`,
          fee: 0,
        },
        ...state.transactions,
      ],
    })),
}));
