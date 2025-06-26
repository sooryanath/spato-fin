
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWeb3 } from '@/contexts/Web3Context';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Coins, Wallet, ExternalLink } from 'lucide-react';

const BlockchainTokenMint = () => {
  const { mintTokens, isLoading, isConnected, address } = useWeb3();
  const { user } = useAuth();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  if (user?.role !== 'bank') {
    return null; // Only show for bank users
  }

  const handleMint = async () => {
    if (!recipientAddress || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter recipient address and amount to mint",
        variant: "destructive",
      });
      return;
    }

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Starknet wallet first",
        variant: "destructive",
      });
      return;
    }

    const mintAmount = parseFloat(amount);
    if (mintAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate Starknet address format (basic validation)
    if (!recipientAddress.startsWith('0x') || recipientAddress.length < 63) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Starknet address",
        variant: "destructive",
      });
      return;
    }

    const txHash = await mintTokens(recipientAddress, mintAmount);
    
    if (txHash) {
      setTransactionHash(txHash);
      setRecipientAddress('');
      setAmount('');
    }
  };

  const handleViewTransaction = () => {
    if (transactionHash) {
      window.open(`https://sepolia.starkscan.co/tx/${transactionHash}`, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5" />
          <span>Mint $CAT Tokens (Blockchain)</span>
        </CardTitle>
        <CardDescription>
          Create new $CAT tokens on the Starknet blockchain (Bank privilege only)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <Wallet className="h-4 w-4" />
              <span className="font-medium">Wallet Connection Required</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              Connect your Starknet wallet to mint tokens on the blockchain
            </p>
          </div>
        )}

        {isConnected && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800">
              <Wallet className="h-4 w-4" />
              <span className="font-medium">Wallet Connected</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Connected to: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="recipientAddress">Recipient Address</Label>
          <Input
            id="recipientAddress"
            placeholder="0x..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            disabled={!isConnected}
          />
          <p className="text-xs text-gray-500">
            Enter the Starknet address of the token recipient
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mintAmount">Amount to Mint</Label>
          <div className="relative">
            <Input
              id="mintAmount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isConnected}
            />
            <div className="absolute right-3 top-2.5 text-sm text-gray-500">$CAT</div>
          </div>
        </div>

        <Button 
          onClick={handleMint} 
          className="w-full"
          disabled={isLoading || !isConnected || !recipientAddress || !amount}
        >
          {isLoading ? 'Minting on Blockchain...' : 'Mint Tokens'}
        </Button>

        {transactionHash && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-800">Transaction Successful</p>
                <p className="text-sm text-blue-600">
                  Hash: {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewTransaction}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Contract: 0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d</p>
          <p>• Network: Starknet Sepolia Testnet</p>
          <p>• Gas fees will be deducted from your wallet</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainTokenMint;
