import { NavLink } from 'react-router';
import { Home, Gamepad2, Users, ShoppingBag, User } from 'lucide-react';
import { useAppStore } from '../../store/app';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

export function Sidebar() {
  const { isSidebarOpen } = useAppStore();
  const { t } = useTranslation();

  const links = [
    { to: '/', icon: Home, label: t('home') },
    { to: '/games', icon: Gamepad2, label: t('games') },
    { to: '/social', icon: Users, label: t('social') },
    { to: '/shop', icon: ShoppingBag, label: t('shop') },
    { to: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="flex flex-col h-full py-4 gap-2 px-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-secondary",
                isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
              )
            }
          >
            <Icon className="w-6 h-6 shrink-0" strokeWidth={2} />
            {isSidebarOpen && <span className="whitespace-nowrap animate-fade-in">{link.label}</span>}
          </NavLink>
        );
      })}
    </div>
  );
}
