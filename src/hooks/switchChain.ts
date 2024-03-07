/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  switchChain as wagmiSwitchChain,
  getAccount
} from '@wagmi/core';
import { walletClientToSignerAsync } from '../hooks/useEthersSigner';
import WagmiConfig from "../WagmiConfig";

export const switchChain = async (swapChainId: number) => {
  const { chainId } = getAccount(WagmiConfig);

  if (chainId !== swapChainId) {
    try {
      const chain = await wagmiSwitchChain(WagmiConfig, { chainId: swapChainId });
      return await walletClientToSignerAsync(chain?.id);
    } catch {
      throw new Error("Couldn't switch chain.");
    }
  }
  return await walletClientToSignerAsync(chainId);
};