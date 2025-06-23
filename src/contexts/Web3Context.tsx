
import React, { createContext, useContext, ReactNode } from 'react';
import { Web3ContextType, Web3ProviderProps } from '@/types/web3';
import { useWeb3State } from '@/hooks/useWeb3State';

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const web3State = useWeb3State();

  const value: Web3ContextType = {
    ...web3State
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
