
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Transaction {
  id: string;
  company: string;
  amount: string;
  type: 'Issued' | 'Redeemed';
  date: string;
}

const RecentTransactionsCard: React.FC = () => {
  const recentTransactions: Transaction[] = [
    { id: '1', company: 'TechCorp Industries', amount: '₹50,000', type: 'Issued', date: '2024-01-15' },
    { id: '2', company: 'Global Manufacturing', amount: '₹25,000', type: 'Issued', date: '2024-01-14' },
    { id: '3', company: 'Supply Chain Ltd', amount: '₹15,000', type: 'Redeemed', date: '2024-01-13' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest token activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{transaction.company}</p>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{transaction.amount}</p>
                <p className={`text-sm ${transaction.type === 'Issued' ? 'text-green-600' : 'text-blue-600'}`}>
                  {transaction.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;
