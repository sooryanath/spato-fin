
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ActiveLoan {
  id: string;
  vendor: string;
  amount: string;
  dueDate: string;
  totalAmount: string;
  remainingAmount: string;
}

const ActiveLoansTable: React.FC = () => {
  const [showDisputeDialog, setShowDisputeDialog] = useState<string | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  const activeLoans: ActiveLoan[] = [
    { id: 'L1001', vendor: 'Tech Solutions Ltd', amount: '₹75,000', dueDate: '2024-06-15', totalAmount: '₹82,500', remainingAmount: '₹82,500' },
    { id: 'L1002', vendor: 'Manufacturing Experts', amount: '₹50,000', dueDate: '2024-06-20', totalAmount: '₹55,000', remainingAmount: '₹30,000' },
    { id: 'L1003', vendor: 'Supply Chain Partners', amount: '₹1,25,000', dueDate: '2024-07-05', totalAmount: '₹1,37,500', remainingAmount: '₹1,37,500' },
  ];

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

  return (
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
  );
};

export default ActiveLoansTable;
