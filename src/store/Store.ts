import { create } from "zustand";
import vaultManagerAbi from "../abis/vaultManager.ts";
import erc20Abi from "../abis/erc20.ts";
import chainlinkAbi from "../abis/priceFeeds/chainlink.ts";
import smartVaultABI from "../abis/smartVault.ts";
import stakingAbi from "../abis/staking.ts";
import liquidationPoolAbi from "../abis/liquidationPool.ts";
import { Address } from "viem";

interface EthToUsdAddressState {
  ethToUsdAddress?: Address;
  arbitrumOneEthToUsdAddress: Address;
  arbitrumSepoliaEthToUsdAddress: Address;
  getEthToUsdAddress: (ethToUsdAddress: Address) => void;
}

export const useEthToUsdAddressStore = create<EthToUsdAddressState>()(
  (set) => ({
    arbitrumOneEthToUsdAddress: "0x639fe6ab55c921f74e7fac1ee960c0b6293ba612",
    arbitrumSepoliaEthToUsdAddress: "0x1DD905cb0a5aCEFF9E050eB8FAEB9b54d6C09940",
    getEthToUsdAddress: (arbitrumOneEthToUsdAddress) =>
      set(() => ({ ethToUsdAddress: arbitrumOneEthToUsdAddress })),
  })
);

interface USDToEuroAddressState {
  usdToEuroAddress?: Address;
  arbitrumOneUSDToEuroAddress: Address;
  arbitrumSepoliaUSDToEuroAddress: Address;
  getUSDToEuroAddress: (usdToEuroAddress: Address) => void;
}

export const useUSDToEuroAddressStore = create<USDToEuroAddressState>()(
  (set) => ({
    arbitrumOneUSDToEuroAddress: "0xA14d53bC1F1c0F31B4aA3BD109344E5009051a84",
    arbitrumSepoliaUSDToEuroAddress: "0x34319A7424bC39C29958d2eb905D743C2b1cAFCa",
    getUSDToEuroAddress: (arbitrumOneUSDToEuroAddress) =>
      set(() => ({ usdToEuroAddress: arbitrumOneUSDToEuroAddress })),
  })
);

interface sEuroAddressState {
  sEuroAddress?: Address;
  arbitrumsEuroAddress: Address;
  arbitrumSepoliasEuroAddress: Address;
  getsEuroAddress: (sEuroAddress: Address) => void;
}

export const usesEuroAddressStore = create<sEuroAddressState>()((set) => ({
  arbitrumsEuroAddress: "0x643b34980e635719c15a2d4ce69571a258f940e9",
  arbitrumSepoliasEuroAddress: "0x5D1684E5b989Eb232ac84D6b73D783FE44114C2b",
  getsEuroAddress: (arbitrumsEuroAddress) =>
    set(() => ({ sEuroAddress: arbitrumsEuroAddress })),
}));

interface tstAddressState {
  tstAddress?: Address;
  arbitrumTstAddress: Address;
  arbitrumSepoliaTstAddress: Address;
  getTstAddress: (tstAddress: Address) => void;
}

export const useTstAddressStore = create<tstAddressState>()((set) => ({
  arbitrumTstAddress: "0xf5A27E55C748bCDdBfeA5477CB9Ae924f0f7fd2e",
  arbitrumSepoliaTstAddress: "0xcD2204188db24d8db2b15151357e43365443B113",
  getTstAddress: (arbitrumTstAddress) =>
    set(() => ({ tstAddress: arbitrumTstAddress })),
}));

interface stakingContractsAddressState {
  stakingContractsAddress?: Address;
  arbitrumStakingContractsAddress: Address;
  arbitrumSepoliaStakingContractsAddress: Address;
  getStakingContractsAddress: (stakingContractsAddress: Address) => void;
}

export const useStakingContractsStore = create<stakingContractsAddressState>()((set) => ({
  arbitrumStakingContractsAddress: "0xBe57E0d3126a1F28a2E840ECbB842cb357e56866",
  arbitrumSepoliaStakingContractsAddress: "0x367836e4E4C3624b53aE8821d5ffe85602A83C3C",
  getStakingContractsAddress: (arbitrumStakingContractsAddress) =>
    set(() => ({ stakingContractsAddress: arbitrumStakingContractsAddress })),
}));

interface liquidationPoolAddressState {
  liquidationPoolAddress?: Address;
  arbitrumLiquidationPoolAddress: Address;
  arbitrumSepoliaLiquidationPoolAddress: Address;
  getLiquidationPoolAddress: (liquidationPool: Address) => void;
}

export const useLiquidationPoolStore = create<liquidationPoolAddressState>()((set) => ({
  // TODO ADD REAL ARB ONE ADDRESS, currently same as testnet
  arbitrumLiquidationPoolAddress: "0x44901f0E6E515DDa7cbCA3908db6E1F66aBcE06E",
  arbitrumSepoliaLiquidationPoolAddress: "0x44901f0E6E515DDa7cbCA3908db6E1F66aBcE06E",
  getLiquidationPoolAddress: (arbitrumLiquidationPoolAddress) =>
    set(() => ({ liquidationPoolAddress: arbitrumLiquidationPoolAddress })),
}));

interface ChainlinkAbiState {
  chainlinkAbi: Array<any>;
  getChainlinkAbi: (chainlinkAbi: Array<any>) => void;
}

export const useChainlinkAbiStore = create<ChainlinkAbiState>()((set) => ({
  chainlinkAbi: chainlinkAbi,
  getChainlinkAbi: (chainlinkAbi) =>
    set(() => ({ chainlinkAbi: chainlinkAbi })),
}));

interface smartVaultABIState {
  smartVaultABI: Array<any>;
}

export const useSmartVaultABIStore = create<smartVaultABIState>(() => ({
  smartVaultABI,
}));

interface contractAddressState {
  contractAddress?: any;
  arbitrumContractAddress: any;
  arbitrumSepoliaContractAddress: any;
  getContractAddress: (contractAddress: string) => void;
}
//this is the smart vault manager, I need to change its name to it
export const useContractAddressStore = create<contractAddressState>()(
  (set) => ({
    arbitrumContractAddress: "0xba169cceCCF7aC51dA223e04654Cf16ef41A68CC",
    arbitrumSepoliaContractAddress: "0xBbB704f184E716410a9c00435530eA055CfAD187",
    getContractAddress: (arbitrumContractAddress) =>
      set(() => ({ contractAddress: arbitrumContractAddress })),
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

interface StakingAbiState {
  stakingAbi: Array<any>;
  getStakingAbi: (stakingAbi: Array<any>) => void;
}

export const useStakingAbiStore = create<StakingAbiState>()(
  (set) => ({
    stakingAbi: stakingAbi,
    getStakingAbi: (stakingAbi) =>
      set(() => ({ stakingAbi: stakingAbi })),
  })
);

interface LiquidationPoolAbiState {
  liquidationPoolAbi: Array<any>;
  getLiquidationPoolAbi: (liquidationPoolAbi: Array<any>) => void;
}

export const useLiquidationPoolAbiStore = create<LiquidationPoolAbiState>()(
  (set) => ({
    liquidationPoolAbi: liquidationPoolAbi,
    getLiquidationPoolAbi: (liquidationPoolAbi) =>
      set(() => ({ liquidationPoolAbi: liquidationPoolAbi })),
  })
);

interface Erc20AbiState {
  erc20Abi: Array<any>;
  getErc20Abi: (erc20Abi: Array<any>) => void;
}

export const useErc20AbiStore = create<Erc20AbiState>()((set) => ({
  erc20Abi: erc20Abi,
  getErc20Abi: (erc20Abi) => set(() => ({ erc20Abi: erc20Abi })),
}));

interface VaultIdState {
  vaultID: any;
  getVaultID: (id: any) => void;
}

export const useVaultIdStore = create<VaultIdState>()((set) => ({
  vaultID: 1,
  getVaultID: (id) => set(() => ({ vaultID: id })),
}));

interface VaultState {
  vaultStore: any;
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

export const useVaultAddressStore = create<VaultAddressState>((set) => ({
  vaultAddress: "",
  getVaultAddress: (vaultAddress) => set({ vaultAddress: vaultAddress }), // Corrected line
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
  progressType: any;
  getCircularProgress: (circularProgress: boolean) => void;
  getProgressType: (progressType: any) => void;
}

export const useCircularProgressStore = create<CirccularProgressState>(
  (set) => ({
    circularProgress: false,
    //1 for withdraw, 2 for deposit, 3 for new vault, 5 for repay with flex-end
    progressType: 1,
    getCircularProgress: (circularProgress) => set({ circularProgress }),
    getProgressType: (progressType: any) => set({ progressType }),
  })
);

interface SnackBarState {
  type: string;
  message: string;
  getSnackBar: (type: string, message: string) => void;
}

export const useSnackBarStore = create<SnackBarState>((set) => ({
  type: '',
  message: '',
  getSnackBar: (type, message) => set({type, message }),
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

interface CounterState {
  counter: number;
  getCounter: (delta: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  counter: 0,
  getCounter: (delta) => set((state) => ({ counter: state.counter + delta })),
}));

interface RenderAppCounterState {
  renderAppCounter: number;
  incrementRenderAppCounter: () => void;
}

export const useRenderAppCounterStore = create<RenderAppCounterState>(
  (set) => ({
    renderAppCounter: 0,
    incrementRenderAppCounter: () =>
      set((state) => ({ renderAppCounter: state.renderAppCounter + 1 })),
  })
);

interface CurrentPageState {
  currentPage: any;
  getCurrentPage: (currentPage: any) => void;
}

export const useCurrentPageStore = create<CurrentPageState>((set) => ({
  currentPage: 1,
  getCurrentPage: (currentPage) => set(() => ({ currentPage: currentPage })),
}));
