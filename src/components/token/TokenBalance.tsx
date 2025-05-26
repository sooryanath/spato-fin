
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToken } from '@/contexts/TokenContext';
import { Coins, Lock, Wallet } from 'lucide-react';

const TokenBalance = () => {
  const { balance, isLoading } = useToken();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available $CAT</CardTitle>
          <Wallet className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {balance.available.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Ready to use</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Locked $CAT</CardTitle>
          <Lock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {balance.locked.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">In pending transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total $CAT</CardTitle>
          <Coins className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {balance.total.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total holdings</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenBalance;
