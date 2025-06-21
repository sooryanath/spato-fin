
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DemoUser {
  email: string;
  password: string;
  name: string;
  role: 'bank' | 'company' | 'vendor';
  organizationName: string;
  initialTokens: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting demo users setup...');

    // Define demo users
    const demoUsers: DemoUser[] = [
      {
        email: 'bank@hdfc.com',
        password: 'demo123',
        name: 'HDFC Bank Admin',
        role: 'bank',
        organizationName: 'HDFC Bank Ltd',
        initialTokens: 1000000
      },
      {
        email: 'finance@techcorp.com',
        password: 'demo123',
        name: 'TechCorp Finance',
        role: 'company',
        organizationName: 'TechCorp Industries',
        initialTokens: 50000
      },
      {
        email: 'vendor@supplies.com',
        password: 'demo123',
        name: 'Global Supplies',
        role: 'vendor',
        organizationName: 'Global Supplies Co',
        initialTokens: 10000
      }
    ];

    const results = [];

    for (const user of demoUsers) {
      console.log(`Setting up user: ${user.email}`);
      
      try {
        // First, try to delete existing user if they exist
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = existingUsers.users.find(u => u.email === user.email);
        
        if (existingUser) {
          console.log(`Deleting existing user: ${user.email}`);
          await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
        }

        // Create new user with Supabase Auth Admin API
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true, // Skip email confirmation for demo users
          user_metadata: {
            name: user.name,
            role: user.role,
            organization_name: user.organizationName
          }
        });

        if (authError) {
          console.error(`Error creating auth user ${user.email}:`, authError);
          results.push({ email: user.email, success: false, error: authError.message });
          continue;
        }

        console.log(`Created auth user: ${user.email} with ID: ${authData.user.id}`);

        // Create profile (should be created by trigger, but let's ensure it exists)
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .upsert({
            id: authData.user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            organization_name: user.organizationName
          });

        if (profileError) {
          console.error(`Error creating profile for ${user.email}:`, profileError);
          results.push({ email: user.email, success: false, error: profileError.message });
          continue;
        }

        // Create token balance
        const { error: tokenError } = await supabaseAdmin
          .from('token_balances')
          .upsert({
            profile_id: authData.user.id,
            available_balance: user.initialTokens,
            locked_balance: 0,
            total_balance: user.initialTokens
          });

        if (tokenError) {
          console.error(`Error creating token balance for ${user.email}:`, tokenError);
          results.push({ email: user.email, success: false, error: tokenError.message });
          continue;
        }

        console.log(`Successfully set up user: ${user.email}`);
        results.push({ 
          email: user.email, 
          success: true, 
          userId: authData.user.id,
          tokens: user.initialTokens
        });

      } catch (error) {
        console.error(`Unexpected error setting up user ${user.email}:`, error);
        results.push({ 
          email: user.email, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Demo users setup completed. Success: ${successCount}, Failures: ${failureCount}`);

    return new Response(
      JSON.stringify({
        success: failureCount === 0,
        message: `Setup completed. ${successCount} users created successfully, ${failureCount} failures.`,
        results: results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in setup-demo-users function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
