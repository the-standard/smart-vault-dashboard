import React, { useEffect } from "react";
import { useVaultStore } from "../../store/Store";

const Collateral = () => {
  const { vault, getVaultID } = useVaultStore();

  useEffect(() => {
    console.log(vault + "my vault update");
  }, []);
  return <div>Collateral</div>;
};

export default Collateral;
