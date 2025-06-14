
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Filter, Search, AlertTriangle, Clock, FileText, MessageSquare, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const DisputedLoans = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [resolutionNote, setResolutionNote] = useState('');
  const [showResolutionDialog, setShowResolutionDialog] = useState<string | null>(null);

  const disputedLoans = [
    { 
      id: 'L0987', 
      vendor: 'Hardware Suppliers', 
      company: 'TechCorp Industries', 
      amount: '₹45,000',
      totalAmount: '₹49,500',
      status: 'Under Review', 
      dateDisputed: '2024-05-10',
      disputeReason: 'Quality issues with delivered goods',
      evidence: 'quality_report_may2024.pdf',
      assignedTo: 'Sarah Johnson',
      priority: 'High',
      originalDueDate: '2024-05-20',
      daysInDispute: 25
    },
    { 
      id: 'L0876', 
      vendor: 'Software Solutions', 
      company: 'Global Manufacturing', 
      amount: '₹1,20,000',
      totalAmount: '₹1,32,000',
      status: 'Evidence Required', 
      dateDisputed: '2024-05-05',
      disputeReason: 'Services not delivered as per contract',
      evidence: 'contract_breach_evidence.pdf',
      assignedTo: 'Michael Chen',
      priority: 'Critical',
      originalDueDate: '2024-05-15',
      daysInDispute: 30
    },
    { 
      id: 'L0765', 
      vendor: 'Logistics Partner', 
      company: 'Supply Chain Ltd', 
      amount: '₹35,000',
      totalAmount: '₹38,500',
      status: 'Mediation', 
      dateDisputed: '2024-04-28',
      disputeReason: 'Delayed delivery causing project delays',
      evidence: 'delivery_delay_proof.pdf',
      assignedTo: 'Lisa Anderson',
      priority: 'Medium',
      originalDueDate: '2024-05-08',
      daysInDispute: 37
    },
    { 
      id: 'L0654', 
      vendor: 'Construction Materials', 
      company: 'Building Corp', 
      amount: '₹85,000',
      totalAmount: '₹93,500',
      status: 'Resolved - Vendor Favor', 
      dateDisputed: '2024-04-15',
      disputeReason: 'Incorrect billing amount',
      evidence: 'billing_comparison.pdf',
      assignedTo: 'David Wilson',
      priority: 'Low',
      originalDueDate: '2024-04-25',
      daysInDispute: 20,
      resolutionDate: '2024-05-05',
      resolutionNote: 'Investigation confirmed vendor billing was correct'
    },
    { 
      id: 'L0543', 
      vendor: 'IT Services Ltd', 
      company: 'Digital Innovations', 
      amount: '₹65,000',
      totalAmount: '₹71,500',
      status: 'Resolved - Company Favor', 
      dateDisputed: '2024-04-20',
      disputeReason: 'Incomplete project deliverables',
      evidence: 'project_assessment.pdf',
      assignedTo: 'Emma Thompson',
      priority: 'High',
      originalDueDate: '2024-04-30',
      daysInDispute: 15,
      resolutionDate: '2024-05-05',
      resolutionNote: 'Company provided sufficient evidence of incomplete work'
    },
  ];

  const handleResolveDispute = (loanId: string, resolution: 'vendor' | 'company') => {
    if (!resolutionNote) {
      toast({
        title: "Missing Resolution Note",
        description: "Please provide a resolution note",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Dispute Resolved",
      description: `Dispute for loan #${loanId} resolved in favor of ${resolution}`,
    });
    setShowResolutionDialog(null);
    setResolutionNote('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Under Review</Badge>;
      case 'Evidence Required':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><FileText className="h-3 w-3 mr-1" />Evidence Required</Badge>;
      case 'Mediation':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100"><MessageSquare className="h-3 w-3 mr-1" />Mediation</Badge>;
      case 'Resolved - Vendor Favor':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Resolved - Vendor</Badge>;
      case 'Resolved - Company Favor':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" />Resolved - Company</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'High':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const filteredLoans = disputedLoans.filter(loan => {
    const matchesSearch = loan.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.disputeReason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const activeDisputes = disputedLoans.filter(loan => !loan.status.includes('Resolved')).length;
  const resolvedDisputes = disputedLoans.filter(loan => loan.status.includes('Resolved')).length;
  const criticalDisputes = disputedLoans.filter(loan => loan.priority === 'Critical').length;
  const avgResolutionTime = Math.round(disputedLoans.filter(loan => loan.resolutionDate).reduce((sum, loan) => sum + loan.daysInDispute, 0) / resolvedDisputes || 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/bank')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disputed Loans Explorer</h1>
            <p className="text-gray-600">Comprehensive dispute management and resolution center</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Disputes</p>
                  <p className="text-2xl font-bold text-gray-900">{activeDisputes}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved Disputes</p>
                  <p className="text-2xl font-bold text-gray-900">{resolvedDisputes}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{criticalDisputes}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                  <p className="text-2xl font-bold text-gray-900">{avgResolutionTime} days</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
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
                <Label htmlFor="search">Search Disputes</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by vendor, company, loan ID, or reason..."
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
                    <SelectItem value="under review">Under Review</SelectItem>
                    <SelectItem value="evidence required">Evidence Required</SelectItem>
                    <SelectItem value="mediation">Mediation</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
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

        {/* Detailed Disputes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Dispute Information</CardTitle>
            <CardDescription>
              Showing {filteredLoans.length} of {disputedLoans.length} disputed loans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Dispute Reason</TableHead>
                  <TableHead>Date Disputed</TableHead>
                  <TableHead>Days in Dispute</TableHead>
                  <TableHead>Assigned To</TableHead>
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
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>{getPriorityBadge(loan.priority)}</TableCell>
                    <TableCell className="max-w-xs truncate" title={loan.disputeReason}>
                      {loan.disputeReason}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{loan.dateDisputed}</span>
                      </div>
                    </TableCell>
                    <TableCell>{loan.daysInDispute} days</TableCell>
                    <TableCell>{loan.assignedTo}</TableCell>
                    <TableCell>
                      {showResolutionDialog === loan.id ? (
                        <div className="space-y-2 min-w-64">
                          <Textarea 
                            value={resolutionNote} 
                            onChange={(e) => setResolutionNote(e.target.value)}
                            placeholder="Resolution notes..."
                            className="text-sm"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleResolveDispute(loan.id, 'vendor')}>
                              Vendor Favor
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleResolveDispute(loan.id, 'company')}>
                              Company Favor
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setShowResolutionDialog(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          {!loan.status.includes('Resolved') && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setShowResolutionDialog(loan.id)}
                            >
                              Resolve
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
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

export default DisputedLoans;
