
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatsGrid from '@/components/dashboard/StatsGrid';
import IssueTokensCard from '@/components/dashboard/IssueTokensCard';
import RecentTransactionsCard from '@/components/dashboard/RecentTransactionsCard';
import ActiveLoansCard from '@/components/dashboard/ActiveLoansCard';
import DisputedLoansCard from '@/components/dashboard/DisputedLoansCard';
import CATRequestsCard from '@/components/dashboard/CATRequestsCard';

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

        {/* Stats Grid */}
        <StatsGrid />

        {/* Two Column Layout for Token Issuance and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IssueTokensCard />
          <RecentTransactionsCard />
        </div>

        {/* Active Loans Section */}
        <ActiveLoansCard />

        {/* Disputed Loans Section */}
        <DisputedLoansCard />

        {/* Credit Access Token (CAT) Requests Section */}
        <CATRequestsCard />
      </div>
    </DashboardLayout>
  );
};

export default BankDashboard;
