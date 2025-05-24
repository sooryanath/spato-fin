
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import CompanySelectDropdown from '@/components/CompanySelectDropdown';

const IssueTokensCard: React.FC = () => {
  const [issueAmount, setIssueAmount] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleIssueTokens = () => {
    if (!issueAmount || !companyId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and select a company",
        variant: "destructive",
      });
      return;
    }

    // Simulate token issuance
    toast({
      title: "Tokens Issued Successfully",
      description: `${issueAmount} tokens issued to ${companyName} (${companyId})`,
    });
    setIssueAmount('');
    setCompanyId('');
    setCompanyName('');
  };

  const handleSelectCompany = (id: string, name: string) => {
    setCompanyId(id);
    setCompanyName(name);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue New Tokens</CardTitle>
        <CardDescription>Create and distribute tokens to companies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Select Syndicate Company</Label>
          <CompanySelectDropdown onSelect={handleSelectCompany} />
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
