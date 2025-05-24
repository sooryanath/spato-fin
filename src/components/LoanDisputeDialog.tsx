
import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface DisputedLoan {
  id: string;
  vendor: string;
  company: string;
  amount: string;
  status: string;
  dateDisputed: string;
  details?: string;
}

interface LoanDisputeDialogProps {
  loan: DisputedLoan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoanDisputeDialog: React.FC<LoanDisputeDialogProps> = ({
  loan,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Disputed Loan Case #{loan.id}</DialogTitle>
          <DialogDescription>
            Review the details of this disputed loan case
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <div id="vendor" className="text-sm font-medium mt-1">{loan.vendor}</div>
            </div>
            <div>
              <Label htmlFor="company">Syndicate Company</Label>
              <div id="company" className="text-sm font-medium mt-1">{loan.company}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div id="amount" className="text-sm font-medium mt-1">{loan.amount}</div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <div id="status" className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 mt-1">
                {loan.status}
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="date">Date Disputed</Label>
            <div id="date" className="text-sm font-medium mt-1">{loan.dateDisputed}</div>
          </div>
          
          <div>
            <Label htmlFor="details">Dispute Details</Label>
            <div id="details" className="text-sm mt-1 p-3 border rounded-md bg-gray-50">
              {loan.details || "The vendor has disputed the payment terms for this loan. Further documentation has been requested from both parties to resolve the dispute."}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Download Case Files</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanDisputeDialog;
