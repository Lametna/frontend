import { NavLink } from 'react-router';
import { Home, Gamepad2, Users, User, MessagesSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

export function BottomNav() {
  const { t } = useTranslation();

  const links = [
    { to: '/', icon: Home, label: t('home') },
    { to: '/games', icon: Gamepad2, label: t('games') },
    { to: '/social', icon: Users, label: t('social') },
    { to: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-card/80 backdrop-blur-xl border-t pb-safe z-50">
      
      {/* Floating Party FAB */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <Button 
          size="icon" 
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-tr from-accent to-orange-400 hover:scale-105 active:scale-95 transition-all"
        >
          <MessagesSquare className="w-6 h-6 text-white" />
        </Button>
      </div>

      <div className="flex items-center justify-around h-16 px-2">
        {links.map((link, index) => {
          const Icon = link.icon;
          // Add margin to center items around the FAB
          const isCenter = index === 1; 
          const marginClass = isCenter ? "mr-8" : index === 2 ? "ml-8" : "";

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                  marginClass,
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              <Icon className="w-6 h-6" strokeWidth={2} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
