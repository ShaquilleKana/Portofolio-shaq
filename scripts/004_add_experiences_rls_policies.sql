-- Policies for experiences to allow authenticated users to manage data
CREATE POLICY "Enable insert for authenticated users on experiences" ON experiences
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users on experiences" ON experiences
FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users on experiences" ON experiences
FOR DELETE USING (auth.uid() IS NOT NULL);
