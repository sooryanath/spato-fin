
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToken } from '@/contexts/TokenContext';
import { ArrowDownLeft, ArrowUpRight, Coins, Flame } from 'lucide-react';
import { format } from 'date-fns';

const TokenHistory = () => {
  const { transactions } = useToken();

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'mint':
        return <Coins className="h-4 w-4 text-blue-500" />;
      case 'burn':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return <Coins className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAmountDisplay = (transaction: any) => {
    const sign = transaction.type === 'transfer' ? '-' : '+';
    const color = transaction.type === 'transfer' ? 'text-red-600' : 'text-green-600';
    
    return (
      <span className={`font-medium ${color}`}>
        {sign}{transaction.amount.toLocaleString()} $CAT
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your $CAT token transaction history</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>From/To</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="flex items-center space-x-2">
                  {getTransactionIcon(transaction.type)}
                  <span className="capitalize">{transaction.type}</span>
                </TableCell>
                <TableCell>{getAmountDisplay(transaction)}</TableCell>
                <TableCell>
                  {transaction.from || transaction.to || 'System'}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {format(transaction.timestamp, 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TokenHistory;
