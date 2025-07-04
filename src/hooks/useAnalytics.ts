import { useEffect } from 'react';
import { useAuth } from './useAuth';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export function useAnalytics() {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize analytics only in production
    if (import.meta.env.PROD && import.meta.env.VITE_ANALYTICS_ID) {
      // Initialize your analytics service here
      console.log('Analytics initialized');
    }
  }, []);

  const track = (event: string, properties?: Record<string, any>) => {
    // Only track in production and with user consent
    if (!import.meta.env.PROD) return;

    // Privacy-first analytics - no personal data
    const sanitizedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      userType: user ? 'authenticated' : 'anonymous',
      // Never include email, names, or other PII
    };

    console.log('Analytics event:', event, sanitizedProperties);
    
    // In production, send to your analytics service
    // Example: analytics.track(event, sanitizedProperties);
  };

  const trackPageView = (page: string) => {
    track('page_view', { page });
  };

  const trackFeatureUsage = (feature: string, action: string) => {
    track('feature_usage', { feature, action });
  };

  const trackTherapeuticAction = (actionType: string, category: string) => {
    track('therapeutic_action', { 
      actionType, 
      category,
      // Track therapeutic progress without personal details
    });
  };

  return {
    track,
    trackPageView,
    trackFeatureUsage,
    trackTherapeuticAction
  };
}