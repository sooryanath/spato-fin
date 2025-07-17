import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TokenBalance from '@/components/token/TokenBalance';
import TokenTransfer from '@/components/token/TokenTransfer';
import TokenHistory from '@/components/token/TokenHistory';
import GSTNVerificationCard from './GSTNVerificationCard';
import FinancialProfileCard from './FinancialProfileCard';
import IntegrationStatusDashboard from './IntegrationStatusDashboard';
import AAIntegrationWrapper from './AAIntegrationWrapper';

const VendorProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* User Details */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Integration Status Dashboard */}
      <IntegrationStatusDashboard />

      <Separator />

      {/* Verification & Compliance Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Verification & Compliance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GSTNVerificationCard />
          <FinancialProfileCard />
        </div>
      </div>

      <Separator />

      {/* Account Aggregator Integration */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Banking & Financial Data</h2>
        <AAIntegrationWrapper />
      </div>

      <Separator />

      {/* Token Portfolio */}
      <div>
        <h2 className="text-2xl font-bold mb-4">$CAT Token Portfolio</h2>
        <TokenBalance />
      </div>

      {/* Token Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TokenTransfer />
      </div>

      {/* Token History */}
      <TokenHistory />
    </div>
  );
};

export default VendorProfile;