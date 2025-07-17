import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Plus, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Shield,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BankConnectionCard from './BankConnectionCard';
import FinancialInsights from './FinancialInsights';
import AAConsentModal from './AAConsentModal';

interface BankAccount {
  id: string;
  account_id: string;
  bank_name: string;
  account_type: string;
  account_number_masked: string;
  balance: number;
  last_transaction_date: string;
  is_active: boolean;
}

interface AAData {
  id: string;
  aa_status: string;
  consent_status: string;
  consent_expiry: string;
  financial_data: any;
  last_sync_at: string;
}

const AAIntegrationWrapper = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [aaData, setAAData] = useState<AAData | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.role === 'vendor') {
      loadAAData();
    }
  }, [user]);

  const loadAAData = async () => {
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

      // Get AA data
      const { data: aaData, error: aaError } = await supabase
        .from('vendor_aa_data')
        .select('*')
        .eq('vendor_id', vendor.id)
        .single();

      if (aaError && aaError.code !== 'PGRST116') {
        console.error('Error loading AA data:', aaError);
        return;
      }

      if (aaData) {
        setAAData(aaData);
      }

      // Get bank accounts
      const { data: accounts, error: accountsError } = await supabase
        .from('vendor_bank_accounts')
        .select('*')
        .eq('vendor_id', vendor.id)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error loading bank accounts:', accountsError);
        return;
      }

      setBankAccounts(accounts || []);
    } catch (error) {
      console.error('Error in loadAAData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    await loadAAData();
    setRefreshing(false);
    toast({
      title: "Data Refreshed",
      description: "AA data and bank accounts have been updated."
    });
  };

  const handleConsentComplete = (selectedBanks: string[]) => {
    loadAAData(); // Reload data after successful consent
    toast({
      title: "Banks Connected",
      description: `Successfully connected ${selectedBanks.length} bank account(s).`
    });
  };

  const handleConsentPending = () => {
    // Handle pending state if needed
  };

  const getAAStatusConfig = () => {
    if (!aaData) {
      return {
        status: 'not_connected',
        color: 'bg-gray-500/10 text-gray-700',
        icon: AlertCircle,
        title: 'Not Connected',
        description: 'Connect your bank accounts for enhanced financial profiling'
      };
    }

    switch (aaData.aa_status) {
      case 'connected':
        return {
          status: 'connected',
          color: 'bg-green-500/10 text-green-700',
          icon: CheckCircle,
          title: 'Connected',
          description: 'Account Aggregator connection is active'
        };
      case 'pending':
        return {
          status: 'pending',
          color: 'bg-yellow-500/10 text-yellow-700',
          icon: Loader2,
          title: 'Pending',
          description: 'Connection in progress'
        };
      default:
        return {
          status: 'not_connected',
          color: 'bg-gray-500/10 text-gray-700',
          icon: AlertCircle,
          title: 'Not Connected',
          description: 'Connect your bank accounts for enhanced financial profiling'
        };
    }
  };

  const statusConfig = getAAStatusConfig();
  const StatusIcon = statusConfig.icon;
  const connectedBanks = bankAccounts.map(account => account.bank_name);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AA Connection Status */}
      <Card className={`border-2 ${statusConfig.color.replace('text-', 'border-').replace('/10', '/20')}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Aggregator Integration
            </CardTitle>
            <Badge className={statusConfig.color}>
              <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.status === 'pending' ? 'animate-spin' : ''}`} />
              {statusConfig.title}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">{statusConfig.title}</h4>
            <p className="text-sm text-muted-foreground">{statusConfig.description}</p>
          </div>

          {aaData && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Consent Status:</span>
                <span className="ml-2 font-medium capitalize">{aaData.consent_status || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Sync:</span>
                <span className="ml-2 font-medium">
                  {aaData.last_sync_at ? new Date(aaData.last_sync_at).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {statusConfig.status !== 'connected' ? (
              <Button onClick={() => setIsModalOpen(true)} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Connect Bank Accounts
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsModalOpen(true)} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Banks
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRefreshData}
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bank Accounts */}
      {bankAccounts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Connected Bank Accounts</h3>
            <Badge variant="outline">{bankAccounts.length} account{bankAccounts.length > 1 ? 's' : ''}</Badge>
          </div>
          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <BankConnectionCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Financial Insights */}
      {aaData?.financial_data && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
          <FinancialInsights financialData={aaData.financial_data} />
        </div>
      )}

      {/* AA Consent Modal */}
      <AAConsentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConsentComplete={handleConsentComplete}
        onConsentPending={handleConsentPending}
        currentConnections={connectedBanks}
      />
    </div>
  );
};

export default AAIntegrationWrapper;