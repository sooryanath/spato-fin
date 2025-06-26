
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
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

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setDialogOpen(true)}
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
      
      <WalletConnectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default WalletConnectButton;
