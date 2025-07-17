import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, FileText, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import GSTNVerificationModal from './GSTNVerificationModal';
import GSTNStatusDisplay from './GSTNStatusDisplay';

const GSTNVerificationCard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'not_started' | 'pending' | 'verified' | 'failed'>('not_started');
  const [gstinData, setGstinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load existing GSTN data on component mount
  useEffect(() => {
    if (user?.role === 'vendor') {
      loadGSTNData();
    }
  }, [user]);

  const loadGSTNData = async () => {
    try {
      setLoading(true);
      
      // First get vendor record
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .select('id')
        .eq('profile_id', user?.id)
        .single();

      if (vendorError || !vendor) {
        console.error('Vendor not found:', vendorError);
        return;
      }

      // Get GSTN data
      const { data: gstnData, error: gstnError } = await supabase
        .from('vendor_gstn_data')
        .select('*')
        .eq('vendor_id', vendor.id)
        .single();

      if (gstnError && gstnError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error loading GSTN data:', gstnError);
        return;
      }

      if (gstnData) {
        setGstinData(gstnData);
        setVerificationStatus(gstnData.verification_status as 'not_started' | 'pending' | 'verified' | 'failed' || 'not_started');
      }
    } catch (error) {
      console.error('Error in loadGSTNData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = (data: any) => {
    setVerificationStatus('verified');
    setGstinData(data);
    loadGSTNData(); // Reload data to get the latest information
    toast({
      title: "GSTN Verification Complete",
      description: "Your GST information has been successfully verified.",
    });
  };

  const handleVerificationFailed = () => {
    setVerificationStatus('failed');
    toast({
      title: "GSTN Verification Failed",
      description: "Please check your GSTIN and try again.",
      variant: "destructive",
    });
  };

  const getStatusConfig = () => {
    switch (verificationStatus) {
      case 'verified':
        return {
          icon: CheckCircle,
          color: 'bg-green-500/10 text-green-700 border-green-200',
          badgeVariant: 'default' as const,
          title: 'GSTN Verified',
          description: 'Your GST information has been successfully verified.'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
          badgeVariant: 'secondary' as const,
          title: 'Verification Pending',
          description: 'Your GSTN verification is being processed.'
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'bg-red-500/10 text-red-700 border-red-200',
          badgeVariant: 'destructive' as const,
          title: 'Verification Failed',
          description: 'GSTN verification failed. Please try again.'
        };
      default:
        return {
          icon: Shield,
          color: 'bg-blue-500/10 text-blue-700 border-blue-200',
          badgeVariant: 'outline' as const,
          title: 'GSTN Verification Required',
          description: 'Verify your GST information to enhance your vendor profile.'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <>
      <Card className={`border-2 ${config.color}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              GST Verification
            </CardTitle>
            <Badge variant={config.badgeVariant}>
              {verificationStatus === 'not_started' ? 'Not Started' : 
               verificationStatus === 'pending' ? 'Pending' :
               verificationStatus === 'verified' ? 'Verified' : 'Failed'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">{config.title}</h4>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>

          {verificationStatus === 'verified' && gstinData && <GSTNStatusDisplay gstinData={gstinData} />}

          <div className="flex flex-col gap-2">
            {verificationStatus !== 'verified' && (
              <Button 
                onClick={() => setIsModalOpen(true)}
                disabled={verificationStatus === 'pending'}
                className="w-full"
              >
                {verificationStatus === 'pending' ? 'Verification in Progress' : 'Start GSTN Verification'}
              </Button>
            )}
            
            {verificationStatus === 'verified' && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  View Certificate
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                  Update Details
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <GSTNVerificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerificationStart={() => setVerificationStatus('pending')}
        onVerificationComplete={handleVerificationComplete}
        onVerificationFailed={handleVerificationFailed}
      />
    </>
  );
};

export default GSTNVerificationCard;