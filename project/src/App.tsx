import React, { useState } from 'react';
import { Brain, Heart, BookOpen, TrendingUp, Shield, Phone, Headphones, Moon, Users, Zap, MessageSquare, Sunrise } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import MoodTracker from './components/MoodTracker';
import ThoughtRecord from './components/ThoughtRecord';
import ErpTracker from './components/ErpTracker';
import CopingStrategies from './components/CopingStrategies';
import Progress from './components/Progress';
import Resources from './components/Resources';
import CrisisToolkit from './components/CrisisToolkit';
import MeditationCenter from './components/MeditationCenter';
import SleepCenter from './components/SleepCenter';
import EducationLibrary from './components/EducationLibrary';
import CommunitySupport from './components/CommunitySupport';
import AiPsychologist from './components/AiPsychologist';
import HopeForOcd from './components/HopeForOcd';
import InstallPrompt from './components/InstallPrompt';

type TabType = 'mood' | 'thoughts' | 'erp' | 'coping' | 'progress' | 'resources' | 'crisis' | 'meditation' | 'sleep' | 'education' | 'community' | 'ai-psychologist' | 'hope';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('hope');
  const { loading } = useAuth();

  const tabs = [
    { id: 'hope', label: 'Hope for OCD', icon: Sunrise },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'thoughts', label: 'Thought Record', icon: Brain },
    { id: 'erp', label: 'ERP Tracker', icon: Shield },
    { id: 'ai-psychologist', label: 'AI Psychologist', icon: MessageSquare },
    { id: 'crisis', label: 'Crisis Toolkit', icon: Zap },
    { id: 'meditation', label: 'Meditation', icon: Headphones },
    { id: 'sleep', label: 'Sleep Center', icon: Moon },
    { id: 'coping', label: 'Coping Tools', icon: BookOpen },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: Phone }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'hope':
        return <HopeForOcd />;
      case 'mood':
        return <MoodTracker />;
      case 'thoughts':
        return <ThoughtRecord />;
      case 'erp':
        return <ErpTracker />;
      case 'ai-psychologist':
        return <AiPsychologist />;
      case 'crisis':
        return <CrisisToolkit />;
      case 'meditation':
        return <MeditationCenter />;
      case 'sleep':
        return <SleepCenter />;
      case 'coping':
        return <CopingStrategies />;
      case 'education':
        return <EducationLibrary />;
      case 'community':
        return <CommunitySupport />;
      case 'progress':
        return <Progress />;
      case 'resources':
        return <Resources />;
      default:
        return <HopeForOcd />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Brain className="text-white animate-pulse" size={32} />
          </div>
          <p className="text-slate-600">Loading Hope for OCD...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto scrollbar-hide py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-in fade-in duration-300">
          {renderActiveTab()}
        </div>
      </main>

      {/* Install Prompt */}
      <InstallPrompt />

      {/* Disclaimer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-slate-600 text-center">
            <strong>Important:</strong> This app is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. 
            If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate professional help or contact a crisis hotline.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;