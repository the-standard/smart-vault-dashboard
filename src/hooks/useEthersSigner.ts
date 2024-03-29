import { Web3Provider } from '@ethersproject/providers';
import { getWalletClient } from '@wagmi/core';
import { useMemo } from 'react';
import { useWalletClient } from 'wagmi';

export function walletClientToSigner(walletClient?: any | null) {
  if (walletClient) {
    const provider = new Web3Provider(walletClient?.transport, 'any');
    const signer = provider.getSigner();
    return signer;
  } else {
    throw Error('WalletClient not found');
  }
}

export async function walletClientToSignerAsync(chainId?: number) {
  // @ts-expect-error
  const walletClient = await getWalletClient({ chainId });
  return walletClientToSigner(walletClient);
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });

  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  );
}