import create from 'zustand';

const useGameStore = create((set) => ({
  isGameStarted: false,
  startGame: () => set({ isGameStarted: true }),
  stopGame: () => set({ isGameStarted: false }),
}));

export default useGameStore;