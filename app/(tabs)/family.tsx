import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { Users, Plus, Bell, Wallet, Eye, Phone, Mail, MapPin, CircleAlert as AlertCircle, X, Clock } from 'lucide-react-native';

const familyMembers = [
  {
    id: 1,
    name: 'Raj Kumar (Son)',
    phone: '+91 98765 43210',
    email: 'raj.kumar@email.com',
    relation: 'Son',
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Priya Sharma (Daughter)',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    relation: 'Daughter',
    status: 'active',
    lastActive: '1 day ago',
  },
];

const elderlyProfile = {
  name: 'Dadi Ji',
  phone: '+91 98765 12345',
  address: '123 Garden Street, Delhi',
  emergencyContact: '+91 98765 43210',
  medicalInfo: {
    bloodGroup: 'B+',
    allergies: 'Penicillin',
    medications: ['BP Medicine - Morning', 'Diabetes - Evening'],
  },
};

const recentActivities = [
  {
    id: 1,
    type: 'booking',
    title: 'Ride booked to City Hospital',
    timestamp: '2024-01-15 14:30',
    status: 'completed',
  },
  {
    id: 2,
    type: 'payment',
    title: 'Grocery order placed - ₹450',
    timestamp: '2024-01-14 11:00',
    status: 'completed',
  },
  {
    id: 3,
    type: 'wallet',
    title: 'Money added to wallet - ₹1000',
    timestamp: '2024-01-14 10:15',
    status: 'completed',
  },
];

export default function FamilyScreen() {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    phone: '',
    email: '',
    relation: '',
  });
  const [addAmount, setAddAmount] = useState('');

  const handleAddMember = () => {
    console.log('Adding family member:', newMember);
    setShowAddMemberModal(false);
    setNewMember({ name: '', phone: '', email: '', relation: '' });
  };

  const handleAddMoney = () => {
    if (addAmount) {
      console.log(`Adding ₹${addAmount} to elderly member's wallet`);
      setShowAddMoneyModal(false);
      setAddAmount('');
    }
  };

  const renderAddMemberModal = () => (
    <Modal
      visible={showAddMemberModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add Family Member</Text>
          <TouchableOpacity
            onPress={() => setShowAddMemberModal(false)}
            style={styles.closeButton}
          >
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter full name"
              placeholderTextColor="#9ca3af"
              value={newMember.name}
              onChangeText={(text) => setNewMember({...newMember, name: text})}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="+91 98765 43210"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              value={newMember.phone}
              onChangeText={(text) => setNewMember({...newMember, phone: text})}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="email@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={newMember.email}
              onChangeText={(text) => setNewMember({...newMember, email: text})}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Relation</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Son, Daughter, etc."
              placeholderTextColor="#9ca3af"
              value={newMember.relation}
              onChangeText={(text) => setNewMember({...newMember, relation: text})}
            />
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMember}
          >
            <Text style={styles.addButtonText}>Add Family Member</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderAddMoneyModal = () => (
    <Modal
      visible={showAddMoneyModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add Money to Wallet</Text>
          <TouchableOpacity
            onPress={() => setShowAddMoneyModal(false)}
            style={styles.closeButton}
          >
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.currentBalanceCard}>
            <Text style={styles.currentBalanceLabel}>Current Wallet Balance</Text>
            <Text style={styles.currentBalanceAmount}>₹2,450</Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Amount to Add</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter amount"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              value={addAmount}
              onChangeText={setAddAmount}
            />
          </View>

          <View style={styles.quickAmountsSection}>
            <Text style={styles.inputLabel}>Quick Select</Text>
            <View style={styles.quickAmountsGrid}>
              {[500, 1000, 2000, 5000].map((amount) => (
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
        <Text style={styles.headerTitle}>Family Dashboard</Text>
        <Text style={styles.headerSubtitle}>Monitor and assist your loved ones</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Elderly Profile Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elderly Member Profile</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>DJ</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{elderlyProfile.name}</Text>
                <Text style={styles.profilePhone}>{elderlyProfile.phone}</Text>
                <View style={styles.profileStatus}>
                  <View style={styles.statusIndicator} />
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>
            </View>

            <View style={styles.profileDetails}>
              <View style={styles.profileDetailRow}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.profileDetailText}>{elderlyProfile.address}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Phone size={16} color="#6b7280" />
                <Text style={styles.profileDetailText}>Emergency: {elderlyProfile.emergencyContact}</Text>
              </View>
            </View>

            <View style={styles.medicalInfo}>
              <Text style={styles.medicalInfoTitle}>Medical Information</Text>
              <Text style={styles.medicalInfoText}>Blood Group: {elderlyProfile.medicalInfo.bloodGroup}</Text>
              <Text style={styles.medicalInfoText}>Allergies: {elderlyProfile.medicalInfo.allergies}</Text>
              <Text style={styles.medicalInfoText}>
                Medications: {elderlyProfile.medicalInfo.medications.join(', ')}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => setShowAddMoneyModal(true)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#3b82f6' }]}>
                <Wallet size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Add Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#10b981' }]}>
                <Eye size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Monitor Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#f59e0b' }]}>
                <Bell size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Set Reminders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#ef4444' }]}>
                <AlertCircle size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Emergency Alerts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Family Members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <TouchableOpacity
              style={styles.addMemberButton}
              onPress={() => setShowAddMemberModal(true)}
            >
              <Plus size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <View style={styles.familyMembersList}>
            {familyMembers.map((member) => (
              <View key={member.id} style={styles.familyMemberCard}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>
                    {member.name.split(' ')[0].charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
                  </Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberContact}>{member.phone}</Text>
                  <Text style={styles.memberLastActive}>Last active: {member.lastActive}</Text>
                </View>
                <View style={styles.memberActions}>
                  <TouchableOpacity style={styles.memberActionButton}>
                    <Phone size={20} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.memberActionButton}>
                    <Mail size={20} color="#10b981" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Clock size={20} color="#6b7280" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTimestamp}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </Text>
                </View>
                <View style={[
                  styles.activityStatus,
                  { backgroundColor: activity.status === 'completed' ? '#ecfdf5' : '#fef3c7' }
                ]}>
                  <Text style={[
                    styles.activityStatusText,
                    { color: activity.status === 'completed' ? '#10b981' : '#f59e0b' }
                  ]}>
                    {activity.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Wallet Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wallet Overview</Text>
          <View style={styles.walletOverviewCard}>
            <View style={styles.walletOverviewHeader}>
              <Text style={styles.walletOverviewTitle}>Current Balance</Text>
              <Text style={styles.walletOverviewAmount}>₹2,450</Text>
            </View>
            <View style={styles.walletOverviewStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>This Month Spent</Text>
                <Text style={styles.statValue}>₹1,546</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Last Added</Text>
                <Text style={styles.statValue}>₹1,000</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {renderAddMemberModal()}
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
  section: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  addMemberButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  profilePhone: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },
  profileDetails: {
    gap: 8,
    marginBottom: 16,
  },
  profileDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDetailText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  medicalInfo: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
  },
  medicalInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  medicalInfoText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickAction: {
    width: '47%',
    alignItems: 'center',
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  familyMembersList: {
    gap: 12,
  },
  familyMemberCard: {
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
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  memberContact: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  memberLastActive: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  memberActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  activityTimestamp: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  activityStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityStatusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  walletOverviewCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  walletOverviewHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  walletOverviewTitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  walletOverviewAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  walletOverviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
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
  textInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  currentBalanceCard: {
    backgroundColor: '#eff6ff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  currentBalanceLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  currentBalanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3b82f6',
    marginTop: 4,
  },
  quickAmountsSection: {
    marginBottom: 24,
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