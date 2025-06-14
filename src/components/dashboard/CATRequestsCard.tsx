
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CATRequest {
  id: string;
  company: string;
  requestedAmount: string;
  dateRequested: string;
  status: string;
  workOrderFile: string;
}

const CATRequestsCard = () => {
  const catRequests: CATRequest[] = [
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
  );
};

export default CATRequestsCard;
