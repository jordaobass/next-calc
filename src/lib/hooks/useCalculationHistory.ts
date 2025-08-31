'use client';

import { useState, useEffect } from 'react';

export interface CalculationHistoryItem {
  id: string;
  type: 'rescisao' | 'ferias' | 'decimo-terceiro' | 'fgts' | 'horas-extras' | 'inss' | 'irrf' | 'seguro-desemprego' | 'adicional-noturno' | 'adicional-insalubridade' | 'periculosidade';
  title: string;
  date: string;
  inputData: Record<string, any>;
  result: Record<string, any>;
  summary: {
    grossValue?: number;
    netValue?: number;
    description: string;
  };
}

const STORAGE_KEY = 'calc_trabalhista_history';
const MAX_HISTORY_ITEMS = 50;

export function useCalculationHistory() {
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedHistory = JSON.parse(stored);
        setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
      }
    } catch (error) {
      console.warn('Failed to load calculation history:', error);
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save history to localStorage whenever it changes
  const saveToStorage = (newHistory: CalculationHistoryItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.warn('Failed to save calculation history:', error);
    }
  };

  // Add new calculation to history
  const addCalculation = (
    type: CalculationHistoryItem['type'],
    title: string,
    inputData: Record<string, any>,
    result: Record<string, any>,
    summary: CalculationHistoryItem['summary']
  ) => {
    const newItem: CalculationHistoryItem = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      date: new Date().toISOString(),
      inputData,
      result,
      summary,
    };

    const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  // Remove calculation from history
  const removeCalculation = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear calculation history:', error);
    }
  };

  // Get history by type
  const getHistoryByType = (type: CalculationHistoryItem['type']) => {
    return history.filter(item => item.type === type);
  };

  // Get recent calculations (last 5)
  const getRecentCalculations = () => {
    return history.slice(0, 5);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get calculator type label
  const getTypeLabel = (type: CalculationHistoryItem['type']) => {
    const labels = {
      'rescisao': 'Rescisão',
      'ferias': 'Férias',
      'decimo-terceiro': '13º Salário',
      'fgts': 'FGTS',
    };
    return labels[type] || type;
  };

  // Get type icon (using text emoji for simplicity)
  const getTypeIcon = (type: CalculationHistoryItem['type']) => {
    const icons = {
      'rescisao': '🧾',
      'ferias': '🏖️',
      'decimo-terceiro': '💰',
      'fgts': '🏦',
    };
    return icons[type] || '📊';
  };

  // Get statistics
  const getStatistics = () => {
    const stats = {
      total: history.length,
      byType: {
        rescisao: 0,
        ferias: 0,
        'decimo-terceiro': 0,
        fgts: 0,
      },
      totalCalculatedValue: 0,
    };

    history.forEach(item => {
      stats.byType[item.type]++;
      if (item.summary.netValue) {
        stats.totalCalculatedValue += item.summary.netValue;
      }
    });

    return stats;
  };

  return {
    history,
    isLoading,
    addCalculation,
    removeCalculation,
    clearHistory,
    getHistoryByType,
    getRecentCalculations,
    formatDate,
    getTypeLabel,
    getTypeIcon,
    getStatistics,
  };
}