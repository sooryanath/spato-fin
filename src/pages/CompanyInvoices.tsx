
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Search, Filter, Download, Eye, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const CompanyInvoices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices = [
    {
      id: 'INV-2024-001',
      vendorName: 'Global Supplies Ltd',
      vendorId: 'V001',
      amount: '₹15,000',
      issueDate: '2024-01-10',
      dueDate: '2024-01-25',
      status: 'Pending',
      category: 'Raw Materials',
      description: 'Steel components for Q1 production',
      paymentTerms: '15 days',
      priority: 'High',
      attachments: 2
    },
    {
      id: 'INV-2024-002',
      vendorName: 'Tech Components Inc',
      vendorId: 'V002',
      amount: '₹8,500',
      issueDate: '2024-01-12',
      dueDate: '2024-01-27',
      status: 'Pending',
      category: 'Electronics',
      description: 'Circuit boards and processors',
      paymentTerms: '15 days',
      priority: 'Medium',
      attachments: 1
    },
    {
      id: 'INV-2024-003',
      vendorName: 'Raw Materials Co',
      vendorId: 'V003',
      amount: '₹22,000',
      issueDate: '2024-01-08',
      dueDate: '2024-01-23',
      status: 'Overdue',
      category: 'Manufacturing',
      description: 'Aluminum sheets and copper wire',
      paymentTerms: '15 days',
      priority: 'High',
      attachments: 3
    },
    {
      id: 'INV-2024-004',
      vendorName: 'Logistics Partners Inc',
      vendorId: 'V004',
      amount: '₹5,200',
      issueDate: '2024-01-14',
      dueDate: '2024-01-29',
      status: 'Pending',
      category: 'Logistics',
      description: 'Transportation and delivery services',
      paymentTerms: '15 days',
      priority: 'Low',
      attachments: 1
    },
    {
      id: 'INV-2024-005',
      vendorName: 'Quality Assurance Ltd',
      vendorId: 'V005',
      amount: '₹12,800',
      issueDate: '2024-01-11',
      dueDate: '2024-01-26',
      status: 'Approved',
      category: 'Quality Control',
      description: 'Testing and certification services',
      paymentTerms: '15 days',
      priority: 'Medium',
      attachments: 2
    },
    {
      id: 'INV-2024-006',
      vendorName: 'Global Supplies Ltd',
      vendorId: 'V001',
      amount: '₹9,300',
      issueDate: '2024-01-05',
      dueDate: '2024-01-20',
      status: 'Paid',
      category: 'Raw Materials',
      description: 'Monthly material supply',
      paymentTerms: '15 days',
      priority: 'Medium',
      attachments: 1
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-orange-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    toast({
      title: "Opening Invoice",
      description: `Viewing details for ${invoiceId}`,
    });
  };

  const handlePayInvoice = (invoiceId: string, amount: string) => {
    toast({
      title: "Payment Initiated",
      description: `Processing payment of ${amount} for ${invoiceId}`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${invoiceId}.pdf`,
    });
  };

  const totalPending = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => 
    sum + parseInt(inv.amount.replace('₹', '').replace(',', '')), 0);
  const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length;
  const approvedCount = invoices.filter(inv => inv.status === 'Approved').length;

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
            <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600">Track and manage all pending invoices - {user?.organizationName}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{invoices.length}</div>
                  <p className="text-sm text-gray-600">Total Invoices</p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">₹{totalPending.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Pending Amount</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
                  <p className="text-sm text-gray-600">Overdue</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Management */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Directory</CardTitle>
            <CardDescription>Search, filter, and manage all your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search invoices by ID, vendor, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="overdue">Overdue</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Details</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-400">
                          {invoice.category} • {invoice.attachments} attachments
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.vendorName}</p>
                        <p className="text-sm text-gray-500">{invoice.vendorId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-lg">{invoice.amount}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>Issued: {invoice.issueDate}</p>
                        <p className={invoice.status === 'Overdue' ? 'text-red-600 font-medium' : ''}>
                          Due: {invoice.dueDate}
                        </p>
                        <p className="text-gray-500">{invoice.paymentTerms}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(invoice.priority)}`}>
                        {invoice.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                          invoice.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewInvoice(invoice.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        {(invoice.status === 'Pending' || invoice.status === 'Approved' || invoice.status === 'Overdue') && (
                          <Button 
                            size="sm"
                            onClick={() => handlePayInvoice(invoice.id, invoice.amount)}
                          >
                            Pay
                          </Button>
                        )}
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

export default CompanyInvoices;
