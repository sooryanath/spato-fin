import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, selectedBanks, consentId } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the current user from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid or expired token');
    }

    // Get vendor info for the current user
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id')
      .eq('profile_id', user.id)
      .single();

    if (vendorError || !vendor) {
      throw new Error('Vendor not found for current user');
    }

    switch (action) {
      case 'initiate_consent':
        return await handleInitiateConsent(supabase, vendor.id, selectedBanks);
      
      case 'check_consent_status':
        return await handleCheckConsentStatus(supabase, vendor.id, consentId);
      
      case 'fetch_financial_data':
        return await handleFetchFinancialData(supabase, vendor.id, consentId);
      
      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error in AA integration:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function handleInitiateConsent(supabase: any, vendorId: string, selectedBanks: string[]) {
  // Simulate AA consent initiation
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const consentId = `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const consentExpiry = new Date();
  consentExpiry.setMonth(consentExpiry.getMonth() + 3); // 3 months from now
  
  // Store AA data record
  const { error: insertError } = await supabase
    .from('vendor_aa_data')
    .upsert({
      vendor_id: vendorId,
      aa_status: 'pending',
      consent_id: consentId,
      consent_status: 'pending',
      consent_expiry: consentExpiry.toISOString()
    });

  if (insertError) {
    console.error('Error storing AA consent data:', insertError);
    throw new Error('Failed to store consent data');
  }

  // Mock consent response
  const response = {
    success: true,
    data: {
      consentId: consentId,
      consentStatus: 'pending',
      redirectUrl: `https://testnet-aa.example.com/consent/${consentId}`,
      expectedBanks: selectedBanks,
      expiryTime: consentExpiry.toISOString()
    }
  };

  return new Response(JSON.stringify(response), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleCheckConsentStatus(supabase: any, vendorId: string, consentId: string) {
  // Simulate checking consent status
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get existing AA data
  const { data: aaData, error: fetchError } = await supabase
    .from('vendor_aa_data')
    .select('*')
    .eq('vendor_id', vendorId)
    .eq('consent_id', consentId)
    .single();

  if (fetchError || !aaData) {
    throw new Error('Consent record not found');
  }

  // Mock status - for demo, auto-approve after 30 seconds
  const consentAge = Date.now() - new Date(aaData.created_at).getTime();
  const isApproved = consentAge > 30000; // 30 seconds

  let consentStatus = 'pending';
  let aaStatus = 'pending';
  
  if (isApproved) {
    consentStatus = 'approved';
    aaStatus = 'connected';
    
    // Update the record
    const { error: updateError } = await supabase
      .from('vendor_aa_data')
      .update({
        aa_status: aaStatus,
        consent_status: consentStatus
      })
      .eq('vendor_id', vendorId)
      .eq('consent_id', consentId);

    if (updateError) {
      console.error('Error updating consent status:', updateError);
    }
  }

  const response = {
    success: true,
    data: {
      consentId: consentId,
      consentStatus: consentStatus,
      aaStatus: aaStatus,
      isApproved: isApproved
    }
  };

  return new Response(JSON.stringify(response), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleFetchFinancialData(supabase: any, vendorId: string, consentId: string) {
  // Simulate fetching financial data
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock financial data
  const mockBankAccounts = [
    {
      account_id: 'acc_1234567890',
      bank_name: 'State Bank of India',
      account_type: 'Savings',
      account_number_masked: 'XXXX-XXXX-7890',
      ifsc_code: 'SBIN0001234',
      branch: 'MG Road Branch',
      balance: 125000.50,
      last_transaction_date: new Date().toISOString().split('T')[0]
    },
    {
      account_id: 'acc_0987654321',
      bank_name: 'HDFC Bank',
      account_type: 'Current',
      account_number_masked: 'XXXX-XXXX-4321',
      ifsc_code: 'HDFC0001234',
      branch: 'Commercial Street Branch',
      balance: 85000.25,
      last_transaction_date: new Date().toISOString().split('T')[0]
    }
  ];

  const mockFinancialData = {
    totalBalance: mockBankAccounts.reduce((sum, acc) => sum + acc.balance, 0),
    accountCount: mockBankAccounts.length,
    creditScore: 750,
    averageMonthlyBalance: 95000,
    monthlyIncome: 150000,
    savingsRate: 15.5,
    riskAssessment: 'Low',
    lastSync: new Date().toISOString()
  };

  // Update AA data with financial information
  const { error: updateError } = await supabase
    .from('vendor_aa_data')
    .update({
      financial_data: mockFinancialData,
      last_sync_at: new Date().toISOString()
    })
    .eq('vendor_id', vendorId)
    .eq('consent_id', consentId);

  if (updateError) {
    console.error('Error updating financial data:', updateError);
    throw new Error('Failed to store financial data');
  }

  // Get or create AA data record to link bank accounts
  const { data: aaData, error: fetchError } = await supabase
    .from('vendor_aa_data')
    .select('id')
    .eq('vendor_id', vendorId)
    .eq('consent_id', consentId)
    .single();

  if (fetchError || !aaData) {
    throw new Error('AA data record not found');
  }

  // Store bank accounts
  for (const account of mockBankAccounts) {
    const { error: bankError } = await supabase
      .from('vendor_bank_accounts')
      .upsert({
        vendor_id: vendorId,
        aa_data_id: aaData.id,
        ...account
      });

    if (bankError) {
      console.error('Error storing bank account:', bankError);
    }
  }

  const response = {
    success: true,
    data: {
      consentId: consentId,
      financialData: mockFinancialData,
      bankAccounts: mockBankAccounts,
      syncedAt: new Date().toISOString()
    }
  };

  return new Response(JSON.stringify(response), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}