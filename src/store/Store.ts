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
    ethToUsdAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    getEthToUsdAddress: (ethToUsdAddress) =>
      set(() => ({ ethToUsdAddress: ethToUsdAddress })),
  })
);

interface sEuroAddressState {
  sEuroAddress: string;
  getsEuroAddress: (sEuroAddress: string) => void;
}

export const usesEuroAddressStore = create<sEuroAddressState>()((set) => ({
  sEuroAddress: "0xEC8A98a08b6494B2E131a3B85DF612eD5567a3FB",
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
    contractAddress: "0xbF615e590EC00140d522A721251645c65642de58",
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
    tokenManagerAddress: "0x0F408a962C7e70Dcc115703b7f96C76692C041Cb",
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
