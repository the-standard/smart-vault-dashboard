import { create } from "zustand";
import vaultManagerAbi from "../abis/vaultManager.ts";
import sEuroAbi from "../abis/testTokens/sEuro.ts";
import ethtousdAbi from "../abis/priceFeeds/mumbai/ethtousd.ts";

interface chainIdState {
  chainId: number;
  setChainId: (chainId: number) => void;
}

export const useChainIdStore = create<chainIdState>((set) => ({
  chainId: 1,
  setChainId: (chainId) => set(() => ({ chainId: chainId })),
}));

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
  arbitrumSEuroAddress: string;
  sepoliaSEuroAddress: string;
  getsEuroAddress: (sEuroAddress: string) => void;
}

export const usesEuroAddressStore = create<sEuroAddressState>()((set) => ({
  sEuroAddress: "0xf23F59316A2700D88F6F503B24aEE01118255645",
  arbitrumSEuroAddress: "0x9C777AD2575010E3ED67F6E849cfE1115BFE2A50",
  sepoliaSEuroAddress: "0xf23F59316A2700D88F6F503B24aEE01118255645",
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

//this is smart vault manager
interface contractAddressState {
  contractAddress: any;
  arbitrumContractAddress: any;
  sepoliaContractAddress: any;
}

export const useContractAddressStore = create<contractAddressState>((set) => ({
  contractAddress: "0xbF615e590EC00140d522A721251645c65642de58",
  arbitrumContractAddress: "0x61276e74b9c3c9c1786B34087e44290bCFE3887c",
  sepoliaContractAddress: "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
}));

interface TokenManagerAddressState {
  tokenManagerAddress: string;
  arbitrumTokenManagerAddress: string;
  sepoliaTokenManagerAddress: string;
  getTokenManagerAddress: (tokenManagerAddress: string) => void;
}

export const useTokenManagerAddressStore = create<TokenManagerAddressState>()(
  (set) => ({
    tokenManagerAddress: "0x25C2704a9a0A096c2B3D243f699dDa00bD67F7d2",
    arbitrumTokenManagerAddress: "0xd6F42e228d66173e5b97A1520e61Bb010D4294af",
    sepoliaTokenManagerAddress: "0x25C2704a9a0A096c2B3D243f699dDa00bD67F7d2",
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
  getCircularProgress: (circularProgress: boolean) => void;
}

export const useCircularProgressStore = create<CirccularProgressState>(
  (set) => ({
    circularProgress: false,
    getCircularProgress: (circularProgress) => set({ circularProgress }),
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
