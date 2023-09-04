import HomePub from "../components/home/HomePub.tsx";
import HomePriv from "../components/home/HomePriv.tsx";

import { useAccount } from "wagmi";

const HomePage = () => {
  const { address } = useAccount();

  if (address) {
    return (
      <HomePriv />
    )
  }

  return (
    <HomePub />
  );
};

export default HomePage;
