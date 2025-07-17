import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Clock, AlertCircle, CheckCircle, Building2, Calendar, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AAConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentComplete: (selectedBanks: string[]) => void;
  onConsentPending: () => void;
  currentConnections: string[];
}

const AAConsentModal = ({
  isOpen,
  onClose,
  onConsentComplete,
  onConsentPending,
  currentConnections
}: AAConsentModalProps) => {
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [consentGiven, setConsentGiven] = useState(false);
  const [step, setStep] = useState<'select' | 'consent' | 'processing'>('select');
  const { toast } = useToast();

  const availableBanks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank'
  ];

  const dataCategories = [
    { name: 'Account Summary', description: 'Basic account information and balances' },
    { name: 'Transaction History', description: 'Last 12 months of transaction data' },
    { name: 'Profile Information', description: 'Account holder details and KYC data' }
  ];

  const handleBankToggle = (bank: string, checked: boolean) => {
    if (checked) {
      setSelectedBanks(prev => [...prev, bank]);
    } else {
      setSelectedBanks(prev => prev.filter(b => b !== bank));
    }
  };

  const handleProceed = () => {
    if (selectedBanks.length === 0) {
      toast({
        title: "Select Banks",
        description: "Please select at least one bank to connect.",
        variant: "destructive"
      });
      return;
    }
    setStep('consent');
  };

  const handleConsentSubmit = async () => {
    if (!consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please provide consent to proceed with bank connection.",
        variant: "destructive"
      });
      return;
    }

    setStep('processing');
    onConsentPending();

    // Simulate AA consent process
    setTimeout(() => {
      onConsentComplete(selectedBanks);
      handleClose();
      toast({
        title: "Bank Accounts Connected",
        description: `Successfully connected ${selectedBanks.length} bank account(s).`
      });
    }, 3000);
  };

  const handleClose = () => {
    setSelectedBanks([]);
    setConsentGiven(false);
    setStep('select');
    onClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 'select':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Select Banks to Connect</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose the banks you'd like to connect for enhanced financial profiling.
              </p>
            </div>

            <div className="grid gap-3">
              {availableBanks.map((bank) => {
                const isConnected = currentConnections.includes(bank);
                return (
                  <Card key={bank} className={`cursor-pointer transition-colors ${
                    isConnected ? 'bg-green-50 border-green-200' : 'hover:bg-muted/50'
                  }`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Checkbox
                        checked={selectedBanks.includes(bank) || isConnected}
                        disabled={isConnected}
                        onCheckedChange={(checked) => handleBankToggle(bank, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{bank}</span>
                          {isConnected && (
                            <Badge variant="default" className="text-xs">Connected</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                All data sharing is done through the Reserve Bank of India (RBI) approved 
                Account Aggregator framework, ensuring complete security and compliance.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleProceed} className="flex-1">
                Continue ({selectedBanks.length} selected)
              </Button>
            </div>
          </div>
        );

      case 'consent':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Data Consent & Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Please review and provide consent for the data categories we'll access.
              </p>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Selected Banks ({selectedBanks.length})</h4>
                <div className="space-y-2">
                  {selectedBanks.map((bank) => (
                    <div key={bank} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{bank}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div>
              <h4 className="font-medium mb-3">Data Categories</h4>
              <div className="space-y-3">
                {dataCategories.map((category, index) => (
                  <Card key={index} className="bg-muted/20">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium text-sm">{category.name}</span>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertDescription>
                <strong>Consent Duration:</strong> 12 months (renewable)
                <br />
                <strong>Data Usage:</strong> Credit assessment and financial profiling only
              </AlertDescription>
            </Alert>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <Checkbox
                id="consent"
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
              />
              <label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I provide consent to access my financial data as described above
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep('select')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConsentSubmit} className="flex-1">
                Provide Consent
              </Button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center space-y-4 py-8">
            <Clock className="h-12 w-12 animate-pulse mx-auto text-primary" />
            <div>
              <h3 className="font-medium">Processing Consent...</h3>
              <p className="text-sm text-muted-foreground">
                Establishing secure connections with your selected banks.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Aggregator Consent
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AAConsentModal;