
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToken } from '@/contexts/TokenContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Coins } from 'lucide-react';

const TokenMint = () => {
  const { mintTokens, isLoading } = useToken();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  if (user?.role !== 'bank') {
    return null; // Only show for bank users
  }

  const handleMint = async () => {
    if (!amount) {
      toast({
        title: "Missing Information",
        description: "Please enter amount to mint",
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

    const success = await mintTokens(mintAmount, description || undefined);
    
    if (success) {
      toast({
        title: "Tokens Minted Successfully",
        description: `${mintAmount} $CAT tokens have been minted`,
      });
      setAmount('');
      setDescription('');
    } else {
      toast({
        title: "Mint Failed",
        description: "Unable to mint tokens",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5" />
          <span>Mint $CAT Tokens</span>
        </CardTitle>
        <CardDescription>
          Create new $CAT tokens (Bank privilege only)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label htmlFor="mintDescription">Description (Optional)</Label>
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
          disabled={isLoading || !amount}
        >
          {isLoading ? 'Minting...' : 'Mint Tokens'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenMint;
