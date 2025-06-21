
-- Delete existing demo users and recreate them with proper Supabase authentication
DELETE FROM auth.users WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002', 
  '00000000-0000-0000-0000-000000000003'
);

-- Delete corresponding profiles and token balances (if they exist)
DELETE FROM public.profiles WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
);

DELETE FROM public.token_balances WHERE profile_id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
);

-- Insert demo users with proper Supabase password hashing
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_sent_at,
  recovery_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES 
-- Bank user: bank@hdfc.com, password: demo123
(
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'bank@hdfc.com',
  crypt('demo123', gen_salt('bf')), -- Use Supabase's crypt function
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "HDFC Bank Admin", "role": "bank", "organization_name": "HDFC Bank"}',
  false,
  'authenticated',
  'authenticated',
  NOW(),
  null,
  '',
  0,
  null,
  '',
  null,
  false,
  null
),
-- Company user: finance@techcorp.com, password: demo123
(
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'finance@techcorp.com',
  crypt('demo123', gen_salt('bf')), -- Use Supabase's crypt function
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "TechCorp Finance", "role": "company", "organization_name": "TechCorp Industries"}',
  false,
  'authenticated',
  'authenticated',
  NOW(),
  null,
  '',
  0,
  null,
  '',
  null,
  false,
  null
),
-- Vendor user: vendor@supplies.com, password: demo123
(
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000000',
  'vendor@supplies.com',
  crypt('demo123', gen_salt('bf')), -- Use Supabase's crypt function
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Supply Chain Vendor", "role": "vendor", "organization_name": "Global Supplies Co"}',
  false,
  'authenticated',
  'authenticated',
  NOW(),
  null,
  '',
  0,
  null,
  '',
  null,
  false,
  null
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  updated_at = NOW();

-- Insert corresponding profiles (use UPSERT to handle existing records)
INSERT INTO public.profiles (id, name, email, role, organization_name)
VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  'HDFC Bank Admin',
  'bank@hdfc.com',
  'bank',
  'HDFC Bank'
),
(
  '00000000-0000-0000-0000-000000000002',
  'TechCorp Finance',
  'finance@techcorp.com',
  'company',
  'TechCorp Industries'
),
(
  '00000000-0000-0000-0000-000000000003',
  'Supply Chain Vendor',
  'vendor@supplies.com',
  'vendor',
  'Global Supplies Co'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  organization_name = EXCLUDED.organization_name,
  updated_at = NOW();

-- Insert token balances for demo users (use UPSERT to handle existing records)
INSERT INTO public.token_balances (profile_id, available_balance, locked_balance, total_balance)
VALUES 
('00000000-0000-0000-0000-000000000001', 1000000, 0, 1000000), -- Bank starts with 1M tokens
('00000000-0000-0000-0000-000000000002', 50000, 0, 50000),     -- Company starts with 50K tokens
('00000000-0000-0000-0000-000000000003', 10000, 0, 10000)      -- Vendor starts with 10K tokens
ON CONFLICT (profile_id) DO UPDATE SET
  available_balance = EXCLUDED.available_balance,
  locked_balance = EXCLUDED.locked_balance,
  total_balance = EXCLUDED.total_balance,
  updated_at = NOW();
