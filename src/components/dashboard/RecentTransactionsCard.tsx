
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  company: string;
  amount: string;
  type: string;
  date: string;
}

const RecentTransactionsCard = () => {
  const navigate = useNavigate();

  const recentTransactions: Transaction[] = [
    { id: '1', company: 'TechCorp Industries', amount: '₹50,000', type: 'Issued', date: '2024-01-15' },
    { id: '2', company: 'Global Manufacturing', amount: '₹25,000', type: 'Issued', date: '2024-01-14' },
    { id: '3', company: 'Supply Chain Ltd', amount: '₹15,000', type: 'Redeemed', date: '2024-01-13' },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest token activities</CardDescription>
          </div>
        </div>
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
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/token-explorer')}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Explorer</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;
