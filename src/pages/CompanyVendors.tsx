
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Search, Plus, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const CompanyVendors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    {
      id: 'V001',
      name: 'Global Supplies Ltd',
      email: 'contact@globalsupplies.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      pendingAmount: '₹15,000',
      totalTransactions: 24,
      lastTransaction: '2024-01-15',
      status: 'Active',
      rating: 4.8,
      category: 'Raw Materials'
    },
    {
      id: 'V002',
      name: 'Tech Components Inc',
      email: 'sales@techcomponents.com',
      phone: '+91 87654 32109',
      address: 'Bangalore, Karnataka',
      pendingAmount: '₹8,500',
      totalTransactions: 18,
      lastTransaction: '2024-01-14',
      status: 'Active',
      rating: 4.6,
      category: 'Electronics'
    },
    {
      id: 'V003',
      name: 'Raw Materials Co',
      email: 'info@rawmaterials.com',
      phone: '+91 76543 21098',
      address: 'Chennai, Tamil Nadu',
      pendingAmount: '₹22,000',
      totalTransactions: 31,
      lastTransaction: '2024-01-13',
      status: 'Pending',
      rating: 4.5,
      category: 'Manufacturing'
    },
    {
      id: 'V004',
      name: 'Logistics Partners Inc',
      email: 'operations@logisticspartners.com',
      phone: '+91 65432 10987',
      address: 'Delhi, NCR',
      pendingAmount: '₹5,200',
      totalTransactions: 12,
      lastTransaction: '2024-01-12',
      status: 'Active',
      rating: 4.3,
      category: 'Logistics'
    },
    {
      id: 'V005',
      name: 'Quality Assurance Ltd',
      email: 'qa@qualityassurance.com',
      phone: '+91 54321 09876',
      address: 'Pune, Maharashtra',
      pendingAmount: '₹12,800',
      totalTransactions: 9,
      lastTransaction: '2024-01-11',
      status: 'Active',
      rating: 4.9,
      category: 'Quality Control'
    }
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactVendor = (vendorName: string, email: string) => {
    toast({
      title: "Contact Initiated",
      description: `Opening email client to contact ${vendorName}`,
    });
  };

  const handlePayVendor = (vendorId: string, vendorName: string) => {
    toast({
      title: "Payment Initiated",
      description: `Redirecting to payment for ${vendorName}`,
    });
  };

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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Active Vendors</h1>
            <p className="text-gray-600">Manage your vendor relationships - {user?.organizationName}</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Vendor</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{vendors.length}</div>
              <p className="text-sm text-gray-600">Total Vendors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{vendors.filter(v => v.status === 'Active').length}</div>
              <p className="text-sm text-gray-600">Active Vendors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">₹63,500</div>
              <p className="text-sm text-gray-600">Total Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">4.6</div>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Directory</CardTitle>
            <CardDescription>Search and manage your vendor relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vendors by name, category, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Details</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Pending Amount</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-gray-500">{vendor.id}</p>
                        <p className="text-xs text-gray-400 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {vendor.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {vendor.email}
                        </p>
                        <p className="text-sm flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {vendor.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {vendor.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{vendor.pendingAmount}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vendor.totalTransactions}</p>
                        <p className="text-xs text-gray-500">Last: {vendor.lastTransaction}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{vendor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {vendor.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactVendor(vendor.name, vendor.email)}
                        >
                          Contact
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handlePayVendor(vendor.id, vendor.name)}
                        >
                          Pay
                        </Button>
                      </div>
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

export default CompanyVendors;
