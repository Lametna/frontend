import React, { createContext, useContext, useEffect, useState } from 'react';
import { platformConfig, PlatformConfig } from '../config';
import { authService } from '../services/auth.service';
import { User } from '../types';
import { platformEventBus } from '../core/event-bus';

interface PlatformContextValue {
  isInitialized: boolean;
  config: PlatformConfig;
}

const PlatformContext = createContext<PlatformContextValue>({
  isInitialized: false,
  config: platformConfig.getAll()
});

export const PlatformProvider: React.FC<{ children: React.ReactNode; config?: Partial<PlatformConfig> }> = ({ children, config }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (config) {
      platformConfig.update(config);
    }
    // Perform any initial platform setup here
    setIsInitialized(true);
  }, [config]);

  return (
    <PlatformContext.Provider value={{ isInitialized, config: platformConfig.getAll() }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);

// Auth Provider
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    platformEventBus.subscribe('auth.login', (u: User) => setUser(u));
    platformEventBus.subscribe('auth.logout', () => setUser(null));

    return () => {
      platformEventBus.unsubscribe('auth.login', setUser);
      platformEventBus.unsubscribe('auth.logout', setUser);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
