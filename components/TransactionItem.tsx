import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from '../src/service/transactionService';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
  showAmount: boolean;
}

export default function TransactionItem({ transaction, onPress, showAmount }: TransactionItemProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
    }).format(amount);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.description}>{transaction.description}</Text>
      <Text style={styles.date}>{new Date(transaction.date).toLocaleDateString()}</Text>
      <Text style={[styles.amount, transaction.type === 'credit' ? styles.credit : styles.debit]}>
        {showAmount ? formatCurrency(transaction.amount) : '****'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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