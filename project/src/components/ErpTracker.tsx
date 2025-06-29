import React, { useState } from 'react';
import { Shield, Target, Clock, Loader } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const ErpTracker: React.FC = () => {
  const { user } = useAuth();
  const { erpSessions, addErpSession, loading } = useDatabase();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    exposure: '',
    anxiety_before: 5,
    anxiety_after: 5,
    duration: 15,
    completed: false,
    notes: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    
    const success = await addErpSession(formData);

    if (success) {
      // Reset form
      setFormData({
        exposure: '',
        anxiety_before: 5,
        anxiety_after: 5,
        duration: 15,
        completed: false,
        notes: ''
      });
    }

    setSubmitting(false);
  };

  const recentSessions = erpSessions.slice(0, 5);
  const completedSessions = erpSessions.filter(s => s.completed).length;

  const commonExposures = [
    'Touching doorknobs without washing hands',
    'Leaving items slightly out of place',
    'Reading triggering words/phrases',
    'Watching anxiety-provoking content',
    'Resisting checking behaviors',
    'Tolerating uncertainty',
    'Social interaction challenges',
    'Contamination exposures'
  ];

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto">
          <Shield size={48} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sign In to Track ERP Sessions</h3>
          <p className="text-blue-600 text-sm">
            Create an account to start tracking your Exposure and Response Prevention exercises. 
            Build tolerance gradually with secure progress tracking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">ERP Tracker</h2>
        <p className="text-slate-600">Exposure and Response Prevention - Build tolerance gradually</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Exposure Exercise
              </label>
              <textarea
                value={formData.exposure}
                onChange={(e) => handleInputChange('exposure', e.target.value)}
                placeholder="Describe the exposure you plan to do or did..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
                required
              />
              
              {/* Quick Select */}
              <div className="mt-3">
                <p className="text-xs text-slate-500 mb-2">Quick select common exposures:</p>
                <div className="grid grid-cols-2 gap-2">
                  {commonExposures.map(exposure => (
                    <button
                      key={exposure}
                      type="button"
                      onClick={() => handleInputChange('exposure', exposure)}
                      className="text-left p-2 text-xs bg-slate-50 text-slate-600 rounded hover:bg-slate-100 transition-colors"
                    >
                      {exposure}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <div className="flex items-center justify-between">
                    <span>Anxiety Before</span>
                    <span className="font-semibold text-red-600">{formData.anxiety_before}/10</span>
                  </div>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.anxiety_before}
                  onChange={(e) => handleInputChange('anxiety_before', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Very Calm</span>
                  <span>Extremely Anxious</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  <div className="flex items-center justify-between">
                    <span>Anxiety After</span>
                    <span className="font-semibold text-green-600">{formData.anxiety_after}/10</span>
                  </div>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.anxiety_after}
                  onChange={(e) => handleInputChange('anxiety_after', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Very Calm</span>
                  <span>Extremely Anxious</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.completed}
                  onChange={(e) => handleInputChange('completed', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  I completed this exposure exercise
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes & Observations
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="How did it go? What did you learn?"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save ERP Session</span>
              )}
            </button>
          </form>
        </div>

        {/* Stats & Recent Sessions */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="text-emerald-600" size={20} />
              <h3 className="text-lg font-semibold text-emerald-800">Progress</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Completed Sessions</span>
                <span className="font-bold text-emerald-800">{completedSessions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Total Sessions</span>
                <span className="font-bold text-emerald-800">{erpSessions.length}</span>
              </div>
              {erpSessions.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-700">Completion Rate</span>
                  <span className="font-bold text-emerald-800">
                    {Math.round((completedSessions / erpSessions.length) * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ERP Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">ERP Guidelines</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Start with easier exposures</li>
              <li>• Stay in the situation until anxiety decreases</li>
              <li>• Don't perform compulsions during exposure</li>
              <li>• Practice regularly for best results</li>
              <li>• Work with a therapist when possible</li>
            </ul>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="text-slate-600" size={20} />
              <h3 className="text-lg font-semibold text-slate-800">Recent Sessions</h3>
            </div>
            
            {loading ? (
              <div className="text-center py-6">
                <Loader className="animate-spin mx-auto mb-3 text-slate-400" size={32} />
                <p className="text-slate-500 text-sm">Loading sessions...</p>
              </div>
            ) : recentSessions.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                <Shield size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No ERP sessions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">
                        {new Date(session.created_at).toLocaleDateString()}
                      </span>
                      {session.completed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-slate-800 mb-1">
                      {session.exposure.substring(0, 50)}...
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-slate-600">
                      <span>Anxiety: {session.anxiety_before} → {session.anxiety_after}</span>
                      <span>{session.duration}min</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErpTracker;