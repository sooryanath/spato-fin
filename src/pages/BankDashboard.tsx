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
import { syndicateCompanies } from '@/data/mockCompanies';

const BankDashboard = () => {
  const { user } = useAuth();
  const [transferAmount, setTransferAmount] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

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
          <h1 className="text-3xl font-bold text-gray-900">Bank Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name} from {user?.organizationName}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Issue New Tokens Card */}
          <Card>
            <CardHeader>
              <CardTitle>Issue New Tokens</CardTitle>
              <CardDescription>Create Credit Access Tokens (CAT) for syndicate companies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Syndicate Company</Label>
                <CompanySelectDropdown
                  options={syndicateCompanies}
                  value={selectedCompanyId}
                  onValueChange={setSelectedCompanyId}
                  placeholder="Select syndicate company"
                  showAddress={true}
                />
              </div>
              
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
        
        {/* Active Loans */}
        <Card>
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Overview of active loans issued by your bank</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Global Supplies Ltd</TableCell>
                  <TableCell>₹50,000</TableCell>
                  <TableCell>8.5%</TableCell>
                  <TableCell>2024-08-15</TableCell>
                  <TableCell className="font-medium">Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tech Components Inc</TableCell>
                  <TableCell>₹75,000</TableCell>
                  <TableCell>9.0%</TableCell>
                  <TableCell>2024-09-01</TableCell>
                  <TableCell className="font-medium">Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Disputed Loans */}
        <Card>
          <CardHeader>
            <CardTitle>Disputed Loans</CardTitle>
            <CardDescription>Manage and resolve loan disputes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Raw Materials Co</TableCell>
                  <TableCell>₹22,000</TableCell>
                  <TableCell>Invoice Discrepancy</TableCell>
                  <TableCell className="font-medium">Open</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BankDashboard;
