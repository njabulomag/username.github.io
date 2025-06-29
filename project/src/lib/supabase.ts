import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: number;
  anxiety: number;
  notes: string;
  triggers: string[];
  created_at: string;
}

export interface ThoughtRecord {
  id: string;
  user_id: string;
  situation: string;
  automatic_thought: string;
  emotion: string;
  evidence_for: string;
  evidence_against: string;
  balanced_thought: string;
  new_emotion: string;
  created_at: string;
}

export interface ErpSession {
  id: string;
  user_id: string;
  exposure: string;
  anxiety_before: number;
  anxiety_after: number;
  duration: number;
  completed: boolean;
  notes: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  ocd_themes: string[];
  difficulty_level: number;
  anonymous_mode: boolean;
  reminder_frequency: string;
  accessibility_settings: any;
  created_at: string;
  updated_at: string;
}

export interface ErpPlan {
  id: string;
  user_id: string;
  theme: string;
  current_level: number;
  exercises: any[];
  completed_exercises: string[];
  next_unlock_date: string;
  created_at: string;
  updated_at: string;
}

export interface MeditationSession {
  id: string;
  user_id: string;
  session_type: string;
  duration: number;
  completed: boolean;
  rating?: number;
  notes: string;
  created_at: string;
}

export interface CrisisLog {
  id: string;
  user_id: string;
  tool_used: string;
  duration?: number;
  effectiveness_rating?: number;
  notes: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description: string;
  earned_at: string;
  streak_count: number;
}

export interface CommunityPost {
  id: string;
  anonymous_id: string;
  content: string;
  post_type: string;
  likes_count: number;
  is_moderated: boolean;
  created_at: string;
}

export interface TherapistQuestion {
  id: string;
  user_id: string;
  question: string;
  category: string;
  status: string;
  therapist_response: string;
  responded_at?: string;
  created_at: string;
}

export interface SleepSession {
  id: string;
  user_id: string;
  session_type: string;
  duration?: number;
  completed: boolean;
  sleep_quality?: number;
  created_at: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  reminder_type: string;
  title: string;
  message: string;
  scheduled_for: string;
  completed: boolean;
  created_at: string;
}

export interface EducationProgress {
  id: string;
  user_id: string;
  content_id: string;
  content_type: string;
  progress_percentage: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface AiSession {
  id: string;
  user_id: string;
  session_type: 'chat' | 'guided' | 'crisis';
  messages: any[];
  session_summary: string;
  mood_before?: number;
  mood_after?: number;
  duration: number;
  created_at: string;
  updated_at: string;
}