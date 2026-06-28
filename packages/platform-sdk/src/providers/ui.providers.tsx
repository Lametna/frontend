import React, { createContext, useContext, useEffect, useState } from 'react';
import { themeService } from '../services/theme.service';
import { localizationService } from '../services/localization.service';
import { platformEventBus } from '../core/event-bus';

// Theme Provider
interface ThemeContextValue {
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'system',
  setMode: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState(themeService.getMode());

  useEffect(() => {
    const handleThemeChange = (data: { mode: 'light' | 'dark' | 'system' }) => setModeState(data.mode);
    platformEventBus.subscribe('theme.changed', handleThemeChange);
    return () => platformEventBus.unsubscribe('theme.changed', handleThemeChange);
  }, []);

  const setMode = (newMode: 'light' | 'dark' | 'system') => {
    themeService.setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Localization Provider
interface LocaleContextValue {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  language: 'en',
  setLanguage: async () => {},
  t: (key) => key
});

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(localizationService.getLanguage());

  useEffect(() => {
    const handleLocaleChange = (data: { language: string }) => setLanguageState(data.language);
    platformEventBus.subscribe('locale.changed', handleLocaleChange);
    return () => platformEventBus.unsubscribe('locale.changed', handleLocaleChange);
  }, []);

  const setLanguage = async (lang: string) => {
    await localizationService.setLanguage(lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    return localizationService.translate(key, params);
  };

  return (
    <LocaleContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
