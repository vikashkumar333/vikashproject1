import { Category } from '../types';

export const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', icon: '🍽️', color: '#FF6B6B', type: 'expense' },
  { id: '2', name: 'Transportation', icon: '🚗', color: '#4ECDC4', type: 'expense' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#45B7D1', type: 'expense' },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#96CEB4', type: 'expense' },
  { id: '5', name: 'Bills & Utilities', icon: '⚡', color: '#FFEAA7', type: 'expense' },
  { id: '6', name: 'Healthcare', icon: '🏥', color: '#DDA0DD', type: 'expense' },
  { id: '7', name: 'Education', icon: '📚', color: '#98D8C8', type: 'expense' },
  { id: '8', name: 'Travel', icon: '✈️', color: '#F7DC6F', type: 'expense' },
  { id: '9', name: 'Salary', icon: '💰', color: '#58D68D', type: 'income' },
  { id: '10', name: 'Freelance', icon: '💻', color: '#85C1E9', type: 'income' },
  { id: '11', name: 'Investment', icon: '📈', color: '#F8C471', type: 'income' },
  { id: '12', name: 'Other Income', icon: '💵', color: '#BB8FCE', type: 'income' },
];