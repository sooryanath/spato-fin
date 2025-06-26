
import React, { createContext, useContext, useState, useEffect } from 'react';
import { connect, disconnect, Contract, Account, Provider, constants } from 'starknet';
import { toast } from '@/hooks/use-toast';

interface Web3ContextType {
  isConnected: boolean;
  account: Account | null;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  mintTokens: (recipientAddress: string, amount: number) => Promise<string | null>;
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

// Contract ABI for the token contract
const TOKEN_CONTRACT_ABI = [
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      { "name": "recipient", "type": "felt" },
      { "name": "amount", "type": "Uint256" }
    ],
    "outputs": [],
    "stateMutability": "external"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{ "name": "account", "type": "felt" }],
    "outputs": [{ "name": "balance", "type": "Uint256" }],
    "stateMutability": "view"
  }
];

const CONTRACT_ADDRESS = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.starknet) {
        const isWalletConnected = await window.starknet.isConnected;
        if (isWalletConnected) {
          const walletAccount = window.starknet.account;
          if (walletAccount) {
            setAccount(walletAccount);
            setAddress(walletAccount.address);
            setIsConnected(true);
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.starknet) {
        toast({
          title: "Wallet Not Found",
          description: "Please install a Starknet wallet like Argent X or Braavos",
          variant: "destructive",
        });
        return;
      }

      await window.starknet.enable();
      const walletAccount = window.starknet.account;
      
      if (walletAccount) {
        setAccount(walletAccount);
        setAddress(walletAccount.address);
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${walletAccount.address.slice(0, 6)}...${walletAccount.address.slice(-4)}`,
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setAddress(null);
    setIsConnected(false);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const mintTokens = async (recipientAddress: string, amount: number): Promise<string | null> => {
    if (!account || !isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsLoading(true);
      
      // Create contract instance
      const contract = new Contract(TOKEN_CONTRACT_ABI, CONTRACT_ADDRESS, account);
      
      // Prepare the amount as Uint256 (amount * 10^18 for 18 decimals)
      const amountBN = (BigInt(amount) * BigInt(10**18)).toString();
      const amountUint256 = {
        low: amountBN,
        high: "0"
      };

      // Call the mint function
      const mintCall = contract.populate('mint', [recipientAddress, amountUint256]);
      const result = await account.execute([mintCall]);
      
      toast({
        title: "Transaction Submitted",
        description: `Minting ${amount} tokens to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
      });

      // Wait for transaction confirmation
      const receipt = await account.waitForTransaction(result.transaction_hash);
      
      if (receipt.status === 'ACCEPTED_ON_L2') {
        toast({
          title: "Tokens Minted Successfully",
          description: `${amount} $CAT tokens have been minted and sent to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
        });
        return result.transaction_hash;
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error minting tokens:', error);
      toast({
        title: "Minting Failed",
        description: "Failed to mint tokens. Please check your wallet and try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Web3Context.Provider value={{
      isConnected,
      account,
      address,
      connect: connectWallet,
      disconnect: disconnectWallet,
      mintTokens,
      isLoading
    }}>
      {children}
    </Web3Context.Provider>
  );
};
