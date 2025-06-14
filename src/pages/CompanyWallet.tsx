
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import TokenBalance from '@/components/token/TokenBalance';
import TokenHistory from '@/components/token/TokenHistory';
import TokenTransfer from '@/components/token/TokenTransfer';

const CompanyWallet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/company')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Wallet</h1>
            <p className="text-gray-600">Manage your $CAT tokens - {user?.organizationName}</p>
          </div>
        </div>

        {/* Token Balance Cards */}
        <TokenBalance />

        {/* Transfer Tokens Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenTransfer />
          
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
              <CardDescription>Your token activity today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Tokens Received</span>
                <span className="text-lg font-bold text-green-600">+₹12,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">Tokens Sent</span>
                <span className="text-lg font-bold text-red-600">-₹8,500</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Net Change</span>
                <span className="text-lg font-bold text-blue-600">+₹3,500</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <TokenHistory />
      </div>
    </DashboardLayout>
  );
};

export default CompanyWallet;
