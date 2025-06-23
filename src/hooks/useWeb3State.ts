
import { useState, useEffect } from 'react';
import { RpcProvider, Account, Contract } from 'starknet';
import { connectToWallet, checkExistingConnection } from '@/utils/walletUtils';
import { initializeProvider, initializeContract } from '@/utils/contractUtils';

export const useWeb3State = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any | null>(null);
  const [provider, setProvider] = useState<RpcProvider | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [tokenContract, setTokenContract] = useState<Contract | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize provider
  useEffect(() => {
    const initProvider = () => {
      try {
        const newProvider = initializeProvider();
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
      if (!provider) return;

      const connection = await checkExistingConnection(provider);
      if (connection) {
        setWallet(connection.wallet);
        setWalletAddress(connection.address);
        setAccount(connection.account);
        setIsConnected(true);
      }
    };

    checkConnection();
  }, [provider]);

  // Initialize contract when account is available
  useEffect(() => {
    const initContract = async () => {
      if (!account || !provider) return;

      try {
        const contract = await initializeContract(account, provider);
        setTokenContract(contract);
      } catch (err) {
        setError('Failed to initialize token contract');
      }
    };

    initContract();
  }, [account, provider]);

  const connectWallet = async (): Promise<boolean> => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const connection = await connectToWallet(provider);
      
      setWallet(connection.wallet);
      setWalletAddress(connection.address);
      setAccount(connection.account);
      setIsConnected(true);
      
      return true;
    } catch (err: any) {
      console.error('Failed to connect wallet:', err);
      setError(err.message || 'Failed to connect wallet. Please try again.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
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

  return {
    isConnected,
    walletAddress,
    wallet,
    provider,
    account,
    tokenContract,
    isConnecting,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  };
};
