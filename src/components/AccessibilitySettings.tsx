import React, { useState, useEffect } from 'react';
import { Settings, Eye, Type, Palette, Volume2, X } from 'lucide-react';

interface AccessibilitySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ isOpen, onClose }) => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 16);
      setHighContrast(settings.highContrast || false);
      setReducedMotion(settings.reducedMotion || false);
      setScreenReader(settings.screenReader || false);
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    // Save settings
    const settings = { fontSize, highContrast, reducedMotion, screenReader };
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [fontSize, highContrast, reducedMotion, screenReader]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Settings className="mr-2" size={24} />
            Accessibility
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <label className="flex items-center space-x-2 mb-3">
              <Type size={18} className="text-slate-600" />
              <span className="font-medium text-slate-700">Font Size</span>
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-500">
                <span>Small (12px)</span>
                <span>Current: {fontSize}px</span>
                <span>Large (24px)</span>
              </div>
            </div>
          </div>

          {/* High Contrast */}
          <div>
            <label className="flex items-center space-x-3">
              <Palette size={18} className="text-slate-600" />
              <span className="font-medium text-slate-700">High Contrast Mode</span>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="ml-auto w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
            <p className="text-sm text-slate-500 mt-1 ml-6">
              Increases contrast for better visibility
            </p>
          </div>

          {/* Reduced Motion */}
          <div>
            <label className="flex items-center space-x-3">
              <Eye size={18} className="text-slate-600" />
              <span className="font-medium text-slate-700">Reduce Motion</span>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="ml-auto w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
            <p className="text-sm text-slate-500 mt-1 ml-6">
              Minimizes animations and transitions
            </p>
          </div>

          {/* Screen Reader Support */}
          <div>
            <label className="flex items-center space-x-3">
              <Volume2 size={18} className="text-slate-600" />
              <span className="font-medium text-slate-700">Screen Reader Optimized</span>
              <input
                type="checkbox"
                checked={screenReader}
                onChange={(e) => setScreenReader(e.target.checked)}
                className="ml-auto w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
            <p className="text-sm text-slate-500 mt-1 ml-6">
              Enhanced labels and descriptions
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;