import React, { createContext, useContext, useEffect, useState } from 'react';
import { featureFlagService } from '../services/feature-flag.service';
import { FeatureFlag } from '../types';
import { platformEventBus } from '../core/event-bus';
import { platformSocket } from '../socket';

// Feature Flag Provider
interface FeatureFlagContextValue {
  flags: FeatureFlag[];
  isEnabled: (key: string) => boolean;
  getValue: (key: string) => any;
}

const FeatureFlagContext = createContext<FeatureFlagContextValue>({
  flags: [],
  isEnabled: () => false,
  getValue: () => null
});

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    featureFlagService.fetchFlags();
    const handleFlagsLoaded = (loadedFlags: FeatureFlag[]) => setFlags(loadedFlags);
    platformEventBus.subscribe('flags.loaded', handleFlagsLoaded);
    return () => platformEventBus.unsubscribe('flags.loaded', handleFlagsLoaded);
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ 
      flags, 
      isEnabled: (key) => featureFlagService.isEnabled(key),
      getValue: (key) => featureFlagService.getValue(key)
    }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagContext);

// Socket Provider
interface SocketContextValue {
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  isConnected: false
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    platformEventBus.subscribe('socket.connected', handleConnect);
    platformEventBus.subscribe('socket.disconnected', handleDisconnect);
    
    // Auto-connect if needed, or rely on auth to connect
    platformSocket.connect();

    return () => {
      platformEventBus.unsubscribe('socket.connected', handleConnect);
      platformEventBus.unsubscribe('socket.disconnected', handleDisconnect);
      platformSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
