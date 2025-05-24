
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import LoanDisputeDialog from '@/components/LoanDisputeDialog';

interface DisputedLoan {
  id: string;
  vendor: string;
  company: string;
  amount: string;
  status: string;
  dateDisputed: string;
  details?: string;
}

const DisputedLoansTable: React.FC = () => {
  const [selectedDisputedLoan, setSelectedDisputedLoan] = useState<DisputedLoan | null>(null);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);

  const disputedLoans: DisputedLoan[] = [
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

  const handleOpenDisputeCase = (loan: DisputedLoan) => {
    setSelectedDisputedLoan(loan);
    setIsDisputeDialogOpen(true);
  };

  return (
    <>
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

      {selectedDisputedLoan && (
        <LoanDisputeDialog 
          loan={selectedDisputedLoan}
          open={isDisputeDialogOpen}
          onOpenChange={setIsDisputeDialogOpen}
        />
      )}
    </>
  );
};

export default DisputedLoansTable;
