/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { WidgetConfig } from '@lifi/widget';
import { LiFiWidget, WidgetVariant } from '@lifi/widget';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useConnect, useDisconnect } from 'wagmi';
import { useEthersSigner, walletClientToSigner } from '../hooks/useEthersSigner';
import { switchChain } from '../hooks/switchChain';

interface LiFiExchangeProps {
  variant?: WidgetVariant,
  fromChain?: number,
  toChain?: number,
  fromToken?: any,
  toToken?: any
}
const LiFiExchange: React.FC<LiFiExchangeProps> = ({
  variant = 'default',
  fromChain,
  toChain,
  fromToken,
  toToken
}) => {
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const signer = useEthersSigner();

  const widgetConfig: WidgetConfig = useMemo(() => {
    const config: WidgetConfig = {
      integrator: 'The Standard',
      appearance: 'dark',
      variant,
      containerStyle: {
        border: '1px solid rgb(234, 234, 234)',
        borderRadius: '16px',
      },
      fromChain,
      toChain,
      toToken,
      fromToken,  
      walletManagement: {
        signer: signer,
        connect: async () => {
          const result = await connectAsync({ connector: connectors[0] });
          const walletClient = await result.connector?.getWalletClient();
          if (walletClient) {
            return walletClientToSigner(walletClient);
          } else {
            throw Error('WalletClient not found');
          }
        },
        disconnect: async () => {
          disconnect();
        },
        switchChain: async (reqChainId: number) => {
          await switchChain(reqChainId);
          if (signer) {
            return signer!;
          } else {
            throw Error('No signer object after chain switch');
          }
        },
      },
      tokens: {
        featured: [
          {
            address: '0xa0b93b9e90ab887e53f9fb8728c009746e989b53',
            symbol: 'TST',
            decimals: 18,
            chainId: 1,
            name: 'The Standard Token',
            logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22108.png',
          },
          {
            address: '0xb399511642FE1666c6a07f83483e6E4feAed9A00',
            symbol: 'EUROs',
            decimals: 18,
            chainId: 1,
            name: 'The Standard EURO',
            logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22588.png',
          },
          {
            address: '0xe342ebb6a56cd3dbf0fe01a447fe367b9290ecf8',
            symbol: 'TST',
            decimals: 18,
            chainId: 137,
            name: 'The Standard Token',
            logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22108.png',
          },
          {
            address: '0xf5A27E55C748bCDdBfeA5477CB9Ae924f0f7fd2e',
            symbol: 'TST',
            decimals: 18,
            chainId: 42161,
            name: 'The Standard Token',
            logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22108.png',
          },
          {
            address: '0x643b34980e635719c15a2d4ce69571a258f940e9',
            symbol: 'EUROs',
            decimals: 18,
            chainId: 42161,
            name: 'The Standard EURO',
            logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22588.png',
          },
        ],
      }  
    };

    return config;
  }, [signer, connectAsync, connectors, disconnect]);

  return (
    <Box>
      <LiFiWidget
        integrator="The Standard"
        config={widgetConfig}
      />
    </Box>
  );
}

export default LiFiExchange;