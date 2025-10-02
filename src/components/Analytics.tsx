import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Analytics as AnalyticsType, Category } from '../types';
import { formatCurrency } from '../utils/analytics';

interface AnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: AnalyticsType;
  categories: Category[];
}

export function Analytics({ isOpen, onClose, analytics, categories }: AnalyticsProps) {
  if (!isOpen) return null;

  const getCategoryData = (categoryName: string) => {
    return categories.find(cat => cat.name === categoryName);
  };

  const categoryData = Object.entries(analytics.categoryBreakdown)
    .map(([category, amount]) => ({
      category,
      amount,
      data: getCategoryData(category),
    }))
    .sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...categoryData.map(item => item.amount));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Income</p>
                  <p className="text-2xl font-bold">{formatCurrency(analytics.totalIncome)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Expenses</p>
                  <p className="text-2xl font-bold">{formatCurrency(analytics.totalExpenses)}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-200" />
              </div>
            </div>

            <div className={`bg-gradient-to-br ${analytics.balance >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-xl p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Net Balance</p>
                  <p className="text-2xl font-bold">{formatCurrency(analytics.balance)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-200" />
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Spending by Category</h3>
            </div>

            {categoryData.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            ) : (
              <div className="space-y-4">
                {categoryData.map(({ category, amount, data }) => (
                  <div key={category} className="flex items-center space-x-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: data?.color || '#6B7280' }}
                    >
                      {data?.icon || '💰'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">{category}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: data?.color || '#6B7280',
                            width: `${(amount / maxAmount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Trend */}
          {analytics.monthlyTrend.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Trend</h3>
              
              <div className="space-y-4">
                {analytics.monthlyTrend.map((month) => (
                  <div key={month.month} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium text-gray-600">
                      {new Date(month.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Income</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">{formatCurrency(month.income)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Expenses</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">{formatCurrency(month.expenses)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}