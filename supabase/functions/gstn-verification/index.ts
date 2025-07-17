import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// GSTN API testnet configuration
const GSTN_TESTNET_CONFIG = {
  baseUrl: 'https://gstn-api-testnet.example.com', // Replace with actual testnet URL
  apiKey: 'test_api_key', // This would be from environment
  endpoints: {
    verify: '/api/v1/gstin/verify',
    details: '/api/v1/gstin/details'
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

    const { gstin, vendorId } = await req.json();

    if (!gstin || !vendorId) {
      return new Response(
        JSON.stringify({ error: 'GSTIN and vendor ID are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting GSTIN verification for: ${gstin}`);

    // Validate GSTIN format
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstinRegex.test(gstin)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid GSTIN format',
          success: false 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get API credentials from database
    const { data: apiCreds } = await supabase
      .from('api_credentials')
      .select('*')
      .eq('service_name', 'gstn')
      .eq('environment', 'testnet')
      .eq('is_active', true)
      .single();

    // Simulate GSTN API call (replace with actual API call)
    let gstinData;
    try {
      // In real implementation, use actual GSTN testnet API
      const response = await simulateGSTNApiCall(gstin);
      gstinData = response;
    } catch (error) {
      console.error('GSTN API error:', error);
      
      // Update verification status to failed
      await supabase
        .from('vendor_gstn_data')
        .upsert({
          vendor_id: vendorId,
          gstin: gstin,
          verification_status: 'failed',
          api_response: { error: error.message }
        });

      return new Response(
        JSON.stringify({ 
          error: 'GSTN verification failed',
          success: false,
          details: error.message
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save GSTN data to database
    const { data, error } = await supabase
      .from('vendor_gstn_data')
      .upsert({
        vendor_id: vendorId,
        gstin: gstin,
        legal_name: gstinData.legalName,
        trade_name: gstinData.tradeName,
        registration_date: gstinData.registrationDate,
        address: gstinData.address,
        state: gstinData.state,
        status: gstinData.status,
        business_type: gstinData.businessType,
        verification_status: 'verified',
        api_response: gstinData,
        verified_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save GSTN data',
          success: false 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('GSTIN verification completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        data: data,
        message: 'GSTIN verified successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in GSTN verification:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Simulate GSTN API call (replace with actual implementation)
async function simulateGSTNApiCall(gstin: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock successful response for demo
  if (gstin.startsWith('27')) {
    return {
      gstin: gstin,
      legalName: 'ABC Electronics Private Limited',
      tradeName: 'ABC Electronics',
      registrationDate: '2019-07-01',
      address: '123 Industrial Area, Sector 8, Gurgaon, Haryana',
      state: 'Haryana',
      status: 'active',
      businessType: 'Private Limited Company',
      taxablePersonType: 'Regular',
      lastUpdated: new Date().toISOString()
    };
  } else {
    throw new Error('GSTIN not found or inactive');
  }
}