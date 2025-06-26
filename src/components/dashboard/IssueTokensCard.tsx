
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useWeb3 } from '@/contexts/Web3Context';
import { Database, Zap } from 'lucide-react';

const IssueTokensCard = () => {
  const [issueAmount, setIssueAmount] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const { mintTokens, isLoading, isConnected } = useWeb3();

  const handleIssueTokensDatabase = () => {
    if (!issueAmount || !companyId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and company ID",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tokens Issued Successfully",
      description: `${issueAmount} tokens issued to company ${companyId}`,
    });
    setIssueAmount('');
    setCompanyId('');
  };

  const handleIssueTokensBlockchain = async () => {
    if (!recipientAddress || !issueAmount) {
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

    const mintAmount = parseFloat(issueAmount);
    if (mintAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Validate Starknet address format
    if (!recipientAddress.startsWith('0x') || recipientAddress.length < 63) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Starknet address",
        variant: "destructive",
      });
      return;
    }

    const success = await mintTokens(recipientAddress, mintAmount);
    
    if (success) {
      setRecipientAddress('');
      setIssueAmount('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue New Tokens</CardTitle>
        <CardDescription>Create and distribute tokens to companies</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
              <Badge variant="secondary" className="text-xs">Mock</Badge>
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Blockchain
              <Badge variant="default" className="text-xs">Live</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="database" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company ID</Label>
              <Input
                id="company"
                placeholder="Enter company identifier"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Token Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={issueAmount}
                onChange={(e) => setIssueAmount(e.target.value)}
              />
            </div>
            <Button onClick={handleIssueTokensDatabase} className="w-full">
              Issue Tokens (Database)
            </Button>
          </TabsContent>
          
          <TabsContent value="blockchain" className="space-y-4 mt-4">
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
              <Label htmlFor="blockchainAmount">Token Amount</Label>
              <div className="relative">
                <Input
                  id="blockchainAmount"
                  type="number"
                  placeholder="0.00"
                  value={issueAmount}
                  onChange={(e) => setIssueAmount(e.target.value)}
                  disabled={!isConnected}
                />
                <div className="absolute right-3 top-2.5 text-sm text-gray-500">$CAT</div>
              </div>
            </div>
            
            {!isConnected && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
                Connect your Starknet wallet to mint tokens on the blockchain
              </div>
            )}
            
            <Button 
              onClick={handleIssueTokensBlockchain} 
              className="w-full"
              disabled={isLoading || !isConnected || !recipientAddress || !issueAmount}
            >
              {isLoading ? 'Minting on Blockchain...' : 'Issue Tokens (Blockchain)'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IssueTokensCard;
