
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, ExternalLink } from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  downloadUrl?: string;
}

const STARKNET_WALLETS: WalletOption[] = [
  {
    id: 'argentX',
    name: 'Argent X',
    icon: '🔰',
    description: 'The most popular Starknet wallet',
    downloadUrl: 'https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb'
  },
  {
    id: 'braavos',
    name: 'Braavos',
    icon: '🛡️',
    description: 'Smart wallet with advanced security features',
    downloadUrl: 'https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma'
  }
];

interface WalletConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletConnectDialog: React.FC<WalletConnectDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { connect, isLoading } = useWeb3();
  const { toast } = useToast();

  const handleWalletConnect = async (walletId: string) => {
    try {
      // Check if wallet is available
      const isWalletAvailable = await checkWalletAvailability(walletId);
      
      if (!isWalletAvailable) {
        toast({
          title: "Wallet not found",
          description: `Please install ${STARKNET_WALLETS.find(w => w.id === walletId)?.name} wallet extension`,
          variant: "destructive",
        });
        return;
      }

      // Use the Web3 context connect function
      await connect();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const checkWalletAvailability = async (walletId: string): Promise<boolean> => {
    // Check if wallet extension is installed
    if (walletId === 'argentX') {
      return typeof window !== 'undefined' && 'starknet' in window;
    }
    if (walletId === 'braavos') {
      return typeof window !== 'undefined' && 'starknet_braavos' in window;
    }
    return false;
  };

  const handleDownloadWallet = (downloadUrl: string) => {
    window.open(downloadUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Starknet Wallet
          </DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to Spato Finance and access Web3 features
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {STARKNET_WALLETS.map((wallet) => (
            <Card key={wallet.id} className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <h3 className="font-semibold">{wallet.name}</h3>
                      <p className="text-sm text-gray-600">{wallet.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadWallet(wallet.downloadUrl!)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Install
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleWalletConnect(wallet.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Connecting...' : 'Connect'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          New to Starknet wallets? We recommend starting with Argent X.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectDialog;
