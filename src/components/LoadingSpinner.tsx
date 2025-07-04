import React from 'react';
import { Brain } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center'
    : 'flex items-center justify-center py-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse`}>
          <Brain className="text-white" size={iconSizes[size]} />
        </div>
        <p className="text-slate-600 animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;