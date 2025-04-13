import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { getTransactions, Transaction } from '../service/transactionService';

export default function TransactionHistoryScreen({ navigation }: { navigation: any }) {
  const [transactions, setTransactions] = useState<Transaction[]>(getTransactions());
  const [refreshing, setRefreshing] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);

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

  const onRefresh = () => {
    setRefreshing(true);
    setTransactions(getTransactions()); // Simulate fetching new data
    setRefreshing(false);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
    }).format(amount);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
    >
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={[styles.amount, item.type === 'credit' ? styles.credit : styles.debit]}>
        {showAmounts ? formatCurrency(item.amount) : '****'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.authButton} onPress={handleBiometricAuth}>
        <Text style={styles.authButtonText}>
          {showAmounts ? 'Amounts Revealed' : 'Reveal Amounts'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
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
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  credit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
});