import React, { useState, useEffect, useRef } from 'react';
import { Shield, Heart, Wind, Phone, Volume2, Timer, CheckCircle } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const CrisisToolkit: React.FC = () => {
  const { user } = useAuth();
  const { addCrisisLog } = useDatabase();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const groundingExercises = [
    {
      id: 'grounding-54321',
      title: '5-4-3-2-1 Grounding',
      icon: Shield,
      color: 'emerald',
      description: 'Use your senses to anchor yourself in the present moment',
      steps: [
        'Name 5 things you can see around you',
        'Name 4 things you can physically feel',
        'Name 3 things you can hear right now',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ]
    },
    {
      id: 'breathing-478',
      title: '4-7-8 Breathing',
      icon: Wind,
      color: 'blue',
      description: 'Calm your nervous system with controlled breathing',
      steps: [
        'Inhale quietly through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale completely through your mouth for 8 counts',
        'Repeat this cycle 3-4 times'
      ]
    },
    {
      id: 'body-scan',
      title: 'Progressive Body Scan',
      icon: Heart,
      color: 'pink',
      description: 'Release tension by focusing on each part of your body',
      steps: [
        'Start at the top of your head',
        'Notice any tension or sensations',
        'Breathe into that area and let it relax',
        'Move slowly down through your entire body',
        'End at your toes, feeling completely relaxed'
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Call Crisis Hotline',
      subtitle: '988 - Available 24/7',
      action: () => window.open('tel:988'),
      icon: Phone,
      color: 'red'
    },
    {
      title: 'Text Crisis Support',
      subtitle: 'Text HOME to 741741',
      action: () => window.open('sms:741741?body=HOME'),
      icon: Phone,
      color: 'orange'
    },
    {
      title: 'Calming Sounds',
      subtitle: 'Nature sounds & white noise',
      action: () => setActiveExercise('sounds'),
      icon: Volume2,
      color: 'green'
    }
  ];

  const calmingSounds = [
    { name: 'Ocean Waves', duration: '10 min', url: '#' },
    { name: 'Rain Forest', duration: '15 min', url: '#' },
    { name: 'White Noise', duration: 'Continuous', url: '#' },
    { name: 'Gentle Piano', duration: '8 min', url: '#' }
  ];

  // Cleanup breathing timer on unmount or when breathing stops
  useEffect(() => {
    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, []);

  // Handle breathing timer cleanup when breathing becomes inactive
  useEffect(() => {
    if (!breathingActive && breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
      breathingIntervalRef.current = null;
    }
  }, [breathingActive]);

  const startBreathingExercise = () => {
    // Clear any existing timer
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }

    setBreathingActive(true);
    setBreathingTimer(0);
    
    breathingIntervalRef.current = setInterval(() => {
      setBreathingTimer(prev => {
        if (prev >= 19) { // 4+7+8 = 19 seconds per cycle
          setBreathingActive(false);
          if (user) {
            addCrisisLog({
              tool_used: '4-7-8 Breathing',
              duration: 19,
              notes: 'Completed guided breathing exercise'
            });
          }
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const completeExercise = (exerciseId: string, duration: number) => {
    if (user) {
      addCrisisLog({
        tool_used: exerciseId,
        duration,
        notes: 'Completed crisis toolkit exercise'
      });
    }
    setActiveExercise(null);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      green: 'bg-green-50 border-green-200 text-green-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Crisis Toolkit</h2>
        <p className="text-slate-600">Immediate support tools for intense moments</p>
      </div>

      {/* Emergency Actions */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
          <Shield className="mr-2" size={24} />
          Immediate Help
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${getColorClasses(action.color)}`}
              >
                <Icon size={32} className="mx-auto mb-2" />
                <h4 className="font-semibold">{action.title}</h4>
                <p className="text-sm opacity-80">{action.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grounding Exercises */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groundingExercises.map((exercise) => {
          const Icon = exercise.icon;
          const isActive = activeExercise === exercise.id;
          
          return (
            <div
              key={exercise.id}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                isActive 
                  ? getColorClasses(exercise.color) + ' shadow-lg transform scale-105' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
              onClick={() => setActiveExercise(isActive ? null : exercise.id)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${isActive ? 'bg-white/50' : 'bg-slate-100'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold">{exercise.title}</h3>
              </div>

              <p className="text-sm mb-4">{exercise.description}</p>

              {isActive && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-3">
                    {exercise.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-white/70 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>

                  {exercise.id === 'breathing-478' && (
                    <div className="pt-4 border-t border-white/30">
                      <button
                        onClick={startBreathingExercise}
                        disabled={breathingActive}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                          breathingActive
                            ? 'bg-white/30 cursor-not-allowed'
                            : 'bg-white/70 hover:bg-white'
                        }`}
                      >
                        {breathingActive ? `Breathing... ${breathingTimer}s` : 'Start Guided Breathing'}
                      </button>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/30">
                    <button
                      onClick={() => completeExercise(exercise.title, 300)}
                      className="w-full py-2 px-4 bg-white/70 hover:bg-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle size={16} />
                      <span>Mark as Complete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Calming Sounds */}
      {activeExercise === 'sounds' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in duration-300">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            <Volume2 className="mr-2" size={24} />
            Calming Sounds
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {calmingSounds.map((sound, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                <h4 className="font-medium text-slate-800">{sound.name}</h4>
                <p className="text-sm text-slate-600">{sound.duration}</p>
                <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Play
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">🛡️ Remember</h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          These tools are designed to help you through difficult moments, but they're not a substitute for professional help. 
          If you're having thoughts of self-harm or feel unsafe, please reach out to a crisis hotline or emergency services immediately.
        </p>
      </div>
    </div>
  );
};

export default CrisisToolkit;