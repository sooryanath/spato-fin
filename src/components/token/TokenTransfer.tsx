
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToken } from '@/contexts/TokenContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const TokenTransfer = () => {
  const { transferTokens, balance, isLoading } = useToken();
  const { user } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter recipient and amount",
        variant: "destructive",
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0 || transferAmount > balance.available) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between 1 and ${balance.available}`,
        variant: "destructive",
      });
      return;
    }

    const success = await transferTokens(recipient, transferAmount, description || undefined);
    
    if (success) {
      toast({
        title: "Transfer Successful",
        description: `${transferAmount} $CAT sent to ${recipient}`,
      });
      setRecipient('');
      setAmount('');
      setDescription('');
    } else {
      toast({
        title: "Transfer Failed",
        description: "Insufficient balance or invalid recipient",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="h-5 w-5" />
          <span>Transfer $CAT Tokens</span>
        </CardTitle>
        <CardDescription>
          Send $CAT tokens to other users or vendors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            id="recipient"
            placeholder="Enter recipient address or ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={balance.available}
            />
            <div className="absolute right-3 top-2.5 text-sm text-gray-500">$CAT</div>
          </div>
          <p className="text-xs text-gray-500">
            Available: {balance.available.toLocaleString()} $CAT
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Payment description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleTransfer} 
          className="w-full"
          disabled={isLoading || !recipient || !amount}
        >
          {isLoading ? 'Processing...' : 'Send Tokens'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TokenTransfer;
