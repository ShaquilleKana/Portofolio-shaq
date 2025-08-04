-- Drop all known existing RLS policies for the 'experiences' table to ensure a clean slate
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON experiences;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON experiences;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON experiences;
DROP POLICY IF EXISTS "Allow service role to insert experiences" ON experiences;
DROP POLICY IF EXISTS "Allow service role to update experiences" ON experiences;
DROP POLICY IF EXISTS "Allow service role to delete experiences" ON experiences;
DROP POLICY IF EXISTS "Enable read access for all users" ON experiences;
DROP POLICY IF EXISTS "Allow public read access for experiences" ON experiences;
DROP POLICY IF EXISTS "Allow service role to insert experiences data" ON experiences;
DROP POLICY IF EXISTS "Allow service role to update experiences data" ON experiences;
DROP POLICY IF EXISTS "Allow service role to delete experiences data" ON experiences;

-- Ensure Row Level Security is enabled for the 'experiences' table
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Policy to allow all users to read (SELECT) experiences data
CREATE POLICY "Allow public read access for experiences" ON experiences
FOR SELECT USING (TRUE);

-- Policies to allow only the 'service_role' to insert, update, and delete experiences data
-- This ensures that server-side operations using the service_role key can manage the data.
CREATE POLICY "Allow service role to insert experiences data" ON experiences
FOR INSERT TO service_role WITH CHECK (TRUE);

CREATE POLICY "Allow service role to update experiences data" ON experiences
FOR UPDATE TO service_role USING (TRUE);

CREATE POLICY "Allow service role to delete experiences data" ON experiences
FOR DELETE TO service_role USING (TRUE);
