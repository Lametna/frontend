import { useState, useEffect } from 'react';
import { Menu as MenuIcon, Search as SearchIcon, Bell as BellIcon } from 'lucide-react';
import { useAppStore } from '../../store/app';
import { useThemeStore } from '../../store/theme';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { GlobalSearch } from './GlobalSearch';
import { NotificationCenter } from './NotificationCenter';
import { CURRENT_USER } from '../../lib/mock-data';

export function TopNav() {
  const { toggleSidebar } = useAppStore();
  const { theme, setTheme } = useThemeStore();
  const { t, i18n } = useTranslation();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Command+K shortcut for Global Search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <header className="h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            <MenuIcon className="w-5 h-5" />
          </Button>
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-500 shadow-md flex items-center justify-center text-white font-bold text-xl leading-none pt-1">
              ل
            </div>
            <span className="font-display font-bold text-xl hidden sm:block text-foreground tracking-tight">Lametna</span>
          </div>
        </div>

        {/* Global Search Trigger */}
        <div 
          className="hidden md:flex items-center flex-1 max-w-md mx-8 relative group cursor-text"
          onClick={() => setIsSearchOpen(true)}
        >
          <SearchIcon className="w-4 h-4 absolute left-3 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="w-full h-10 bg-secondary/50 rounded-full flex items-center pl-9 pr-3 text-sm text-muted-foreground border border-transparent group-hover:border-primary/20 transition-all">
            {t('search')}...
            <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="md:hidden">
            <SearchIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hidden sm:flex">
            <div className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</div>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')} className="hidden sm:flex">
            <span className="font-bold">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsNotifOpen(!isNotifOpen)}>
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card"></span>
            </Button>
            <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>
          
          <Avatar className="w-9 h-9 ml-2 border cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background transition-all">
            <AvatarImage src={CURRENT_USER.avatar} />
            <AvatarFallback>{CURRENT_USER.username[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
