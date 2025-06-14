
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, CheckCircle, Clock, XCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const ActiveCompanies = () => {
  const navigate = useNavigate();

  const companies = [
    {
      id: 'COMP001',
      name: 'TechCorp Industries',
      sector: 'Technology',
      registeredDate: '2023-08-15',
      catTokensAwarded: true,
      catAmount: '₹2,50,000',
      status: 'Active',
      lastActivity: '2024-01-20'
    },
    {
      id: 'COMP002',
      name: 'Global Manufacturing',
      sector: 'Manufacturing',
      registeredDate: '2023-09-10',
      catTokensAwarded: true,
      catAmount: '₹5,00,000',
      status: 'Active',
      lastActivity: '2024-01-18'
    },
    {
      id: 'COMP003',
      name: 'Supply Chain Ltd',
      sector: 'Logistics',
      registeredDate: '2023-07-22',
      catTokensAwarded: true,
      catAmount: '₹1,75,000',
      status: 'Active',
      lastActivity: '2024-01-15'
    },
    {
      id: 'COMP004',
      name: 'Manufacturing Hub',
      sector: 'Manufacturing',
      registeredDate: '2023-10-05',
      catTokensAwarded: true,
      catAmount: '₹3,25,000',
      status: 'Active',
      lastActivity: '2024-01-19'
    },
    {
      id: 'COMP005',
      name: 'Logistics Partners',
      sector: 'Logistics',
      registeredDate: '2023-11-12',
      catTokensAwarded: true,
      catAmount: '₹4,50,000',
      status: 'Active',
      lastActivity: '2024-01-19'
    },
    {
      id: 'COMP006',
      name: 'Tech Solutions',
      sector: 'Technology',
      registeredDate: '2023-12-01',
      catTokensAwarded: true,
      catAmount: '₹2,80,000',
      status: 'Active',
      lastActivity: '2024-01-19'
    },
    {
      id: 'COMP007',
      name: 'Green Energy Corp',
      sector: 'Energy',
      registeredDate: '2024-01-10',
      catTokensAwarded: false,
      catAmount: '-',
      status: 'Pending Verification',
      lastActivity: '2024-01-21'
    },
    {
      id: 'COMP008',
      name: 'Digital Services Ltd',
      sector: 'Technology',
      registeredDate: '2024-01-05',
      catTokensAwarded: false,
      catAmount: '-',
      status: 'Under Review',
      lastActivity: '2024-01-20'
    }
  ];

  const stats = {
    totalCompanies: companies.length,
    companiesWithCAT: companies.filter(c => c.catTokensAwarded).length,
    totalCATIssued: '₹19,80,000',
    pendingApplications: companies.filter(c => c.status !== 'Active').length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending Verification':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Under Review':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
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
              <h1 className="text-3xl font-bold text-gray-900">Active Companies</h1>
              <p className="text-gray-600">Syndicate companies registered on the platform</p>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Companies</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalCompanies}</p>
                </div>
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">With CAT Tokens</p>
                  <p className="text-2xl font-bold text-green-600">{stats.companiesWithCAT}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total CAT Issued</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalCATIssued}</p>
                </div>
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</p>
                </div>
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Company Directory</CardTitle>
            <CardDescription>Complete list of syndicate companies and their CAT token status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company ID</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>CAT Tokens</TableHead>
                  <TableHead>CAT Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-mono text-sm">{company.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{company.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{company.sector}</TableCell>
                    <TableCell>{company.registeredDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {company.catTokensAwarded ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium">Yes</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-red-600 font-medium">No</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={company.catTokensAwarded ? 'font-bold text-green-600' : 'text-gray-400'}>
                        {company.catAmount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(company.status)}
                        <span className={`text-sm font-medium ${
                          company.status === 'Active' ? 'text-green-600' :
                          company.status === 'Pending Verification' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {company.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{company.lastActivity}</TableCell>
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

export default ActiveCompanies;
