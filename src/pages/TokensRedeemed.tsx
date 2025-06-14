
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Banknote, Calendar, Hash, ExternalLink, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const TokensRedeemed = () => {
  const navigate = useNavigate();

  const redeemedTokens = [
    {
      txHash: '0xa1b2c3d4e5f6789012345678901234567890abcd',
      blockNumber: 18234567,
      timestamp: '2024-01-20 16:45:30',
      vendor: 'Tech Solutions Ltd',
      syndicateCompany: 'TechCorp Industries',
      amount: '₹75,000',
      tokenSymbol: 'CAT',
      loanId: 'L1001',
      status: 'Redeemed',
      redemptionType: 'Bank Loan'
    },
    {
      txHash: '0xb2c3d4e5f6789012345678901234567890abcdef1',
      blockNumber: 18234521,
      timestamp: '2024-01-19 14:20:15',
      vendor: 'Manufacturing Experts',
      syndicateCompany: 'Global Manufacturing',
      amount: '₹25,000',
      tokenSymbol: 'CAT',
      loanId: 'L1002',
      status: 'Redeemed',
      redemptionType: 'Bank Loan'
    },
    {
      txHash: '0xc3d4e5f6789012345678901234567890abcdef12',
      blockNumber: 18234498,
      timestamp: '2024-01-18 11:30:45',
      vendor: 'Supply Chain Partners',
      syndicateCompany: 'Supply Chain Ltd',
      amount: '₹15,000',
      tokenSymbol: 'CAT',
      loanId: 'L1003',
      status: 'Redeemed',
      redemptionType: 'Bank Loan'
    },
    {
      txHash: '0xd4e5f6789012345678901234567890abcdef1234',
      blockNumber: 18234445,
      timestamp: '2024-01-17 09:15:22',
      vendor: 'Hardware Suppliers',
      syndicateCompany: 'Manufacturing Hub',
      amount: '₹45,000',
      tokenSymbol: 'CAT',
      loanId: 'L0987',
      status: 'Redeemed',
      redemptionType: 'Bank Loan'
    },
    {
      txHash: '0xe5f6789012345678901234567890abcdef12345',
      blockNumber: 18234412,
      timestamp: '2024-01-16 15:45:10',
      vendor: 'Software Solutions',
      syndicateCompany: 'Logistics Partners',
      amount: '₹1,20,000',
      tokenSymbol: 'CAT',
      loanId: 'L0876',
      status: 'Redeemed',
      redemptionType: 'Bank Loan'
    },
    {
      txHash: '0xf6789012345678901234567890abcdef123456',
      blockNumber: 18234389,
      timestamp: '2024-01-15 13:20:35',
      vendor: 'Logistics Partner',
      syndicateCompany: 'Tech Solutions',
      amount: '₹35,000',
      tokenSymbol: 'CAT',
      loanId: 'L0765',
      status: 'Redeemed',
      redemptionType: 'Bank Loan'
    }
  ];

  const stats = {
    totalRedemptions: redeemedTokens.length,
    totalRedeemed: '₹3,15,000',
    uniqueVendors: 6,
    uniqueCompanies: 6,
    avgRedemptionSize: '₹52,500'
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
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
              <h1 className="text-3xl font-bold text-gray-900">Tokens Redeemed</h1>
              <p className="text-gray-600">CAT tokens redeemed by vendors for bank loans</p>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Redemptions</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalRedemptions}</p>
                </div>
                <Hash className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Redeemed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalRedeemed}</p>
                </div>
                <Banknote className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.uniqueVendors}</p>
                </div>
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.uniqueCompanies}</p>
                </div>
                <Building className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Redemption</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.avgRedemptionSize}</p>
                </div>
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Redemption Ledger */}
        <Card>
          <CardHeader>
            <CardTitle>Token Redemption Ledger</CardTitle>
            <CardDescription>Complete record of CAT tokens redeemed by vendors for bank loans</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Syndicate Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redeemedTokens.map((redemption, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">{truncateHash(redemption.txHash)}</span>
                        <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-gray-600">
                      #{redemption.blockNumber.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {redemption.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">{redemption.vendor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{redemption.syndicateCompany}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-green-600">{redemption.amount}</span>
                        <span className="text-sm text-gray-500">{redemption.tokenSymbol}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-blue-600">{redemption.loanId}</span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {redemption.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
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

export default TokensRedeemed;
