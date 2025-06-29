import React, { useState } from 'react';
import { Brain, Edit3, Lightbulb, Loader } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const ThoughtRecord: React.FC = () => {
  const { user } = useAuth();
  const { thoughtRecords, addThoughtRecord, loading } = useDatabase();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    situation: '',
    automatic_thought: '',
    emotion: '',
    evidence_for: '',
    evidence_against: '',
    balanced_thought: '',
    new_emotion: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    
    const success = await addThoughtRecord(formData);

    if (success) {
      // Reset form
      setFormData({
        situation: '',
        automatic_thought: '',
        emotion: '',
        evidence_for: '',
        evidence_against: '',
        balanced_thought: '',
        new_emotion: ''
      });
    }

    setSubmitting(false);
  };

  const recentRecords = thoughtRecords.slice(0, 3);

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto">
          <Brain size={48} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sign In to Use Thought Records</h3>
          <p className="text-blue-600 text-sm">
            Create an account to start challenging negative thoughts with CBT techniques. 
            Your records will be securely stored and accessible across devices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Thought Record</h2>
        <p className="text-slate-600">Challenge negative thoughts using CBT techniques</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Situation
                </label>
                <textarea
                  value={formData.situation}
                  onChange={(e) => handleInputChange('situation', e.target.value)}
                  placeholder="Describe the situation that triggered the thought..."
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Automatic Thought
                </label>
                <textarea
                  value={formData.automatic_thought}
                  onChange={(e) => handleInputChange('automatic_thought', e.target.value)}
                  placeholder="What thought went through your mind?"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Emotion & Intensity (1-10)
                </label>
                <input
                  type="text"
                  value={formData.emotion}
                  onChange={(e) => handleInputChange('emotion', e.target.value)}
                  placeholder="e.g., Anxious (8/10)"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Evidence For the Thought
                </label>
                <textarea
                  value={formData.evidence_for}
                  onChange={(e) => handleInputChange('evidence_for', e.target.value)}
                  placeholder="What supports this thought?"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Evidence Against the Thought
                </label>
                <textarea
                  value={formData.evidence_against}
                  onChange={(e) => handleInputChange('evidence_against', e.target.value)}
                  placeholder="What contradicts this thought?"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Balanced Thought
                </label>
                <textarea
                  value={formData.balanced_thought}
                  onChange={(e) => handleInputChange('balanced_thought', e.target.value)}
                  placeholder="What's a more balanced way to think about this?"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Emotion & Intensity (1-10)
              </label>
              <input
                type="text"
                value={formData.new_emotion}
                onChange={(e) => handleInputChange('new_emotion', e.target.value)}
                placeholder="e.g., Concerned (4/10)"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <span>Save Thought Record</span>
              )}
            </button>
          </form>
        </div>

        {/* Recent Records & Tips */}
        <div className="space-y-6">
          {/* CBT Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="text-amber-600" size={20} />
              <h3 className="text-lg font-semibold text-amber-800">CBT Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Look for thinking patterns like "all or nothing"</li>
              <li>• Ask: "What would I tell a friend?"</li>
              <li>• Consider alternative explanations</li>
              <li>• Focus on facts, not assumptions</li>
              <li>• Rate emotions before and after</li>
            </ul>
          </div>

          {/* Recent Records */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Edit3 className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-slate-800">Recent Records</h3>
            </div>
            
            {loading ? (
              <div className="text-center py-6">
                <Loader className="animate-spin mx-auto mb-3 text-slate-400" size={32} />
                <p className="text-slate-500 text-sm">Loading records...</p>
              </div>
            ) : recentRecords.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                <Brain size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No thought records yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentRecords.map((record) => (
                  <div key={record.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-600 mb-2">
                      {new Date(record.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-sm font-medium text-slate-800 mb-1">
                      {record.situation.substring(0, 60)}...
                    </div>
                    <div className="text-xs text-slate-600">
                      {record.emotion} → {record.new_emotion}
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

export default ThoughtRecord;