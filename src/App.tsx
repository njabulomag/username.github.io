import React, { useState, Suspense } from 'react';
import { Brain, Heart, BookOpen, TrendingUp, Shield, Phone, Headphones, Moon, Users, Zap, MessageSquare, Sunrise, Settings } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineIndicator from './components/OfflineIndicator';
import AccessibilitySettings from './components/AccessibilitySettings';
import InstallPrompt from './components/InstallPrompt';

// Lazy load components for better performance
const MoodTracker = React.lazy(() => import('./components/MoodTracker'));
const ThoughtRecord = React.lazy(() => import('./components/ThoughtRecord'));
const ErpTracker = React.lazy(() => import('./components/ErpTracker'));
const CopingStrategies = React.lazy(() => import('./components/CopingStrategies'));
const Progress = React.lazy(() => import('./components/Progress'));
const Resources = React.lazy(() => import('./components/Resources'));
const CrisisToolkit = React.lazy(() => import('./components/CrisisToolkit'));
const MeditationCenter = React.lazy(() => import('./components/MeditationCenter'));
const SleepCenter = React.lazy(() => import('./components/SleepCenter'));
const EducationLibrary = React.lazy(() => import('./components/EducationLibrary'));
const CommunitySupport = React.lazy(() => import('./components/CommunitySupport'));
const AiPsychologist = React.lazy(() => import('./components/AiPsychologist'));
const HopeForOcd = React.lazy(() => import('./components/HopeForOcd'));

type TabType = 'mood' | 'thoughts' | 'erp' | 'coping' | 'progress' | 'resources' | 'crisis' | 'meditation' | 'sleep' | 'education' | 'community' | 'ai-psychologist' | 'hope';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('hope');
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const { loading } = useAuth();

  const tabs = [
    { id: 'hope', label: 'Hope for OCD', icon: Sunrise, priority: 'high' },
    { id: 'mood', label: 'Mood Tracker', icon: Heart, priority: 'high' },
    { id: 'thoughts', label: 'Thought Record', icon: Brain, priority: 'high' },
    { id: 'erp', label: 'ERP Tracker', icon: Shield, priority: 'high' },
    { id: 'ai-psychologist', label: 'AI Psychologist', icon: MessageSquare, priority: 'high' },
    { id: 'crisis', label: 'Crisis Toolkit', icon: Zap, priority: 'high' },
    { id: 'meditation', label: 'Meditation', icon: Headphones, priority: 'medium' },
    { id: 'sleep', label: 'Sleep Center', icon: Moon, priority: 'medium' },
    { id: 'coping', label: 'Coping Tools', icon: BookOpen, priority: 'medium' },
    { id: 'education', label: 'Education', icon: BookOpen, priority: 'medium' },
    { id: 'community', label: 'Community', icon: Users, priority: 'medium' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, priority: 'low' },
    { id: 'resources', label: 'Resources', icon: Phone, priority: 'low' }
  ];

  const renderActiveTab = () => {
    const componentMap = {
      'hope': HopeForOcd,
      'mood': MoodTracker,
      'thoughts': ThoughtRecord,
      'erp': ErpTracker,
      'ai-psychologist': AiPsychologist,
      'crisis': CrisisToolkit,
      'meditation': MeditationCenter,
      'sleep': SleepCenter,
      'coping': CopingStrategies,
      'education': EducationLibrary,
      'community': CommunitySupport,
      'progress': Progress,
      'resources': Resources
    };

    const Component = componentMap[activeTab] || HopeForOcd;
    
    return (
      <Suspense fallback={<LoadingSpinner message="Loading component..." />}>
        <Component />
      </Suspense>
    );
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading Hope for OCD..." />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <OfflineIndicator />
        <Header onOpenAccessibility={() => setShowAccessibilitySettings(true)} />
        
        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-1 overflow-x-auto scrollbar-hide py-3" role="tablist">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main 
          className="max-w-7xl mx-auto px-4 py-8"
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <div className="animate-in fade-in duration-300">
            {renderActiveTab()}
          </div>
        </main>

        {/* Accessibility Settings Modal */}
        <AccessibilitySettings 
          isOpen={showAccessibilitySettings}
          onClose={() => setShowAccessibilitySettings(false)}
        />

        {/* Install Prompt */}
        <InstallPrompt />

        {/* Disclaimer */}
        <footer className="bg-slate-100 border-t border-slate-200 mt-16" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-sm text-slate-600 text-center">
              <strong>Important:</strong> This app is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. 
              If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate professional help or contact a crisis hotline.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;