
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Building, Plus, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VendorSubVendors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transferAmount, setTransferAmount] = useState('');
  const [subVendorId, setSubVendorId] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');

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

  const subVendors = [
    { id: 'SV001', name: 'Local Supplier A', balance: '₹5,000', status: 'Active', logo: '🏭', lastTransaction: '2024-01-15' },
    { id: 'SV002', name: 'Raw Material Supplier', balance: '₹3,200', status: 'Active', logo: '🏗️', lastTransaction: '2024-01-14' },
    { id: 'SV003', name: 'Logistics Partner', balance: '₹1,800', status: 'Pending', logo: '🚚', lastTransaction: '2024-01-13' },
    { id: 'SV004', name: 'Equipment Provider', balance: '₹2,500', status: 'Active', logo: '⚙️', lastTransaction: '2024-01-12' },
    { id: 'SV005', name: 'Packaging Solutions', balance: '₹4,200', status: 'Active', logo: '📦', lastTransaction: '2024-01-11' },
    { id: 'SV006', name: 'Quality Control Services', balance: '₹1,500', status: 'Inactive', logo: '🔍', lastTransaction: '2024-01-10' },
  ];

  const handleSubVendorSelect = (vendor: any) => {
    setSubVendorId(vendor.id);
    setSelectedVendor(vendor.name);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/vendor')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sub-Vendors</h1>
            <p className="text-gray-600">Manage your supplier network - {user?.organizationName}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sub-Vendors</p>
                  <p className="text-2xl font-bold text-blue-600">6</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                </div>
                <Building className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Distributed</p>
                  <p className="text-2xl font-bold text-purple-600">₹17,200</p>
                </div>
                <Send className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-orange-600">1</p>
                </div>
                <Building className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer to Sub-Vendors */}
        <Card>
          <CardHeader>
            <CardTitle>Transfer Tokens to Sub-Vendors</CardTitle>
            <CardDescription>Distribute tokens to your suppliers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sub-vendor">Sub-Vendor</Label>
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
              <div className="flex items-end">
                <Button onClick={handleTransferToSubVendor} className="w-full">
                  Transfer Tokens
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sub-Vendors List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Sub-Vendor Network</CardTitle>
            <CardDescription>Suppliers in your network with their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{vendor.logo}</span>
                    <div>
                      <p className="font-medium text-lg">{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.id}</p>
                      <p className="text-xs text-gray-500">Last transaction: {vendor.lastTransaction}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">{vendor.balance}</p>
                    <p className={`text-sm font-medium ${
                      vendor.status === 'Active' ? 'text-green-600' : 
                      vendor.status === 'Pending' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {vendor.status}
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      View Details
                    </Button>
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

export default VendorSubVendors;
