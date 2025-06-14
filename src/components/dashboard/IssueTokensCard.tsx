
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const IssueTokensCard = () => {
  const [issueAmount, setIssueAmount] = useState('');
  const [companyId, setCompanyId] = useState('');

  const handleIssueTokens = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue New Tokens</CardTitle>
        <CardDescription>Create and distribute tokens to companies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <Button onClick={handleIssueTokens} className="w-full">
          Issue Tokens
        </Button>
      </CardContent>
    </Card>
  );
};

export default IssueTokensCard;
