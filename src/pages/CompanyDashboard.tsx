
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Building, Banknote, Users, TrendingDown } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [transferAmount, setTransferAmount] = useState('');
  const [vendorId, setVendorId] = useState('');

  const handleTransferTokens = () => {
    if (!transferAmount || !vendorId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and vendor ID",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tokens Transferred Successfully",
      description: `${transferAmount} tokens transferred to vendor ${vendorId}`,
    });
    setTransferAmount('');
    setVendorId('');
  };

  const stats = [
    {
      title: "Available Token Balance",
      value: "₹85,000",
      change: "-₹15,000",
      icon: Banknote,
    },
    {
      title: "Active Vendors",
      value: "12",
      change: "+2",
      icon: Users,
    },
    {
      title: "Tokens Transferred",
      value: "₹1,20,000",
      change: "+₹25,000",
      icon: ArrowRight,
    },
    {
      title: "Pending Invoices",
      value: "8",
      change: "-3",
      icon: Building,
    },
  ];

  const vendors = [
    { id: 'V001', name: 'Global Supplies Ltd', pendingAmount: '₹15,000', status: 'Active' },
    { id: 'V002', name: 'Tech Components Inc', pendingAmount: '₹8,500', status: 'Active' },
    { id: 'V003', name: 'Raw Materials Co', pendingAmount: '₹22,000', status: 'Pending' },
  ];

  const recentTransfers = [
    { id: '1', vendor: 'Global Supplies Ltd', amount: '₹15,000', date: '2024-01-15', status: 'Completed' },
    { id: '2', vendor: 'Tech Components Inc', amount: '₹8,500', date: '2024-01-14', status: 'Completed' },
    { id: '3', vendor: 'Raw Materials Co', amount: '₹12,000', date: '2024-01-13', status: 'Processing' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name} from {user?.organizationName}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transfer Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Tokens</CardTitle>
              <CardDescription>Send tokens to your vendors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor ID</Label>
                <Input
                  id="vendor"
                  placeholder="Enter vendor identifier"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Token Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleTransferTokens} className="w-full">
                Transfer Tokens
              </Button>
            </CardContent>
          </Card>

          {/* Vendor List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Vendors</CardTitle>
              <CardDescription>Manage your vendor relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{vendor.pendingAmount}</p>
                      <p className={`text-sm ${vendor.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>
                        {vendor.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transfers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Token Transfers</CardTitle>
            <CardDescription>Your latest token transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{transfer.vendor}</p>
                      <p className="text-sm text-gray-600">{transfer.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">{transfer.amount}</p>
                    <p className={`text-sm ${transfer.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                      {transfer.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
