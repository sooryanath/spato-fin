
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface TokenTransaction {
  id: string;
  type: 'transfer' | 'receive' | 'mint' | 'burn' | 'redeem';
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
  const { user, session } = useAuth();
  const [balance, setBalance] = useState<TokenBalance>({ available: 0, locked: 0, total: 0 });
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('token_balances')
        .select('*')
        .eq('profile_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching balance:', error);
        return;
      }

      if (data) {
        setBalance({
          available: parseFloat(data.available_balance?.toString() || '0'),
          locked: parseFloat(data.locked_balance?.toString() || '0'),
          total: parseFloat(data.total_balance?.toString() || '0')
        });
      }
    } catch (error) {
      console.error('Error in fetchBalance:', error);
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select(`
          *,
          from_profile:profiles!from_profile_id(name, organization_name),
          to_profile:profiles!to_profile_id(name, organization_name)
        `)
        .or(`from_profile_id.eq.${user.id},to_profile_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      const formattedTransactions: TokenTransaction[] = data.map(tx => ({
        id: tx.id,
        type: tx.transaction_type as TokenTransaction['type'],
        amount: parseFloat(tx.amount?.toString() || '0'),
        from: tx.from_profile?.organization_name || tx.from_profile?.name,
        to: tx.to_profile?.organization_name || tx.to_profile?.name,
        timestamp: new Date(tx.created_at),
        status: tx.status as TokenTransaction['status'],
        description: tx.description || ''
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error in fetchTransactions:', error);
    }
  };

  const transferTokens = async (toProfileId: string, amount: number, description = 'Token transfer'): Promise<boolean> => {
    if (!user || !session) return false;
    if (amount > balance.available) return false;

    setIsLoading(true);
    try {
      // Create transaction record
      const { data: transaction, error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          from_profile_id: user.id,
          to_profile_id: toProfileId,
          transaction_type: 'transfer',
          amount: amount,
          status: 'completed',
          description
        })
        .select()
        .single();

      if (transactionError) {
        console.error('Error creating transaction:', transactionError);
        return false;
      }

      // Update balances using the database function
      const { error: updateError } = await supabase.rpc('update_token_balance', {
        p_profile_id: user.id,
        p_amount_change: -amount,
        p_balance_type: 'available'
      });

      if (updateError) {
        console.error('Error updating balance:', updateError);
        return false;
      }

      // Refresh data
      await Promise.all([fetchBalance(), fetchTransactions()]);
      return true;
    } catch (error) {
      console.error('Error in transferTokens:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const mintTokens = async (amount: number, description = 'Token mint'): Promise<boolean> => {
    if (!user || !session || user.role !== 'bank') return false;

    setIsLoading(true);
    try {
      // Create mint transaction
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          to_profile_id: user.id,
          transaction_type: 'mint',
          amount: amount,
          status: 'completed',
          description
        });

      if (transactionError) {
        console.error('Error creating mint transaction:', transactionError);
        return false;
      }

      // Update balance
      const { error: updateError } = await supabase.rpc('update_token_balance', {
        p_profile_id: user.id,
        p_amount_change: amount,
        p_balance_type: 'available'
      });

      if (updateError) {
        console.error('Error updating balance:', updateError);
        return false;
      }

      // Refresh data
      await Promise.all([fetchBalance(), fetchTransactions()]);
      return true;
    } catch (error) {
      console.error('Error in mintTokens:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = () => {
    fetchBalance();
    fetchTransactions();
  };

  useEffect(() => {
    if (user && session) {
      fetchBalance();
      fetchTransactions();
    }
  }, [user, session]);

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
