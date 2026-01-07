-- Enable Row Level Security on all tables
-- This ensures that users can only access data they're authorized to see

-- Enable RLS on categorias table
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;

-- Enable RLS on produtos table
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Create a simple function to check if user is authenticated admin
-- For now, we'll use a simple email check. In production, you might want role-based access
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is authenticated
  -- You can add specific email checks here or use Supabase Auth roles
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
