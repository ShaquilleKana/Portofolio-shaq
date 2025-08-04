-- Drop ALL existing RLS policies for the 'experiences' table dynamically
-- This ensures a completely clean slate for RLS policies on this table.
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'experiences') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON experiences;';
    END LOOP;
END $$;

-- Grant ALL PRIVILEGES to the 'supabase_admin' role on the 'experiences' table.
-- This ensures the underlying role used by the service_role key has full access,
-- which RLS policies then filter. This is a strong measure to bypass persistent RLS issues.
GRANT ALL PRIVILEGES ON TABLE experiences TO supabase_admin;

-- Ensure Row Level Security is enabled for the 'experiences' table
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Policy to allow all users to read (SELECT) experiences data
-- This is for the public-facing portfolio website.
CREATE POLICY "Allow public read access for experiences" ON experiences
FOR SELECT USING (TRUE);

-- Policies to allow only the 'service_role' to insert, update, and delete experiences data.
-- This is crucial for the admin panel's server-side operations.
CREATE POLICY "Allow service role to insert experiences data" ON experiences
FOR INSERT TO service_role WITH CHECK (TRUE);

CREATE POLICY "Allow service role to update experiences data" ON experiences
FOR UPDATE TO service_role USING (TRUE);

CREATE POLICY "Allow service role to delete experiences data" ON experiences
FOR DELETE TO service_role USING (TRUE);
