
import { Contract, RpcProvider, Account } from 'starknet';

export interface Web3ContextType {
  // Wallet connection state
  isConnected: boolean;
  walletAddress: string | null;
  wallet: any | null;
  provider: RpcProvider | null;
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

export interface Web3ProviderProps {
  children: React.ReactNode;
}

// Contract addresses (will be updated with actual deployed contracts)
export const TOKEN_CONTRACT_ADDRESS = '0x...'; // Placeholder for deployed ERC20 contract

// ERC20 ABI (simplified)
export const ERC20_ABI = [
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
