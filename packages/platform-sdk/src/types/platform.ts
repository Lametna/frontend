export interface Notification {
  id: string;
  userId: string;
  type: 'system' | 'friend_request' | 'party_invite' | 'message' | 'achievement';
  title: string;
  body: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Theme {
  id: string;
  name: string;
  mode: 'light' | 'dark' | 'system';
  tokens: Record<string, string>;
}

export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sounds: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    presenceVisibility: 'everyone' | 'friends' | 'nobody';
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
}

export interface FeatureFlag {
  key: string;
  isEnabled: boolean;
  value?: any;
}

export interface Plugin {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
}
