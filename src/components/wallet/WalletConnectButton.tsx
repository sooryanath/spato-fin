
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Check } from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import WalletConnectDialog from './WalletConnectDialog';

interface WalletConnectButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isConnected, address, disconnect, isLoading } = useWeb3();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      setDialogOpen(true);
    }
  };

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <>
      <Button
        variant={isConnected ? 'outline' : variant}
        size={size}
        className={className}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isConnected ? (
          <>
            <Check className="h-4 w-4 mr-2 text-green-600" />
            {displayAddress}
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4 mr-2" />
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </>
        )}
      </Button>
      
      <WalletConnectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default WalletConnectButton;
