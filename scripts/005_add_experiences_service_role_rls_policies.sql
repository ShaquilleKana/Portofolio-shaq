-- Policies for experiences to explicitly allow service_role to manage data
-- These policies will ensure that server-side operations using the service_role key
-- can bypass any other RLS policies that might be implicitly applied or misconfigured.

-- Allow service_role to insert into experiences
CREATE POLICY "Allow service role to insert experiences" ON experiences
FOR INSERT TO service_role WITH CHECK (TRUE);

-- Allow service_role to update experiences
CREATE POLICY "Allow service role to update experiences" ON experiences
FOR UPDATE TO service_role USING (TRUE);

-- Allow service_role to delete experiences
CREATE POLICY "Allow service role to delete experiences" ON experiences
FOR DELETE TO service_role USING (TRUE);

-- Optional: You might want to remove or modify the previous policies that used auth.uid() IS NOT NULL
-- if they are conflicting or redundant with these service_role specific policies.
-- For example, you could drop the previous policies if you only want the service_role to manage data.
-- DROP POLICY IF EXISTS "Enable insert for authenticated users" ON experiences;
-- DROP POLICY IF EXISTS "Enable update for authenticated users" ON experiences;
-- DROP POLICY IF EXISTS "Enable delete for authenticated users" ON experiences;
