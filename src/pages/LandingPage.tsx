import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingPage({ navigation }: { navigation: any }) {
  const handleLogin = () => {
    try {
      navigation.navigate('UserAuth'); // Navigate to the User Authentication Page
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to navigate to the login page.');
    }
  };

  const handleSignUp = () => {
    try {
      // Show a popup saying the page is under maintenance
      Alert.alert(
        'Under Maintenance',
        'The Sign Up page is currently under maintenance. Please try again later.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Sign Up error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <LinearGradient
      colors={['#007bff', '#f5f5f5']} // Gradient background
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')} // Use the added logo
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to Ipsum Bank</Text>
      <Text style={styles.subtitle}>
        Your trusted partner in secure banking.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Links */}
      <View style={styles.footer}>
        <Text
          style={styles.footerLink}
          onPress={() => Linking.openURL('https://www.rytbank.my/privacy-notice')}
        >
          Privacy Policy
        </Text>
        <Text
          style={styles.footerLink}
          onPress={() => Linking.openURL('https://www.rytbank.my/terms-of-use')}
        >
          Terms of Service
        </Text>
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
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
    width: '48%',
  },
  loginButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '48%',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  footerLink: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});