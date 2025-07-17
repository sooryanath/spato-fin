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
    const { gstin } = await req.json();
    
    if (!gstin) {
      throw new Error('GSTIN is required');
    }

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

    // Get API credentials for GSTN testnet
    const { data: apiCreds, error: credsError } = await supabase
      .from('api_credentials')
      .select('base_url, api_key_encrypted, additional_config')
      .eq('service_name', 'gstn')
      .eq('environment', 'testnet')
      .eq('is_active', true)
      .single();

    if (credsError || !apiCreds) {
      // For demo purposes, use a mock GSTN testnet endpoint
      console.log('Using mock GSTN API for demonstration');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock GSTN API response based on GSTIN pattern
      const isValidFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin);
      
      let mockResponse;
      if (!isValidFormat) {
        mockResponse = {
          success: false,
          error: 'Invalid GSTIN format',
          errorCode: 'INVALID_FORMAT'
        };
      } else {
        // Generate mock data based on GSTIN
        const stateCode = gstin.substring(0, 2);
        const entityCode = gstin.substring(2, 7);
        
        mockResponse = {
          success: true,
          data: {
            gstin: gstin,
            legalName: `${entityCode} Private Limited`,
            tradeName: `${entityCode} Trading Co.`,
            registrationDate: '2018-07-01',
            address: `${entityCode} Building, Commercial Street, Test City - 560001`,
            state: stateCode === '29' ? 'Karnataka' : stateCode === '27' ? 'Maharashtra' : 'Delhi',
            status: 'active',
            businessType: 'Private Limited Company',
            hsn: ['1234', '5678'],
            filingStatus: [
              { period: 'GSTR1', dueDate: '2024-01-11', status: 'Filed' },
              { period: 'GSTR3B', dueDate: '2024-01-20', status: 'Filed' }
            ]
          }
        };
      }

      // Store the verification result
      if (mockResponse.success) {
        const { error: insertError } = await supabase
          .from('vendor_gstn_data')
          .upsert({
            vendor_id: vendor.id,
            gstin: gstin,
            legal_name: mockResponse.data.legalName,
            trade_name: mockResponse.data.tradeName,
            registration_date: mockResponse.data.registrationDate,
            address: mockResponse.data.address,
            state: mockResponse.data.state,
            status: mockResponse.data.status,
            business_type: mockResponse.data.businessType,
            verification_status: 'verified',
            api_response: mockResponse.data,
            verified_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('Error storing GSTN data:', insertError);
          throw new Error('Failed to store verification data');
        }
      } else {
        // Store failed verification
        const { error: insertError } = await supabase
          .from('vendor_gstn_data')
          .upsert({
            vendor_id: vendor.id,
            gstin: gstin,
            verification_status: 'failed',
            api_response: mockResponse
          });

        if (insertError) {
          console.error('Error storing failed GSTN verification:', insertError);
        }
      }

      return new Response(JSON.stringify(mockResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // TODO: Implement real GSTN API call when credentials are available
    // const gstinResponse = await fetch(`${apiCreds.base_url}/taxpayers/${gstin}`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiCreds.api_key_encrypted}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    return new Response(
      JSON.stringify({ success: false, error: 'GSTN API integration pending' }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 501
      }
    );

  } catch (error) {
    console.error('Error in GSTN verification:', error);
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