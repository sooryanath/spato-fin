
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contract, Account, Provider, constants, uint256, validateAndParseAddress } from 'starknet';
import { toast } from '@/hooks/use-toast';

interface Web3ContextType {
  isConnected: boolean;
  account: any | null; // Using any for wallet account to avoid type conflicts
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
  const [account, setAccount] = useState<any | null>(null);
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

  const validateStarknetAddress = (address: string): boolean => {
    try {
      validateAndParseAddress(address);
      return true;
    } catch (error) {
      console.error('Invalid Starknet address:', error);
      return false;
    }
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
      
      console.log('Starting mint process...', { recipientAddress, amount });
      
      // Validate recipient address
      if (!validateStarknetAddress(recipientAddress)) {
        toast({
          title: "Invalid Address",
          description: "Please enter a valid Starknet address",
          variant: "destructive",
        });
        return null;
      }

      // Create contract instance
      const contract = new Contract(TOKEN_CONTRACT_ABI, CONTRACT_ADDRESS, account);
      console.log('Contract instance created');
      
      // Convert amount to wei (18 decimals) and then to Uint256
      const amountInWei = BigInt(amount) * BigInt(10**18);
      console.log('Amount in wei:', amountInWei.toString());
      
      // Use Starknet's uint256 utility to properly construct Uint256
      const amountUint256 = uint256.bnToUint256(amountInWei);
      console.log('Amount as Uint256:', amountUint256);

      // Prepare the mint call
      const mintCall = contract.populate('mint', [recipientAddress, amountUint256]);
      console.log('Mint call prepared:', mintCall);
      
      toast({
        title: "Transaction Submitted",
        description: `Minting ${amount} tokens to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
      });

      // Execute the transaction
      const result = await account.execute([mintCall]);
      console.log('Transaction executed:', result);

      // Wait for transaction confirmation
      const receipt = await account.waitForTransaction(result.transaction_hash);
      console.log('Transaction receipt:', receipt);
      
      // Check if transaction was successful (different status properties possible)
      const isSuccessful = receipt.status === 'ACCEPTED_ON_L2' || 
                          receipt.execution_status === 'SUCCEEDED' ||
                          receipt.finality_status === 'ACCEPTED_ON_L2';
      
      if (isSuccessful) {
        toast({
          title: "Tokens Minted Successfully",
          description: `${amount} $CAT tokens have been minted and sent to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
        });
        return result.transaction_hash;
      } else {
        console.error('Transaction failed with receipt:', receipt);
        throw new Error(`Transaction failed with status: ${receipt.status || receipt.execution_status || receipt.finality_status}`);
      }
    } catch (error: any) {
      console.error('Error minting tokens:', error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to mint tokens. Please check your wallet and try again.";
      
      if (error.message?.includes('felt()')) {
        errorMessage = "Address format error. Please ensure you're using a valid Starknet address.";
      } else if (error.message?.includes('insufficient')) {
        errorMessage = "Insufficient funds for gas fees. Please add ETH to your wallet.";
      } else if (error.message?.includes('rejected')) {
        errorMessage = "Transaction was rejected. Please try again.";
      } else if (error.message?.includes('timeout')) {
        errorMessage = "Transaction timed out. Please check the network and try again.";
      }
      
      toast({
        title: "Minting Failed",
        description: errorMessage,
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
