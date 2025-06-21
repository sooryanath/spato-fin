
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
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      urlValue: supabaseUrl
    });

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

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
        console.log(`Checking for existing user: ${user.email}`);
        const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (listError) {
          console.error('Error listing users:', listError);
          results.push({ email: user.email, success: false, error: `Failed to list users: ${listError.message}` });
          continue;
        }

        const existingUser = existingUsers.users.find(u => u.email === user.email);
        
        if (existingUser) {
          console.log(`Deleting existing user: ${user.email} (ID: ${existingUser.id})`);
          const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
          if (deleteError) {
            console.error(`Error deleting user ${user.email}:`, deleteError);
          } else {
            console.log(`Successfully deleted existing user: ${user.email}`);
          }
          
          // Also clean up profile and token balance
          await supabaseAdmin.from('profiles').delete().eq('id', existingUser.id);
          await supabaseAdmin.from('token_balances').delete().eq('profile_id', existingUser.id);
        }

        // Wait a moment for cleanup to complete
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create new user with Supabase Auth Admin API
        console.log(`Creating new user: ${user.email}`);
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

        if (!authData.user) {
          console.error(`No user data returned for ${user.email}`);
          results.push({ email: user.email, success: false, error: 'No user data returned' });
          continue;
        }

        console.log(`Created auth user: ${user.email} with ID: ${authData.user.id}`);

        // Wait a moment for user creation to propagate
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create profile manually (since trigger might not work with admin API)
        console.log(`Creating profile for: ${user.email}`);
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            id: authData.user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            organization_name: user.organizationName
          });

        if (profileError) {
          console.error(`Error creating profile for ${user.email}:`, profileError);
          // Continue anyway, as the user can still log in
        } else {
          console.log(`Created profile for: ${user.email}`);
        }

        // Create token balance
        console.log(`Creating token balance for: ${user.email}`);
        const { error: tokenError } = await supabaseAdmin
          .from('token_balances')
          .insert({
            profile_id: authData.user.id,
            available_balance: user.initialTokens,
            locked_balance: 0,
            total_balance: user.initialTokens
          });

        if (tokenError) {
          console.error(`Error creating token balance for ${user.email}:`, tokenError);
          // Continue anyway, as the user can still log in
        } else {
          console.log(`Created token balance for: ${user.email}`);
        }

        // Verify the user can be retrieved
        const { data: verifyUser, error: verifyError } = await supabaseAdmin.auth.admin.getUserById(authData.user.id);
        if (verifyError || !verifyUser.user) {
          console.error(`Error verifying user ${user.email}:`, verifyError);
          results.push({ email: user.email, success: false, error: 'User verification failed' });
          continue;
        }

        console.log(`Successfully set up and verified user: ${user.email}`);
        results.push({ 
          email: user.email, 
          success: true, 
          userId: authData.user.id,
          tokens: user.initialTokens,
          verified: true
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
    console.log('Results:', results);

    return new Response(
      JSON.stringify({
        success: failureCount === 0,
        message: `Setup completed. ${successCount} users created successfully, ${failureCount} failures.`,
        results: results,
        environment: {
          supabaseUrl,
          hasServiceKey: !!supabaseServiceKey
        }
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
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
