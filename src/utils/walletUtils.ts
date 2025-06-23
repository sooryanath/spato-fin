
import { getStarknet } from 'get-starknet-core';
import { RpcProvider, Account } from 'starknet';

export const connectToWallet = async (provider: RpcProvider | null) => {
  if (!provider) {
    throw new Error('Provider not initialized');
  }

  const starknetWindowObject = getStarknet();

  if (!starknetWindowObject) {
    throw new Error('No Starknet wallet found. Please install ArgentX or Braavos.');
  }

  const availableWallets = await starknetWindowObject.getAvailableWallets();
  
  if (availableWallets.length === 0) {
    throw new Error('No Starknet wallet found. Please install ArgentX or Braavos.');
  }

  // Try to connect to the first available wallet
  const walletOption = availableWallets[0];
  const connectedWallet = await starknetWindowObject.enable(walletOption);
  
  if (!connectedWallet || !connectedWallet.selectedAddress) {
    throw new Error('Failed to connect wallet');
  }

  // Create account without signer property (using wallet directly)
  const account = new Account(
    provider,
    connectedWallet.selectedAddress,
    connectedWallet
  );

  return {
    wallet: connectedWallet,
    address: connectedWallet.selectedAddress,
    account
  };
};

export const checkExistingConnection = async (provider: RpcProvider | null) => {
  if (!provider) return null;

  try {
    const starknetWindowObject = getStarknet();
    
    if (!starknetWindowObject) return null;

    const availableWallets = await starknetWindowObject.getAvailableWallets();
    
    for (const walletOption of availableWallets) {
      try {
        const wallet = await starknetWindowObject.enable(walletOption);
        
        if (wallet && wallet.isConnected && wallet.selectedAddress) {
          const account = new Account(
            provider,
            wallet.selectedAddress,
            wallet
          );
          
          return {
            wallet,
            address: wallet.selectedAddress,
            account
          };
        }
      } catch (walletError) {
        console.log('Wallet not connected:', walletOption.id);
      }
    }
    
    return null;
  } catch (err) {
    console.error('Failed to check existing connection:', err);
    return null;
  }
};
