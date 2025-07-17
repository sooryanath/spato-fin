import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, CheckCircle, IndianRupee } from 'lucide-react';

interface BankAccount {
  id: string;
  account_id: string;
  bank_name: string;
  account_type: string;
  account_number_masked: string;
  balance: number;
  last_transaction_date: string;
  is_active: boolean;
}

interface BankConnectionCardProps {
  account: BankAccount;
}

const BankConnectionCard = ({ account }: BankConnectionCardProps) => {
  const getBankLogo = (name: string) => {
    // Mock bank logos - in real implementation, these would be actual bank logos
    const logos: Record<string, string> = {
      'State Bank of India': '🏛️',
      'HDFC Bank': '🏢',
      'ICICI Bank': '🏦',
      'Axis Bank': '🏧',
      'Kotak Mahindra Bank': '🏪',
      'Punjab National Bank': '🏛️'
    };
    return logos[name] || '🏦';
  };

  const formatBalance = (balance: number) => {
    if (balance >= 100000) {
      return `₹${(balance / 100000).toFixed(1)}L`;
    } else if (balance >= 1000) {
      return `₹${(balance / 1000).toFixed(0)}K`;
    }
    return `₹${balance.toFixed(0)}`;
  };

  return (
    <Card className="bg-muted/30 border border-muted">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getBankLogo(account.bank_name)}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{account.bank_name}</span>
                {account.is_active && <CheckCircle className="h-3 w-3 text-green-600" />}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" />
                <span>{account.account_type} • {account.account_number_masked}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-medium mb-1">
              <IndianRupee className="h-3 w-3" />
              <span>{formatBalance(account.balance)}</span>
            </div>
            <Badge variant={account.is_active ? "default" : "secondary"} className="text-xs">
              {account.is_active ? "Active" : "Inactive"}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3" />
              <span>Last: {new Date(account.last_transaction_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankConnectionCard;