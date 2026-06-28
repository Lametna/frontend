import { Menu as MenuIcon, Search as SearchIcon, Bell as BellIcon } from 'lucide-react';
import { useAppStore } from '../../store/app';
import { useThemeStore } from '../../store/theme';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

export function TopNav() {
  const { toggleSidebar } = useAppStore();
  const { theme, setTheme } = useThemeStore();
  const { t, i18n } = useTranslation();

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-50">
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

      {/* Global Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
        <SearchIcon className="w-4 h-4 absolute left-3 text-muted-foreground" />
        <Input placeholder={t('search')} className="pl-9 bg-secondary/50 border-none rounded-full" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <div className="text-xl">🌙</div>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}>
          <span className="font-bold">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card"></span>
        </Button>
        
        <Avatar className="w-9 h-9 ml-2">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <AvatarFallback>AX</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
