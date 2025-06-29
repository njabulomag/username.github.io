import React from 'react';
import { TrendingUp, Calendar, Target, Award, BarChart3, Loader } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const Progress: React.FC = () => {
  const { user } = useAuth();
  const { moodEntries, thoughtRecords, erpSessions, loading } = useDatabase();

  // Calculate stats
  const totalDays = moodEntries.length;
  const averageMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length).toFixed(1)
    : 0;
  const averageAnxiety = moodEntries.length > 0
    ? (moodEntries.reduce((sum, entry) => sum + entry.anxiety, 0) / moodEntries.length).toFixed(1)
    : 0;
  const completedErp = erpSessions.filter(session => session.completed).length;
  const erpCompletionRate = erpSessions.length > 0 
    ? Math.round((completedErp / erpSessions.length) * 100)
    : 0;

  // Get recent mood trend
  const recentMoodEntries = moodEntries.slice(0, 7).reverse();
  const moodTrend = recentMoodEntries.length >= 2 
    ? recentMoodEntries[recentMoodEntries.length - 1]?.mood - recentMoodEntries[0]?.mood
    : 0;

  // Achievements
  const achievements = [
    {
      title: 'First Steps',
      description: 'Started tracking your mental health',
      earned: totalDays >= 1,
      icon: '🌱'
    },
    {
      title: 'Consistent Tracker',
      description: 'Logged mood for 7 days',
      earned: totalDays >= 7,
      icon: '📊'
    },
    {
      title: 'Thought Explorer',
      description: 'Completed 5 thought records',
      earned: thoughtRecords.length >= 5,
      icon: '🧠'
    },
    {
      title: 'ERP Champion',
      description: 'Completed 10 ERP sessions',
      earned: completedErp >= 10,
      icon: '🏆'
    },
    {
      title: 'Monthly Milestone',
      description: 'Tracked mood for 30 days',
      earned: totalDays >= 30,
      icon: '🎯'
    },
    {
      title: 'Anxiety Warrior',
      description: 'Average anxiety under 5',
      earned: parseFloat(averageAnxiety.toString()) < 5 && moodEntries.length >= 10,
      icon: '⚡'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto">
          <TrendingUp size={48} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sign In to View Progress</h3>
          <p className="text-blue-600 text-sm">
            Create an account to track your journey and celebrate your achievements. 
            See detailed analytics of your mental health progress over time.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader className="animate-spin mx-auto mb-4 text-slate-400" size={48} />
        <p className="text-slate-600">Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Progress</h2>
        <p className="text-slate-600">Track your journey and celebrate your achievements</p>
      </div>

      {/* Key Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-blue-600" size={24} />
            <span className="text-2xl font-bold text-blue-800">{totalDays}</span>
          </div>
          <h3 className="font-semibold text-blue-800">Days Tracked</h3>
          <p className="text-sm text-blue-600">Keep building the habit!</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-800">{averageMood}</span>
          </div>
          <h3 className="font-semibold text-green-800">Average Mood</h3>
          <p className="text-sm text-green-600">
            {moodTrend > 0 ? '↗️ Improving' : moodTrend < 0 ? '↘️ Declining' : '➡️ Stable'}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-purple-600" size={24} />
            <span className="text-2xl font-bold text-purple-800">{averageAnxiety}</span>
          </div>
          <h3 className="font-semibold text-purple-800">Average Anxiety</h3>
          <p className="text-sm text-purple-600">Lower is better</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="text-emerald-600" size={24} />
            <span className="text-2xl font-bold text-emerald-800">{erpCompletionRate}%</span>
          </div>
          <h3 className="font-semibold text-emerald-800">ERP Success Rate</h3>
          <p className="text-sm text-emerald-600">{completedErp} completed</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="text-yellow-600" size={24} />
          <h3 className="text-xl font-semibold text-slate-800">Achievements</h3>
          <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
            {earnedAchievements.length}/{achievements.length}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned
                  ? 'bg-yellow-50 border-yellow-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className={`font-semibold ${
                    achievement.earned ? 'text-yellow-800' : 'text-slate-600'
                  }`}>
                    {achievement.title}
                  </h4>
                  {achievement.earned && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                      Earned!
                    </span>
                  )}
                </div>
              </div>
              <p className={`text-sm ${
                achievement.earned ? 'text-yellow-700' : 'text-slate-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      {moodEntries.length >= 7 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Weekly Summary</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Recent Mood Levels</h4>
              <div className="space-y-2">
                {recentMoodEntries.slice(-7).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      {new Date(entry.created_at).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(entry.mood / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-8">
                        {entry.mood}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-3">Activity Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Thought Records</span>
                  <span className="font-semibold text-slate-800">{thoughtRecords.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">ERP Sessions</span>
                  <span className="font-semibold text-slate-800">{erpSessions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Completed ERPs</span>
                  <span className="font-semibold text-emerald-600">{completedErp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Keep Going! 💪</h3>
        <p className="text-slate-600">
          {totalDays === 0 && "Every journey begins with a single step. Start tracking today!"}
          {totalDays > 0 && totalDays < 7 && "Great start! Consistency is key to understanding your patterns."}
          {totalDays >= 7 && totalDays < 30 && "You're building a great habit! Keep tracking to see long-term trends."}
          {totalDays >= 30 && "Amazing dedication! You're gaining valuable insights into your mental health."}
        </p>
      </div>
    </div>
  );
};

export default Progress;