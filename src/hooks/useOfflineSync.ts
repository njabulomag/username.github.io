import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface OfflineData {
  id: string;
  type: string;
  data: any;
  timestamp: number;
}

export function useOfflineSync() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<OfflineData[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Load pending sync data from localStorage
    const stored = localStorage.getItem('pendingSync');
    if (stored) {
      setPendingSync(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Save pending sync data to localStorage
    localStorage.setItem('pendingSync', JSON.stringify(pendingSync));
  }, [pendingSync]);

  useEffect(() => {
    // Sync when coming back online
    if (isOnline && user && pendingSync.length > 0) {
      syncPendingData();
    }
  }, [isOnline, user, pendingSync]);

  const addToOfflineQueue = (type: string, data: any) => {
    const offlineItem: OfflineData = {
      id: crypto.randomUUID(),
      type,
      data,
      timestamp: Date.now()
    };

    setPendingSync(prev => [...prev, offlineItem]);
    return offlineItem.id;
  };

  const syncPendingData = async () => {
    if (!user || pendingSync.length === 0) return;

    try {
      // Process each pending item
      for (const item of pendingSync) {
        await syncItem(item);
      }

      // Clear pending sync after successful sync
      setPendingSync([]);
      localStorage.removeItem('pendingSync');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const syncItem = async (item: OfflineData) => {
    // This would integrate with your database sync logic
    // For now, we'll just log the sync attempt
    console.log('Syncing offline item:', item);
    
    // In a real implementation, you would:
    // 1. Send the data to your backend/Supabase
    // 2. Handle conflicts if the same data was modified elsewhere
    // 3. Update local state with server response
  };

  return {
    isOnline,
    pendingSync: pendingSync.length,
    addToOfflineQueue,
    syncPendingData
  };
}