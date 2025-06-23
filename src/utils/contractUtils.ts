
import { Contract, RpcProvider, Account } from 'starknet';
import { TOKEN_CONTRACT_ADDRESS, ERC20_ABI } from '@/types/web3';

export const initializeProvider = (): RpcProvider => {
  return new RpcProvider({ 
    nodeUrl: 'https://starknet-mainnet.public.blastapi.io'
  });
};

export const initializeContract = async (
  account: Account,
  provider: RpcProvider
): Promise<Contract | null> => {
  if (TOKEN_CONTRACT_ADDRESS === '0x...') {
    return null; // Contract not deployed yet
  }

  try {
    const contract = new Contract(ERC20_ABI, TOKEN_CONTRACT_ADDRESS, account);
    return contract;
  } catch (err) {
    console.error('Failed to initialize contract:', err);
    throw new Error('Failed to initialize token contract');
  }
};
