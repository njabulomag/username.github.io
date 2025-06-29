import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || !showPrompt || sessionStorage.getItem('installPromptDismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 shadow-lg max-w-md mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="p-2 bg-white/20 rounded-lg">
              <Download size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">Install Hope for OCD</h3>
              <p className="text-xs opacity-90 mb-3">
                Get the full app experience with offline access and notifications
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleInstallClick}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1"
                >
                  <Download size={14} />
                  <span>Install App</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-white/70 hover:text-white text-xs px-2 py-1.5 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Benefits */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1 opacity-90">
              <Smartphone size={12} />
              <span>Works offline</span>
            </div>
            <div className="flex items-center space-x-1 opacity-90">
              <Monitor size={12} />
              <span>Desktop & mobile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;