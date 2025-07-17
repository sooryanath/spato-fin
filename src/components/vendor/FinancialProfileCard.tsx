import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, Link, Shield, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BankConnectionCard from './BankConnectionCard';
import AAConsentModal from './AAConsentModal';
import FinancialInsights from './FinancialInsights';

const FinancialProfileCard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [aaStatus, setAAStatus] = useState<'not_connected' | 'pending' | 'connected'>('not_connected');
  const [connectedBanks, setConnectedBanks] = useState<string[]>([]);
  const [aaData, setAaData] = useState<any>(null);

  useEffect(() => {
    if (user?.role === 'vendor') {
      loadAAData();
    }
  }, [user]);

  const loadAAData = async () => {
    try {
      const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('profile_id', user?.id)
        .single();

      if (vendor) {
        const { data: aaData } = await supabase
          .from('vendor_aa_data')
          .select('*')
          .eq('vendor_id', vendor.id)
          .single();

        if (aaData) {
          setAaData(aaData);
          setAAStatus(aaData.aa_status as 'not_connected' | 'pending' | 'connected' || 'not_connected');

          const { data: bankAccounts } = await supabase
            .from('vendor_bank_accounts')
            .select('bank_name')
            .eq('vendor_id', vendor.id);

          setConnectedBanks(bankAccounts?.map(acc => acc.bank_name) || []);
        }
      }
    } catch (error) {
      console.error('Error loading AA data:', error);
    }
  };

  const getStatusConfig = () => {
    switch (aaStatus) {
      case 'connected':
        return {
          icon: CheckCircle,
          color: 'bg-green-500/10 text-green-700 border-green-200',
          badgeVariant: 'default' as const,
          title: 'Account Aggregator Connected',
          description: 'Your financial data is securely connected and being analyzed.'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
          badgeVariant: 'secondary' as const,
          title: 'Connection Pending',
          description: 'Please complete the consent process with your bank.'
        };
      default:
        return {
          icon: Building2,
          color: 'bg-blue-500/10 text-blue-700 border-blue-200',
          badgeVariant: 'outline' as const,
          title: 'Connect Your Bank Accounts',
          description: 'Link your bank accounts to enhance your financial profile and access better credit terms.'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const handleConsentComplete = (selectedBanks: string[]) => {
    setConnectedBanks(selectedBanks);
    setAAStatus('pending');
    loadAAData(); // Reload to get updated data
    toast({
      title: "Consent Initiated",
      description: "Bank account connection request has been sent. Please complete the consent process.",
    });
  };

  return (
    <>
      <Card className={`border-2 ${config.color}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              Financial Profile
            </CardTitle>
            <Badge variant={config.badgeVariant}>
              {aaStatus === 'not_connected' ? 'Not Connected' : 
               aaStatus === 'pending' ? 'Pending' : 'Connected'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">{config.title}</h4>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>

          {aaStatus === 'not_connected' && (
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Benefits of Connecting</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                <li>• Enhanced credit scoring and better loan terms</li>
                <li>• Automated financial health analysis</li>
                <li>• Faster loan approvals with verified income</li>
                <li>• Secure, consent-based data sharing</li>
              </ul>
            </div>
          )}

          {aaStatus === 'connected' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                <span className="text-sm font-medium">Connected Banks ({connectedBanks.length})</span>
              </div>
              <div className="grid gap-2">
                {connectedBanks.slice(0, 3).map((bank, index) => (
                  <BankConnectionCard key={index} bankName={bank} />
                ))}
                {connectedBanks.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{connectedBanks.length - 3} more banks connected
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {aaStatus !== 'connected' && (
              <Button 
                onClick={() => setIsConsentModalOpen(true)}
                disabled={aaStatus === 'pending'}
                className="w-full"
              >
                {aaStatus === 'pending' ? 'Consent Pending' : 'Connect Bank Accounts'}
              </Button>
            )}
            
            {aaStatus === 'connected' && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsConsentModalOpen(true)}>
                  Manage Connections
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Insights
                </Button>
              </div>
            )}
          </div>

          {aaStatus === 'connected' && (
            <>
              <Separator />
              {aaData?.financial_data && <FinancialInsights financialData={aaData.financial_data} />}
            </>
          )}
        </CardContent>
      </Card>

      <AAConsentModal 
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        onConsentComplete={handleConsentComplete}
        onConsentPending={() => setAAStatus('pending')}
        currentConnections={connectedBanks}
      />
    </>
  );
};

export default FinancialProfileCard;