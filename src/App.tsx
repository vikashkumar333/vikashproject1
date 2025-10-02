import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Analytics } from './components/Analytics';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultCategories } from './data/categories';
import { calculateAnalytics } from './utils/analytics';
import { Transaction, Category, Analytics as AnalyticsType } from './types';

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('expense-tracker-transactions', []);
  const [categories] = useLocalStorage<Category[]>('expense-tracker-categories', defaultCategories);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [analytics, setAnalytics] = useState<AnalyticsType>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    categoryBreakdown: {},
    monthlyTrend: [],
  });

  useEffect(() => {
    const newAnalytics = calculateAnalytics(transactions);
    setAnalytics(newAnalytics);
  }, [transactions]);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => 
        t.id === editingTransaction.id 
          ? { ...transactionData, id: t.id, createdAt: t.createdAt }
          : t
      ));
      setEditingTransaction(undefined);
    } else {
      const newTransaction: Transaction = {
        ...transactionData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setTransactions(prev => [...prev, newTransaction]);
    }
    setShowTransactionForm(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({ transactions, categories }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `expense-tracker-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const openTransactionForm = () => {
    setEditingTransaction(undefined);
    setShowTransactionForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header 
        balance={analytics.balance}
        onAddTransaction={openTransactionForm}
        onShowAnalytics={() => setShowAnalytics(true)}
        onExportData={handleExportData}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">This Month's Income</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${analytics.monthlyTrend[analytics.monthlyTrend.length - 1]?.income.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">📈</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">This Month's Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${analytics.monthlyTrend[analytics.monthlyTrend.length - 1]?.expenses.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">📉</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">💳</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <TransactionList
            transactions={transactions}
            categories={categories}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>

      {/* Modals */}
      <TransactionForm
        isOpen={showTransactionForm}
        onClose={() => {
          setShowTransactionForm(false);
          setEditingTransaction(undefined);
        }}
        onSubmit={handleAddTransaction}
        categories={categories}
        editingTransaction={editingTransaction}
      />

      <Analytics
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        analytics={analytics}
        categories={categories}
      />
    </div>
  );
}

export default App;