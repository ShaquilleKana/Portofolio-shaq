-- Policies for hero_subtitles to allow authenticated users to manage data
CREATE POLICY "Enable insert for authenticated users" ON hero_subtitles
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON hero_subtitles
FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users" ON hero_subtitles
FOR DELETE USING (auth.uid() IS NOT NULL);
