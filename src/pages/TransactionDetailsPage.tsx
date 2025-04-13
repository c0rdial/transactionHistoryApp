import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TransactionDetailScreen({ route }: { route: any }) {
  const { transaction } = route.params; // Get the transaction data passed via navigation

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Transaction Details</Text>

      {/* Amount */}
      <Text style={[styles.amount, transaction.type === 'credit' ? styles.credit : styles.debit]}>
        {new Intl.NumberFormat('en-MY', {
          style: 'currency',
          currency: 'MYR',
        }).format(transaction.amount)}
      </Text>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{transaction.description}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date(transaction.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
          </Text>
        </View>
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
    color: '#333',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  credit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
});