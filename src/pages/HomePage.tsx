import { Web3Button } from "@web3modal/react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { useDisconnect } from "wagmi";
import { IoSettingsSharp } from "react-icons/io5";
import { Badge, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const HomePage = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  // if (isConnected)
  //   return (
  //     <div>
  //       <div>Connected to {ensName ?? address}</div>
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   );
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <div>
          <h1>TheStandard.io</h1>
        </div>
        <div>
          <Web3Button />
          <IoSettingsSharp />
          <Badge color="secondary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </div>
      </Box>
    </div>
  );
};

export default HomePage;
