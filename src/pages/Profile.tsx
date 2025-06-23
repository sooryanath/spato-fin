
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TokenBalance from '@/components/token/TokenBalance';
import TokenTransfer from '@/components/token/TokenTransfer';
import TokenHistory from '@/components/token/TokenHistory';
import TokenMint from '@/components/token/TokenMint';

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

        {/* Token Balance */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">$CAT Token Portfolio</h2>
          <TokenBalance />
        </div>

        {/* Token Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenTransfer />
          <TokenMint />
        </div>

        {/* Token History */}
        <TokenHistory />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
