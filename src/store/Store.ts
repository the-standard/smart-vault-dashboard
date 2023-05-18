import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

interface VaultIdState {
  vaultID: number;
  getVaultID: (id: number) => void;
}

export const useVaultIdStore = create<VaultIdState>()((set) => ({
  vaultID: 0,
  getVaultID: (id) => set(() => ({ vaultID: id })),
}));

interface VaultsState {
  vaultsStore: Array<unknown>;
  getVaultsStore: (vaultsStore: Array<unknown>) => void;
}

export const useVaultsStore = create<VaultsState>()((set) => ({
  vaultsStore: [],
  getVaultsStore: (vaultsStore) => set(() => ({ vaultsStore: vaultsStore })),
}));

interface VaultAddressState {
  vaultAddress: string;
  getVaultAddress: (vaultAddress: string) => void;
}

export const useVaultAddressStore = create<VaultAddressState>()((set) => ({
  vaultAddress: "",
  getVaultAddress: (vaultAddress) =>
    set(() => ({ vaultAddress: vaultAddress })),
}));

// interface CollateralState {
//   collateralOrDebt: number;
//   getCollateralOrDebt: (collateralOrDebt: number) => void;
// }

// export const useCollateralOrDebtStore = create<CollateralState>()((set) => ({
//   collateralOrDebt: 1,
//   getCollateralOrDebt: (collateralOrDebt) =>
//     set(() => ({ collateralOrDebt: collateralOrDebt })),
// }));
