
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connect, disconnect, StarknetWindowObject } from 'get-starknet-core';
import { Contract, Provider, Account } from 'starknet';

export interface Web3ContextType {
  // Wallet connection state
  isConnected: boolean;
  walletAddress: string | null;
  wallet: StarknetWindowObject | null;
  provider: Provider | null;
  account: Account | null;
  
  // Connection methods
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  
  // Contract interaction
  tokenContract: Contract | null;
  
  // Loading states
  isConnecting: boolean;
  isLoading: boolean;
  
  // Error handling
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

// Contract addresses (will be updated with actual deployed contracts)
const TOKEN_CONTRACT_ADDRESS = '0x...'; // Placeholder for deployed ERC20 contract

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [wallet, setWallet] = useState<StarknetWindowObject | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [tokenContract, setTokenContract] = useState<Contract | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize provider
  useEffect(() => {
    const initProvider = () => {
      try {
        // Use Starknet mainnet provider (can be changed to testnet)
        const newProvider = new Provider({ 
          sequencer: { network: 'mainnet-alpha' } 
        });
        setProvider(newProvider);
      } catch (err) {
        console.error('Failed to initialize provider:', err);
        setError('Failed to initialize blockchain provider');
      }
    };

    initProvider();
  }, []);

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const lastWallet = await connect({ 
          modalMode: 'neverAsk',
          modalTheme: 'light'
        });
        
        if (lastWallet && lastWallet.isConnected) {
          setWallet(lastWallet);
          setWalletAddress(lastWallet.selectedAddress || null);
          setIsConnected(true);
          
          if (provider) {
            const newAccount = new Account(
              provider,
              lastWallet.selectedAddress!,
              lastWallet.signer
            );
            setAccount(newAccount);
          }
        }
      } catch (err) {
        console.error('Failed to check existing connection:', err);
      }
    };

    if (provider) {
      checkConnection();
    }
  }, [provider]);

  // Initialize contract when account is available
  useEffect(() => {
    const initContract = async () => {
      if (account && provider && TOKEN_CONTRACT_ADDRESS !== '0x...') {
        try {
          // ERC20 ABI (simplified)
          const erc20Abi = [
            {
              name: 'name',
              type: 'function',
              inputs: [],
              outputs: [{ name: 'name', type: 'felt' }],
              stateMutability: 'view'
            },
            {
              name: 'symbol',
              type: 'function',
              inputs: [],
              outputs: [{ name: 'symbol', type: 'felt' }],
              stateMutability: 'view'
            },
            {
              name: 'balanceOf',
              type: 'function',
              inputs: [{ name: 'account', type: 'felt' }],
              outputs: [{ name: 'balance', type: 'Uint256' }],
              stateMutability: 'view'
            },
            {
              name: 'transfer',
              type: 'function',
              inputs: [
                { name: 'recipient', type: 'felt' },
                { name: 'amount', type: 'Uint256' }
              ],
              outputs: [{ name: 'success', type: 'felt' }],
              stateMutability: 'external'
            },
            {
              name: 'mint',
              type: 'function',
              inputs: [
                { name: 'to', type: 'felt' },
                { name: 'amount', type: 'Uint256' }
              ],
              outputs: [],
              stateMutability: 'external'
            }
          ];

          const contract = new Contract(erc20Abi, TOKEN_CONTRACT_ADDRESS, account);
          setTokenContract(contract);
        } catch (err) {
          console.error('Failed to initialize contract:', err);
          setError('Failed to initialize token contract');
        }
      }
    };

    initContract();
  }, [account, provider]);

  const connectWallet = async (): Promise<boolean> => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const connectedWallet = await connect({
        modalMode: 'alwaysAsk',
        modalTheme: 'light'
      });

      if (connectedWallet) {
        await connectedWallet.enable();
        
        setWallet(connectedWallet);
        setWalletAddress(connectedWallet.selectedAddress || null);
        setIsConnected(true);
        
        if (provider && connectedWallet.selectedAddress) {
          const newAccount = new Account(
            provider,
            connectedWallet.selectedAddress,
            connectedWallet.signer
          );
          setAccount(newAccount);
        }
        
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet. Please try again.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
      if (wallet) {
        disconnect({ clearLastWallet: true });
      }
      
      setWallet(null);
      setWalletAddress(null);
      setAccount(null);
      setTokenContract(null);
      setIsConnected(false);
      setError(null);
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
    }
  };

  const value: Web3ContextType = {
    isConnected,
    walletAddress,
    wallet,
    provider,
    account,
    connectWallet,
    disconnectWallet,
    tokenContract,
    isConnecting,
    isLoading,
    error
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
