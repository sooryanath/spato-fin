
-- Create enum types for better data consistency
CREATE TYPE user_role AS ENUM ('bank', 'company', 'vendor');
CREATE TYPE transaction_type AS ENUM ('transfer', 'receive', 'mint', 'burn', 'redeem');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE loan_status AS ENUM ('pending', 'approved', 'active', 'repaid', 'defaulted', 'disputed');
CREATE TYPE company_verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE vendor_status AS ENUM ('active', 'inactive', 'pending');

-- Profiles table to extend auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL,
  organization_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies table for detailed company information
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  registration_number TEXT,
  industry TEXT,
  annual_revenue DECIMAL(15,2),
  verification_status company_verification_status DEFAULT 'pending',
  credit_limit DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Vendors table for vendor information
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  vendor_name TEXT NOT NULL,
  category TEXT,
  status vendor_status DEFAULT 'pending',
  parent_vendor_id UUID REFERENCES public.vendors(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Token balances table
CREATE TABLE public.token_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  available_balance DECIMAL(15,2) DEFAULT 0,
  locked_balance DECIMAL(15,2) DEFAULT 0,
  total_balance DECIMAL(15,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Token transactions table
CREATE TABLE public.token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_profile_id UUID REFERENCES public.profiles(id),
  to_profile_id UUID REFERENCES public.profiles(id),
  transaction_type transaction_type NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  status transaction_status DEFAULT 'pending',
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Loans table
CREATE TABLE public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_profile_id UUID NOT NULL REFERENCES public.profiles(id),
  lender_profile_id UUID REFERENCES public.profiles(id),
  loan_amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  term_months INTEGER NOT NULL,
  status loan_status DEFAULT 'pending',
  collateral_tokens DECIMAL(15,2),
  start_date TIMESTAMPTZ,
  due_date TIMESTAMPTZ,
  repaid_amount DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company-Vendor relationships
CREATE TABLE public.company_vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  relationship_type TEXT DEFAULT 'supplier',
  credit_limit DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, vendor_id)
);

-- Dispute management
CREATE TABLE public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES public.loans(id),
  raised_by_profile_id UUID NOT NULL REFERENCES public.profiles(id),
  dispute_reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  resolution TEXT,
  resolved_by_profile_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Banks can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- RLS Policies for companies
CREATE POLICY "Companies can view their own data" ON public.companies
  FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Banks can view all companies" ON public.companies
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- RLS Policies for vendors
CREATE POLICY "Vendors can view their own data" ON public.vendors
  FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Banks can view all vendors" ON public.vendors
  FOR SELECT USING (public.get_current_user_role() = 'bank');

CREATE POLICY "Companies can view their vendors" ON public.vendors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.company_vendors cv
      JOIN public.companies c ON c.id = cv.company_id
      WHERE cv.vendor_id = vendors.id AND c.profile_id = auth.uid()
    )
  );

-- RLS Policies for token_balances
CREATE POLICY "Users can view their own balance" ON public.token_balances
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Users can update their own balance" ON public.token_balances
  FOR UPDATE USING (profile_id = auth.uid());

CREATE POLICY "Banks can view all balances" ON public.token_balances
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- RLS Policies for token_transactions
CREATE POLICY "Users can view their transactions" ON public.token_transactions
  FOR SELECT USING (from_profile_id = auth.uid() OR to_profile_id = auth.uid());

CREATE POLICY "Banks can view all transactions" ON public.token_transactions
  FOR SELECT USING (public.get_current_user_role() = 'bank');

CREATE POLICY "Users can create transactions" ON public.token_transactions
  FOR INSERT WITH CHECK (from_profile_id = auth.uid());

-- RLS Policies for loans
CREATE POLICY "Users can view their loans" ON public.loans
  FOR SELECT USING (borrower_profile_id = auth.uid() OR lender_profile_id = auth.uid());

CREATE POLICY "Banks can view all loans" ON public.loans
  FOR ALL USING (public.get_current_user_role() = 'bank');

CREATE POLICY "Users can create loan requests" ON public.loans
  FOR INSERT WITH CHECK (borrower_profile_id = auth.uid());

-- RLS Policies for company_vendors
CREATE POLICY "Companies can manage their vendor relationships" ON public.company_vendors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.companies c
      WHERE c.id = company_vendors.company_id AND c.profile_id = auth.uid()
    )
  );

CREATE POLICY "Banks can view all relationships" ON public.company_vendors
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- RLS Policies for disputes
CREATE POLICY "Users can view disputes they're involved in" ON public.disputes
  FOR SELECT USING (
    raised_by_profile_id = auth.uid() OR 
    resolved_by_profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.loans l 
      WHERE l.id = disputes.loan_id AND 
      (l.borrower_profile_id = auth.uid() OR l.lender_profile_id = auth.uid())
    )
  );

CREATE POLICY "Banks can view all disputes" ON public.disputes
  FOR ALL USING (public.get_current_user_role() = 'bank');

-- Create trigger function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, organization_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Unknown'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'company'),
    COALESCE(NEW.raw_user_meta_data->>'organization_name', 'Unknown Organization')
  );
  
  -- Create initial token balance
  INSERT INTO public.token_balances (profile_id, available_balance, locked_balance, total_balance)
  VALUES (NEW.id, 0, 0, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to execute the function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update token balance
CREATE OR REPLACE FUNCTION public.update_token_balance(
  p_profile_id UUID,
  p_amount_change DECIMAL(15,2),
  p_balance_type TEXT DEFAULT 'available'
)
RETURNS BOOLEAN AS $$
DECLARE
  current_balance DECIMAL(15,2);
BEGIN
  -- Get current balance
  SELECT 
    CASE 
      WHEN p_balance_type = 'available' THEN available_balance
      WHEN p_balance_type = 'locked' THEN locked_balance
      ELSE total_balance
    END INTO current_balance
  FROM public.token_balances 
  WHERE profile_id = p_profile_id;
  
  -- Check if balance would go negative
  IF current_balance + p_amount_change < 0 THEN
    RETURN FALSE;
  END IF;
  
  -- Update balance
  UPDATE public.token_balances
  SET 
    available_balance = CASE WHEN p_balance_type = 'available' THEN available_balance + p_amount_change ELSE available_balance END,
    locked_balance = CASE WHEN p_balance_type = 'locked' THEN locked_balance + p_amount_change ELSE locked_balance END,
    total_balance = available_balance + locked_balance,
    updated_at = NOW()
  WHERE profile_id = p_profile_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_token_transactions_from_profile ON public.token_transactions(from_profile_id);
CREATE INDEX idx_token_transactions_to_profile ON public.token_transactions(to_profile_id);
CREATE INDEX idx_token_transactions_created_at ON public.token_transactions(created_at);
CREATE INDEX idx_loans_borrower ON public.loans(borrower_profile_id);
CREATE INDEX idx_loans_lender ON public.loans(lender_profile_id);
CREATE INDEX idx_loans_status ON public.loans(status);
CREATE INDEX idx_company_vendors_company ON public.company_vendors(company_id);
CREATE INDEX idx_company_vendors_vendor ON public.company_vendors(vendor_id);
