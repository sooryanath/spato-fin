
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatsGrid from '@/components/dashboard/StatsGrid';
import IssueTokensCard from '@/components/dashboard/IssueTokensCard';
import RecentTransactionsCard from '@/components/dashboard/RecentTransactionsCard';
import ActiveLoansCard from '@/components/dashboard/ActiveLoansCard';
import DisputedLoansCard from '@/components/dashboard/DisputedLoansCard';
import CATRequestsCard from '@/components/dashboard/CATRequestsCard';
import WalletConnectButton from '@/components/wallet/WalletConnectButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Shield } from 'lucide-react';

const BankDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bank Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name} from {user?.organizationName}</p>
        </div>

        {/* Web3 Connection Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Shield className="h-5 w-5" />
              Web3 Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 mb-2">
                  Connect your Starknet wallet to access blockchain features
                </p>
                <p className="text-sm text-blue-600">
                  Enable token minting, transfers, and real-time blockchain monitoring
                </p>
              </div>
              <WalletConnectButton size="lg" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Credit Access Token (CAT) Requests Section - Moved above Recent Transactions */}
        <CATRequestsCard />

        {/* Two Column Layout for Token Issuance and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IssueTokensCard />
          <RecentTransactionsCard />
        </div>

        {/* Active Loans Section */}
        <ActiveLoansCard />

        {/* Disputed Loans Section */}
        <DisputedLoansCard />
      </div>
    </DashboardLayout>
  );
};

export default BankDashboard;
