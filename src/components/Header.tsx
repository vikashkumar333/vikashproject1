import React from 'react';
import { Plus, BarChart3, Settings, Download } from 'lucide-react';

interface HeaderProps {
  balance: number;
  onAddTransaction: () => void;
  onShowAnalytics: () => void;
  onExportData: () => void;
}

export function Header({ balance, onAddTransaction, onShowAnalytics, onExportData }: HeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">$</span>
              </div>
              <h1 className="text-xl font-bold">ExpenseTracker Pro</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-sm opacity-90">Current Balance</div>
              <div className={`text-lg font-bold ${balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {formatCurrency(balance)}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onAddTransaction}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200 hover:scale-105"
                title="Add Transaction"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={onShowAnalytics}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200 hover:scale-105"
                title="View Analytics"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={onExportData}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200 hover:scale-105"
                title="Export Data"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}