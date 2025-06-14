
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Loan {
  id: string;
  vendor: string;
  amount: string;
  dueDate: string;
  totalAmount: string;
  remainingAmount: string;
}

const ActiveLoansCard = () => {
  const navigate = useNavigate();
  const [disputeReason, setDisputeReason] = useState('');
  const [showDisputeDialog, setShowDisputeDialog] = useState<string | null>(null);

  const activeLoans: Loan[] = [
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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Current outstanding loans issued to vendors</CardDescription>
          </div>
        </div>
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
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/active-loans')}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Explorer</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveLoansCard;
