import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Star, Clock, Headphones } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const MeditationCenter: React.FC = () => {
  const { user } = useAuth();
  const { addMeditationSession } = useDatabase();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sessionRating, setSessionRating] = useState(0);

  const meditationSessions = [
    {
      id: 'ocd-anxiety',
      title: 'OCD Anxiety Relief',
      duration: 10,
      description: 'Specifically designed for managing OCD-related anxiety and intrusive thoughts',
      category: 'OCD-Focused',
      difficulty: 'Beginner'
    },
    {
      id: 'uncertainty-tolerance',
      title: 'Embracing Uncertainty',
      duration: 15,
      description: 'Learn to sit with uncertainty without seeking reassurance',
      category: 'OCD-Focused',
      difficulty: 'Intermediate'
    },
    {
      id: 'thought-observation',
      title: 'Observing Thoughts',
      duration: 12,
      description: 'Practice watching thoughts without judgment or engagement',
      category: 'Mindfulness',
      difficulty: 'Beginner'
    },
    {
      id: 'body-scan-anxiety',
      title: 'Body Scan for Anxiety',
      duration: 20,
      description: 'Release physical tension caused by anxiety and compulsions',
      category: 'Body Awareness',
      difficulty: 'Beginner'
    },
    {
      id: 'loving-kindness',
      title: 'Self-Compassion Practice',
      duration: 18,
      description: 'Develop kindness toward yourself, especially during difficult moments',
      category: 'Self-Compassion',
      difficulty: 'Intermediate'
    },
    {
      id: 'morning-intention',
      title: 'Morning Intention Setting',
      duration: 8,
      description: 'Start your day with clarity and purpose',
      category: 'Daily Practice',
      difficulty: 'Beginner'
    }
  ];

  const quickPractices = [
    {
      title: '3-Minute Breathing Space',
      duration: 3,
      description: 'Quick reset for overwhelming moments'
    },
    {
      title: '5-Minute Grounding',
      duration: 5,
      description: 'Anchor yourself in the present'
    },
    {
      title: '2-Minute Self-Compassion',
      duration: 2,
      description: 'Brief loving-kindness practice'
    }
  ];

  const startSession = (sessionId: string) => {
    setActiveSession(sessionId);
    setIsPlaying(true);
    setCurrentTime(0);
    setSessionRating(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const completeSession = (session: any) => {
    if (user) {
      addMeditationSession({
        session_type: session.title,
        duration: session.duration,
        completed: true,
        rating: sessionRating,
        notes: ''
      });
    }
    setActiveSession(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setSessionRating(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'OCD-Focused': 'bg-blue-100 text-blue-800',
      'Mindfulness': 'bg-purple-100 text-purple-800',
      'Body Awareness': 'bg-green-100 text-green-800',
      'Self-Compassion': 'bg-pink-100 text-pink-800',
      'Daily Practice': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 max-w-md mx-auto">
          <Headphones size={48} className="mx-auto mb-4 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Sign In for Meditation</h3>
          <p className="text-purple-600 text-sm">
            Access guided meditations specifically designed for OCD and anxiety management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Meditation Center</h2>
        <p className="text-slate-600">Mindfulness practices tailored for OCD and anxiety</p>
      </div>

      {/* Active Session Player */}
      {activeSession && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6 sticky top-20 z-30">
          {(() => {
            const session = meditationSessions.find(s => s.id === activeSession);
            return session ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800">{session.title}</h3>
                  <p className="text-slate-600">{session.description}</p>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={resetSession}
                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <RotateCcw size={20} className="text-slate-600" />
                  </button>
                  
                  <button
                    onClick={togglePlayPause}
                    className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  
                  <div className="text-center">
                    <div className="text-2xl font-mono text-slate-800">
                      {formatTime(currentTime)} / {formatTime(session.duration * 60)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / (session.duration * 60)) * 100}%` }}
                  />
                </div>

                {currentTime >= session.duration * 60 && (
                  <div className="text-center space-y-4 animate-in fade-in duration-300">
                    <h4 className="text-lg font-semibold text-slate-800">Session Complete! 🎉</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">How was this session?</p>
                      <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setSessionRating(rating)}
                            className={`p-1 ${sessionRating >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          >
                            <Star size={20} fill="currentColor" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => completeSession(session)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Complete Session
                    </button>
                  </div>
                )}
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Quick Practices */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Clock className="mr-2" size={24} />
          Quick Practices
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickPractices.map((practice, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <h4 className="font-semibold text-slate-800">{practice.title}</h4>
              <p className="text-sm text-slate-600 mb-2">{practice.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{practice.duration} min</span>
                <button 
                  onClick={() => startSession(`quick-${index}`)}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  <Play size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Sessions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditationSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{session.title}</h3>
                <p className="text-sm text-slate-600">{session.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(session.category)}`}>
                  {session.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(session.difficulty)}`}>
                  {session.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock size={16} />
                  <span className="text-sm">{session.duration} min</span>
                </div>
                <button
                  onClick={() => startSession(session.id)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Play size={16} />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">🧘‍♀️ Benefits of Meditation for OCD</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
          <ul className="space-y-2">
            <li>• Reduces anxiety and stress levels</li>
            <li>• Improves ability to observe thoughts without reacting</li>
            <li>• Builds tolerance for uncertainty and discomfort</li>
          </ul>
          <ul className="space-y-2">
            <li>• Enhances emotional regulation</li>
            <li>• Supports better sleep quality</li>
            <li>• Complements traditional OCD therapy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeditationCenter;