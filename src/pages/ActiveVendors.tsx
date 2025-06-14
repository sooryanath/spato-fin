
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, CheckCircle, Clock, XCircle, AlertCircle, Users } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const ActiveVendors = () => {
  const navigate = useNavigate();

  const vendors = [
    {
      id: 'VEND001',
      name: 'Tech Solutions Ltd',
      category: 'Technology Services',
      registeredDate: '2023-06-15',
      hasBankLoan: true,
      loanAmount: '₹75,000',
      loanId: 'L1001',
      loanStatus: 'Active',
      dueDate: '2024-06-15',
      lastActivity: '2024-01-20'
    },
    {
      id: 'VEND002',
      name: 'Manufacturing Experts',
      category: 'Manufacturing',
      registeredDate: '2023-07-20',
      hasBankLoan: true,
      loanAmount: '₹50,000',
      loanId: 'L1002',
      loanStatus: 'Partially Paid',
      dueDate: '2024-06-20',
      lastActivity: '2024-01-19'
    },
    {
      id: 'VEND003',
      name: 'Supply Chain Partners',
      category: 'Logistics',
      registeredDate: '2023-08-10',
      hasBankLoan: true,
      loanAmount: '₹1,25,000',
      loanId: 'L1003',
      loanStatus: 'Active',
      dueDate: '2024-07-05',
      lastActivity: '2024-01-18'
    },
    {
      id: 'VEND004',
      name: 'Hardware Suppliers',
      category: 'Hardware',
      registeredDate: '2023-05-25',
      hasBankLoan: true,
      loanAmount: '₹45,000',
      loanId: 'L0987',
      loanStatus: 'Disputed',
      dueDate: '2024-05-25',
      lastActivity: '2024-01-17'
    },
    {
      id: 'VEND005',
      name: 'Software Solutions',
      category: 'Software Development',
      registeredDate: '2023-09-12',
      hasBankLoan: true,
      loanAmount: '₹1,20,000',
      loanId: 'L0876',
      loanStatus: 'Disputed',
      dueDate: '2024-05-12',
      lastActivity: '2024-01-16'
    },
    {
      id: 'VEND006',
      name: 'Logistics Partner',
      category: 'Transportation',
      registeredDate: '2023-10-08',
      hasBankLoan: true,
      loanAmount: '₹35,000',
      loanId: 'L0765',
      loanStatus: 'Disputed',
      dueDate: '2024-04-08',
      lastActivity: '2024-01-15'
    },
    {
      id: 'VEND007',
      name: 'Digital Marketing Co',
      category: 'Marketing',
      registeredDate: '2023-11-15',
      hasBankLoan: false,
      loanAmount: '-',
      loanId: '-',
      loanStatus: 'No Loan',
      dueDate: '-',
      lastActivity: '2024-01-21'
    },
    {
      id: 'VEND008',
      name: 'Construction Services',
      category: 'Construction',
      registeredDate: '2023-12-20',
      hasBankLoan: false,
      loanAmount: '-',
      loanId: '-',
      loanStatus: 'No Loan',
      dueDate: '-',
      lastActivity: '2024-01-20'
    },
    {
      id: 'VEND009',
      name: 'IT Support Services',
      category: 'IT Services',
      registeredDate: '2024-01-05',
      hasBankLoan: false,
      loanAmount: '-',
      loanId: '-',
      loanStatus: 'No Loan',
      dueDate: '-',
      lastActivity: '2024-01-21'
    },
    {
      id: 'VEND010',
      name: 'Electrical Contractors',
      category: 'Electrical',
      registeredDate: '2024-01-10',
      hasBankLoan: false,
      loanAmount: '-',
      loanId: '-',
      loanStatus: 'No Loan',
      dueDate: '-',
      lastActivity: '2024-01-20'
    }
  ];

  const stats = {
    totalVendors: vendors.length,
    vendorsWithLoans: vendors.filter(v => v.hasBankLoan).length,
    totalLoanAmount: '₹4,50,000',
    disputedLoans: vendors.filter(v => v.loanStatus === 'Disputed').length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partially Paid':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Disputed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'No Loan':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600';
      case 'Partially Paid':
        return 'text-yellow-600';
      case 'Disputed':
        return 'text-red-600';
      case 'No Loan':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Active Vendors</h1>
              <p className="text-gray-600">Vendors registered on the platform and their loan status</p>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalVendors}</p>
                </div>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">With Bank Loans</p>
                  <p className="text-2xl font-bold text-green-600">{stats.vendorsWithLoans}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Loan Amount</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalLoanAmount}</p>
                </div>
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disputed Loans</p>
                  <p className="text-2xl font-bold text-red-600">{stats.disputedLoans}</p>
                </div>
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Directory</CardTitle>
            <CardDescription>Complete list of active vendors and their bank loan status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Bank Loan</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-mono text-sm">{vendor.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{vendor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{vendor.category}</TableCell>
                    <TableCell>{vendor.registeredDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {vendor.hasBankLoan ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium">Yes</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600 font-medium">No</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={vendor.hasBankLoan ? 'font-bold text-green-600' : 'text-gray-400'}>
                        {vendor.loanAmount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={vendor.hasBankLoan ? 'font-mono text-sm text-blue-600' : 'text-gray-400'}>
                        {vendor.loanId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(vendor.loanStatus)}
                        <span className={`text-sm font-medium ${getStatusColor(vendor.loanStatus)}`}>
                          {vendor.loanStatus}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{vendor.dueDate}</TableCell>
                    <TableCell className="text-sm text-gray-600">{vendor.lastActivity}</TableCell>
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

export default ActiveVendors;
