
-- Fix the handle_new_user trigger function to safely handle role casting
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role_value user_role;
  user_name_value text;
  user_org_value text;
BEGIN
  -- Safely extract and validate the role
  BEGIN
    user_role_value := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'company');
  EXCEPTION WHEN invalid_text_representation THEN
    -- If role casting fails, default to 'company'
    user_role_value := 'company';
  END;
  
  -- Extract name and organization with fallbacks
  user_name_value := COALESCE(NEW.raw_user_meta_data->>'name', 'Unknown User');
  user_org_value := COALESCE(NEW.raw_user_meta_data->>'organization_name', 'Unknown Organization');
  
  -- Insert into profiles table
  INSERT INTO public.profiles (id, name, email, role, organization_name)
  VALUES (
    NEW.id,
    user_name_value,
    NEW.email,
    user_role_value,
    user_org_value
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
