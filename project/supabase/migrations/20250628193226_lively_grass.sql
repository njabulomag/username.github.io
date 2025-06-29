/*
  # Create OCD Support App Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `mood_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `mood` (integer, 1-10 scale)
      - `anxiety` (integer, 1-10 scale)
      - `notes` (text)
      - `triggers` (text array)
      - `created_at` (timestamp)
    
    - `thought_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `situation` (text)
      - `automatic_thought` (text)
      - `emotion` (text)
      - `evidence_for` (text)
      - `evidence_against` (text)
      - `balanced_thought` (text)
      - `new_emotion` (text)
      - `created_at` (timestamp)
    
    - `erp_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `exposure` (text)
      - `anxiety_before` (integer, 1-10 scale)
      - `anxiety_after` (integer, 1-10 scale)
      - `duration` (integer, minutes)
      - `completed` (boolean)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Users can only access their own records
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mood integer NOT NULL CHECK (mood >= 1 AND mood <= 10),
  anxiety integer NOT NULL CHECK (anxiety >= 1 AND anxiety <= 10),
  notes text DEFAULT '',
  triggers text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create thought_records table
CREATE TABLE IF NOT EXISTS thought_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  situation text NOT NULL,
  automatic_thought text NOT NULL,
  emotion text NOT NULL,
  evidence_for text DEFAULT '',
  evidence_against text DEFAULT '',
  balanced_thought text DEFAULT '',
  new_emotion text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create erp_sessions table
CREATE TABLE IF NOT EXISTS erp_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  exposure text NOT NULL,
  anxiety_before integer NOT NULL CHECK (anxiety_before >= 1 AND anxiety_before <= 10),
  anxiety_after integer NOT NULL CHECK (anxiety_after >= 1 AND anxiety_after <= 10),
  duration integer NOT NULL CHECK (duration > 0),
  completed boolean DEFAULT false,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE thought_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for mood_entries
CREATE POLICY "Users can read own mood entries"
  ON mood_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries"
  ON mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries"
  ON mood_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries"
  ON mood_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for thought_records
CREATE POLICY "Users can read own thought records"
  ON thought_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own thought records"
  ON thought_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own thought records"
  ON thought_records
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own thought records"
  ON thought_records
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for erp_sessions
CREATE POLICY "Users can read own ERP sessions"
  ON erp_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ERP sessions"
  ON erp_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ERP sessions"
  ON erp_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ERP sessions"
  ON erp_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS mood_entries_user_id_created_at_idx ON mood_entries(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS thought_records_user_id_created_at_idx ON thought_records(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS erp_sessions_user_id_created_at_idx ON erp_sessions(user_id, created_at DESC);

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();