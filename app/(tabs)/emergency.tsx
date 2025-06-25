import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Alert } from 'react-native';
import { TriangleAlert as AlertTriangle, Phone, MapPin, User, Heart, Pill, Clock, X, Shield } from 'lucide-react-native';

const medicalInfo = {
  bloodGroup: 'B+',
  allergies: ['Penicillin', 'Peanuts'],
  medications: ['BP Medicine - Amlodipine 5mg (Morning)', 'Diabetes - Metformin 500mg (Evening)'],
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  doctorName: 'Dr. Rajesh Sharma',
  doctorPhone: '+91 98765 11111',
  hospitalName: 'City General Hospital',
  hospitalAddress: '456 Medical Street, Delhi',
};

const emergencyContacts = [
  { id: 1, name: 'Raj Kumar (Son)', phone: '+91 98765 43210', relation: 'Son', priority: 'Primary' },
  { id: 2, name: 'Priya Sharma (Daughter)', phone: '+91 87654 32109', relation: 'Daughter', priority: 'Secondary' },
  { id: 3, name: 'Dr. Rajesh Sharma', phone: '+91 98765 11111', relation: 'Doctor', priority: 'Medical' },
  { id: 4, name: 'Emergency Services', phone: '102', relation: 'Ambulance', priority: 'Emergency' },
];

export default function EmergencyScreen() {
  const [showMedicalInfo, setShowMedicalInfo] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Alert',
      'This will call all your emergency contacts and send your location. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes, Emergency!', 
          style: 'destructive',
          onPress: () => {
            setEmergencyActive(true);
            // Here you would implement the actual emergency calling logic
            console.log('Emergency activated - calling all contacts');
            setTimeout(() => setEmergencyActive(false), 5000); // Demo timeout
          }
        }
      ]
    );
  };

  const handleQuickCall = (contact: any) => {
    console.log(`Calling ${contact.name} at ${contact.phone}`);
    // Here you would implement the actual calling logic
  };

  const renderMedicalInfoModal = () => (
    <Modal
      visible={showMedicalInfo}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Medical Information</Text>
          <TouchableOpacity
            onPress={() => setShowMedicalInfo(false)}
            style={styles.closeButton}
          >
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.medicalSection}>
            <View style={styles.medicalSectionHeader}>
              <Heart size={24} color="#ef4444" />
              <Text style={styles.medicalSectionTitle}>Basic Information</Text>
            </View>
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>Blood Group:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.bloodGroup}</Text>
            </View>
          </View>

          <View style={styles.medicalSection}>
            <View style={styles.medicalSectionHeader}>
              <AlertTriangle size={24} color="#f59e0b" />
              <Text style={styles.medicalSectionTitle}>Allergies</Text>
            </View>
            {medicalInfo.allergies.map((allergy, index) => (
              <View key={index} style={styles.medicalItem}>
                <Text style={styles.medicalValue}>• {allergy}</Text>
              </View>
            ))}
          </View>

          <View style={styles.medicalSection}>
            <View style={styles.medicalSectionHeader}>
              <Pill size={24} color="#10b981" />
              <Text style={styles.medicalSectionTitle}>Current Medications</Text>
            </View>
            {medicalInfo.medications.map((medication, index) => (
              <View key={index} style={styles.medicalItem}>
                <Text style={styles.medicalValue}>• {medication}</Text>
              </View>
            ))}
          </View>

          <View style={styles.medicalSection}>
            <View style={styles.medicalSectionHeader}>
              <User size={24} color="#3b82f6" />
              <Text style={styles.medicalSectionTitle}>Medical Conditions</Text>
            </View>
            {medicalInfo.conditions.map((condition, index) => (
              <View key={index} style={styles.medicalItem}>
                <Text style={styles.medicalValue}>• {condition}</Text>
              </View>
            ))}
          </View>

          <View style={styles.medicalSection}>
            <View style={styles.medicalSectionHeader}>
              <Phone size={24} color="#06b6d4" />
              <Text style={styles.medicalSectionTitle}>Primary Doctor</Text>
            </View>
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>Name:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.doctorName}</Text>
            </View>
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>Phone:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.doctorPhone}</Text>
            </View>
          </View>

          <View style={styles.medicalSection}>
            <View style={styles.medicalSectionHeader}>
              <MapPin size={24} color="#8b5cf6" />
              <Text style={styles.medicalSectionTitle}>Preferred Hospital</Text>
            </View>
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>Name:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.hospitalName}</Text>
            </View>
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>Address:</Text>
              <Text style={styles.medicalValue}>{medicalInfo.hospitalAddress}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency</Text>
        <Text style={styles.headerSubtitle}>Help is just one tap away</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main SOS Button */}
        <View style={styles.sosSection}>
          <TouchableOpacity
            style={[styles.sosButton, emergencyActive && styles.sosButtonActive]}
            onPress={handleEmergencyCall}
            activeOpacity={0.8}
            disabled={emergencyActive}
          >
            <AlertTriangle size={48} color="white" />
            <Text style={styles.sosButtonText}>
              {emergencyActive ? 'CALLING FOR HELP...' : 'SOS EMERGENCY'}
            </Text>
            <Text style={styles.sosButtonSubtext}>
              {emergencyActive ? 'Stay calm, help is coming' : 'Tap for immediate assistance'}
            </Text>
          </TouchableOpacity>

          {emergencyActive && (
            <View style={styles.emergencyStatus}>
              <View style={styles.emergencyStatusIcon}>
                <Shield size={20} color="#10b981" />
              </View>
              <Text style={styles.emergencyStatusText}>
                Emergency alert sent to all contacts with your location
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => setShowMedicalInfo(true)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#ef4444' }]}>
                <Heart size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Medical Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#3b82f6' }]}>
                <MapPin size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Share Location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#10b981' }]}>
                <Phone size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Call Doctor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#f59e0b' }]}>
                <Clock size={24} color="white" />
              </View>
              <Text style={styles.quickActionText}>Medicine Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.contactsList}>
            {emergencyContacts.map((contact) => (
              <View key={contact.id} style={styles.contactCard}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                  <View style={[
                    styles.contactPriority,
                    { 
                      backgroundColor: contact.priority === 'Primary' ? '#ecfdf5' : 
                                     contact.priority === 'Emergency' ? '#fee2e2' :
                                     contact.priority === 'Medical' ? '#eff6ff' : '#fef3c7'
                    }
                  ]}>
                    <Text style={[
                      styles.contactPriorityText,
                      { 
                        color: contact.priority === 'Primary' ? '#10b981' : 
                               contact.priority === 'Emergency' ? '#ef4444' :
                               contact.priority === 'Medical' ? '#3b82f6' : '#f59e0b'
                      }
                    ]}>
                      {contact.priority}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleQuickCall(contact)}
                >
                  <Phone size={20} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Tips</Text>
          <View style={styles.safetyTipsCard}>
            <Text style={styles.safetyTipTitle}>In case of emergency:</Text>
            <Text style={styles.safetyTip}>• Stay calm and press the SOS button</Text>
            <Text style={styles.safetyTip}>• Your location will be shared automatically</Text>
            <Text style={styles.safetyTip}>• All emergency contacts will be notified</Text>
            <Text style={styles.safetyTip}>• Keep your phone charged and nearby</Text>
            <Text style={styles.safetyTip}>• Update medical information regularly</Text>
          </View>
        </View>
      </ScrollView>

      {renderMedicalInfoModal()}
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
  sosSection: {
    padding: 24,
    alignItems: 'center',
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  sosButtonActive: {
    backgroundColor: '#dc2626',
    transform: [{ scale: 1.05 }],
  },
  sosButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
  sosButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  emergencyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    maxWidth: 280,
  },
  emergencyStatusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyStatusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#10b981',
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
  contactsList: {
    gap: 12,
  },
  contactCard: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  contactPhone: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  contactPriority: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  contactPriorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyTipsCard: {
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
  safetyTipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  safetyTip: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 24,
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
  medicalSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medicalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 12,
  },
  medicalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  medicalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    minWidth: 80,
  },
  medicalValue: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
});