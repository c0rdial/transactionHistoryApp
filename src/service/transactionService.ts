export interface Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: 'debit' | 'credit';
  }
  
  export const getTransactions = (): Transaction[] => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      amount: Math.floor(Math.random() * 1000) + 1, // Random amount between 1 and 1000
      date: new Date(Date.now() - i * 86400000).toISOString(), // Dates from today backward
      description: `Transaction ${i + 1}`,
      type: i % 2 === 0 ? 'credit' : 'debit', // Alternate between credit and debit
    }));
  };