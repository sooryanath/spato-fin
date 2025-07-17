
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TokenBalance from '@/components/token/TokenBalance';
import TokenTransfer from '@/components/token/TokenTransfer';
import TokenHistory from '@/components/token/TokenHistory';
import TokenMint from '@/components/token/TokenMint';
import VendorProfile from '@/components/vendor/VendorProfile';

const Profile = () => {
  const { user } = useAuth();

  // Render vendor-specific profile for vendors
  if (user?.role === 'vendor') {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Vendor Profile</h1>
          <VendorProfile />
        </div>
      </DashboardLayout>
    );
  }

  // Default profile for banks and companies
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        {/* User Details */}
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-lg">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Organization</p>
                <p className="text-lg">{user?.organizationName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <p className="text-lg capitalize">{user?.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Balance */}
        <div>
          <h2 className="text-2xl font-bold mb-4">$CAT Token Portfolio</h2>
          <TokenBalance />
        </div>

        {/* Token Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenTransfer />
          {user?.role === 'bank' && <TokenMint />}
        </div>

        {/* Token History */}
        <TokenHistory />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
