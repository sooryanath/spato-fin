
-- Create the user_role enum type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('bank', 'company', 'vendor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Also create other enum types that might be missing
DO $$ BEGIN
    CREATE TYPE company_verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vendor_status AS ENUM ('pending', 'active', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE loan_status AS ENUM ('pending', 'approved', 'active', 'completed', 'defaulted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('transfer', 'mint', 'burn', 'loan_disbursement', 'loan_repayment');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Now create the trigger that handles new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, name, email, role, organization_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Unknown User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'company'),
    COALESCE(NEW.raw_user_meta_data->>'organization_name', 'Unknown Organization')
  );
  
  -- Create initial token balance
  INSERT INTO public.token_balances (profile_id, available_balance, locked_balance, total_balance)
  VALUES (NEW.id, 0, 0, 0);
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log the error but don't fail the user creation
  RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
