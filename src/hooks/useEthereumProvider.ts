import { useState, useEffect } from "react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

function useEthereumProvider() {
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    async function createEthereumProvider() {
      const projectId: any = "67027f91c1db8751c6ea2ed13b9cdc55";
      const chains: any = [42161, 421613, 1];
      const showQrModal: any = true;
      const methods: any = [
        "eth_sendTransaction",
        "personal_sign",
        "eth_requestAccounts",
      ];
      const events: any = [
        "chainChanged",
        "accountsChanged",
        "connect",
        "session_event",
        "display_uri",
        "disconnect",
      ];

      try {
        const provider = await EthereumProvider.init({
          projectId,
          chains,
          showQrModal,
          methods,
          events,
        });
        setProvider(provider);
      } catch (error) {
        console.error("Error initializing Ethereum provider:", error);
      }
    }

    createEthereumProvider();
  }, []);

  return provider;
}

export default useEthereumProvider;
