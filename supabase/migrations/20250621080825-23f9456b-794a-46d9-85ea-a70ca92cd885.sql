
-- Safely add missing foreign key constraints (only if they don't exist)
DO $$ 
BEGIN
    -- Check and add profiles constraint
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_id_fkey' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_id_fkey 
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    -- Check and add companies constraint
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'companies_profile_id_fkey' 
        AND table_name = 'companies'
    ) THEN
        ALTER TABLE public.companies 
        ADD CONSTRAINT companies_profile_id_fkey 
        FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    -- Check and add vendors constraints
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'vendors_profile_id_fkey' 
        AND table_name = 'vendors'
    ) THEN
        ALTER TABLE public.vendors 
        ADD CONSTRAINT vendors_profile_id_fkey 
        FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'vendors_parent_vendor_id_fkey' 
        AND table_name = 'vendors'
    ) THEN
        ALTER TABLE public.vendors 
        ADD CONSTRAINT vendors_parent_vendor_id_fkey 
        FOREIGN KEY (parent_vendor_id) REFERENCES public.vendors(id) ON DELETE SET NULL;
    END IF;

    -- Check and add token_balances constraint
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'token_balances_profile_id_fkey' 
        AND table_name = 'token_balances'
    ) THEN
        ALTER TABLE public.token_balances 
        ADD CONSTRAINT token_balances_profile_id_fkey 
        FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    -- Check and add token_transactions constraints
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'token_transactions_from_profile_id_fkey' 
        AND table_name = 'token_transactions'
    ) THEN
        ALTER TABLE public.token_transactions 
        ADD CONSTRAINT token_transactions_from_profile_id_fkey 
        FOREIGN KEY (from_profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'token_transactions_to_profile_id_fkey' 
        AND table_name = 'token_transactions'
    ) THEN
        ALTER TABLE public.token_transactions 
        ADD CONSTRAINT token_transactions_to_profile_id_fkey 
        FOREIGN KEY (to_profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;

    -- Check and add loans constraints
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'loans_borrower_profile_id_fkey' 
        AND table_name = 'loans'
    ) THEN
        ALTER TABLE public.loans 
        ADD CONSTRAINT loans_borrower_profile_id_fkey 
        FOREIGN KEY (borrower_profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'loans_lender_profile_id_fkey' 
        AND table_name = 'loans'
    ) THEN
        ALTER TABLE public.loans 
        ADD CONSTRAINT loans_lender_profile_id_fkey 
        FOREIGN KEY (lender_profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;

    -- Check and add company_vendors constraints
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'company_vendors_company_id_fkey' 
        AND table_name = 'company_vendors'
    ) THEN
        ALTER TABLE public.company_vendors 
        ADD CONSTRAINT company_vendors_company_id_fkey 
        FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'company_vendors_vendor_id_fkey' 
        AND table_name = 'company_vendors'
    ) THEN
        ALTER TABLE public.company_vendors 
        ADD CONSTRAINT company_vendors_vendor_id_fkey 
        FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;
    END IF;

    -- Check and add disputes constraints
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'disputes_loan_id_fkey' 
        AND table_name = 'disputes'
    ) THEN
        ALTER TABLE public.disputes 
        ADD CONSTRAINT disputes_loan_id_fkey 
        FOREIGN KEY (loan_id) REFERENCES public.loans(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'disputes_raised_by_profile_id_fkey' 
        AND table_name = 'disputes'
    ) THEN
        ALTER TABLE public.disputes 
        ADD CONSTRAINT disputes_raised_by_profile_id_fkey 
        FOREIGN KEY (raised_by_profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'disputes_resolved_by_profile_id_fkey' 
        AND table_name = 'disputes'
    ) THEN
        ALTER TABLE public.disputes 
        ADD CONSTRAINT disputes_resolved_by_profile_id_fkey 
        FOREIGN KEY (resolved_by_profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Fix enum type inconsistencies in transaction_type
DO $$ BEGIN
    ALTER TYPE transaction_type ADD VALUE IF NOT EXISTS 'loan_disbursement';
    ALTER TYPE transaction_type ADD VALUE IF NOT EXISTS 'loan_repayment';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update vendor_status enum to match expected values
DO $$ BEGIN
    -- Add missing 'suspended' status if it doesn't exist
    ALTER TYPE vendor_status ADD VALUE IF NOT EXISTS 'suspended';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Fix loan_status enum inconsistencies
DO $$ BEGIN
    ALTER TYPE loan_status ADD VALUE IF NOT EXISTS 'completed';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add missing indexes for better performance
CREATE INDEX IF NOT EXISTS idx_token_transactions_status ON public.token_transactions(status);
CREATE INDEX IF NOT EXISTS idx_loans_due_date ON public.loans(due_date);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON public.disputes(status);
CREATE INDEX IF NOT EXISTS idx_companies_verification_status ON public.companies(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON public.vendors(status);

-- Update RLS policies to use security definer functions to avoid recursion
CREATE OR REPLACE FUNCTION public.get_current_user_profile_id()
RETURNS UUID AS $$
  SELECT id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Recreate RLS policies with proper structure
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Banks can view all profiles" ON public.profiles;
CREATE POLICY "Banks can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- Update companies policies
DROP POLICY IF EXISTS "Companies can view their own data" ON public.companies;
CREATE POLICY "Companies can view their own data" ON public.companies
  FOR ALL USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Banks can view all companies" ON public.companies;
CREATE POLICY "Banks can view all companies" ON public.companies
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- Update vendors policies
DROP POLICY IF EXISTS "Vendors can view their own data" ON public.vendors;
CREATE POLICY "Vendors can view their own data" ON public.vendors
  FOR ALL USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Banks can view all vendors" ON public.vendors;
CREATE POLICY "Banks can view all vendors" ON public.vendors
  FOR SELECT USING (public.get_current_user_role() = 'bank');

DROP POLICY IF EXISTS "Companies can view their vendors" ON public.vendors;
CREATE POLICY "Companies can view their vendors" ON public.vendors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.company_vendors cv
      JOIN public.companies c ON c.id = cv.company_id
      WHERE cv.vendor_id = vendors.id AND c.profile_id = auth.uid()
    )
  );

-- Update token_balances policies
DROP POLICY IF EXISTS "Users can view their own balance" ON public.token_balances;
CREATE POLICY "Users can view their own balance" ON public.token_balances
  FOR SELECT USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own balance" ON public.token_balances;
CREATE POLICY "Users can update their own balance" ON public.token_balances
  FOR UPDATE USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Banks can view all balances" ON public.token_balances;
CREATE POLICY "Banks can view all balances" ON public.token_balances
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- Update token_transactions policies
DROP POLICY IF EXISTS "Users can view their transactions" ON public.token_transactions;
CREATE POLICY "Users can view their transactions" ON public.token_transactions
  FOR SELECT USING (from_profile_id = auth.uid() OR to_profile_id = auth.uid());

DROP POLICY IF EXISTS "Banks can view all transactions" ON public.token_transactions;
CREATE POLICY "Banks can view all transactions" ON public.token_transactions
  FOR SELECT USING (public.get_current_user_role() = 'bank');

DROP POLICY IF EXISTS "Users can create transactions" ON public.token_transactions;
CREATE POLICY "Users can create transactions" ON public.token_transactions
  FOR INSERT WITH CHECK (from_profile_id = auth.uid());

-- Update loans policies
DROP POLICY IF EXISTS "Users can view their loans" ON public.loans;
CREATE POLICY "Users can view their loans" ON public.loans
  FOR SELECT USING (borrower_profile_id = auth.uid() OR lender_profile_id = auth.uid());

DROP POLICY IF EXISTS "Banks can view all loans" ON public.loans;
CREATE POLICY "Banks can view all loans" ON public.loans
  FOR ALL USING (public.get_current_user_role() = 'bank');

DROP POLICY IF EXISTS "Users can create loan requests" ON public.loans;
CREATE POLICY "Users can create loan requests" ON public.loans
  FOR INSERT WITH CHECK (borrower_profile_id = auth.uid());

-- Update company_vendors policies
DROP POLICY IF EXISTS "Companies can manage their vendor relationships" ON public.company_vendors;
CREATE POLICY "Companies can manage their vendor relationships" ON public.company_vendors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.companies c
      WHERE c.id = company_vendors.company_id AND c.profile_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Banks can view all relationships" ON public.company_vendors;
CREATE POLICY "Banks can view all relationships" ON public.company_vendors
  FOR SELECT USING (public.get_current_user_role() = 'bank');

-- Update disputes policies
DROP POLICY IF EXISTS "Users can view disputes they're involved in" ON public.disputes;
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

DROP POLICY IF EXISTS "Banks can view all disputes" ON public.disputes;
CREATE POLICY "Banks can view all disputes" ON public.disputes
  FOR ALL USING (public.get_current_user_role() = 'bank');
