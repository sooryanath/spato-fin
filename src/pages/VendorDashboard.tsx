
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Banknote, ArrowRight, Building, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [redeemAmount, setRedeemAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [subVendorId, setSubVendorId] = useState('');

  const handleRedeemTokens = () => {
    if (!redeemAmount) {
      toast({
        title: "Missing Information",
        description: "Please enter redeem amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Loan Request Submitted",
      description: `Request to redeem ${redeemAmount} tokens for loan submitted to bank`,
    });
    setRedeemAmount('');
  };

  const handleTransferToSubVendor = () => {
    if (!transferAmount || !subVendorId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and sub-vendor ID",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tokens Transferred",
      description: `${transferAmount} tokens transferred to sub-vendor ${subVendorId}`,
    });
    setTransferAmount('');
    setSubVendorId('');
  };

  const stats = [
    {
      title: "Available Token Balance",
      value: "₹45,000",
      change: "+₹12,000",
      icon: Banknote,
    },
    {
      title: "Tokens Redeemed",
      value: "₹28,000",
      change: "+₹5,000",
      icon: Building,
    },
    {
      title: "Sub-Vendors",
      value: "6",
      change: "+1",
      icon: ArrowRight,
    },
    {
      title: "Active Loans",
      value: "₹15,000",
      change: "Current",
      icon: TrendingUp,
    },
  ];

  const tokenHistory = [
    { id: '1', type: 'Received', from: 'TechCorp Industries', amount: '₹15,000', date: '2024-01-15' },
    { id: '2', type: 'Transferred', to: 'Sub Vendor A', amount: '₹8,000', date: '2024-01-14' },
    { id: '3', type: 'Redeemed', from: 'Bank Loan', amount: '₹10,000', date: '2024-01-13' },
  ];

  const subVendors = [
    { id: 'SV001', name: 'Local Supplier A', balance: '₹5,000', status: 'Active' },
    { id: 'SV002', name: 'Raw Material Supplier', balance: '₹3,200', status: 'Active' },
    { id: 'SV003', name: 'Logistics Partner', balance: '₹1,800', status: 'Pending' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
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
                    <p className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
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
          {/* Redeem Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Redeem Tokens for Loan</CardTitle>
              <CardDescription>Exchange tokens for bank financing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="redeem-amount">Redeem Amount</Label>
                <Input
                  id="redeem-amount"
                  type="number"
                  placeholder="Enter amount to redeem"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleRedeemTokens} className="w-full bg-green-600 hover:bg-green-700">
                Request Loan
              </Button>
            </CardContent>
          </Card>

          {/* Transfer to Sub-Vendors */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer to Sub-Vendors</CardTitle>
              <CardDescription>Distribute tokens to your suppliers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sub-vendor">Sub-Vendor ID</Label>
                <Input
                  id="sub-vendor"
                  placeholder="Enter sub-vendor ID"
                  value={subVendorId}
                  onChange={(e) => setSubVendorId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transfer-amount">Transfer Amount</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleTransferToSubVendor} className="w-full">
                Transfer Tokens
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token History */}
          <Card>
            <CardHeader>
              <CardTitle>Token History</CardTitle>
              <CardDescription>Your recent token activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tokenHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-gray-600">
                        {item.from && `From: ${item.from}`}
                        {item.to && `To: ${item.to}`}
                      </p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${item.type === 'Received' ? 'text-green-600' : item.type === 'Transferred' ? 'text-blue-600' : 'text-purple-600'}`}>
                        {item.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sub-Vendors */}
          <Card>
            <CardHeader>
              <CardTitle>Your Sub-Vendors</CardTitle>
              <CardDescription>Suppliers in your network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{vendor.balance}</p>
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
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
