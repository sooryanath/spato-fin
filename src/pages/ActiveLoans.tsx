
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Filter, Search, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const ActiveLoans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [disputeReason, setDisputeReason] = useState('');
  const [showDisputeDialog, setShowDisputeDialog] = useState<string | null>(null);

  const activeLoans = [
    { 
      id: 'L1001', 
      vendor: 'Tech Solutions Ltd', 
      company: 'Global Industries',
      amount: '₹75,000', 
      dueDate: '2024-06-15',
      issueDate: '2024-05-15',
      totalAmount: '₹82,500', 
      remainingAmount: '₹82,500',
      status: 'Active',
      interestRate: '10%',
      tenure: '30 days'
    },
    { 
      id: 'L1002', 
      vendor: 'Manufacturing Experts', 
      company: 'TechCorp Industries',
      amount: '₹50,000', 
      dueDate: '2024-06-20',
      issueDate: '2024-05-20',
      totalAmount: '₹55,000', 
      remainingAmount: '₹30,000',
      status: 'Partially Paid',
      interestRate: '10%',
      tenure: '30 days'
    },
    { 
      id: 'L1003', 
      vendor: 'Supply Chain Partners', 
      company: 'Manufacturing Corp',
      amount: '₹1,25,000', 
      dueDate: '2024-07-05',
      issueDate: '2024-06-05',
      totalAmount: '₹1,37,500', 
      remainingAmount: '₹1,37,500',
      status: 'Active',
      interestRate: '10%',
      tenure: '30 days'
    },
    { 
      id: 'L1004', 
      vendor: 'Hardware Suppliers', 
      company: 'Digital Solutions',
      amount: '₹35,000', 
      dueDate: '2024-06-10',
      issueDate: '2024-05-10',
      totalAmount: '₹38,500', 
      remainingAmount: '₹0',
      status: 'Completed',
      interestRate: '10%',
      tenure: '30 days'
    },
    { 
      id: 'L1005', 
      vendor: 'Software Solutions', 
      company: 'Innovation Ltd',
      amount: '₹90,000', 
      dueDate: '2024-05-30',
      issueDate: '2024-04-30',
      totalAmount: '₹99,000', 
      remainingAmount: '₹99,000',
      status: 'Overdue',
      interestRate: '10%',
      tenure: '30 days'
    },
  ];

  const handleDispute = (loanId: string) => {
    if (!disputeReason) {
      toast({
        title: "Missing Reason",
        description: "Please provide a reason for the dispute",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Loan Disputed",
      description: `Dispute filed for loan #${loanId} successfully`,
    });
    setShowDisputeDialog(null);
    setDisputeReason('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'Partially Paid':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="h-3 w-3 mr-1" />Partially Paid</Badge>;
      case 'Completed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredLoans = activeLoans.filter(loan => {
    const matchesSearch = loan.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalActiveLoans = activeLoans.filter(loan => loan.status === 'Active').length;
  const totalOverdueLoans = activeLoans.filter(loan => loan.status === 'Overdue').length;
  const totalAmount = activeLoans.reduce((sum, loan) => sum + parseInt(loan.totalAmount.replace(/[₹,]/g, '')), 0);
  const totalRemaining = activeLoans.reduce((sum, loan) => sum + parseInt(loan.remainingAmount.replace(/[₹,]/g, '')), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Loans Explorer</h1>
          <p className="text-gray-600">Comprehensive view of all active loans and their status</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Active Loans</p>
                  <p className="text-2xl font-bold text-gray-900">{totalActiveLoans}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue Loans</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOverdueLoans}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Loan Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outstanding Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRemaining.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Loans</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by vendor, company, or loan ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="partially paid">Partially Paid</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Loans Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Loan Information</CardTitle>
            <CardDescription>
              Showing {filteredLoans.length} of {activeLoans.length} loans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Syndicate Company</TableHead>
                  <TableHead>Principal Amount</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.vendor}</TableCell>
                    <TableCell>{loan.company}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>{loan.totalAmount}</TableCell>
                    <TableCell>{loan.remainingAmount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{loan.issueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{loan.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>{loan.interestRate}</TableCell>
                    <TableCell>{loan.tenure}</TableCell>
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>
                      {showDisputeDialog === loan.id ? (
                        <div className="space-y-2">
                          <Input 
                            value={disputeReason} 
                            onChange={(e) => setDisputeReason(e.target.value)}
                            placeholder="Reason for dispute"
                            className="text-sm"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive" onClick={() => handleDispute(loan.id)}>
                              Submit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setShowDisputeDialog(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowDisputeDialog(loan.id)}
                          disabled={loan.status === 'Completed'}
                        >
                          Dispute
                        </Button>
                      )}
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

export default ActiveLoans;
