import React, { useState } from 'react';
import { Calendar, TrendingUp, Smile, Meh, Frown, Loader } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const MoodTracker: React.FC = () => {
  const { user } = useAuth();
  const { moodEntries, addMoodEntry, loading } = useDatabase();
  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [notes, setNotes] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const commonTriggers = [
    'Contamination fears', 'Checking behaviors', 'Symmetry/order', 'Unwanted thoughts',
    'Social situations', 'Work stress', 'Health concerns', 'Relationship issues'
  ];

  const getMoodIcon = (value: number) => {
    if (value <= 3) return <Frown className="text-red-500" size={20} />;
    if (value <= 7) return <Meh className="text-yellow-500" size={20} />;
    return <Smile className="text-green-500" size={20} />;
  };

  const getMoodColor = (value: number) => {
    if (value <= 3) return 'text-red-600';
    if (value <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    
    const success = await addMoodEntry({
      mood,
      anxiety,
      notes,
      triggers: selectedTriggers
    });

    if (success) {
      // Reset form
      setMood(5);
      setAnxiety(5);
      setNotes('');
      setSelectedTriggers([]);
    }

    setSubmitting(false);
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const recentEntries = moodEntries.slice(0, 5);

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto">
          <Calendar size={48} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sign In to Track Your Mood</h3>
          <p className="text-blue-600 text-sm">
            Create an account to start tracking your daily mood and anxiety levels. 
            Your data will be securely stored and synced across all your devices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Daily Mood Check-in</h2>
        <p className="text-slate-600">Track your mood and anxiety levels to identify patterns</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Entry Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-blue-600" size={20} />
              <span className="text-sm text-slate-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* Mood Slider */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <div className="flex items-center justify-between">
                  <span>Overall Mood</span>
                  <div className="flex items-center space-x-2">
                    {getMoodIcon(mood)}
                    <span className={`font-semibold ${getMoodColor(mood)}`}>{mood}/10</span>
                  </div>
                </div>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Very Low</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Anxiety Slider */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <div className="flex items-center justify-between">
                  <span>Anxiety Level</span>
                  <span className="font-semibold text-slate-600">{anxiety}/10</span>
                </div>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={anxiety}
                onChange={(e) => setAnxiety(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Very Calm</span>
                <span>Very Anxious</span>
              </div>
            </div>

            {/* Triggers */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Triggers (select any that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {commonTriggers.map(trigger => (
                  <button
                    key={trigger}
                    type="button"
                    onClick={() => toggleTrigger(trigger)}
                    className={`p-2 rounded-lg text-xs transition-all duration-200 ${
                      selectedTriggers.includes(trigger)
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-slate-50 text-slate-600 border-2 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling today? Any specific thoughts or experiences?"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Entry</span>
              )}
            </button>
          </form>
        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-emerald-600" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">Recent Entries</h3>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto mb-3 text-slate-400" size={32} />
              <p className="text-slate-500">Loading your entries...</p>
            </div>
          ) : recentEntries.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Calendar size={48} className="mx-auto mb-3 opacity-50" />
              <p>No entries yet. Start tracking your daily mood!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {getMoodIcon(entry.mood)}
                        <span className="text-sm text-slate-600">Mood: {entry.mood}</span>
                      </div>
                      <span className="text-sm text-slate-600">Anxiety: {entry.anxiety}</span>
                    </div>
                  </div>
                  {entry.triggers.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {entry.triggers.map(trigger => (
                          <span key={trigger} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {entry.notes && (
                    <p className="text-sm text-slate-600 mt-2">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;