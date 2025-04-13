import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function UserAuthPage() {
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
      } else {
        Alert.alert('Failed', 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'An error occurred during authentication.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your app logo
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Log in securely using your biometrics to access your account.
      </Text>

      <TouchableOpacity style={styles.authButton} onPress={handleBiometricAuth}>
        <Text style={styles.authButtonText}>
          {isAuthenticated ? 'Authenticated' : 'Login with Biometrics'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fallbackButton} onPress={() => Alert.alert('Fallback', 'Use another login method.')}>
        <Text style={styles.fallbackButtonText}>Use Another Login Method</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  authButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fallbackButton: {
    paddingVertical: 10,
  },
  fallbackButtonText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});