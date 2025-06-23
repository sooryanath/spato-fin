
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/contexts/Web3Context';
import { Wallet, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WalletConnection = () => {
  const { 
    isConnected, 
    walletAddress, 
    connectWallet, 
    disconnectWallet, 
    isConnecting, 
    error 
  } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && walletAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-green-600" />
            <span>Wallet Connected</span>
          </CardTitle>
          <CardDescription>Your Starknet wallet is connected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">Connected Address</p>
              <p className="text-lg font-mono text-green-600">{formatAddress(walletAddress)}</p>
            </div>
          </div>
          
          <Button 
            onClick={disconnectWallet}
            variant="outline"
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Connect Wallet</span>
        </CardTitle>
        <CardDescription>
          Connect your Starknet wallet to access Web3 features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            You'll need a Starknet wallet like ArgentX or Braavos to connect
          </p>
          
          <Button 
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          <p>Supported wallets: ArgentX, Braavos</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;
