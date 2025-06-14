
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface DisputedLoan {
  id: string;
  vendor: string;
  company: string;
  amount: string;
  status: string;
  dateDisputed: string;
}

const DisputedLoansCard = () => {
  const navigate = useNavigate();

  const disputedLoans: DisputedLoan[] = [
    { id: 'L0987', vendor: 'Hardware Suppliers', company: 'TechCorp Industries', amount: '₹45,000', status: 'Under Review', dateDisputed: '2024-05-10' },
    { id: 'L0876', vendor: 'Software Solutions', company: 'Global Manufacturing', amount: '₹1,20,000', status: 'Evidence Required', dateDisputed: '2024-05-05' },
    { id: 'L0765', vendor: 'Logistics Partner', company: 'Supply Chain Ltd', amount: '₹35,000', status: 'Mediation', dateDisputed: '2024-04-28' },
  ];

  return (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/disputed-loans')}
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

export default DisputedLoansCard;
