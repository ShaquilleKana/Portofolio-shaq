-- Table for Hero Section Subtitles
CREATE TABLE IF NOT EXISTS hero_subtitles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtitle TEXT NOT NULL,
  order_index INT NOT NULL UNIQUE
);

-- Table for About Section Content
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description TEXT NOT NULL,
  profile_image_url TEXT
);

-- Table for Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  badges TEXT[] -- Array of text for technologies
);

-- Table for Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] -- Array of text for technologies
);

-- Table for Admin Users (for authentication)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL -- Store hashed passwords, NOT plain text
);

-- Optional: Insert initial data for admin user (replace with strong password hash in production)
-- For development, you can use a simple hash or just create user via Supabase Auth directly
-- INSERT INTO admin_users (email, password_hash) VALUES ('admin@shaq.dev', 'your_hashed_password_here');

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE hero_subtitles ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for public sections)
-- For hero_subtitles
CREATE POLICY "Enable read access for all users" ON hero_subtitles FOR SELECT USING (TRUE);

-- For about_content
CREATE POLICY "Enable read access for all users" ON about_content FOR SELECT USING (TRUE);

-- For experiences
CREATE POLICY "Enable read access for all users" ON experiences FOR SELECT USING (TRUE);

-- For projects
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (TRUE);

-- Policies for admin_users (more restrictive)
-- Admins can read their own data, but not other admin's password_hash
CREATE POLICY "Allow authenticated users to read their own admin_user data" ON admin_users FOR SELECT USING (auth.uid() = id);
-- Only service_role can insert/update/delete admin_users (or specific admin roles)
-- For now, we'll assume direct DB access or specific server-side functions handle this.
