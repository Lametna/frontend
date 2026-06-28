import { create } from 'zustand';

interface AppState {
  isSidebarOpen: boolean;
  isPartyOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleParty: () => void;
  setPartyOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  isPartyOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleParty: () => set((state) => ({ isPartyOpen: !state.isPartyOpen })),
  setPartyOpen: (isOpen) => set({ isPartyOpen: isOpen }),
}));
