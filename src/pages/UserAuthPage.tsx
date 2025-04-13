import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from 'expo-linear-gradient';

export default function UserAuthPage({ navigation }: { navigation: any }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleBiometricAuth = async () => {
    try {
      // Check if the device supports biometric authentication
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Error', 'Biometric authentication is not supported on this device.');
        return;
      }

      // Check if biometrics are enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Error', 'No biometrics are enrolled on this device.');
        return;
      }

      // Prompt the user for biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to Login',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setIsAuthenticated(true);
        Alert.alert('Success', 'You are now authenticated!');
        navigation.navigate('TransactionHistory'); // Navigate to Transaction History Screen
      } else {
        Alert.alert('Failed', 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'An error occurred during authentication.');
    }
  };

  return (
    <LinearGradient
      colors={['#007bff', '#f5f5f5']} // Gradient background
      style={styles.container}
    >
      {/* Logo */}
       <Image
              source={require('../../assets/user-icon.png')} // Use the added logo
              style={styles.logo}
            />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome Back User!</Text>
      <Text style={styles.subtitle}>
        Log in securely using your biometrics to access your account.
      </Text>

      {/* Biometric Authentication Button */}
      <TouchableOpacity style={styles.authButton} onPress={handleBiometricAuth}>
        <Text style={styles.authButtonText}>
          {isAuthenticated ? 'Authenticated' : 'Login with Biometrics'}
        </Text>
      </TouchableOpacity>

      {/* Decorative Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Your security is our priority.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#f5f5f5', // Light gray text
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  authButton: {
    backgroundColor: '#fff', // White button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  authButtonText: {
    color: '#007bff', // Blue text
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#f5f5f5', // Light gray text
    textAlign: 'center',
  },
});