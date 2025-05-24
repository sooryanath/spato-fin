import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Banknote, Building, TrendingUp, Users, AlertTriangle, ExternalLink } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CompanySelectDropdown from '@/components/CompanySelectDropdown';
import LoanDisputeDialog from '@/components/LoanDisputeDialog';

const BankDashboard = () => {
  const { user } = useAuth();
  const [issueAmount, setIssueAmount] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [showDisputeDialog, setShowDisputeDialog] = useState<string | null>(null);
  const [selectedDisputedLoan, setSelectedDisputedLoan] = useState<any | null>(null);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);

  const handleIssueTokens = () => {
    if (!issueAmount || !companyId) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and select a company",
        variant: "destructive",
      });
      return;
    }

    // Simulate token issuance
    toast({
      title: "Tokens Issued Successfully",
      description: `${issueAmount} tokens issued to ${companyName} (${companyId})`,
    });
    setIssueAmount('');
    setCompanyId('');
    setCompanyName('');
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

  const handleOpenDisputeCase = (loan: any) => {
    setSelectedDisputedLoan(loan);
    setIsDisputeDialogOpen(true);
  };

  const handleSelectCompany = (id: string, name: string) => {
    setCompanyId(id);
    setCompanyName(name);
  };

  const stats = [
    {
      title: "Total Tokens Issued",
      value: "₹2,45,000",
      change: "+12%",
      icon: Banknote,
    },
    {
      title: "Active Companies",
      value: "24",
      change: "+3",
      icon: Building,
    },
    {
      title: "Tokens Redeemed",
      value: "₹1,89,000",
      change: "+8%",
      icon: TrendingUp,
    },
    {
      title: "Active Vendors",
      value: "156",
      change: "+15",
      icon: Users,
    },
  ];

  const activeLoans = [
    { id: 'L1001', vendor: 'Tech Solutions Ltd', amount: '₹75,000', dueDate: '2024-06-15', totalAmount: '₹82,500', remainingAmount: '₹82,500' },
    { id: 'L1002', vendor: 'Manufacturing Experts', amount: '₹50,000', dueDate: '2024-06-20', totalAmount: '₹55,000', remainingAmount: '₹30,000' },
    { id: 'L1003', vendor: 'Supply Chain Partners', amount: '₹1,25,000', dueDate: '2024-07-05', totalAmount: '₹1,37,500', remainingAmount: '₹1,37,500' },
  ];

  const disputedLoans = [
    { 
      id: 'L0987', 
      vendor: 'Hardware Suppliers', 
      company: 'TechCorp Industries', 
      amount: '₹45,000', 
      status: 'Under Review', 
      dateDisputed: '2024-05-10',
      details: 'Dispute regarding payment terms and delivery timeline. Vendor claims payment terms were not met as per contract.'
    },
    { 
      id: 'L0876', 
      vendor: 'Software Solutions', 
      company: 'Global Manufacturing', 
      amount: '₹1,20,000', 
      status: 'Evidence Required', 
      dateDisputed: '2024-05-05',
      details: 'Documentation missing for partial payment. Company requesting additional invoice proof before releasing remaining funds.'
    },
    { 
      id: 'L0765', 
      vendor: 'Logistics Partner', 
      company: 'Supply Chain Ltd', 
      amount: '₹35,000', 
      status: 'Mediation', 
      dateDisputed: '2024-04-28',
      details: 'Service quality dispute. Both parties have submitted evidence and case is now in mediation phase.'
    },
  ];

  const recentTransactions = [
    { id: '1', company: 'TechCorp Industries', amount: '₹50,000', type: 'Issued', date: '2024-01-15' },
    { id: '2', company: 'Global Manufacturing', amount: '₹25,000', type: 'Issued', date: '2024-01-14' },
    { id: '3', company: 'Supply Chain Ltd', amount: '₹15,000', type: 'Redeemed', date: '2024-01-13' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bank Dashboard</h1>
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
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
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
                <Label htmlFor="company">Select Syndicate Company</Label>
                <CompanySelectDropdown onSelect={handleSelectCompany} />
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

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest token activities</CardDescription>
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
                  <TableHead>Action</TableHead>
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
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleOpenDisputeCase(loan)}
                      >
                        Open <ExternalLink className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Loan Dispute Dialog */}
        {selectedDisputedLoan && (
          <LoanDisputeDialog 
            loan={selectedDisputedLoan}
            open={isDisputeDialogOpen}
            onOpenChange={setIsDisputeDialogOpen}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default BankDashboard;
