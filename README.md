# 💳 PayPull - Modern Fintech & Digital Banking Mobile App

**PayPull** is a mobile fintech and digital wallet application built with **React Native**, **Expo SDK 58**, **Expo Router**, and **TypeScript**. It offers multi-currency balance tracking, instant peer-to-peer transfers, virtual card management, and detailed transaction analytics.

---

## 🚀 Key Features

* **💼 Interactive Balance & Wallet:**
  * Real-time balance display with visibility privacy toggle.
  * Multi-currency wallet support (USD, EUR, EGP).
  * Quick actions: Instant Send, Receive details, and One-tap Top-Up.

* **💸 Multi-Step Money Transfer Flow:**
  * **Step 1:** Recipient selection (Recent beneficiaries search or new recipient).
  * **Step 2:** Amount entry with live guaranteed exchange rate calculator and transfer fee estimation.
  * **Step 3:** Full transfer review and fee breakdown.
  * **Step 4:** Animated success screen and shareable transaction receipts.

* **💳 Virtual Card Management:**
  * Digital debit/credit cards with live toggle for CVV visibility.
  * Instant freeze/unfreeze card security control.
  * Online payments toggle and spending limit controls.

* **📊 Activity & Financial Analytics:**
  * Filter transactions by inflow (received) and outflow (sent).
  * Real-time transaction search by name, category, or note.
  * Detailed transaction breakdown modal.

* **🛡️ Security & Preferences:**
  * Biometric authentication (Face ID / Touch ID).
  * Two-factor authentication (2FA) controls.
  * Currency preferences and linked bank accounts.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** [Expo](https://expo.dev/) (SDK 58) with [React Native](https://reactnative.dev/) (0.88)
* **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Styling & Gradients:** `expo-linear-gradient` with modern dark slate design system
* **Icons:** `@expo/vector-icons` (Ionicons)

---

## 📦 Project Structure

```
paypull/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Bottom Tab Navigation
│   │   ├── index.tsx        # Home Wallet Dashboard
│   │   ├── cards.tsx        # Virtual Cards & Security Controls
│   │   ├── activity.tsx     # Transaction History & Filters
│   │   └── profile.tsx      # User Profile, Biometrics & Security
│   ├── transfer/
│   │   ├── _layout.tsx      # Stack Modal Layout
│   │   ├── index.tsx        # Step 1: Beneficiary Selection
│   │   ├── amount.tsx       # Step 2: Amount & Exchange Rates
│   │   ├── review.tsx       # Step 3: Confirmation & Summary
│   │   └── success.tsx      # Step 4: Success Receipt
│   └── _layout.tsx          # Root Stack Provider
├── components/
│   ├── BalanceCard.tsx      # Interactive Gradient Balance Widget
│   └── TransactionItem.tsx  # Categorized Transaction Row
├── data/
│   └── mockData.ts          # Mock Users, Cards, Exchange Rates
└── store/
    └── useWalletStore.ts    # Centralized Zustand Wallet Store
```

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

Press:
* `i` to open in the iOS Simulator.
* `a` to open in the Android Emulator.
* `w` to open in the Web browser.
* Or scan the QR code with **Expo Go** on your physical phone!

---

## 📄 License
MIT License. Built for portfolio and demonstration purposes.
