import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Account Aggregator testnet configuration
const AA_TESTNET_CONFIG = {
  baseUrl: 'https://aa-api-testnet.example.com', // Replace with actual testnet URL
  clientId: 'test_client_id',
  clientSecret: 'test_client_secret',
  endpoints: {
    consent: '/api/consent/request',
    fetchData: '/api/data/fetch',
    status: '/api/consent/status'
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { action, vendorId, selectedBanks, consentId } = await req.json();

    if (!action || !vendorId) {
      return new Response(
        JSON.stringify({ error: 'Action and vendor ID are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`AA Integration action: ${action} for vendor: ${vendorId}`);

    switch (action) {
      case 'initiate_consent':
        return await initiateConsent(supabase, vendorId, selectedBanks);
      
      case 'check_consent_status':
        return await checkConsentStatus(supabase, vendorId, consentId);
      
      case 'fetch_financial_data':
        return await fetchFinancialData(supabase, vendorId, consentId);
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

  } catch (error) {
    console.error('Error in AA integration:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function initiateConsent(supabase: any, vendorId: string, selectedBanks: string[]) {
  try {
    console.log('Initiating consent for banks:', selectedBanks);

    // Simulate consent initiation (replace with actual AA API call)
    const consentResponse = await simulateConsentInitiation(selectedBanks);
    
    // Update vendor AA data
    const { data, error } = await supabase
      .from('vendor_aa_data')
      .upsert({
        vendor_id: vendorId,
        aa_status: 'pending',
        consent_id: consentResponse.consentId,
        consent_status: 'requested',
        consent_expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save consent data: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data: data,
        consentUrl: consentResponse.consentUrl,
        message: 'Consent initiated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Consent initiation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function checkConsentStatus(supabase: any, vendorId: string, consentId: string) {
  try {
    console.log('Checking consent status for:', consentId);

    // Simulate consent status check (replace with actual AA API call)
    const statusResponse = await simulateConsentStatusCheck(consentId);
    
    // Update vendor AA data
    const { data, error } = await supabase
      .from('vendor_aa_data')
      .update({
        consent_status: statusResponse.status,
        aa_status: statusResponse.status === 'approved' ? 'connected' : 'pending'
      })
      .eq('vendor_id', vendorId)
      .eq('consent_id', consentId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update consent status: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data: data,
        status: statusResponse.status,
        message: `Consent status: ${statusResponse.status}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Consent status check error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function fetchFinancialData(supabase: any, vendorId: string, consentId: string) {
  try {
    console.log('Fetching financial data for consent:', consentId);

    // Simulate financial data fetch (replace with actual AA API call)
    const financialData = await simulateFinancialDataFetch(consentId);
    
    // Update vendor AA data with financial information
    const { data: aaData, error: aaError } = await supabase
      .from('vendor_aa_data')
      .update({
        financial_data: financialData.summary,
        last_sync_at: new Date().toISOString()
      })
      .eq('vendor_id', vendorId)
      .eq('consent_id', consentId)
      .select()
      .single();

    if (aaError) {
      throw new Error(`Failed to update financial data: ${aaError.message}`);
    }

    // Save bank accounts
    const bankAccountPromises = financialData.accounts.map(account => 
      supabase
        .from('vendor_bank_accounts')
        .upsert({
          vendor_id: vendorId,
          aa_data_id: aaData.id,
          account_id: account.accountId,
          bank_name: account.bankName,
          account_type: account.accountType,
          account_number_masked: account.accountNumberMasked,
          ifsc_code: account.ifscCode,
          branch: account.branch,
          balance: account.balance,
          last_transaction_date: account.lastTransactionDate
        })
    );

    await Promise.all(bankAccountPromises);

    return new Response(
      JSON.stringify({ 
        success: true,
        data: {
          aaData,
          financialData: financialData.summary,
          accounts: financialData.accounts
        },
        message: 'Financial data fetched successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Financial data fetch error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Simulation functions (replace with actual AA API calls)
async function simulateConsentInitiation(selectedBanks: string[]) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    consentId: `consent_${Date.now()}`,
    consentUrl: `https://aa-testnet.example.com/consent/${Date.now()}`,
    status: 'initiated',
    selectedBanks
  };
}

async function simulateConsentStatusCheck(consentId: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate approval after some time
  return {
    consentId,
    status: Math.random() > 0.3 ? 'approved' : 'pending',
    approvedAt: new Date().toISOString()
  };
}

async function simulateFinancialDataFetch(consentId: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    consentId,
    summary: {
      totalBalance: 2500000,
      averageMonthlyIncome: 450000,
      creditScore: 750,
      riskCategory: 'Low',
      accountAge: 36
    },
    accounts: [
      {
        accountId: 'acc_001',
        bankName: 'HDFC Bank',
        accountType: 'Savings',
        accountNumberMasked: 'XXXX XXXX XX1234',
        ifscCode: 'HDFC0001234',
        branch: 'Gurgaon Main',
        balance: 1500000,
        lastTransactionDate: '2024-01-15'
      },
      {
        accountId: 'acc_002',
        bankName: 'ICICI Bank',
        accountType: 'Current',
        accountNumberMasked: 'XXXX XXXX XX5678',
        ifscCode: 'ICIC0005678',
        branch: 'Sector 32',
        balance: 1000000,
        lastTransactionDate: '2024-01-16'
      }
    ]
  };
}