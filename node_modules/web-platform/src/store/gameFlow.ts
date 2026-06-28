import { create } from 'zustand';

export type GamePhase = 'idle' | 'lobby' | 'readyCheck' | 'loading' | 'playing' | 'results';

interface GameFlowState {
  phase: GamePhase;
  gameId: string | null;
  lobbyId: string | null;
  
  // Actions
  setPhase: (phase: GamePhase) => void;
  joinLobby: (gameId: string, lobbyId: string) => void;
  leaveGame: () => void;
}

export const useGameFlowStore = create<GameFlowState>((set) => ({
  phase: 'idle',
  gameId: null,
  lobbyId: null,
  
  setPhase: (phase) => set({ phase }),
  
  joinLobby: (gameId, lobbyId) => set({
    phase: 'lobby',
    gameId,
    lobbyId
  }),
  
  leaveGame: () => set({
    phase: 'idle',
    gameId: null,
    lobbyId: null
  }),
}));
