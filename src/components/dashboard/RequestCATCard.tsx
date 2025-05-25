import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { FileText, Upload } from 'lucide-react';

const RequestCATCard = () => {
  const [requestAmount, setRequestAmount] = useState('');
  const [workOrderFile, setWorkOrderFile] = useState<File | null>(null);
  const [selectedBank, setSelectedBank] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWorkOrderFile(e.target.files[0]);
    }
  };

  const handleSubmitRequest = () => {
    if (!requestAmount || !selectedBank || !workOrderFile) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and upload work order file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "CAT Request Submitted",
      description: `Request for ₹${requestAmount} submitted to ${selectedBank}`,
    });
    setRequestAmount('');
    setSelectedBank('');
    setWorkOrderFile(null);
  };

  const existingRequests = [
    { 
      id: 'CAT001', 
      bank: 'HDFC Bank', 
      amount: '₹50,000', 
      date: '2024-01-15', 
      status: 'Pending',
      workOrder: 'WO_2024_001.pdf'
    },
    { 
      id: 'CAT002', 
      bank: 'ICICI Bank', 
      amount: '₹75,000', 
      date: '2024-01-12', 
      status: 'Approved',
      workOrder: 'WO_2024_002.pdf'
    },
    { 
      id: 'CAT003', 
      bank: 'SBI', 
      amount: '₹30,000', 
      date: '2024-01-10', 
      status: 'Rejected',
      workOrder: 'WO_2024_003.pdf'
    },
  ];

  const banks = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank'];

  return (
    <div className="space-y-6">
      {/* Request CAT Form */}
      <Card>
        <CardHeader>
          <CardTitle>Request Credit Access Token (CAT)</CardTitle>
          <CardDescription>Submit a new request for CAT from partner banks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank</Label>
              <select
                id="bank"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">Choose a bank</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Request Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter CAT amount"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="workOrder">Work Order File</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="workOrder"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="flex-1"
              />
              <Upload className="h-4 w-4 text-gray-500" />
            </div>
            {workOrderFile && (
              <p className="text-sm text-green-600">File selected: {workOrderFile.name}</p>
            )}
          </div>
          <Button onClick={handleSubmitRequest} className="w-full">
            Submit CAT Request
          </Button>
        </CardContent>
      </Card>

      {/* Existing Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Your CAT Requests</CardTitle>
          <CardDescription>Track your submitted Credit Access Token requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Work Order</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.bank}</TableCell>
                  <TableCell>{request.amount}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{request.workOrder}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestCATCard;
