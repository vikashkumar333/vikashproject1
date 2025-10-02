import { Transaction, Analytics } from '../types';

export function calculateAnalytics(transactions: Transaction[]): Analytics {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const categoryBreakdown = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as { [key: string]: number });

  const monthlyTrend = getMonthlyTrend(transactions);

  return {
    totalIncome,
    totalExpenses,
    balance,
    categoryBreakdown,
    monthlyTrend,
  };
}

function getMonthlyTrend(transactions: Transaction[]) {
  const months = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months[monthKey]) {
      months[monthKey] = { month: monthKey, income: 0, expenses: 0 };
    }
    
    if (transaction.type === 'income') {
      months[monthKey].income += transaction.amount;
    } else {
      months[monthKey].expenses += transaction.amount;
    }
  });

  return Object.values(months).slice(-6); // Last 6 months
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}