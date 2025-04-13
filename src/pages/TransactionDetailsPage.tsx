import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TransactionDetailScreen({ route }: { route: any }) {
  const { transaction } = route.params; // Get the transaction data passed via navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{transaction.description}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>
          {new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR',
          }).format(transaction.amount)}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(transaction.date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Type:</Text>
        <Text style={[styles.value, transaction.type === 'credit' ? styles.credit : styles.debit]}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  credit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
});