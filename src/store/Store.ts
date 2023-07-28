import { create } from "zustand";
import vaultManagerAbi from "../abis/vaultManager.ts";
import sEuroAbi from "../abis/testTokens/sEuro.ts";
import sUSD6Abi from "../abis/testTokens/sUsd6.ts";
import sUSD18Abi from "../abis/testTokens/sUsd18.ts";
import ethtousdAbi from "../abis/priceFeeds/ethtousd.ts";
import usdToEuroAbi from "../abis/priceFeeds/usdtoeuro.ts";

// interface PriceCalculatorState {
//   priceCalculatorabi: Array<any>;
// }
// //this one is eth to usd price calculator
// export const usePriceCalculatorStore = create<PriceCalculatorState>(() => ({
//   priceCalculatorabi: priceCalculatorAbi,
// }));

interface UsdToEuroState {
  usdToEuroAbi: Array<any>;
}

export const useUsdToEuroStore = create<UsdToEuroState>(() => ({
  usdToEuroAbi: usdToEuroAbi,
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

interface USDToEuroAbiState {
  usdToEuroAbi: Array<any>;
  getUSDToEuroAbi: (usdToEuroAbi: Array<any>) => void;
}

export const useUSDToEuroAbiStore = create<USDToEuroAbiState>()((set) => ({
  usdToEuroAbi: usdToEuroAbi,
  getUSDToEuroAbi: (usdToEuroAbi) =>
    set(() => ({ usdToEuroAbi: usdToEuroAbi })),
}));

interface EthToUsdAddressState {
  ethToUsdAddress: string;
  arbitrumGoerliethToUsdAddress: string;
  getEthToUsdAddress: (ethToUsdAddress: string) => void;
}

export const useEthToUsdAddressStore = create<EthToUsdAddressState>()(
  (set) => ({
    ethToUsdAddress: "0x10742171dD4aB632653869d3a03b2195a10C5f1F",
    arbitrumGoerliethToUsdAddress: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
    getEthToUsdAddress: (ethToUsdAddress) =>
      set(() => ({ ethToUsdAddress: ethToUsdAddress })),
  })
);

interface USDToEuroAddressState {
  usdToEuroAddress: string;
  arbitrumGoerliUSDToEuroAddress: string;
  getUSDToEuroAddress: (usdToEuroAddress: string) => void;
}

export const useUSDToEuroAddressStore = create<USDToEuroAddressState>()(
  (set) => ({
    usdToEuroAddress: "0x59a6A8357BD5Ae002DEd9A5F72ab526f9fDc573A",
    arbitrumGoerliUSDToEuroAddress:
      "0xe5CD8A83fc9E1bb87b2576B2999f99A1328D3888",
    getUSDToEuroAddress: (usdToEuroAddress) =>
      set(() => ({ usdToEuroAddress: usdToEuroAddress })),
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
    contractAddress: "0x0b64cb41B81f631503a562D2ACd9EBF52ac09061",
    arbitrumGoerliContractAddress: "0x6A301a76f67ECf0D56377F8Db384dbCa9E161203",
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
    tokenManagerAddress: "0xEB704FE5B1F5C23f7062780CE23323027a58d996",
    arbitrumGoerliTokenManagerAddress:
      "0xb22517e1312b508431C7Ce9CB5Bca006137656AF",
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
    //1 for withdraw, 2 for deposit, 3 for new vault, 5 for repay with flex-end
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
  vaultForListing: any;
  getVaultForListing: (vaultForListing: any) => void;
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

interface GreyProgressBarValuesState {
  userInputForGreyBarOperation: any;
  symbolForGreyBar: string;
  // 1 for deposit, 2 for withdraw, 3 for swap, 4 for Borrow, 5 for Repay
  operationType: number;

  getGreyBarUserInput: (userInputForGreyBarOperation: any) => void;
  getSymbolForGreyBar: (symbolForGreyBar: string) => void;
  getOperationType: (operationType: number) => void;
}

export const useGreyProgressBarValuesStore = create<GreyProgressBarValuesState>(
  (set) => ({
    userInputForGreyBarOperation: 0,
    symbolForGreyBar: "",
    operationType: 0,

    getGreyBarUserInput: (userInputForGreyBarOperation) =>
      set({ userInputForGreyBarOperation }),
    getSymbolForGreyBar: (symbolForGreyBar) => set({ symbolForGreyBar }),
    getOperationType: (operationType) => set({ operationType }),
  })
);

interface NFTListingModalState {
  totalValue: number;
  getNFTListingModalTotalValue: (totalValue: number) => void;
  totalValueMinusDebt: number;
  getNFTListingModalTotalValueMinusDebt: (totalValueMinusDebt: number) => void;
}

export const useNFTListingModalStore = create<NFTListingModalState>((set) => ({
  totalValue: 0,
  getNFTListingModalTotalValue: (totalValue) => set({ totalValue }),
  totalValueMinusDebt: 0,
  getNFTListingModalTotalValueMinusDebt: (totalValueMinusDebt) =>
    set({ totalValueMinusDebt }),
}));

interface InputValueAsGlobalState {
  inputValue: number;
  getInputValue: (inputValue: number) => void;
}

export const useInputValueStore = create<InputValueAsGlobalState>((set) => ({
  inputValue: 0,
  getInputValue: (inputValue) => set({ inputValue }),
}));

interface CounterState {
  counter: number;
  getCounter: (delta: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  counter: 0,
  getCounter: (delta) => set((state) => ({ counter: state.counter + delta })),
}));
