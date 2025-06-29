import React, { useState, useEffect, useRef } from 'react';
import { Heart, Zap, Wind, Headphones, Flower2, Timer } from 'lucide-react';

const CopingStrategies: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const strategies = [
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      icon: Wind,
      color: 'blue',
      description: 'A calming breathing technique to reduce anxiety',
      instructions: [
        'Inhale through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat 3-4 times'
      ]
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding',
      icon: Flower2,
      color: 'green',
      description: 'Use your senses to stay present and grounded',
      instructions: [
        '5 things you can see',
        '4 things you can touch',
        '3 things you can hear',
        '2 things you can smell',
        '1 thing you can taste'
      ]
    },
    {
      id: 'progressive',
      title: 'Progressive Muscle Relaxation',
      icon: Heart,
      color: 'pink',
      description: 'Systematically tense and relax muscle groups',
      instructions: [
        'Start with your toes, tense for 5 seconds',
        'Release and notice the relaxation',
        'Move up to your calves, thighs, etc.',
        'Work your way up to your head',
        'End with deep breathing'
      ]
    },
    {
      id: 'distraction',
      title: 'Healthy Distractions',
      icon: Zap,
      color: 'yellow',
      description: 'Redirect your attention to break obsessive cycles',
      instructions: [
        'Call a friend or family member',
        'Do 20 jumping jacks or push-ups',
        'Listen to upbeat music',
        'Work on a puzzle or sudoku',
        'Take a short walk outside'
      ]
    },
    {
      id: 'mindfulness',
      title: 'Mindful Observation',
      icon: Headphones,
      color: 'purple',
      description: 'Observe thoughts without judgment',
      instructions: [
        'Notice the thought without fighting it',
        'Label it: "I\'m having the thought that..."',
        'Remember: thoughts are not facts',
        'Let it pass like a cloud in the sky',
        'Return attention to the present'
      ]
    },
    {
      id: 'delay',
      title: 'Delay & Distract',
      icon: Timer,
      color: 'orange',
      description: 'Postpone compulsions to reduce their power',
      instructions: [
        'Set a timer for 5-10 minutes',
        'Tell yourself you\'ll do the compulsion after the timer',
        'Engage in a different activity',
        'When the timer goes off, reassess the urge',
        'Often the urge will have passed'
      ]
    }
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
    setBreathingCount(0);
    
    // Simple breathing cycle counter
    breathingIntervalRef.current = setInterval(() => {
      setBreathingCount(prev => {
        if (prev >= 3) {
          setBreathingActive(false);
          return 0;
        }
        return prev + 1;
      });
    }, 19000); // 4+7+8 = 19 seconds per cycle
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      pink: 'text-pink-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Coping Strategies</h2>
        <p className="text-slate-600">Evidence-based techniques to manage anxiety and intrusive thoughts</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          const isActive = activeStrategy === strategy.id;
          
          return (
            <div
              key={strategy.id}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                isActive 
                  ? getColorClasses(strategy.color) + ' shadow-lg transform scale-105' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
              onClick={() => setActiveStrategy(isActive ? null : strategy.id)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/50' : 'bg-slate-100'}`}>
                  <Icon className={isActive ? getIconColor(strategy.color) : 'text-slate-600'} size={24} />
                </div>
                <h3 className={`font-semibold ${isActive ? '' : 'text-slate-800'}`}>
                  {strategy.title}
                </h3>
              </div>

              <p className={`text-sm mb-4 ${isActive ? '' : 'text-slate-600'}`}>
                {strategy.description}
              </p>

              {isActive && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <h4 className="font-medium">Instructions:</h4>
                  <ol className="space-y-2">
                    {strategy.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm flex items-start space-x-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-white/70 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>

                  {strategy.id === 'breathing' && (
                    <div className="mt-4 pt-4 border-t border-white/30">
                      <button
                        onClick={startBreathingExercise}
                        disabled={breathingActive}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          breathingActive
                            ? 'bg-white/30 cursor-not-allowed'
                            : 'bg-white/70 hover:bg-white text-blue-800'
                        }`}
                      >
                        {breathingActive ? `Cycle ${breathingCount + 1}/4` : 'Start Guided Breathing'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isActive && (
                <div className="text-xs text-slate-500">
                  Click to view instructions
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-3">In Crisis? Get Help Now</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-red-800">National Suicide Prevention Lifeline:</strong>
            <br />
            <a href="tel:988" className="text-red-700 underline font-medium">988</a>
          </div>
          <div>
            <strong className="text-red-800">Crisis Text Line:</strong>
            <br />
            <span className="text-red-700">Text HOME to 741741</span>
          </div>
          <div>
            <strong className="text-red-800">International Association for OCD:</strong>
            <br />
            <a href="https://iocdf.org" className="text-red-700 underline">iocdf.org</a>
          </div>
          <div>
            <strong className="text-red-800">Emergency Services:</strong>
            <br />
            <a href="tel:911" className="text-red-700 underline font-medium">911</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopingStrategies;