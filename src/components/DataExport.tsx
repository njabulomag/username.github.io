import React, { useState } from 'react';
import { Download, FileText, Calendar, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDatabase } from '../hooks/useDatabase';

interface DataExportProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataExport: React.FC<DataExportProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { moodEntries, thoughtRecords, erpSessions, meditationSessions, sleepSessions, aiSessions } = useDatabase();
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  const [selectedData, setSelectedData] = useState<string[]>(['mood', 'thoughts', 'erp']);
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    { id: 'mood', label: 'Mood Entries', count: moodEntries.length, icon: '📊' },
    { id: 'thoughts', label: 'Thought Records', count: thoughtRecords.length, icon: '🧠' },
    { id: 'erp', label: 'ERP Sessions', count: erpSessions.length, icon: '🛡️' },
    { id: 'meditation', label: 'Meditation Sessions', count: meditationSessions.length, icon: '🧘' },
    { id: 'sleep', label: 'Sleep Sessions', count: sleepSessions.length, icon: '😴' },
    { id: 'ai', label: 'AI Conversations', count: aiSessions.length, icon: '🤖' }
  ];

  const toggleDataType = (dataType: string) => {
    setSelectedData(prev => 
      prev.includes(dataType) 
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    );
  };

  const exportData = async () => {
    if (!user || selectedData.length === 0) return;

    setIsExporting(true);

    try {
      const exportData: any = {
        exportDate: new Date().toISOString(),
        userId: user.id,
        userEmail: user.email,
        data: {}
      };

      // Collect selected data
      if (selectedData.includes('mood')) {
        exportData.data.moodEntries = moodEntries;
      }
      if (selectedData.includes('thoughts')) {
        exportData.data.thoughtRecords = thoughtRecords;
      }
      if (selectedData.includes('erp')) {
        exportData.data.erpSessions = erpSessions;
      }
      if (selectedData.includes('meditation')) {
        exportData.data.meditationSessions = meditationSessions;
      }
      if (selectedData.includes('sleep')) {
        exportData.data.sleepSessions = sleepSessions;
      }
      if (selectedData.includes('ai')) {
        // Remove sensitive message content for privacy
        exportData.data.aiSessions = aiSessions.map(session => ({
          ...session,
          messages: session.messages.map((msg: any) => ({
            ...msg,
            content: msg.type === 'user' ? '[User message]' : '[AI response]'
          }))
        }));
      }

      let fileContent: string;
      let fileName: string;
      let mimeType: string;

      if (exportFormat === 'json') {
        fileContent = JSON.stringify(exportData, null, 2);
        fileName = `hope-for-ocd-data-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      } else {
        // Convert to CSV format
        fileContent = convertToCSV(exportData.data);
        fileName = `hope-for-ocd-data-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      }

      // Create and download file
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (data: any): string => {
    let csv = '';
    
    // Add mood entries
    if (data.moodEntries && data.moodEntries.length > 0) {
      csv += 'Mood Entries\n';
      csv += 'Date,Mood,Anxiety,Notes,Triggers\n';
      data.moodEntries.forEach((entry: any) => {
        csv += `${entry.created_at},${entry.mood},${entry.anxiety},"${entry.notes}","${entry.triggers.join('; ')}"\n`;
      });
      csv += '\n';
    }

    // Add thought records
    if (data.thoughtRecords && data.thoughtRecords.length > 0) {
      csv += 'Thought Records\n';
      csv += 'Date,Situation,Automatic Thought,Emotion,Evidence For,Evidence Against,Balanced Thought,New Emotion\n';
      data.thoughtRecords.forEach((record: any) => {
        csv += `${record.created_at},"${record.situation}","${record.automatic_thought}","${record.emotion}","${record.evidence_for}","${record.evidence_against}","${record.balanced_thought}","${record.new_emotion}"\n`;
      });
      csv += '\n';
    }

    // Add ERP sessions
    if (data.erpSessions && data.erpSessions.length > 0) {
      csv += 'ERP Sessions\n';
      csv += 'Date,Exposure,Anxiety Before,Anxiety After,Duration,Completed,Notes\n';
      data.erpSessions.forEach((session: any) => {
        csv += `${session.created_at},"${session.exposure}",${session.anxiety_before},${session.anxiety_after},${session.duration},${session.completed},"${session.notes}"\n`;
      });
      csv += '\n';
    }

    return csv;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Download className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Export Your Data</h2>
        </div>

        <div className="space-y-6">
          {/* Data Selection */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Select Data to Export</h3>
            <div className="space-y-2">
              {dataTypes.map(type => (
                <label key={type.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={selectedData.includes(type.id)}
                    onChange={() => toggleDataType(type.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg">{type.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-700">{type.label}</span>
                    <span className="text-xs text-slate-500 ml-2">({type.count} entries)</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Export Format</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <FileText size={16} className="text-slate-600" />
                <span className="text-sm text-slate-700">JSON (Complete data with structure)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <Calendar size={16} className="text-slate-600" />
                <span className="text-sm text-slate-700">CSV (Spreadsheet compatible)</span>
              </label>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Shield size={16} className="text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800">Privacy Notice</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Your data will be downloaded to your device only. We never store or transmit your personal data to external servers.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={exportData}
              disabled={selectedData.length === 0 || isExporting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Export Data</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExport;