
-- Insert demo users into auth.users table with proper authentication
-- Note: These are demo accounts for testing purposes
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
  '$2a$10$4K/MDQCgUd5ZPX5ULk3Mlu6VLwz1yp1tMQzxVxEj8tKp1YbDhWJg2', -- bcrypt hash for 'demo123'
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
  '$2a$10$4K/MDQCgUd5ZPX5ULk3Mlu6VLwz1yp1tMQzxVxEj8tKp1YbDhWJg2', -- bcrypt hash for 'demo123'
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
  '$2a$10$4K/MDQCgUd5ZPX5ULk3Mlu6VLwz1yp1tMQzxVxEj8tKp1YbDhWJg2', -- bcrypt hash for 'demo123'
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
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding profiles (will be created automatically by trigger, but let's ensure they exist)
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
ON CONFLICT (id) DO NOTHING;

-- Ensure token balances exist for demo users
INSERT INTO public.token_balances (profile_id, available_balance, locked_balance, total_balance)
VALUES 
('00000000-0000-0000-0000-000000000001', 1000000, 0, 1000000), -- Bank starts with 1M tokens
('00000000-0000-0000-0000-000000000002', 50000, 0, 50000),     -- Company starts with 50K tokens
('00000000-0000-0000-0000-000000000003', 10000, 0, 10000)      -- Vendor starts with 10K tokens
ON CONFLICT (profile_id) DO NOTHING;
