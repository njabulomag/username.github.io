/*
  # Enhanced OCD App Schema

  1. New Tables
    - `user_preferences` - Store user customization and trigger themes
    - `erp_plans` - Progressive ERP exercise plans
    - `meditation_sessions` - Track meditation and mindfulness usage
    - `crisis_logs` - Log crisis toolkit usage for insights
    - `achievements` - Track user progress badges and milestones
    - `community_posts` - Anonymous peer support posts
    - `therapist_questions` - Premium Q&A feature
    - `sleep_sessions` - Track sleep aid tool usage
    - `reminders` - Smart reminder system
    - `education_progress` - Track psychoeducation content consumption

  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies for user data access
    - Anonymous community features with moderation
*/

-- User Preferences and Customization
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ocd_themes text[] DEFAULT '{}',
  difficulty_level integer DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
  anonymous_mode boolean DEFAULT false,
  reminder_frequency text DEFAULT 'daily',
  accessibility_settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Progressive ERP Plans
CREATE TABLE IF NOT EXISTS erp_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  theme text NOT NULL,
  current_level integer DEFAULT 1,
  exercises jsonb DEFAULT '[]',
  completed_exercises text[] DEFAULT '{}',
  next_unlock_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Meditation and Mindfulness Sessions
CREATE TABLE IF NOT EXISTS meditation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_type text NOT NULL,
  duration integer NOT NULL CHECK (duration > 0),
  completed boolean DEFAULT false,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Crisis Toolkit Usage
CREATE TABLE IF NOT EXISTS crisis_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tool_used text NOT NULL,
  duration integer,
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 10),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Achievement System
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  streak_count integer DEFAULT 0
);

-- Anonymous Community Support
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  anonymous_id text NOT NULL,
  content text NOT NULL,
  post_type text DEFAULT 'support',
  likes_count integer DEFAULT 0,
  is_moderated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Therapist Q&A (Premium)
CREATE TABLE IF NOT EXISTS therapist_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question text NOT NULL,
  category text DEFAULT 'general',
  status text DEFAULT 'pending',
  therapist_response text DEFAULT '',
  responded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Sleep Aid Sessions
CREATE TABLE IF NOT EXISTS sleep_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_type text NOT NULL,
  duration integer,
  completed boolean DEFAULT false,
  sleep_quality integer CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  created_at timestamptz DEFAULT now()
);

-- Smart Reminders
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reminder_type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Education Progress Tracking
CREATE TABLE IF NOT EXISTS education_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_id text NOT NULL,
  content_type text NOT NULL,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own ERP plans"
  ON erp_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own meditation sessions"
  ON meditation_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own crisis logs"
  ON crisis_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own achievements"
  ON achievements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Community posts are publicly readable"
  ON community_posts
  FOR SELECT
  TO authenticated
  USING (is_moderated = true);

CREATE POLICY "Users can create community posts"
  ON community_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can manage own therapist questions"
  ON therapist_questions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own sleep sessions"
  ON sleep_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own reminders"
  ON reminders
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own education progress"
  ON education_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX user_preferences_user_id_idx ON user_preferences(user_id);
CREATE INDEX erp_plans_user_id_theme_idx ON erp_plans(user_id, theme);
CREATE INDEX meditation_sessions_user_id_created_at_idx ON meditation_sessions(user_id, created_at DESC);
CREATE INDEX crisis_logs_user_id_created_at_idx ON crisis_logs(user_id, created_at DESC);
CREATE INDEX achievements_user_id_earned_at_idx ON achievements(user_id, earned_at DESC);
CREATE INDEX community_posts_created_at_idx ON community_posts(created_at DESC);
CREATE INDEX therapist_questions_user_id_status_idx ON therapist_questions(user_id, status);
CREATE INDEX sleep_sessions_user_id_created_at_idx ON sleep_sessions(user_id, created_at DESC);
CREATE INDEX reminders_user_id_scheduled_for_idx ON reminders(user_id, scheduled_for);
CREATE INDEX education_progress_user_id_content_idx ON education_progress(user_id, content_id);