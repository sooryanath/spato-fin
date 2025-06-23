
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToken } from '@/contexts/TokenContext';
import { Coins, Link, Unlink, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Web3TokenBalance = () => {
  const { isConnected, tokenContract, walletAddress } = useWeb3();
  const { balance } = useToken();
  const [web3Balance, setWeb3Balance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchWeb3Balance = async () => {
    if (!tokenContract || !walletAddress) return;
    
    setIsLoading(true);
    try {
      const result = await tokenContract.balanceOf(walletAddress);
      // Convert from Uint256 to number (assuming 18 decimals)
      const balanceValue = parseInt(result.balance.low) / Math.pow(10, 18);
      setWeb3Balance(balanceValue);
    } catch (error) {
      console.error('Failed to fetch Web3 balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blockchain balance",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && tokenContract) {
      fetchWeb3Balance();
    }
  }, [isConnected, tokenContract, walletAddress]);

  const syncBalances = async () => {
    setIsSyncing(true);
    try {
      // This would sync database balance with blockchain balance
      // Implementation depends on your business logic
      await fetchWeb3Balance();
      
      toast({
        title: "Balances Synced",
        description: "Database and blockchain balances have been synchronized",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize balances",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Unlink className="h-5 w-5 text-gray-400" />
            <span>Web3 Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Connect your wallet to view blockchain balances
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link className="h-5 w-5 text-blue-600" />
              <span>Hybrid Token Balance</span>
            </div>
            <Button
              onClick={fetchWeb3Balance}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Database Balance */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Database Balance</span>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {balance.available.toLocaleString()} $CAT
              </p>
              <p className="text-xs text-blue-600">Off-chain balance</p>
            </div>

            {/* Blockchain Balance */}
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Blockchain Balance</span>
              </div>
              <p className="text-xl font-bold text-green-600">
                {web3Balance.toLocaleString()} $CAT
              </p>
              <p className="text-xs text-green-600">On-chain balance</p>
            </div>
          </div>

          {/* Sync Actions */}
          <div className="mt-4 pt-4 border-t">
            <Button
              onClick={syncBalances}
              disabled={isSyncing}
              className="w-full"
              variant="outline"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Sync Balances
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Web3TokenBalance;
