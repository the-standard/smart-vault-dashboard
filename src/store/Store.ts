import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

interface VaultState {
  vault: number;
  getVaultID: (id: number) => void;
}

export const useVaultStore = create<VaultState>()((set) => ({
  vault: 0,
  getVaultID: (id) => set(() => ({ vault: id })),
}));
