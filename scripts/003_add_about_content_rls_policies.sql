-- Policies for about_content to allow authenticated users to manage data
CREATE POLICY "Enable insert for authenticated users on about_content" ON about_content
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users on about_content" ON about_content
FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users on about_content" ON about_content
FOR DELETE USING (auth.uid() IS NOT NULL);
