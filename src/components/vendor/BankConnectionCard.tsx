import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, CheckCircle } from 'lucide-react';

interface BankConnectionCardProps {
  bankName: string;
  lastSync?: string;
  accountsCount?: number;
}

const BankConnectionCard = ({ 
  bankName, 
  lastSync = new Date().toISOString(),
  accountsCount = Math.floor(Math.random() * 3) + 1 
}: BankConnectionCardProps) => {
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

  return (
    <Card className="bg-muted/30 border border-muted">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getBankLogo(bankName)}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{bankName}</span>
                <CheckCircle className="h-3 w-3 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" />
                <span>{accountsCount} account{accountsCount > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-xs">Active</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3" />
              <span>Synced {new Date(lastSync).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankConnectionCard;