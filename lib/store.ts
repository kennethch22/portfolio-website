import { create } from 'zustand';

interface AdminState {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdminMode: false,
  toggleAdminMode: () => set((state) => ({ isAdminMode: !state.isAdminMode })),
}));