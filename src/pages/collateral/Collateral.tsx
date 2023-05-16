import React, { useEffect } from "react";
import { useVaultIdStore } from "../../store/Store";

const Collateral = () => {
  const { vault, getVaultID } = useVaultIdStore();

  useEffect(() => {
    console.log(vault + "my vault update");
  }, []);
  return <div>Collateral</div>;
};

export default Collateral;
