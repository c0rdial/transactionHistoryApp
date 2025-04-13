import React, { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, RefreshControl, Alert, Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { getTransactions, Transaction } from '../service/transactionService';
import TransactionItem from '../../components/TransactionItem';
import { useFocusEffect } from '@react-navigation/native';

export default function TransactionHistoryScreen({ navigation }: { navigation: any }) {
  const [transactions, setTransactions] = useState<Transaction[]>(getTransactions());
  const [refreshing, setRefreshing] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setTransactions(getTransactions());
      setShowAmounts(false);
    }, [])
  );

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to reveal amounts',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setShowAmounts(true);
        Alert.alert('Success', 'Amounts are now visible.');
      } else {
        Alert.alert('Failed', 'Authentication failed.');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'An error occurred during authentication.');
    }
  };
  const handleToggleAmounts = async () => {
    try {
      if (showAmounts) {
        // If amounts are already visible, hide them
        setShowAmounts(false);
        Alert.alert('Success', 'Amounts are now hidden.');
        return;
      }

      // Authenticate to reveal amounts
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to reveal amounts',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setShowAmounts(true);
        Alert.alert('Success', 'Amounts are now visible.');
      } else {
        Alert.alert('Failed', 'Authentication failed.');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTransactions(getTransactions()); //fetching new data from service file
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.authButton} onPress={handleToggleAmounts}>
        <Text style={styles.authButtonText}>
          {showAmounts ? 'Hide Amount' : 'Show Amount'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
            showAmount={showAmounts}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  authButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 16,
  },
});