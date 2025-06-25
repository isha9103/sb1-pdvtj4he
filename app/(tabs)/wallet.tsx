import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, X, IndianRupee } from 'lucide-react-native';

const transactions = [
  {
    id: 1,
    type: 'debit',
    title: 'Ride to City Hospital',
    amount: 96,
    date: '2024-01-15',
    time: '2:30 PM',
    status: 'completed'
  },
  {
    id: 2,
    type: 'credit',
    title: 'Money Added by Family',
    amount: 1000,
    date: '2024-01-14',
    time: '10:15 AM',
    status: 'completed'
  },
  {
    id: 3,
    type: 'debit',
    title: 'Grocery Delivery',
    amount: 450,
    date: '2024-01-13',
    time: '11:00 AM',
    status: 'completed'
  },
  {
    id: 4,
    type: 'debit',
    title: 'Doctor Consultation',
    amount: 500,
    date: '2024-01-12',
    time: '3:45 PM',
    status: 'completed'
  },
  {
    id: 5,
    type: 'credit',
    title: 'Senior Discount Refund',
    amount: 24,
    date: '2024-01-12',
    time: '3:50 PM',
    status: 'completed'
  },
];

export default function WalletScreen() {
  const [walletBalance] = useState(2450);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAddMoney = () => {
    if (addAmount) {
      console.log(`Adding ₹${addAmount} via ${selectedPaymentMethod}`);
      setShowAddMoneyModal(false);
      setAddAmount('');
      // Here you would integrate with payment gateway
    }
  };

  const renderAddMoneyModal = () => (
    <Modal
      visible={showAddMoneyModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add Money</Text>
          <TouchableOpacity
            onPress={() => setShowAddMoneyModal(false)}
            style={styles.closeButton}
          >
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Quick Amount Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Select Amount</Text>
            <View style={styles.quickAmountsGrid}>
              {quickAmounts.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.quickAmountButton,
                    addAmount === amount.toString() && styles.quickAmountButtonActive
                  ]}
                  onPress={() => setAddAmount(amount.toString())}
                >
                  <Text style={[
                    styles.quickAmountText,
                    addAmount === amount.toString() && styles.quickAmountTextActive
                  ]}>₹{amount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Custom Amount */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Or Enter Custom Amount</Text>
            <View style={styles.inputContainer}>
              <IndianRupee size={20} color="#6b7280" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter amount"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={addAmount}
                onChangeText={setAddAmount}
              />
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Payment Method</Text>
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === 'upi' && styles.paymentMethodActive
                ]}
                onPress={() => setSelectedPaymentMethod('upi')}
              >
                <Smartphone size={24} color={selectedPaymentMethod === 'upi' ? '#3b82f6' : '#6b7280'} />
                <Text style={[
                  styles.paymentMethodText,
                  selectedPaymentMethod === 'upi' && styles.paymentMethodTextActive
                ]}>UPI Payment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === 'card' && styles.paymentMethodActive
                ]}
                onPress={() => setSelectedPaymentMethod('card')}
              >
                <CreditCard size={24} color={selectedPaymentMethod === 'card' ? '#3b82f6' : '#6b7280'} />
                <Text style={[
                  styles.paymentMethodText,
                  selectedPaymentMethod === 'card' && styles.paymentMethodTextActive
                ]}>Debit/Credit Card</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Family Payment Option */}
          <View style={styles.familyPaymentSection}>
            <Text style={styles.familyPaymentTitle}>Need Help Adding Money?</Text>
            <Text style={styles.familyPaymentDescription}>
              Your family members can add money to your wallet remotely from their Family Dashboard.
            </Text>
            <TouchableOpacity style={styles.familyPaymentButton}>
              <Text style={styles.familyPaymentButtonText}>Request Family to Add Money</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={[styles.addButton, !addAmount && styles.addButtonDisabled]}
            onPress={handleAddMoney}
            disabled={!addAmount}
          >
            <Text style={styles.addButtonText}>Add ₹{addAmount || '0'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <Text style={styles.headerSubtitle}>Manage your payments easily</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Wallet Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.walletIcon}>
              <Wallet size={32} color="white" />
            </View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₹{walletBalance.toLocaleString()}</Text>
          <TouchableOpacity
            style={styles.addMoneyButton}
            onPress={() => setShowAddMoneyModal(true)}
          >
            <Plus size={20} color="white" />
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <CreditCard size={24} color="#3b82f6" />
              </View>
              <Text style={styles.quickActionText}>Pay Bills</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Smartphone size={24} color="#10b981" />
              </View>
              <Text style={styles.quickActionText}>Mobile Recharge</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <ArrowUpRight size={24} color="#f59e0b" />
              </View>
              <Text style={styles.quickActionText}>Send Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'credit' ? '#ecfdf5' : '#fef2f2' }
                ]}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft size={20} color="#10b981" />
                  ) : (
                    <ArrowUpRight size={20} color="#ef4444" />
                  )}
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })} • {transaction.time}
                  </Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'credit' ? '#10b981' : '#ef4444' }
                ]}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Auto-pay Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Auto-pay Settings</Text>
          <View style={styles.autoPayCard}>
            <Text style={styles.autoPayTitle}>Senior Discounts Applied</Text>
            <Text style={styles.autoPayDescription}>
              You automatically receive 20% discount on rides and 10% on groceries.
            </Text>
            <View style={styles.autoPayStatus}>
              <Text style={styles.autoPayStatusText}>Active</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {renderAddMoneyModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    margin: 24,
    padding: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  balanceLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  addMoneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
  },
  addMoneyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'white',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  autoPayCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  autoPayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  autoPayDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  autoPayStatus: {
    alignSelf: 'flex-start',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  autoPayStatusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10b981',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  quickAmountButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  quickAmountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
  },
  quickAmountTextActive: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  paymentMethodActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 12,
  },
  paymentMethodTextActive: {
    color: '#3b82f6',
  },
  familyPaymentSection: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  familyPaymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  familyPaymentDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  familyPaymentButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  familyPaymentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  modalFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});