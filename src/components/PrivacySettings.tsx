import React, { useState, useEffect } from 'react';
import { Shield, Eye, Database, Bell, X } from 'lucide-react';

interface PrivacySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    dataCollection: true,
    analytics: false,
    crashReporting: true,
    anonymousUsage: true,
    notifications: true,
    dataRetention: '1year'
  });

  useEffect(() => {
    // Load saved privacy settings
    const saved = localStorage.getItem('privacy-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('privacy-settings', JSON.stringify(newSettings));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Shield className="mr-2" size={24} />
            Privacy Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Data Collection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Database size={18} className="text-slate-600" />
                <span className="font-medium text-slate-700">Data Collection</span>
              </div>
              <input
                type="checkbox"
                checked={settings.dataCollection}
                onChange={(e) => updateSetting('dataCollection', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-slate-500 ml-6">
              Allow collection of therapeutic data for your personal progress tracking
            </p>
          </div>

          {/* Analytics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Eye size={18} className="text-slate-600" />
                <span className="font-medium text-slate-700">Anonymous Analytics</span>
              </div>
              <input
                type="checkbox"
                checked={settings.analytics}
                onChange={(e) => updateSetting('analytics', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-slate-500 ml-6">
              Help improve the app with anonymous usage statistics (no personal data)
            </p>
          </div>

          {/* Crash Reporting */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Shield size={18} className="text-slate-600" />
                <span className="font-medium text-slate-700">Crash Reporting</span>
              </div>
              <input
                type="checkbox"
                checked={settings.crashReporting}
                onChange={(e) => updateSetting('crashReporting', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-slate-500 ml-6">
              Send anonymous crash reports to help fix bugs and improve stability
            </p>
          </div>

          {/* Notifications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Bell size={18} className="text-slate-600" />
                <span className="font-medium text-slate-700">Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSetting('notifications', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-slate-500 ml-6">
              Receive helpful reminders and encouragement (can be disabled anytime)
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <label className="block font-medium text-slate-700 mb-2">Data Retention</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => updateSetting('dataRetention', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="6months">6 months</option>
              <option value="1year">1 year</option>
              <option value="2years">2 years</option>
              <option value="indefinite">Keep indefinitely</option>
            </select>
            <p className="text-sm text-slate-500 mt-1">
              How long to keep your data for progress tracking
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">🔒 Your Privacy Matters</h3>
          <p className="text-sm text-blue-700">
            We never sell your data or share it with third parties. All therapeutic data stays on your device 
            and is encrypted when synced to our secure servers. You can export or delete your data at any time.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;