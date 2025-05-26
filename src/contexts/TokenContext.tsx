
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface TokenTransaction {
  id: string;
  type: 'transfer' | 'receive' | 'mint' | 'burn';
  amount: number;
  from?: string;
  to?: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  description: string;
}

export interface TokenBalance {
  available: number;
  locked: number;
  total: number;
}

interface TokenContextType {
  balance: TokenBalance;
  transactions: TokenTransaction[];
  transferTokens: (to: string, amount: number, description?: string) => Promise<boolean>;
  mintTokens: (amount: number, description?: string) => Promise<boolean>;
  isLoading: boolean;
  refreshBalance: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<TokenBalance>({ available: 0, locked: 0, total: 0 });
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock token balances based on user role
  const initializeBalance = () => {
    if (!user) return;

    let initialBalance: TokenBalance;
    switch (user.role) {
      case 'bank':
        initialBalance = { available: 1000000, locked: 50000, total: 1050000 };
        break;
      case 'company':
        initialBalance = { available: 85000, locked: 15000, total: 100000 };
        break;
      case 'vendor':
        initialBalance = { available: 25000, locked: 5000, total: 30000 };
        break;
      default:
        initialBalance = { available: 0, locked: 0, total: 0 };
    }
    setBalance(initialBalance);
  };

  // Mock transaction history
  const initializeTransactions = () => {
    if (!user) return;

    const mockTransactions: TokenTransaction[] = [
      {
        id: 'tx001',
        type: 'receive',
        amount: 50000,
        from: 'HDFC Bank',
        timestamp: new Date('2024-01-15'),
        status: 'completed',
        description: 'CAT allocation from bank'
      },
      {
        id: 'tx002',
        type: 'transfer',
        amount: 15000,
        to: 'Global Supplies Ltd',
        timestamp: new Date('2024-01-14'),
        status: 'completed',
        description: 'Payment for services'
      },
      {
        id: 'tx003',
        type: 'receive',
        amount: 25000,
        from: 'TechCorp Industries',
        timestamp: new Date('2024-01-13'),
        status: 'completed',
        description: 'Token transfer received'
      }
    ];
    setTransactions(mockTransactions);
  };

  const transferTokens = async (to: string, amount: number, description = 'Token transfer'): Promise<boolean> => {
    if (amount > balance.available) {
      return false;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTransaction: TokenTransaction = {
      id: `tx${Date.now()}`,
      type: 'transfer',
      amount,
      to,
      timestamp: new Date(),
      status: 'completed',
      description
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => ({
      available: prev.available - amount,
      locked: prev.locked,
      total: prev.total - amount
    }));

    setIsLoading(false);
    return true;
  };

  const mintTokens = async (amount: number, description = 'Token mint'): Promise<boolean> => {
    if (user?.role !== 'bank') {
      return false; // Only banks can mint tokens
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTransaction: TokenTransaction = {
      id: `tx${Date.now()}`,
      type: 'mint',
      amount,
      timestamp: new Date(),
      status: 'completed',
      description
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => ({
      available: prev.available + amount,
      locked: prev.locked,
      total: prev.total + amount
    }));

    setIsLoading(false);
    return true;
  };

  const refreshBalance = () => {
    initializeBalance();
  };

  useEffect(() => {
    if (user) {
      initializeBalance();
      initializeTransactions();
    }
  }, [user]);

  return (
    <TokenContext.Provider value={{
      balance,
      transactions,
      transferTokens,
      mintTokens,
      isLoading,
      refreshBalance
    }}>
      {children}
    </TokenContext.Provider>
  );
};
