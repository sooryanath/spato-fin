import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Banknote, Building, TrendingUp, Users, AlertTriangle, FileText, Download, ExternalLink } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BankDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [issueAmount, setIssueAmount] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [showDisputeDialog, setShowDisputeDialog] = useState<string | null>(null);

  const handleIssueTokens = () => {
    if (!issueAmount || !companyId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and company ID",
        variant: "destructive",
      });
      return;
    }

    // Simulate token issuance
    toast({
      title: "Tokens Issued Successfully",
      description: `${issueAmount} tokens issued to company ${companyId}`,
    });
    setIssueAmount('');
    setCompanyId('');
  };

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

  const stats = [
    {
      title: "Total Tokens Issued",
      value: "₹2,45,000",
      change: "+12%",
      icon: Banknote,
      route: "/token-explorer"
    },
    {
      title: "Active Companies",
      value: "24",
      change: "+3",
      icon: Building,
      route: "/active-companies"
    },
    {
      title: "Tokens Redeemed",
      value: "₹1,89,000",
      change: "+8%",
      icon: TrendingUp,
      route: "/tokens-redeemed"
    },
    {
      title: "Active Vendors",
      value: "156",
      change: "+15",
      icon: Users,
      route: "/active-vendors"
    },
  ];

  const activeLoans = [
    { id: 'L1001', vendor: 'Tech Solutions Ltd', amount: '₹75,000', dueDate: '2024-06-15', totalAmount: '₹82,500', remainingAmount: '₹82,500' },
    { id: 'L1002', vendor: 'Manufacturing Experts', amount: '₹50,000', dueDate: '2024-06-20', totalAmount: '₹55,000', remainingAmount: '₹30,000' },
    { id: 'L1003', vendor: 'Supply Chain Partners', amount: '₹1,25,000', dueDate: '2024-07-05', totalAmount: '₹1,37,500', remainingAmount: '₹1,37,500' },
  ];

  const disputedLoans = [
    { id: 'L0987', vendor: 'Hardware Suppliers', company: 'TechCorp Industries', amount: '₹45,000', status: 'Under Review', dateDisputed: '2024-05-10' },
    { id: 'L0876', vendor: 'Software Solutions', company: 'Global Manufacturing', amount: '₹1,20,000', status: 'Evidence Required', dateDisputed: '2024-05-05' },
    { id: 'L0765', vendor: 'Logistics Partner', company: 'Supply Chain Ltd', amount: '₹35,000', status: 'Mediation', dateDisputed: '2024-04-28' },
  ];

  const recentTransactions = [
    { id: '1', company: 'TechCorp Industries', amount: '₹50,000', type: 'Issued', date: '2024-01-15' },
    { id: '2', company: 'Global Manufacturing', amount: '₹25,000', type: 'Issued', date: '2024-01-14' },
    { id: '3', company: 'Supply Chain Ltd', amount: '₹15,000', type: 'Redeemed', date: '2024-01-13' },
  ];

  const catRequests = [
    { 
      id: 'CAT001', 
      company: 'TechCorp Industries', 
      requestedAmount: '₹2,50,000', 
      dateRequested: '2024-01-20',
      status: 'Pending Review',
      workOrderFile: 'techcorp_workorder_2024.pdf'
    },
    { 
      id: 'CAT002', 
      company: 'Global Manufacturing', 
      requestedAmount: '₹5,00,000', 
      dateRequested: '2024-01-18',
      status: 'Under Verification',
      workOrderFile: 'global_mfg_contract_2024.pdf'
    },
    { 
      id: 'CAT003', 
      company: 'Supply Chain Ltd', 
      requestedAmount: '₹1,75,000', 
      dateRequested: '2024-01-15',
      status: 'Approved',
      workOrderFile: 'supply_chain_order_jan2024.pdf'
    },
  ];

  const handleApproveCAT = (requestId: string) => {
    toast({
      title: "CAT Request Approved",
      description: `Credit Access Token request ${requestId} has been approved`,
    });
  };

  const handleRejectCAT = (requestId: string) => {
    toast({
      title: "CAT Request Rejected",
      description: `Credit Access Token request ${requestId} has been rejected`,
      variant: "destructive",
    });
  };

  const handleDownloadWorkOrder = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bank Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name} from {user?.organizationName}</p>
        </div>

        {/* Stats Grid - Now with individual routes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => navigate(stat.route)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Issue Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Issue New Tokens</CardTitle>
              <CardDescription>Create and distribute tokens to companies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company ID</Label>
                <Input
                  id="company"
                  placeholder="Enter company identifier"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Token Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={issueAmount}
                  onChange={(e) => setIssueAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleIssueTokens} className="w-full">
                Issue Tokens
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions - Now with View Explorer button */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest token activities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.company}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transaction.amount}</p>
                      <p className={`text-sm ${transaction.type === 'Issued' ? 'text-green-600' : 'text-blue-600'}`}>
                        {transaction.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/token-explorer')}
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Explorer</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Loans Section */}
        <Card>
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Current outstanding loans issued to vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Total / Remaining</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.vendor}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>{loan.dueDate}</TableCell>
                    <TableCell>
                      {loan.totalAmount} / {loan.remainingAmount}
                    </TableCell>
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
                            <Button size="sm" variant="destructive" onClick={() => handleDispute(loan.id)}>Submit</Button>
                            <Button size="sm" variant="outline" onClick={() => setShowDisputeDialog(null)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setShowDisputeDialog(loan.id)}>
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

        {/* Disputed Loans Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Disputed Loans</CardTitle>
            </div>
            <CardDescription>Loans currently under dispute resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Syndicate Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Disputed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputedLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.vendor}</TableCell>
                    <TableCell>{loan.company}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        {loan.status}
                      </span>
                    </TableCell>
                    <TableCell>{loan.dateDisputed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Credit Access Token (CAT) Requests Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle>Credit Access Token (CAT) Requests</CardTitle>
            </div>
            <CardDescription>Syndicate companies requesting Credit Access Tokens with work order files</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Syndicate Company</TableHead>
                  <TableHead>Requested Amount</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Work Order File</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {catRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.company}</TableCell>
                    <TableCell>{request.requestedAmount}</TableCell>
                    <TableCell>{request.dateRequested}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDownloadWorkOrder(request.workOrderFile)}
                        className="flex items-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>{request.workOrderFile}</span>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status !== 'Approved' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveCAT(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                        )}
                        {request.status === 'Pending Review' && (
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleRejectCAT(request.id)}
                          >
                            Reject
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

export default BankDashboard;
