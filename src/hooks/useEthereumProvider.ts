import { useState, useEffect } from "react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

function useEthereumProvider() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    async function createEthereumProvider() {
      const projectId: any = "67027f91c1db8751c6ea2ed13b9cdc55";
      const chains: any = [1]; // Ethereum Mainnet chain ID
      const showQrModal: any = true;
      const methods: any = ["eth_sendTransaction", "personal_sign"];
      const events: any = [
        "chainChanged",
        "accountsChanged",
        "connect",
        "session_event",
        "display_uri",
        "disconnect",
      ];

      try {
        const provider: any = await EthereumProvider.init({
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
