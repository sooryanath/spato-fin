
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Banknote, Calendar, Hash, ExternalLink } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const TokenExplorer = () => {
  const navigate = useNavigate();

  // Comprehensive token issuance data - like a blockchain ledger
  const tokenIssuances = [
    {
      txHash: '0xa1b2c3d4e5f6789012345678901234567890abcd',
      blockNumber: 18234567,
      timestamp: '2024-01-20 14:30:25',
      bank: 'HDFC Bank',
      syndicateCompany: 'TechCorp Industries',
      amount: '₹2,50,000',
      tokenSymbol: 'CAT',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: '21,000',
      status: 'Confirmed'
    },
    {
      txHash: '0xb2c3d4e5f6789012345678901234567890abcdef1',
      blockNumber: 18234521,
      timestamp: '2024-01-20 11:15:42',
      bank: 'SBI Bank',
      syndicateCompany: 'Global Manufacturing',
      amount: '₹5,00,000',
      tokenSymbol: 'CAT',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: '21,000',
      status: 'Confirmed'
    },
    {
      txHash: '0xc3d4e5f6789012345678901234567890abcdef12',
      blockNumber: 18234498,
      timestamp: '2024-01-20 09:45:18',
      bank: 'ICICI Bank',
      syndicateCompany: 'Supply Chain Ltd',
      amount: '₹1,75,000',
      tokenSymbol: 'CAT',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: '21,000',
      status: 'Confirmed'
    },
    {
      txHash: '0xd4e5f6789012345678901234567890abcdef1234',
      blockNumber: 18234445,
      timestamp: '2024-01-19 16:22:35',
      bank: 'Axis Bank',
      syndicateCompany: 'Manufacturing Hub',
      amount: '₹3,25,000',
      tokenSymbol: 'CAT',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: '21,000',
      status: 'Confirmed'
    },
    {
      txHash: '0xe5f6789012345678901234567890abcdef12345',
      blockNumber: 18234412,
      timestamp: '2024-01-19 13:08:52',
      bank: 'HDFC Bank',
      syndicateCompany: 'Logistics Partners',
      amount: '₹4,50,000',
      tokenSymbol: 'CAT',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: '21,000',
      status: 'Confirmed'
    },
    {
      txHash: '0xf6789012345678901234567890abcdef123456',
      blockNumber: 18234389,
      timestamp: '2024-01-19 10:33:14',
      bank: 'PNB Bank',
      syndicateCompany: 'Tech Solutions',
      amount: '₹2,80,000',
      tokenSymbol: 'CAT',
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: '21,000',
      status: 'Confirmed'
    }
  ];

  const stats = {
    totalTransactions: tokenIssuances.length,
    totalVolume: '₹19,80,000',
    uniqueBanks: 5,
    uniqueCompanies: 6,
    avgTransactionSize: '₹3,30,000'
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
              <h1 className="text-3xl font-bold text-gray-900">CAT Token Explorer</h1>
              <p className="text-gray-600">Comprehensive view of Credit Access Token issuances</p>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
                </div>
                <Hash className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalVolume}</p>
                </div>
                <Banknote className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Banks</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.uniqueBanks}</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg. Transaction</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.avgTransactionSize}</p>
                </div>
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Issuance Ledger */}
        <Card>
          <CardHeader>
            <CardTitle>Token Issuance Ledger</CardTitle>
            <CardDescription>Complete record of CAT token issuances from banks to syndicate companies</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Syndicate Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenIssuances.map((issuance, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">{truncateHash(issuance.txHash)}</span>
                        <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-gray-600">
                      #{issuance.blockNumber.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {issuance.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{issuance.bank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{issuance.syndicateCompany}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-green-600">{issuance.amount}</span>
                        <span className="text-sm text-gray-500">{issuance.tokenSymbol}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {issuance.status}
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

        {/* Contract Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
            <CardDescription>Smart contract details for CAT token</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Contract Address</p>
                <p className="font-mono text-sm text-blue-600">0x1234567890abcdef1234567890abcdef12345678</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Token Symbol</p>
                <p className="font-bold">CAT</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Token Name</p>
                <p className="font-bold">Credit Access Token</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Decimals</p>
                <p className="font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TokenExplorer;
