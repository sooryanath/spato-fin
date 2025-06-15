import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Banknote, ArrowRight, Building, TrendingUp, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VendorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [redeemAmount, setRedeemAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [subVendorId, setSubVendorId] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');

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
    setSelectedVendor('');
  };

  const handleRepayLoan = (loanId: string, amount: string) => {
    toast({
      title: "Loan Repayment Initiated",
      description: `Repayment for loan #${loanId} of amount ${amount} initiated`,
    });
  };

  const stats = [
    {
      title: "Available Token Balance",
      value: "₹45,000",
      change: "+₹12,000",
      icon: Banknote,
      onClick: () => navigate('/vendor/wallet'),
      isClickable: true,
    },
    {
      title: "Tokens Redeemed",
      value: "₹28,000",
      change: "+₹5,000",
      icon: Building,
      onClick: () => navigate('/vendor/wallet'),
      isClickable: true,
    },
    {
      title: "Sub-Vendors",
      value: "6",
      change: "+1",
      icon: ArrowRight,
      onClick: () => navigate('/vendor/sub-vendors'),
      isClickable: true,
    },
    {
      title: "Active Loans",
      value: "₹15,000",
      change: "Current",
      icon: TrendingUp,
      onClick: () => navigate('/vendor/loans'),
      isClickable: true,
    },
  ];

  const tokenHistory = [
    { id: '1', type: 'Received', from: 'TechCorp Industries', amount: '₹15,000', date: '2024-01-15' },
    { id: '2', type: 'Transferred', to: 'Sub Vendor A', amount: '₹8,000', date: '2024-01-14' },
    { id: '3', type: 'Redeemed', from: 'Bank Loan', amount: '₹10,000', date: '2024-01-13' },
  ];

  const activeLoans = [
    { id: 'L001', amount: '₹8,000', interest: '8.5%', startDate: '2024-01-10', dueDate: '2024-03-10' },
    { id: 'L002', amount: '₹7,000', interest: '9.0%', startDate: '2024-02-05', dueDate: '2024-04-05' },
  ];

  const subVendors = [
    { id: 'SV001', name: 'Local Supplier A', balance: '₹5,000', status: 'Active', logo: '🏭' },
    { id: 'SV002', name: 'Raw Material Supplier', balance: '₹3,200', status: 'Active', logo: '🏗️' },
    { id: 'SV003', name: 'Logistics Partner', balance: '₹1,800', status: 'Pending', logo: '🚚' },
    { id: 'SV004', name: 'Equipment Provider', balance: '₹2,500', status: 'Active', logo: '⚙️' },
  ];

  const handleSubVendorSelect = (vendor: any) => {
    setSubVendorId(vendor.id);
    setSelectedVendor(vendor.name);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name} from {user?.organizationName}</p>
        </div>

        {/* Stats Grid - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`${stat.isClickable ? 'cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105' : ''}`}
              onClick={stat.onClick}
            >
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
                {stat.isClickable && (
                  <div className="mt-2 text-xs text-blue-600 font-medium">
                    Click to view details →
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/vendor/wallet')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Token Wallet
                <ArrowRight className="h-5 w-5" />
              </CardTitle>
              <CardDescription>Manage tokens and redemptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">₹45,000</p>
              <p className="text-sm text-gray-600">Available balance</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/vendor/sub-vendors')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Sub-Vendors
                <ArrowRight className="h-5 w-5" />
              </CardTitle>
              <CardDescription>Manage your supplier network</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">6</p>
              <p className="text-sm text-gray-600">Active suppliers</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => navigate('/vendor/loans')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Active Loans
                <ArrowRight className="h-5 w-5" />
              </CardTitle>
              <CardDescription>Track loan repayments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">₹15,000</p>
              <p className="text-sm text-gray-600">Outstanding amount</p>
            </CardContent>
          </Card>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Input
                      id="sub-vendor"
                      placeholder="Select sub-vendor"
                      value={selectedVendor ? `${subVendorId} - ${selectedVendor}` : ''}
                      readOnly
                      className="cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] bg-white">
                    {subVendors.map((vendor) => (
                      <DropdownMenuItem 
                        key={vendor.id}
                        onClick={() => handleSubVendorSelect(vendor)}
                        className="flex justify-between items-center p-3 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{vendor.logo}</span>
                          <div>
                            <p className="font-medium">{vendor.name}</p>
                            <p className="text-xs text-gray-600">{vendor.id}</p>
                          </div>
                        </div>
                        <span className={`text-sm ${vendor.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>
                          {vendor.status}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
          {/* Active Loans */}
          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
              <CardDescription>Your current bank loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeLoans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Loan #{loan.id}</p>
                      <p className="text-sm text-gray-600">
                        Interest: {loan.interest} | Due: {loan.dueDate}
                      </p>
                      <p className="text-xs text-gray-500">{loan.startDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">{loan.amount}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-1"
                        onClick={() => handleRepayLoan(loan.id, loan.amount)}
                      >
                        <Check className="h-3 w-3 mr-1" /> Repay Loan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
        </div>

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
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{vendor.logo}</span>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.id}</p>
                    </div>
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
    </DashboardLayout>
  );
};

export default VendorDashboard;
