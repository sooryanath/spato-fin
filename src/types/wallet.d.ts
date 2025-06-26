
interface StarknetWalletProvider {
  enable(): Promise<void>;
  isConnected: boolean;
  account?: {
    address: string;
    execute(calls: any[]): Promise<{ transaction_hash: string }>;
    waitForTransaction(hash: string): Promise<{ status: string }>;
  };
  chainId?: string;
}

declare global {
  interface Window {
    starknet?: StarknetWalletProvider;
    starknet_braavos?: StarknetWalletProvider;
  }
}

export {};
