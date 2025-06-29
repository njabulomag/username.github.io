import React, { useState } from 'react';
import { Moon, Volume2, Wind, Waves, Play, Pause, Star } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const SleepCenter: React.FC = () => {
  const { user } = useAuth();
  const { addSleepSession } = useDatabase();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sleepQuality, setSleepQuality] = useState(0);

  const sleepStories = [
    {
      id: 'peaceful-garden',
      title: 'The Peaceful Garden',
      duration: 25,
      description: 'A gentle journey through a serene garden to calm your mind',
      narrator: 'Sarah'
    },
    {
      id: 'mountain-retreat',
      title: 'Mountain Retreat',
      duration: 30,
      description: 'Escape to a quiet mountain cabin for deep relaxation',
      narrator: 'Michael'
    },
    {
      id: 'ocean-waves',
      title: 'By the Ocean',
      duration: 20,
      description: 'Fall asleep to the rhythm of gentle ocean waves',
      narrator: 'Emma'
    }
  ];

  const ambientSounds = [
    {
      id: 'rain',
      title: 'Gentle Rain',
      icon: '🌧️',
      description: 'Soft rainfall on leaves'
    },
    {
      id: 'ocean',
      title: 'Ocean Waves',
      icon: '🌊',
      description: 'Rhythmic wave sounds'
    },
    {
      id: 'forest',
      title: 'Forest Night',
      icon: '🌲',
      description: 'Peaceful forest ambience'
    },
    {
      id: 'white-noise',
      title: 'White Noise',
      icon: '📻',
      description: 'Consistent background sound'
    },
    {
      id: 'brown-noise',
      title: 'Brown Noise',
      icon: '🎵',
      description: 'Deep, rumbling sound'
    },
    {
      id: 'pink-noise',
      title: 'Pink Noise',
      icon: '🎶',
      description: 'Balanced frequency noise'
    }
  ];

  const breathingExercises = [
    {
      id: 'sleep-breathing',
      title: '4-7-8 Sleep Breathing',
      duration: 10,
      description: 'Proven technique to help you fall asleep faster'
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      duration: 8,
      description: 'Equal counts for inhale, hold, exhale, hold'
    },
    {
      id: 'progressive-relaxation',
      title: 'Progressive Muscle Relaxation',
      duration: 15,
      description: 'Systematically relax every muscle in your body'
    }
  ];

  const sleepTips = [
    "Keep your bedroom cool, dark, and quiet",
    "Avoid screens 1 hour before bedtime",
    "Try to go to bed at the same time each night",
    "If you can't sleep, don't lie in bed worrying - get up and do a quiet activity",
    "Avoid caffeine 6 hours before bedtime",
    "Create a relaxing bedtime routine"
  ];

  const startSession = (sessionId: string, type: string) => {
    setActiveSession(sessionId);
    setIsPlaying(true);
  };

  const completeSession = (sessionId: string, duration: number) => {
    if (user) {
      addSleepSession({
        session_type: sessionId,
        duration,
        completed: true,
        sleep_quality: sleepQuality
      });
    }
    setActiveSession(null);
    setIsPlaying(false);
    setSleepQuality(0);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 max-w-md mx-auto">
          <Moon size={48} className="mx-auto mb-4 text-indigo-600" />
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">Sign In for Sleep Tools</h3>
          <p className="text-indigo-600 text-sm">
            Access sleep stories, ambient sounds, and breathing exercises to improve your sleep quality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Sleep Center</h2>
        <p className="text-slate-600">Tools to help you achieve better, more restful sleep</p>
      </div>

      {/* Active Session Player */}
      {activeSession && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 sticky top-20 z-30">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-slate-800">Playing: {activeSession}</h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Rate your expected sleep quality:</p>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setSleepQuality(rating)}
                    className={`p-1 ${sleepQuality >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star size={20} fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => completeSession(activeSession, 30)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              End Session
            </button>
          </div>
        </div>
      )}

      {/* Sleep Stories */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Moon className="mr-2" size={24} />
          Sleep Stories
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {sleepStories.map((story) => (
            <div key={story.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <h4 className="font-semibold text-slate-800 mb-2">{story.title}</h4>
              <p className="text-sm text-slate-600 mb-2">{story.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>Narrator: {story.narrator}</span>
                <span>{story.duration} min</span>
              </div>
              <button
                onClick={() => startSession(story.title, 'story')}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Play size={16} />
                <span>Play</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Sounds */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Volume2 className="mr-2" size={24} />
          Ambient Sounds
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ambientSounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => startSession(sound.title, 'ambient')}
              className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{sound.icon}</div>
              <h4 className="font-medium text-slate-800 text-sm">{sound.title}</h4>
              <p className="text-xs text-slate-600">{sound.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Breathing Exercises */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Wind className="mr-2" size={24} />
          Sleep Breathing Exercises
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {breathingExercises.map((exercise) => (
            <div key={exercise.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <h4 className="font-semibold text-slate-800 mb-2">{exercise.title}</h4>
              <p className="text-sm text-slate-600 mb-3">{exercise.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{exercise.duration} min</span>
                <button
                  onClick={() => startSession(exercise.title, 'breathing')}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">💤 Sleep Hygiene Tips</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {sleepTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span className="text-sm text-slate-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* OCD and Sleep Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">🌙 OCD and Sleep</h3>
        <p className="text-amber-700 text-sm leading-relaxed mb-3">
          People with OCD often experience sleep difficulties due to racing thoughts, bedtime rituals, or anxiety. 
          Good sleep hygiene is crucial for managing OCD symptoms effectively.
        </p>
        <div className="text-sm text-amber-700">
          <strong>If intrusive thoughts keep you awake:</strong>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• Don't engage with or analyze the thoughts</li>
            <li>• Use the "noting" technique: "I'm having that thought again"</li>
            <li>• Try progressive muscle relaxation</li>
            <li>• Consider getting up and doing a quiet, non-stimulating activity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SleepCenter;