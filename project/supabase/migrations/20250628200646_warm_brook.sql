/*
  # Add AI Psychologist Sessions

  1. New Tables
    - `ai_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `session_type` (text) - chat, guided, crisis
      - `messages` (jsonb) - array of message objects
      - `session_summary` (text) - AI-generated summary
      - `mood_before` (integer) - user's mood at start (1-10)
      - `mood_after` (integer) - user's mood at end (1-10)
      - `duration` (integer) - session length in minutes
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `ai_sessions` table
    - Add policies for authenticated users to manage their own sessions
*/

CREATE TABLE IF NOT EXISTS ai_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_type text NOT NULL DEFAULT 'chat',
  messages jsonb DEFAULT '[]'::jsonb,
  session_summary text DEFAULT '',
  mood_before integer,
  mood_after integer,
  duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own AI sessions"
  ON ai_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add constraints
ALTER TABLE ai_sessions 
ADD CONSTRAINT ai_sessions_mood_before_check 
CHECK (mood_before IS NULL OR (mood_before >= 1 AND mood_before <= 10));

ALTER TABLE ai_sessions 
ADD CONSTRAINT ai_sessions_mood_after_check 
CHECK (mood_after IS NULL OR (mood_after >= 1 AND mood_after <= 10));

ALTER TABLE ai_sessions 
ADD CONSTRAINT ai_sessions_duration_check 
CHECK (duration >= 0);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS ai_sessions_user_id_created_at_idx 
ON ai_sessions(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS ai_sessions_session_type_idx 
ON ai_sessions(session_type);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_sessions_updated_at 
BEFORE UPDATE ON ai_sessions 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();