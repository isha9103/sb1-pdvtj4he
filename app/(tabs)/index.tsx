import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Car, ShoppingCart, Stethoscope, CreditCard, HandHeart, MessageCircle, TriangleAlert as AlertTriangle, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const quickServices = [
  { id: 'ride', title: 'Book a Ride', icon: Car, color: '#3b82f6', route: '/services' },
  { id: 'grocery', title: 'Order Groceries', icon: ShoppingCart, color: '#10b981', route: '/services' },
  { id: 'doctor', title: 'Doctor Visit', icon: Stethoscope, color: '#f59e0b', route: '/services' },
  { id: 'bills', title: 'Pay Bills', icon: CreditCard, color: '#8b5cf6', route: '/wallet' },
  { id: 'help', title: 'Request Help', icon: HandHeart, color: '#ef4444', route: '/services' },
  { id: 'companion', title: 'Talk to Companion', icon: MessageCircle, color: '#06b6d4', route: '/services' },
];

const upcomingReminders = [
  { id: 1, title: 'Take Morning Medicine', time: '9:00 AM', type: 'medicine' },
  { id: 2, title: 'Doctor Appointment', time: '2:00 PM', type: 'appointment' },
  { id: 3, title: 'Grocery Delivery', time: '4:00 PM', type: 'delivery' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('Dadi Ji'); // This would come from user profile

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleServicePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.dateTime}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Quick Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.servicesGrid}>
            {quickServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceCard, { borderLeftColor: service.color }]}
                onPress={() => handleServicePress(service.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                  <service.icon size={32} color="white" />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => router.push('/emergency')}
            activeOpacity={0.8}
          >
            <AlertTriangle size={40} color="white" />
            <Text style={styles.emergencyText}>EMERGENCY</Text>
            <Text style={styles.emergencySubtext}>Tap for immediate help</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Reminders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Reminders</Text>
            <Bell size={24} color="#6b7280" />
          </View>
          <View style={styles.remindersContainer}>
            {upcomingReminders.map((reminder) => (
              <View key={reminder.id} style={styles.reminderCard}>
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderTitle}>{reminder.title}</Text>
                  <Text style={styles.reminderTime}>{reminder.time}</Text>
                </View>
                <View style={[
                  styles.reminderIndicator,
                  { backgroundColor: reminder.type === 'medicine' ? '#10b981' : 
                                   reminder.type === 'appointment' ? '#f59e0b' : '#3b82f6' }
                ]} />
              </View>
            ))}
          </View>
        </View>

        {/* Wallet Balance Quick View */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.walletCard}
            onPress={() => router.push('/wallet')}
            activeOpacity={0.7}
          >
            <View style={styles.walletInfo}>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletAmount}>₹2,450</Text>
            </View>
            <CreditCard size={32} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '400',
    color: '#6b7280',
  },
  userName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 18,
    color: '#6b7280',
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
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  emergencyButton: {
    backgroundColor: '#ef4444',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
  },
  emergencySubtext: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
  remindersContainer: {
    gap: 12,
  },
  reminderCard: {
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
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  reminderTime: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  reminderIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  walletCard: {
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
  walletInfo: {
    flex: 1,
  },
  walletLabel: {
    fontSize: 18,
    color: '#6b7280',
  },
  walletAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
});