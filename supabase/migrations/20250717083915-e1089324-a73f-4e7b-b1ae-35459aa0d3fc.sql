-- Create vendor GSTN data table
CREATE TABLE public.vendor_gstn_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  gstin TEXT NOT NULL,
  legal_name TEXT,
  trade_name TEXT,
  registration_date DATE,
  address TEXT,
  state TEXT,
  status TEXT CHECK (status IN ('active', 'inactive', 'cancelled')),
  business_type TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  api_response JSONB,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vendor_id)
);

-- Create vendor AA data table
CREATE TABLE public.vendor_aa_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  aa_status TEXT DEFAULT 'not_connected' CHECK (aa_status IN ('not_connected', 'pending', 'connected', 'failed')),
  consent_id TEXT,
  consent_status TEXT,
  consent_expiry TIMESTAMP WITH TIME ZONE,
  financial_data JSONB,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vendor_id)
);

-- Create vendor bank accounts table
CREATE TABLE public.vendor_bank_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  aa_data_id UUID NOT NULL REFERENCES public.vendor_aa_data(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_type TEXT,
  account_number_masked TEXT,
  ifsc_code TEXT,
  branch TEXT,
  balance DECIMAL(15,2),
  last_transaction_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create API credentials table for managing third-party API keys
CREATE TABLE public.api_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL, -- 'gstn', 'account_aggregator', etc.
  environment TEXT NOT NULL DEFAULT 'testnet' CHECK (environment IN ('testnet', 'production')),
  api_key_encrypted TEXT,
  api_secret_encrypted TEXT,
  base_url TEXT NOT NULL,
  additional_config JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(service_name, environment)
);

-- Enable RLS on all new tables
ALTER TABLE public.vendor_gstn_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_aa_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_credentials ENABLE ROW LEVEL SECURITY;

-- RLS policies for vendor_gstn_data
CREATE POLICY "Vendors can view their own GSTN data" 
ON public.vendor_gstn_data 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.vendors v 
    WHERE v.id = vendor_gstn_data.vendor_id 
    AND v.profile_id = auth.uid()
  )
);

CREATE POLICY "Vendors can insert their own GSTN data" 
ON public.vendor_gstn_data 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.vendors v 
    WHERE v.id = vendor_gstn_data.vendor_id 
    AND v.profile_id = auth.uid()
  )
);

CREATE POLICY "Vendors can update their own GSTN data" 
ON public.vendor_gstn_data 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.vendors v 
    WHERE v.id = vendor_gstn_data.vendor_id 
    AND v.profile_id = auth.uid()
  )
);

CREATE POLICY "Banks can view all GSTN data" 
ON public.vendor_gstn_data 
FOR SELECT 
USING (get_current_user_role() = 'bank'::user_role);

-- RLS policies for vendor_aa_data
CREATE POLICY "Vendors can manage their own AA data" 
ON public.vendor_aa_data 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.vendors v 
    WHERE v.id = vendor_aa_data.vendor_id 
    AND v.profile_id = auth.uid()
  )
);

CREATE POLICY "Banks can view all AA data" 
ON public.vendor_aa_data 
FOR SELECT 
USING (get_current_user_role() = 'bank'::user_role);

-- RLS policies for vendor_bank_accounts
CREATE POLICY "Vendors can view their own bank accounts" 
ON public.vendor_bank_accounts 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.vendors v 
    WHERE v.id = vendor_bank_accounts.vendor_id 
    AND v.profile_id = auth.uid()
  )
);

CREATE POLICY "Banks can view all bank accounts" 
ON public.vendor_bank_accounts 
FOR SELECT 
USING (get_current_user_role() = 'bank'::user_role);

-- RLS policies for api_credentials (only banks can manage)
CREATE POLICY "Only banks can manage API credentials" 
ON public.api_credentials 
FOR ALL 
USING (get_current_user_role() = 'bank'::user_role);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_vendor_gstn_data_updated_at
  BEFORE UPDATE ON public.vendor_gstn_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_aa_data_updated_at
  BEFORE UPDATE ON public.vendor_aa_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_bank_accounts_updated_at
  BEFORE UPDATE ON public.vendor_bank_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_api_credentials_updated_at
  BEFORE UPDATE ON public.api_credentials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();