import { useState } from "react";
import { useWalletClient } from "wagmi";
import { providers } from "ethers";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "../components/Button";

import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  optimism,
  polygon,
  bsc,
  zkSync,
  polygonZkEvm,
  base,
  avalanche,
  gnosis
} from "wagmi/chains";

import { LiFi, RouteOptions, Route } from '@lifi/sdk';
const lifi = new LiFi({
  integrator: 'The Standard',
  apiUrl: 'https://staging.li.quest/v1/' // Testnet API
})

interface LiFiExchangeProps {
  fromChain?: number,
  toChain?: number,
  fromToken?: any,
  toToken?: any
}

interface RoutesRequest {
  fromChainId: number;
  fromAmount: string;
  fromTokenAddress: string;
  fromAddress?: string;
  toChainId: number;
  toTokenAddress: string;
  toAddress?: string;
  options?: RouteOptions; 
}

const LiFiExchange: React.FC<LiFiExchangeProps> = ({
  // fromChain,
  // toChain,
  // fromToken,
  // toToken
}) => {
  const [chosenRoute, setChosenRoute] = useState<Route>();
  const [fromChain, setFromChain] = useState('arbitrum');
  const [fromAmount, setFromAmount] = useState('0');
  const [fromAddress, setFromAddress] = useState('');

  const [toChain, setToChain] = useState('arbitrum');
  const [toAmount, setToAmount] = useState('0');
  const [toAddress, setToAddress] = useState('');

  const chains = {
    arbitrum: arbitrum,
    arbitrumSepolia: arbitrumSepolia,
    ethereum: mainnet,
    optimism: optimism,
    polygon: polygon,
    bsc: bsc,
    zkSync: zkSync,
    polygonZkEvm: polygonZkEvm,
    base: base,
    avalanche: avalanche,
    gnosis: gnosis,
  };

  const getChainId = (chain: string) => {
    switch (chain) {
      case 'arbitrum':
        return arbitrum.id;
      case 'arbitrumSepolia':
        return arbitrumSepolia.id;
      case 'ethereum':
        return mainnet.id;
      case 'optimism':
        return optimism.id;
      case 'polygon':
        return polygon.id;
      case 'bsc':
        return bsc.id;
      case 'zkSync':
        return zkSync.id;
      case 'polygonZkEvm':
        return polygonZkEvm.id;
      case 'base':
        return base.id;
      case 'avalanche':
        return avalanche.id;
      case 'gnosis':
        return gnosis.id;
      default:
        return arbitrum.id;
    }  
  }

  const fromId = getChainId(fromChain);

  console.log(123123, {fromId})

  const routeOptions: RouteOptions = {
    order: 'RECOMMENDED'
  }

  const routesRequest = {
    fromChainId: 5, // Goerli
    fromAmount: '1000000000000000000', // 1 ETH
    fromTokenAddress: '0x0000000000000000000000000000000000000000', // ETH
    toChainId: 420, // Optimism Goerli
    toTokenAddress: '0x0000000000000000000000000000000000000000', // ETH
  };

  const getLiFiRoute = async () => {
    try {
      const result = await lifi.getRoutes(routesRequest);
      const routes = result.routes;
      const useRoute = routes[0];
      console.log(10101, {result}, {routes}, {useRoute})
      setChosenRoute(useRoute);
    } catch (error) {
      // setChosenRoute();
      console.log(40404, error);
    }
  };

  console.log(123123, chosenRoute)

  // const updateCallback = (updatedRoute: Route) => {
  //   console.log('Ping! Everytime a status update is made!')
  // }

  // const executeLiFiRoute = async () => {
  //   try {
  //     const route = await lifi.executeRoute(signer, chosenRoute, { updateCallback })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Box>
      <Button
        clickFunction={getLiFiRoute}
      >
        DO IT
      </Button>
    </Box>
  );
};

export default LiFiExchange;
