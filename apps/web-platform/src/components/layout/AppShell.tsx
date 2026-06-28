import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { PartySidebar } from './PartySidebar';
import { useAppStore } from '../../store/app';
import { cn } from '../../lib/utils';

export function AppShell() {
  const { isSidebarOpen, isPartyOpen } = useAppStore();

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Desktop Sidebar */}
        <aside
          className={cn(
            "hidden md:flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative">
          <Outlet />
        </main>

        {/* Right Party Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex flex-col border-l bg-card transition-all duration-300 ease-in-out",
            isPartyOpen ? "w-72" : "w-0 overflow-hidden border-none"
          )}
        >
          <PartySidebar />
        </aside>
      </div>
      
      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
