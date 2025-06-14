
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  Building
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CATRequest {
  id: string;
  company: string;
  requestedAmount: string;
  dateRequested: string;
  status: string;
  workOrderFile: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  submittedDocuments: string[];
  notes: string;
}

const CATRequests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<CATRequest | null>(null);

  const catRequests: CATRequest[] = [
    { 
      id: 'CAT001', 
      company: 'TechCorp Industries', 
      requestedAmount: '₹2,50,000', 
      dateRequested: '2024-01-20',
      status: 'Pending Review',
      workOrderFile: 'techcorp_workorder_2024.pdf',
      description: 'Supply chain financing for Q1 2024 operations',
      contactPerson: 'Raj Kumar',
      email: 'raj.kumar@techcorp.com',
      phone: '+91 98765 43210',
      submittedDocuments: ['work_order.pdf', 'company_registration.pdf', 'financial_statements.pdf'],
      notes: 'Urgent request for immediate processing'
    },
    { 
      id: 'CAT002', 
      company: 'Global Manufacturing', 
      requestedAmount: '₹5,00,000', 
      dateRequested: '2024-01-18',
      status: 'Under Verification',
      workOrderFile: 'global_mfg_contract_2024.pdf',
      description: 'Equipment procurement and working capital',
      contactPerson: 'Priya Sharma',
      email: 'priya.sharma@globalmfg.com',
      phone: '+91 87654 32109',
      submittedDocuments: ['contract.pdf', 'gst_certificate.pdf', 'bank_statements.pdf', 'audit_report.pdf'],
      notes: 'Large manufacturing order, requires thorough verification'
    },
    { 
      id: 'CAT003', 
      company: 'Supply Chain Ltd', 
      requestedAmount: '₹1,75,000', 
      dateRequested: '2024-01-15',
      status: 'Approved',
      workOrderFile: 'supply_chain_order_jan2024.pdf',
      description: 'Logistics and transportation financing',
      contactPerson: 'Amit Patel',
      email: 'amit.patel@supplychain.com',
      phone: '+91 76543 21098',
      submittedDocuments: ['logistics_contract.pdf', 'vehicle_registration.pdf', 'insurance_docs.pdf'],
      notes: 'Approved on 2024-01-22'
    },
    {
      id: 'CAT004',
      company: 'Green Energy Solutions',
      requestedAmount: '₹7,50,000',
      dateRequested: '2024-01-25',
      status: 'Pending Review',
      workOrderFile: 'green_energy_proposal.pdf',
      description: 'Solar panel installation project financing',
      contactPerson: 'Sunita Reddy',
      email: 'sunita.reddy@greenenergy.com',
      phone: '+91 65432 10987',
      submittedDocuments: ['project_proposal.pdf', 'environmental_clearance.pdf', 'technical_specs.pdf'],
      notes: 'New syndicate company, first CAT request'
    }
  ];

  const filteredRequests = catRequests.filter(request =>
    request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDownloadDocument = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    });
  };

  const handleViewDetails = (request: CATRequest) => {
    setSelectedRequest(request);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Verification':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/bank')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Credit Access Token (CAT) Requests</h1>
              <p className="text-gray-600">Manage CAT requests from syndicate companies</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by company name, request ID, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>CAT Requests ({filteredRequests.length})</span>
            </CardTitle>
            <CardDescription>
              Comprehensive view of all Credit Access Token requests with detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{request.company}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{request.requestedAmount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{request.dateRequested}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.contactPerson}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        {request.submittedDocuments.slice(0, 2).map((doc, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadDocument(doc)}
                            className="justify-start p-0 h-auto text-xs"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            {doc}
                          </Button>
                        ))}
                        {request.submittedDocuments.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{request.submittedDocuments.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(request)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View Details</span>
                        </Button>
                        <div className="flex space-x-1">
                          {request.status !== 'Approved' && (
                            <Button
                              size="sm"
                              onClick={() => handleApproveCAT(request.id)}
                              className="bg-green-600 hover:bg-green-700 text-xs px-2"
                            >
                              Approve
                            </Button>
                          )}
                          {request.status === 'Pending Review' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectCAT(request.id)}
                              className="text-xs px-2"
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Request Details Modal/Panel */}
        {selectedRequest && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Details - {selectedRequest.id}</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRequest(null)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Company Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Company:</strong> {selectedRequest.company}</p>
                      <p><strong>Contact Person:</strong> {selectedRequest.contactPerson}</p>
                      <p><strong>Email:</strong> {selectedRequest.email}</p>
                      <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Request Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Amount:</strong> {selectedRequest.requestedAmount}</p>
                      <p><strong>Date Requested:</strong> {selectedRequest.dateRequested}</p>
                      <p><strong>Status:</strong> 
                        <Badge className={`ml-2 ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status}
                        </Badge>
                      </p>
                      <p><strong>Description:</strong> {selectedRequest.description}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Submitted Documents</h4>
                    <div className="space-y-2">
                      {selectedRequest.submittedDocuments.map((doc, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                          className="w-full justify-start"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {doc}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="h-4 w-4 mt-1 text-gray-400" />
                      <p className="text-sm text-gray-600">{selectedRequest.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CATRequests;
