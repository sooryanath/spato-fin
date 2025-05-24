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
import CompanySelectDropdown from '@/components/CompanySelectDropdown';
import { subVendorCompanies } from '@/data/mockCompanies';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedSubVendorId, setSelectedSubVendorId] = useState('');

  const handleTransferTokens = () => {
    if (!transferAmount || !selectedSubVendorId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and vendor ID",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tokens Transferred Successfully",
      description: `${transferAmount} tokens transferred to vendor ${selectedSubVendorId}`,
    });
    setTransferAmount('');
    setSelectedSubVendorId('');
  };

  const handleResolveDispute = (disputeId: string) => {
    toast({
      title: "Dispute Resolution Initiated",
      description: `Resolution process started for dispute #${disputeId}`,
    });
  };

  const stats = [
    {
      title: "Available Token Balance",
      value: "₹65,000",
      change: "-₹5,000",
      icon: Banknote,
    },
    {
      title: "Active Sub-Vendors",
      value: "8",
      change: "+1",
      icon: Users,
    },
    {
      title: "Tokens Received",
      value: "₹80,000",
      change: "+₹10,000",
      icon: ArrowRight,
    },
    {
      title: "Pending Payments",
      value: "5",
      change: "-2",
      icon: Building,
    },
  ];

  const subVendors = [
    { id: 'SV001', name: 'Electronic Parts Ltd', pendingAmount: '₹12,000', status: 'Active' },
    { id: 'SV002', name: 'Packaging Solutions', pendingAmount: '₹6,500', status: 'Active' },
    { id: 'SV003', name: 'Manufacturing Materials', pendingAmount: '₹18,000', status: 'Pending' },
  ];

  const recentTransactions = [
    { id: '1', subVendor: 'Electronic Parts Ltd', amount: '₹12,000', date: '2024-01-15', status: 'Completed' },
    { id: '2', subVendor: 'Packaging Solutions', amount: '₹6,500', date: '2024-01-14', status: 'Completed' },
    { id: '3', subVendor: 'Manufacturing Materials', amount: '₹9,000', date: '2024-01-13', status: 'Processing' },
  ];

  const disputes = [
    { id: 'D001', company: 'TechCorp Industries', bank: 'HDFC Bank', amount: '₹20,000', date: '2024-05-12', status: 'Open' },
    { id: 'D002', company: 'Innovative Solutions Ltd', bank: 'ICICI Bank', amount: '₹15,000', date: '2024-05-10', status: 'Open' },
    { id: 'D003', company: 'Global Enterprises Inc', bank: 'SBI', amount: '₹28,000', date: '2024-05-05', status: 'Under Review' }
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
          {/* Transfer CAT to Sub-Vendors */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer CAT to Sub-Vendors</CardTitle>
              <CardDescription>Send Credit Access Tokens to your sub-vendors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subvendor">Sub-Vendor ID</Label>
                <CompanySelectDropdown
                  options={subVendorCompanies}
                  value={selectedSubVendorId}
                  onValueChange={setSelectedSubVendorId}
                  placeholder="Select sub-vendor"
                  showAddress={true}
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

          {/* Sub-Vendor List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Sub-Vendors</CardTitle>
              <CardDescription>Manage your sub-vendor relationships</CardDescription>
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
        
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Token Transactions</CardTitle>
            <CardDescription>Your latest token transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{transfer.subVendor}</p>
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
        
        {/* Dispute Resolution */}
        <Card>
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
            <CardDescription>Manage active loan disputes with companies and banks</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Company</TableHead>
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
                    <TableCell>{dispute.company}</TableCell>
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

export default VendorDashboard;
