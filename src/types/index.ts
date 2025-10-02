export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: 'monthly' | 'weekly' | 'daily';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

export interface DateFilter {
  start: string;
  end: string;
}

export interface Analytics {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryBreakdown: { [key: string]: number };
  monthlyTrend: { month: string; income: number; expenses: number }[];
}