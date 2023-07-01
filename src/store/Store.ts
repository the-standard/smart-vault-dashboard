import { create } from "zustand";
import vaultManagerAbi from "../abis/vaultManager.ts";
import sEuroAbi from "../abis/testTokens/sEuro.ts";
import sUSD6Abi from "../abis/testTokens/sUsd6.ts";
import sUSD18Abi from "../abis/testTokens/sUsd18.ts";
import ethtousdAbi from "../abis/priceFeeds/mumbai/ethtousd.ts";
import priceCalculatorAbi from "../abis/priceFeeds/original/PriceCalculator.ts";

interface PriceCalculatorState {
  priceCalculatorabi: Array<any>;
}

export const usePriceCalculatorStore = create<PriceCalculatorState>(() => ({
  priceCalculatorabi: priceCalculatorAbi,
}));

interface ChainIdState {
  chainId: number;
  getChainId: (chainId: number) => void;
}

export const useChainIdStore = create<ChainIdState>((set) => ({
  chainId: 1,
  getChainId: (chainId) => set(() => ({ chainId: chainId })),
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
  arbitrumGoerliethToUsdAddress: string;
  getEthToUsdAddress: (ethToUsdAddress: string) => void;
}

export const useEthToUsdAddressStore = create<EthToUsdAddressState>()(
  (set) => ({
    ethToUsdAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    arbitrumGoerliethToUsdAddress: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
    getEthToUsdAddress: (ethToUsdAddress) =>
      set(() => ({ ethToUsdAddress: ethToUsdAddress })),
  })
);

interface sEuroAddressState {
  sEuroAddress: string;
  arbitrumGoerlisEuroAddress: string;
  getsEuroAddress: (sEuroAddress: string) => void;
}

export const usesEuroAddressStore = create<sEuroAddressState>()((set) => ({
  sEuroAddress: "0xf23F59316A2700D88F6F503B24aEE01118255645",
  arbitrumGoerlisEuroAddress: "0x9C777AD2575010E3ED67F6E849cfE1115BFE2A50",
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

interface sUSD6State {
  sUSD6Address: string;
  arbitrumGoerlisUSD6Address: string;
  getsUSD6Address: (sUSD6Address: string) => void;
  sUSD6Abi: Array<any>;
  getsUSD6Abi: (sUSD6Abi: Array<any>) => void;
}

export const usesUSD6Store = create<sUSD6State>()((set) => ({
  sUSD6Address: "0x78D4BDd6771C87B66d66a5A89FE52d5F19D778c5",
  arbitrumGoerlisUSD6Address: "0x96eB9C75B1e2DA3eb2bD5eBE1aaDA7f8f34C975C",
  getsUSD6Address: (sUSD6Address) =>
    set(() => ({ sUSD6Address: sUSD6Address })),
  sUSD6Abi: sUSD6Abi,
  getsUSD6Abi: (sUSD6Abi) => set(() => ({ sUSD6Abi: sUSD6Abi })),
}));

interface sUSD18State {
  sUSD18Address: string;
  arbitrumGoerlisUSD18Address: string;
  getsUSD18Address: (sUSD18Address: string) => void;
  sUSD18Abi: Array<any>;
  getsUSD18Abi: (sUSD18Abi: Array<any>) => void;
}

export const usesUSD18Store = create<sUSD18State>()((set) => ({
  sUSD18Address: "0x4904AFBf65480Ca77Eb2DdfF39EdcEABE53D4373",
  arbitrumGoerlisUSD18Address: "0x208CD13FDc8a5EFc2ff3908082e8c24D515F0006",
  getsUSD18Address: (sUSD18Address) =>
    set(() => ({ sUSD18Address: sUSD18Address })),
  sUSD18Abi: sUSD18Abi,
  getsUSD18Abi: (sUSD18Abi) => set(() => ({ sUSD18Abi: sUSD18Abi })),
}));

interface contractAddressState {
  contractAddress: any;
  arbitrumGoerliContractAddress: any;
  getContractAddress: (contractAddress: string) => void;
}
//this is the smart vault manager, I need to change its name to it
export const useContractAddressStore = create<contractAddressState>()(
  (set) => ({
    contractAddress: "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
    arbitrumGoerliContractAddress: "0x61276e74b9c3c9c1786B34087e44290bCFE3887c",
    getContractAddress: (contractAddress) =>
      set(() => ({ contractAddress: contractAddress })),
  })
);

interface TokenManagerAddressState {
  tokenManagerAddress: string;
  arbitrumGoerliTokenManagerAddress: string;
  getTokenManagerAddress: (tokenManagerAddress: string) => void;
}

export const useTokenManagerAddressStore = create<TokenManagerAddressState>()(
  (set) => ({
    tokenManagerAddress: "0x25C2704a9a0A096c2B3D243f699dDa00bD67F7d2",
    arbitrumGoerliTokenManagerAddress:
      "0xd6F42e228d66173e5b97A1520e61Bb010D4294af",
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
  vaultID: 1,
  getVaultID: (id) => set(() => ({ vaultID: id })),
}));

interface VaultsState {
  vaultsStore: Array<any>;
  getVaultsStore: (vaultsStore: Array<any>) => void;
}

export const useVaultsStore = create<VaultsState>()((set) => ({
  vaultsStore: [],
  getVaultsStore: (vaultsStore) => set(() => ({ vaultsStore: vaultsStore })),
}));

//individual vault

interface VaultState {
  vaultStore: Array<any>;
  getVaultStore: (vaultStore: Array<any>) => void;
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
