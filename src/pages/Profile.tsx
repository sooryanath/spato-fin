
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TokenBalance from '@/components/token/TokenBalance';
import TokenTransfer from '@/components/token/TokenTransfer';
import TokenHistory from '@/components/token/TokenHistory';
import TokenMint from '@/components/token/TokenMint';
import WalletConnection from '@/components/web3/WalletConnection';
import Web3TokenBalance from '@/components/web3/Web3TokenBalance';
import Web3TokenMint from '@/components/web3/Web3TokenMint';

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        
        {/* User Details */}
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Organization</p>
                <p className="text-lg">{user?.organizationName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-lg">{user?.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Web3 Wallet Connection */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Web3 Integration</h2>
          <WalletConnection />
        </div>

        {/* Token Balance - Traditional and Web3 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">$CAT Token Portfolio</h2>
          <div className="space-y-4">
            <TokenBalance />
            <Web3TokenBalance />
          </div>
        </div>

        {/* Token Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenTransfer />
          <div className="space-y-4">
            <TokenMint />
            <Web3TokenMint />
          </div>
        </div>

        {/* Token History */}
        <TokenHistory />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
