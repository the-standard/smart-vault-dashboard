import { create } from "zustand";
import vaultManagerAbi from "../abis/vaultManager.ts";
import sEuroAbi from "../abis/testTokens/sEuro.ts";
import ethtousdAbi from "../abis/priceFeeds/mumbai/ethtousd.ts";

interface EthToUsdAbiState {
  ethToUsdAbi: Array<any>;
  getEthToUsdAbi: (ethToUsdAbi: Array<any>) => void;
}

export const useEthToUsdAbiStore = create<EthToUsdAbiState>()((set) => ({
  ethToUsdAbi: ethtousdAbi,
  getEthToUsdAbi: (ethToUsdAbi) => set(() => ({ ethToUsdAbi: ethToUsdAbi })),
}));

interface EthToUsdAddressState {
  ethToUsdAddress: string;
  getEthToUsdAddress: (ethToUsdAddress: string) => void;
}

export const useEthToUsdAddressStore = create<EthToUsdAddressState>()(
  (set) => ({
    ethToUsdAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    getEthToUsdAddress: (ethToUsdAddress) =>
      set(() => ({ ethToUsdAddress: ethToUsdAddress })),
  })
);

interface sEuroAddressState {
  sEuroAddress: string;
  getsEuroAddress: (sEuroAddress: string) => void;
}

export const usesEuroAddressStore = create<sEuroAddressState>()((set) => ({
  sEuroAddress: "0xf23F59316A2700D88F6F503B24aEE01118255645",
  getsEuroAddress: (sEuroAddress) =>
    set(() => ({ sEuroAddress: sEuroAddress })),
}));

interface sEuroAbiState {
  sEuroAbi: Array<any>;
  getsEuroAbi: (sEuroAbi: Array<any>) => void;
}

export const usesEuroAbiStore = create<sEuroAbiState>()((set) => ({
  sEuroAbi: sEuroAbi,
  getsEuroAbi: (sEuroAbi) => set(() => ({ sEuroAbi: sEuroAbi })),
}));

interface contractAddressState {
  contractAddress: any;
  getContractAddress: (contractAddress: string) => void;
}
//this is the smart vault manager, I need to change its name to it
export const useContractAddressStore = create<contractAddressState>()(
  (set) => ({
    contractAddress: "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
    getContractAddress: (contractAddress) =>
      set(() => ({ contractAddress: contractAddress })),
  })
);

interface TokenManagerAddressState {
  tokenManagerAddress: string;
  getTokenManagerAddress: (tokenManagerAddress: string) => void;
}

export const useTokenManagerAddressStore = create<TokenManagerAddressState>()(
  (set) => ({
    tokenManagerAddress: "0x25C2704a9a0A096c2B3D243f699dDa00bD67F7d2",
    getTokenManagerAddress: (tokenManagerAddress) =>
      set(() => ({ tokenManagerAddress: tokenManagerAddress })),
  })
);

interface TokenManagerAbiState {
  tokenManagerAbi: Array<any>;
  getTokenManagerAbi: (tokenManagerAbi: Array<any>) => void;
}

export const useTokenManagerAbiStore = create<TokenManagerAbiState>()(
  (set) => ({
    tokenManagerAbi: [],
    getTokenManagerAbi: (tokenManagerAbi) =>
      set(() => ({ tokenManagerAbi: tokenManagerAbi })),
  })
);

interface VaultManagerAbiState {
  vaultManagerAbi: Array<any>;
  getVaultManagerAbi: (vaultManagerAbi: Array<any>) => void;
}

export const useVaultManagerAbiStore = create<VaultManagerAbiState>()(
  (set) => ({
    vaultManagerAbi: vaultManagerAbi,
    getVaultManagerAbi: (vaultManagerAbi) =>
      set(() => ({ vaultManagerAbi: vaultManagerAbi })),
  })
);

interface VaultIdState {
  vaultID: any;
  getVaultID: (id: any) => void;
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

//individual vault

interface VaultState {
  vaultStore: Array<unknown>;
  getVaultStore: (vaultStore: Array<unknown>) => void;
}

export const useVaultStore = create<VaultState>()((set) => ({
  vaultStore: [],
  getVaultStore: (vaultStore) => set(() => ({ vaultStore: vaultStore })),
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

interface CollateralSymbolState {
  collateralSymbol: string;
  getCollateralSymbol: (collateralSymbol: string) => void;
}

export const useCollateralSymbolStore = create<CollateralSymbolState>()(
  (set) => ({
    collateralSymbol: "",
    getCollateralSymbol: (collateralSymbol) =>
      set(() => ({ collateralSymbol: collateralSymbol })),
  })
);

interface TransactionHashState {
  transactionHash: string;
  getTransactionHash: (transactionHash: string) => void;
}

export const useTransactionHashStore = create<TransactionHashState>()(
  (set) => ({
    transactionHash: "",
    getTransactionHash: (transactionHash) =>
      set(() => ({ transactionHash: transactionHash })),
  })
);

interface PositionState {
  setPosition: any;
  right: number;
  top: number;
}

export const usePositionStore = create<PositionState>((set) => ({
  right: 0,
  top: 0,
  setPosition: (position: PositionState) => set(position),
}));

type WidthState = {
  width: number;
  setWidth: (width: number) => void;
};

export const useWidthStore = create<WidthState>((set) => ({
  width: 0,
  setWidth: (width) => set({ width }),
}));

interface CirccularProgressState {
  circularProgress: boolean;
  progressType: number;
  getCircularProgress: (circularProgress: boolean) => void;
  getProgressType: (progressType: number) => void;
}

export const useCircularProgressStore = create<CirccularProgressState>(
  (set) => ({
    circularProgress: false,
    //1 for withdraw, 2 for deposit, 3 for new vault
    progressType: 1,
    getCircularProgress: (circularProgress) => set({ circularProgress }),
    getProgressType: (progressType: number) => set({ progressType }),
  })
);

interface SnackBarState {
  snackBar: number;
  getSnackBar: (snackBar: number) => void;
}

export const useSnackBarStore = create<SnackBarState>((set) => ({
  snackBar: 55,
  getSnackBar: (snackBar) => set({ snackBar }),
}));

interface VaultForListingState {
  vaultForListing: Array<unknown>;
  getVaultForListing: (vaultForListing: Array<unknown>) => void;
}

export const useVaultForListingStore = create<VaultForListingState>((set) => ({
  vaultForListing: [],
  getVaultForListing: (vaultForListing) => set({ vaultForListing }),
}));

interface BurgerMenuState {
  burgerMenu: boolean;
  getBurgerMenu: (burgerMenu: boolean) => void;
}

export const useBurgerMenuStore = create<BurgerMenuState>((set) => ({
  burgerMenu: false,
  getBurgerMenu: (burgerMenu) => set({ burgerMenu }),
}));
