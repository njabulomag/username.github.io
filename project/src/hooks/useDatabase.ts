import { useState, useEffect } from 'react';
import { supabase, MoodEntry, ThoughtRecord, ErpSession, UserPreferences, ErpPlan, MeditationSession, CrisisLog, Achievement, SleepSession, EducationProgress, AiSession } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useDatabase() {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [thoughtRecords, setThoughtRecords] = useState<ThoughtRecord[]>([]);
  const [erpSessions, setErpSessions] = useState<ErpSession[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [erpPlans, setErpPlans] = useState<ErpPlan[]>([]);
  const [meditationSessions, setMeditationSessions] = useState<MeditationSession[]>([]);
  const [crisisLogs, setCrisisLogs] = useState<CrisisLog[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [sleepSessions, setSleepSessions] = useState<SleepSession[]>([]);
  const [educationProgress, setEducationProgress] = useState<EducationProgress[]>([]);
  const [aiSessions, setAiSessions] = useState<AiSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      // Clear data when user logs out
      setMoodEntries([]);
      setThoughtRecords([]);
      setErpSessions([]);
      setUserPreferences(null);
      setErpPlans([]);
      setMeditationSessions([]);
      setCrisisLogs([]);
      setAchievements([]);
      setSleepSessions([]);
      setEducationProgress([]);
      setAiSessions([]);
      setLoading(false);
    }
  }, [user]);

  const loadAllData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [
        moodData,
        thoughtData,
        erpData,
        preferencesData,
        plansData,
        meditationData,
        crisisData,
        achievementData,
        sleepData,
        educationData,
        aiData
      ] = await Promise.all([
        supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('thought_records')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('erp_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('erp_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('meditation_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('crisis_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false }),
        supabase
          .from('sleep_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('education_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false }),
        supabase
          .from('ai_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      if (moodData.error) throw moodData.error;
      if (thoughtData.error) throw thoughtData.error;
      if (erpData.error) throw erpData.error;
      if (preferencesData.error) throw preferencesData.error;
      if (plansData.error) throw plansData.error;
      if (meditationData.error) throw meditationData.error;
      if (crisisData.error) throw crisisData.error;
      if (achievementData.error) throw achievementData.error;
      if (sleepData.error) throw sleepData.error;
      if (educationData.error) throw educationData.error;
      if (aiData.error) throw aiData.error;

      setMoodEntries(moodData.data || []);
      setThoughtRecords(thoughtData.data || []);
      setErpSessions(erpData.data || []);
      setUserPreferences(preferencesData.data || null);
      setErpPlans(plansData.data || []);
      setMeditationSessions(meditationData.data || []);
      setCrisisLogs(crisisData.data || []);
      setAchievements(achievementData.data || []);
      setSleepSessions(sleepData.data || []);
      setEducationProgress(educationData.data || []);
      setAiSessions(aiData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMoodEntry = async (entry: Omit<MoodEntry, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('mood_entries')
      .insert([{ ...entry, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding mood entry:', error);
      return null;
    }

    setMoodEntries(prev => [data, ...prev]);
    return data;
  };

  const addThoughtRecord = async (record: Omit<ThoughtRecord, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('thought_records')
      .insert([{ ...record, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding thought record:', error);
      return null;
    }

    setThoughtRecords(prev => [data, ...prev]);
    return data;
  };

  const addErpSession = async (session: Omit<ErpSession, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('erp_sessions')
      .insert([{ ...session, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding ERP session:', error);
      return null;
    }

    setErpSessions(prev => [data, ...prev]);
    return data;
  };

  const addMeditationSession = async (session: Omit<MeditationSession, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('meditation_sessions')
      .insert([{ ...session, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding meditation session:', error);
      return null;
    }

    setMeditationSessions(prev => [data, ...prev]);
    return data;
  };

  const addCrisisLog = async (log: Omit<CrisisLog, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('crisis_logs')
      .insert([{ ...log, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding crisis log:', error);
      return null;
    }

    setCrisisLogs(prev => [data, ...prev]);
    return data;
  };

  const addSleepSession = async (session: Omit<SleepSession, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('sleep_sessions')
      .insert([{ ...session, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding sleep session:', error);
      return null;
    }

    setSleepSessions(prev => [data, ...prev]);
    return data;
  };

  const addEducationProgress = async (progress: Omit<EducationProgress, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('education_progress')
      .insert([{ ...progress, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding education progress:', error);
      return null;
    }

    setEducationProgress(prev => [data, ...prev]);
    return data;
  };

  const addAiSession = async (session: Omit<AiSession, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('ai_sessions')
      .insert([{ ...session, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding AI session:', error);
      return null;
    }

    setAiSessions(prev => [data, ...prev]);
    return data;
  };

  const updateAiSession = async (sessionId: string, updates: Partial<AiSession>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('ai_sessions')
      .update(updates)
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating AI session:', error);
      return null;
    }

    setAiSessions(prev => prev.map(session => 
      session.id === sessionId ? data : session
    ));
    return data;
  };

  const deleteMoodEntry = async (id: string) => {
    const { error } = await supabase
      .from('mood_entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting mood entry:', error);
      return false;
    }

    setMoodEntries(prev => prev.filter(entry => entry.id !== id));
    return true;
  };

  const deleteThoughtRecord = async (id: string) => {
    const { error } = await supabase
      .from('thought_records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting thought record:', error);
      return false;
    }

    setThoughtRecords(prev => prev.filter(record => record.id !== id));
    return true;
  };

  const deleteErpSession = async (id: string) => {
    const { error } = await supabase
      .from('erp_sessions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting ERP session:', error);
      return false;
    }

    setErpSessions(prev => prev.filter(session => session.id !== id));
    return true;
  };

  return {
    moodEntries,
    thoughtRecords,
    erpSessions,
    userPreferences,
    erpPlans,
    meditationSessions,
    crisisLogs,
    achievements,
    sleepSessions,
    educationProgress,
    aiSessions,
    loading,
    addMoodEntry,
    addThoughtRecord,
    addErpSession,
    addMeditationSession,
    addCrisisLog,
    addSleepSession,
    addEducationProgress,
    addAiSession,
    updateAiSession,
    deleteMoodEntry,
    deleteThoughtRecord,
    deleteErpSession,
    refreshData: loadAllData,
  };
}