import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GSTNVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationStart: () => void;
  onVerificationComplete: (data: any) => void;
  onVerificationFailed: () => void;
}

const GSTNVerificationModal = ({
  isOpen,
  onClose,
  onVerificationStart,
  onVerificationComplete,
  onVerificationFailed
}: GSTNVerificationModalProps) => {
  const [gstin, setGstin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
  const { toast } = useToast();

  const validateGSTIN = (gstin: string) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const handleVerification = async () => {
    if (!validateGSTIN(gstin)) {
      toast({
        title: "Invalid GSTIN",
        description: "Please enter a valid 15-character GSTIN.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setStep('verifying');
    onVerificationStart();

    try {
      // Call the GSTN verification edge function
      const { data, error } = await supabase.functions.invoke('gstn-verification', {
        body: { gstin },
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (error) {
        throw new Error(error.message || 'Verification failed');
      }

      if (data.success) {
        setStep('success');
        setTimeout(() => {
          onVerificationComplete(data.data);
          handleClose();
          toast({
            title: "GSTN Verified Successfully",
            description: "Your GST information has been verified and linked to your profile."
          });
        }, 2000);
      } else {
        setStep('error');
        onVerificationFailed();
        toast({
          title: "Verification Failed",
          description: data.error || "Unable to verify the provided GSTIN. Please check and try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setStep('error');
      onVerificationFailed();
      toast({
        title: "Verification Error",
        description: error.message || "An error occurred during verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setGstin('');
    setStep('input');
    setIsVerifying(false);
    onClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 'input':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN (GST Identification Number)</Label>
              <Input
                id="gstin"
                placeholder="e.g., 27AAPFU0939F1ZV"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                maxLength={15}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter your 15-character GSTIN for verification
              </p>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your GST information will be securely verified through the official GSTN portal. 
                This process is completely secure and compliant with data protection regulations.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleVerification}
                disabled={!validateGSTIN(gstin)}
                className="flex-1"
              >
                Verify GSTIN
              </Button>
            </div>
          </div>
        );

      case 'verifying':
        return (
          <div className="text-center space-y-4 py-8">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="font-medium">Verifying GSTIN...</h3>
              <p className="text-sm text-muted-foreground">
                This may take a few moments. Please don't close this window.
              </p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-4 py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
            <div>
              <h3 className="font-medium text-green-700">Verification Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Your GSTIN has been verified and added to your profile.
              </p>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-4 py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-red-600" />
            <div>
              <h3 className="font-medium text-red-700">Verification Failed</h3>
              <p className="text-sm text-muted-foreground">
                Unable to verify the provided GSTIN. Please check and try again.
              </p>
            </div>
            <Button onClick={() => setStep('input')} variant="outline">
              Try Again
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            GSTN Verification
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

export default GSTNVerificationModal;