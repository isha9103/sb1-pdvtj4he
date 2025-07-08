import { firebaseApp } from './../firebaseConfig';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
const db = getFirestore(firebaseApp);
type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const servicesCollection = collection(db, "services");

// Example function to add a service
const addService = async (service: Service) => {
  try {
    const docRef = await addDoc(servicesCollection, service);
    console.log("Service added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding service: ", e);
  }
};
// Example function to fetch all services
const getServices = async () => {
  const snapshot = await getDocs(servicesCollection);
  const servicesList = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log('Fetched services:', servicesList);
  return servicesList;
};

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { Car, ShoppingCart, Stethoscope, HandHeart, MessageCircle, MapPin, Clock, User, IndianRupee, X } from 'lucide-react-native';
const iconMap: { [key: string]: any } = {
  Car,
  ShoppingCart,
  Stethoscope,
  HandHeart,
  MessageCircle,
};

// Removed duplicate firebaseApp and getFirestore import
// const db = getFirestore(firebaseApp); // Already declared above

const saveBooking = async (bookingData) => {
  try {
    const bookingsCollection = collection(db, 'bookings');
    const docRef = await addDoc(bookingsCollection, bookingData);
    console.log('Booking saved with ID:', docRef.id);
  } catch (error) {
    console.error('Error saving booking:', error);
  }
};
import Voice from '@react-native-voice/voice';
useEffect(() => {
  Voice.onSpeechStart = () => {
    console.log('Speech recognition started');
  };

  Voice.onSpeechResults = (event: any) => {
    console.log('Speech results:', event.value);
    if (event.value && event.value.length > 0) {
      setSpokenText(event.value[0]);
    }
  };

  Voice.onSpeechEnd = () => {
    console.log('Speech recognition ended');
    setIsListening(false);
  };

  return () => {
    Voice.destroy().then(Voice.removeAllListeners);
  };
}, []);

const [isListening, setIsListening] = useState(false);
const [spokenText, setSpokenText] = useState('');

export default function ServicesScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    pickup: '',
    destination: '',
    time: 'now',
    notes: '',
    companion: false,
  });

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
  const fetchServices = async () => {
    const data = await getServices();
    setServices(data as Service[]);
  };

  fetchServices();
}, []);

  const handleServicePress = (serviceId: string) => {
    setSelectedService(serviceId);
    if (serviceId === 'ride') {
      setShowBookingModal(true);
    } else {
      // Handle other services
      console.log(`Selected service: ${serviceId}`);
    }
  };

  const handleBookingSubmit = async () => {
    await saveBooking(bookingData);
    console.log('Booking submitted:', bookingData);
    setShowBookingModal(false);
  };

  const renderRideBookingModal = () => (
    <Modal
      visible={showBookingModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Book a Ride</Text>
          <TouchableOpacity
            onPress={() => setShowBookingModal(false)}
            style={styles.closeButton}
          >
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Pickup Location */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Pickup Location</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6b7280" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter pickup address"
                placeholderTextColor="#9ca3af"
                value={bookingData.pickup}
                onChangeText={(text) => setBookingData({...bookingData, pickup: text})}
              />
            </View>
          </View>

          {/* Destination */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Where to?</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6b7280" />
              <TextInput
                style={styles.textInput}
                placeholder="Enter destination"
                placeholderTextColor="#9ca3af"
                value={bookingData.destination}
                onChangeText={(text) => setBookingData({...bookingData, destination: text})}
              />
            </View>
          </View>

          {/* Time Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>When?</Text>
            <View style={styles.timeButtons}>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  bookingData.time === 'now' && styles.timeButtonActive
                ]}
                onPress={() => setBookingData({...bookingData, time: 'now'})}
              >
                <Clock size={20} color={bookingData.time === 'now' ? 'white' : '#6b7280'} />
                <Text style={[
                  styles.timeButtonText,
                  bookingData.time === 'now' && styles.timeButtonTextActive
                ]}>Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  bookingData.time === 'later' && styles.timeButtonActive
                ]}
                onPress={() => setBookingData({...bookingData, time: 'later'})}
              >
                <Clock size={20} color={bookingData.time === 'later' ? 'white' : '#6b7280'} />
                <Text style={[
                  styles.timeButtonText,
                  bookingData.time === 'later' && styles.timeButtonTextActive
                ]}>Later</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Companion Option */}
          <View style={styles.inputSection}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setBookingData({...bookingData, companion: !bookingData.companion})}
            >
              <View style={[
                styles.checkbox,
                bookingData.companion && styles.checkboxActive
              ]}>
                {bookingData.companion && <User size={16} color="white" />}
              </View>
              <Text style={styles.checkboxLabel}>Request Companion</Text>
            </TouchableOpacity>
            <Text style={styles.checkboxDescription}>
              A trained companion will accompany you for assistance
            </Text>
          </View>

          {/* Notes */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Special Notes (Optional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Any special requirements or notes..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
              value={bookingData.notes}
              onChangeText={(text) => setBookingData({...bookingData, notes: text})}
            />
          </View>

          {/* Fare Estimate */}
          <View style={styles.fareSection}>
            <Text style={styles.fareTitle}>Estimated Fare</Text>
            <View style={styles.fareBreakdown}>
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>Base Fare</Text>
                <Text style={styles.fareValue}>₹120</Text>
              </View>
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>Senior Discount (-20%)</Text>
                <Text style={[styles.fareValue, styles.fareDiscount]}>-₹24</Text>
              </View>
              {bookingData.companion && (
                <View style={styles.fareRow}>
                  <Text style={styles.fareLabel}>Companion Service</Text>
                  <Text style={styles.fareValue}>₹50</Text>
                </View>
              )}
              <View style={[styles.fareRow, styles.fareTotal]}>
                <Text style={styles.fareTotalLabel}>Total</Text>
                <Text style={styles.fareTotalValue}>₹{bookingData.companion ? '146' : '96'}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookingSubmit}
          >
            <Text style={styles.bookButtonText}>Confirm & Book Ride</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
const handleVoiceInput = async () => {
  if (isListening) {
    await Voice.stop();
    setIsListening(false);
  } else {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <Text style={styles.headerSubtitle}>Choose the service you need</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesContainer}>
  {services.map((service) => {
    const Icon = iconMap[service.icon];  // ✅ CORRECT: this is outside JSX

    return (
      <TouchableOpacity
        key={service.id}
        style={styles.serviceCard}
        onPress={() => handleServicePress(service.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
          <Icon size={40} color="white" />  {/* ✅ This is JSX now */}
        </View>
        <View style={styles.serviceContent}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
      </TouchableOpacity>
      );
     })}
  </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <View style={styles.recentBookings}>
            <View style={styles.bookingCard}>
              <View style={styles.bookingIcon}>
                <Car size={24} color="#3b82f6" />
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>Ride to City Hospital</Text>
                <Text style={styles.bookingDate}>Yesterday, 2:30 PM</Text>
                <Text style={styles.bookingStatus}>Completed</Text>
              </View>
              <Text style={styles.bookingAmount}>₹96</Text>
            </View>

            <View style={styles.bookingCard}>
              <View style={styles.bookingIcon}>
                <ShoppingCart size={24} color="#10b981" />
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>Grocery Delivery</Text>
                <Text style={styles.bookingDate}>2 days ago, 11:00 AM</Text>
                <Text style={styles.bookingStatus}>Delivered</Text>
              </View>
              <Text style={styles.bookingAmount}>₹450</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Ride Booking Modal */}
      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={handleVoiceInput}
          style={{
            backgroundColor: '#3b82f6',
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            {isListening ? 'Stop Listening' : 'Start Voice Input'}
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 10 }}>
          Spoken Text: {spokenText}
        </Text>
      </View>

      {renderRideBookingModal()}
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
  servicesContainer: {
    padding: 24,
    gap: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
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
  recentBookings: {
    gap: 12,
  },
  bookingCard: {
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
  bookingIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  bookingDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  bookingStatus: {
    fontSize: 14,
    color: '#10b981',
    marginTop: 2,
    fontWeight: '500',
  },
  bookingAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  // Modal styles
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
  textArea: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    textAlignVertical: 'top',
  },
  timeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  timeButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
  },
  timeButtonTextActive: {
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkboxLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  checkboxDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 36,
  },
  fareSection: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  fareTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  fareBreakdown: {
    gap: 8,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  fareValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  fareDiscount: {
    color: '#10b981',
  },
  fareTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    marginTop: 8,
  },
  fareTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  fareTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  modalFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bookButton: {
    backgroundColor: '#3b82f6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});