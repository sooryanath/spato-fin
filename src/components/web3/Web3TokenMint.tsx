
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToken } from '@/contexts/TokenContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Coins, Zap } from 'lucide-react';

const Web3TokenMint = () => {
  const { isConnected, tokenContract, account } = useWeb3();
  const { mintTokens } = useToken();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [useBlockchain, setUseBlockchain] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  if (user?.role !== 'bank') {
    return null;
  }

  const handleMint = async () => {
    if (!amount || !recipient) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and recipient",
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

    setIsMinting(true);

    try {
      if (useBlockchain && isConnected && tokenContract && account) {
        // Mint on blockchain
        const amountBN = {
          low: mintAmount * Math.pow(10, 18), // Convert to 18 decimals
          high: 0
        };

        const tx = await tokenContract.mint(recipient, amountBN);
        await account.waitForTransaction(tx.transaction_hash);

        toast({
          title: "Blockchain Mint Successful",
          description: `${mintAmount} $CAT tokens minted on blockchain`,
        });
      } else {
        // Mint in database only
        const success = await mintTokens(mintAmount, description || undefined);
        
        if (success) {
          toast({
            title: "Database Mint Successful",
            description: `${mintAmount} $CAT tokens minted in database`,
          });
        } else {
          throw new Error('Database mint failed');
        }
      }

      setAmount('');
      setRecipient('');
      setDescription('');
    } catch (error) {
      console.error('Mint failed:', error);
      toast({
        title: "Mint Failed",
        description: "Unable to mint tokens",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5" />
          <span>Web3 Token Mint</span>
        </CardTitle>
        <CardDescription>
          Mint $CAT tokens on blockchain or database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Blockchain Toggle */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Mint on Blockchain</span>
          </div>
          <Switch
            checked={useBlockchain}
            onCheckedChange={setUseBlockchain}
            disabled={!isConnected}
          />
        </div>

        {useBlockchain && !isConnected && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Connect your wallet to mint tokens on blockchain
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder={useBlockchain ? "0x..." : "Profile ID"}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
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
            />
            <div className="absolute right-3 top-2.5 text-sm text-gray-500">$CAT</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mintDescription">Description</Label>
          <Input
            id="mintDescription"
            placeholder="Reason for minting"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleMint} 
          className="w-full"
          disabled={isMinting || !amount || !recipient}
        >
          {isMinting ? 'Minting...' : `Mint on ${useBlockchain ? 'Blockchain' : 'Database'}`}
        </Button>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Database minting: Instant, centralized control</p>
          <p>• Blockchain minting: Decentralized, requires gas fees</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Web3TokenMint;
