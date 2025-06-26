
interface StarknetWalletProvider {
  enable(): Promise<void>;
  isConnected: boolean;
  account?: {
    address: string;
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
