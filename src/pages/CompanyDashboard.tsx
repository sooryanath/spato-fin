
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Building, Banknote, Users, TrendingDown, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import RequestCATCard from '@/components/dashboard/RequestCATCard';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const handleResolveDispute = (disputeId: string) => {
    toast({
      title: "Dispute Resolution Initiated",
      description: `Resolution process started for dispute #${disputeId}`,
    });
  };

  const recentTransfers = [
    { id: '1', vendor: 'Global Supplies Ltd', amount: '₹15,000', date: '2024-01-15', status: 'Completed' },
    { id: '2', vendor: 'Tech Components Inc', amount: '₹8,500', date: '2024-01-14', status: 'Completed' },
    { id: '3', vendor: 'Raw Materials Co', amount: '₹12,000', date: '2024-01-13', status: 'Processing' },
  ];

  const disputes = [
    { id: 'D001', subVendor: 'Electronic Parts Ltd', bank: 'HDFC Bank', amount: '₹25,000', date: '2024-05-12', status: 'Open' },
    { id: 'D002', subVendor: 'Logistics Partners Inc', bank: 'ICICI Bank', amount: '₹18,500', date: '2024-05-10', status: 'Open' },
    { id: 'D003', subVendor: 'Manufacturing Solutions', bank: 'SBI', amount: '₹32,000', date: '2024-05-05', status: 'Under Review' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name} from {user?.organizationName}</p>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/company/wallet')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Token Balance</p>
                  <p className="text-2xl font-bold text-gray-900">₹85,000</p>
                  <p className="text-sm font-medium text-red-600">-₹15,000</p>
                </div>
                <div className="flex flex-col items-center">
                  <Banknote className="h-8 w-8 text-blue-600" />
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/company/vendors')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm font-medium text-green-600">+2</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tokens Transferred</p>
                  <p className="text-2xl font-bold text-gray-900">₹1,20,000</p>
                  <p className="text-sm font-medium text-green-600">+₹25,000</p>
                </div>
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/company/invoices')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm font-medium text-red-600">-3</p>
                </div>
                <div className="flex flex-col items-center">
                  <Building className="h-8 w-8 text-blue-600" />
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
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

          {/* Quick Vendor Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Vendor Overview</CardTitle>
              <CardDescription>Top vendors by recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Global Supplies Ltd', amount: '₹15,000', status: 'Active' },
                  { name: 'Tech Components Inc', amount: '₹8,500', status: 'Active' },
                  { name: 'Raw Materials Co', amount: '₹22,000', status: 'Pending' }
                ].map((vendor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-gray-600">Pending: {vendor.amount}</p>
                    </div>
                    <span className={`text-sm ${vendor.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>
                      {vendor.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/company/vendors')}
              >
                View All Vendors
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Request CAT Section */}
        <RequestCATCard />

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
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/company/wallet')}
            >
              View Full Transaction History
            </Button>
          </CardContent>
        </Card>
        
        {/* Dispute Resolution */}
        <Card>
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
            <CardDescription>Manage active loan disputes with banks and vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Sub-Vendor</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell>{dispute.id}</TableCell>
                    <TableCell>{dispute.subVendor}</TableCell>
                    <TableCell>{dispute.bank}</TableCell>
                    <TableCell>{dispute.amount}</TableCell>
                    <TableCell>{dispute.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        dispute.status === 'Open' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {dispute.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleResolveDispute(dispute.id)}
                      >
                        Resolve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
