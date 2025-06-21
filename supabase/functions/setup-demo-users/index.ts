
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DemoUser {
  email: string;
  password: string;
  name: string;
  role: 'bank' | 'company' | 'vendor';
  organizationName: string;
  initialBalance: number;
}

const demoUsers: DemoUser[] = [
  {
    email: "bank@hdfc.com",
    password: "demo123",
    name: "HDFC Bank Admin",
    role: "bank",
    organizationName: "HDFC Bank",
    initialBalance: 1000000
  },
  {
    email: "finance@techcorp.com",
    password: "demo123",
    name: "TechCorp Finance",
    role: "company",
    organizationName: "TechCorp Industries",
    initialBalance: 50000
  },
  {
    email: "vendor@supplies.com",
    password: "demo123",
    name: "Supply Chain Vendor",
    role: "vendor",
    organizationName: "Global Supplies Co",
    initialBalance: 10000
  }
];

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log("Starting demo user setup...");
    const results = [];

    for (const user of demoUsers) {
      try {
        console.log(`Setting up user: ${user.email}`);
        
        // First, try to delete existing user if they exist
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers.users.find(u => u.email === user.email);
        
        if (existingUser) {
          console.log(`Deleting existing user: ${user.email}`);
          await supabase.auth.admin.deleteUser(existingUser.id);
        }

        // Create new user with admin API
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true, // Skip email confirmation
          user_metadata: {
            name: user.name,
            role: user.role,
            organization_name: user.organizationName
          }
        });

        if (createError) {
          console.error(`Error creating user ${user.email}:`, createError);
          results.push({ email: user.email, error: createError.message });
          continue;
        }

        console.log(`Created user: ${user.email} with ID: ${newUser.user.id}`);

        // Update token balance
        const { error: balanceError } = await supabase
          .from('token_balances')
          .update({
            available_balance: user.initialBalance,
            total_balance: user.initialBalance,
            updated_at: new Date().toISOString()
          })
          .eq('profile_id', newUser.user.id);

        if (balanceError) {
          console.error(`Error updating balance for ${user.email}:`, balanceError);
        } else {
          console.log(`Updated balance for ${user.email}: ${user.initialBalance}`);
        }

        results.push({ 
          email: user.email, 
          success: true, 
          userId: newUser.user.id,
          balance: user.initialBalance 
        });

      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        results.push({ email: user.email, error: error.message });
      }
    }

    console.log("Demo user setup completed:", results);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Demo users setup completed",
      results 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in setup-demo-users function:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error", 
      details: error.message 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
