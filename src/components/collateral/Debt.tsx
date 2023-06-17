import { Box, Typography } from "@mui/material";

// import CircularProgress from "@mui/material/CircularProgress";
import { useRef, useState } from "react";
import seurologo from "../../assets/seurologo.png";
// import handshake from "../../assets/handshake.png";
import { useAccount } from "wagmi";
import smartVaultAbi from "../../abis/smartVault";
import { ethers } from "ethers";
import {
  useTransactionHashStore,
  useVaultAddressStore,
  useVaultStore,
  usesEuroAbiStore,
  usesEuroAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
} from "../../store/Store";
import { formatEther, parseEther } from "viem";

const Debt = () => {
  const [activeElement, setActiveElement] = useState(1);
  const { address } = useAccount();
  const [amount, setAmount] = useState<any>(0);
  const { vaultAddress } = useVaultAddressStore.getState();
  const { vaultStore }: any = useVaultStore();
  const { sEuroAddress } = usesEuroAddressStore.getState();
  const { sEuroAbi } = usesEuroAbiStore.getState();
  const { getTransactionHash } = useTransactionHashStore.getState();
  const inputRef: any = useRef<HTMLInputElement>(null);
  const { getCircularProgress } = useCircularProgressStore();
  const { getSnackBar } = useSnackBarStore();

  const debtValue: any = ethers.BigNumber.from(vaultStore[5][0]);
  console.log(debtValue.toString());

  const handleClick = (element: any) => {
    setActiveElement(element);
    handleInputFocus();
  };

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);

  const borrowMoney = async () => {
    let transactionResponse; // Declare a variable to hold the transaction response
    console.log(parseEther(amount.toString()));
    console.log(ethers.BigNumber.from(amount));

    try {
      console.log(vaultAddress);
      transactionResponse = await contract.mint(
        address,
        parseEther(amount.toString())
      );
      // Access the transaction hash from the transaction response
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
    } catch (error) {
      console.log(error);
    }
  };

  const repayMoney = async () => {
    //let transactionResponse; // Declare a variable to hold the transaction response
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);
    console.log(vaultAddress);
    console.log(amount.toString());
    const sEuroFee: any = (amount * 0.01).toString();
    console.log(parseEther(sEuroFee));

    const signer = provider.getSigner();
    const sEuroContract = new ethers.Contract(sEuroAddress, sEuroAbi, signer);

    try {
      // Approve the transfer of the fee amount
      const feeAmount = ethers.utils.parseUnits(sEuroFee, 18); // Replace "1" with the calculated fee amount (1% of the amount to repay)
      await sEuroContract.approve(vaultAddress, feeAmount);

      const transactionResponse = await contract.burn(
        parseEther(amount.toString())
      );
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = () => {
    if (activeElement === 1) {
      console.log("borrow");
      borrowMoney();
    } else {
      console.log("paydown");
      repayMoney();
    }
  };

  const waitForTransaction = async (_transactionHash: string) => {
    try {
      getCircularProgress(true);
      await provider.waitForTransaction(_transactionHash);
      getCircularProgress(false); // Set isLoading to false after the transaction is mined
      getSnackBar(0);
      //   handleSnackbarClick();
    } catch (error) {
      console.log(error);
      getCircularProgress(false);
      getSnackBar(1);
      //  handleSnackbarClick();
    }
  };

  // useEffect(() => {
  //   console.log(circularProgress);
  // }, []);

  const handleInputFocus = () => {
    inputRef.current.focus();
  };

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);

  const borrowValues = [
    {
      key: "Mint to address",
      value: shortenedAddress,
    },
    {
      key: "Fixed interest %",
      value: "0",
    },
    {
      key: "Minting Fee (1%)",
      value: amount * 0.01,
    },
    {
      key: "Borrowing",
      value: amount + amount * 0.01,
    },
    {
      key: "Receiving",
      value: amount,
    },
  ];
  const repayValues = [
    {
      key: "Fixed interest %",
      value: "0",
    },
    {
      key: "Burn Fee (1%)",
      value: amount * 0.01,
    },
    {
      key: "Actual Repayment",
      value: amount,
    },
    {
      key: "Send",
      value: amount + amount * 0.01,
    },
  ];

  return (
    <Box
      sx={{
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(13.9px)",
        WebkitBackdropFilter: "blur(13.9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "10px ",
        width: "auto",
        height: "auto",
        padding: "1rem",
        marginTop: "0.5rem",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Box>
        <Box
          sx={{
            //  backgroundImage: `url(${handshake})`,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "31.9031px",
            }}
            src={seurologo}
            alt="seurologo"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Typography
              sx={{
                margin: "0 10px",
              }}
              variant="body1"
            >
              sEURO outstanding:{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              € {formatEther(debtValue.toString())}{" "}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // background: " rgba(18, 18, 18, 0.5)",
          // boxShadow:
          //   " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          // borderRadius: "6.24932px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
            transition: "0.5s",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "165% 0",
              transition: "0.7s",
            },
            "&:hover:after": {
              backgroundPosition: "-20% 0",
            },
            "&:hover": {
              boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-5px)",
            },
            "&:active": {
              transform: "translateY(0)",
              border: "2px solid rgba(152, 250, 250, 0.5)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            },
            "&.activeBtn": {
              background:
                "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 1 ? "activeBtn" : ""}
          onClick={() => handleClick(1)}
        >
          Borrow
        </Box>
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
            transition: "0.5s",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "165% 0",
              transition: "0.7s",
            },
            "&:hover:after": {
              backgroundPosition: "-20% 0",
            },
            "&:hover": {
              boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-5px)",
            },
            "&:active": {
              transform: "translateY(0)",
              border: "2px solid rgba(152, 250, 250, 0.5)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            },
            "&.activeBtn": {
              background:
                "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 2 ? "activeBtn" : ""}
          onClick={() => handleClick(2)}
        >
          Repay
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {activeElement === 1 ? (
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "1px solid #8E9BAE",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Poppins",
              height: "2rem",
              margin: "0.5rem",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            placeholder="Amount of sEURO to borrow"
            type="text"
            onChange={handleAmount}
            autoFocus
            ref={inputRef}
          />
        ) : (
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "1px solid #8E9BAE",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Poppins",
              height: "2rem",
              margin: "0.5rem",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            placeholder="Amount of sEURO you want to repay "
            type="text"
            onChange={handleAmount}
            autoFocus
            ref={inputRef}
          />
        )}
      </Box>

      <Box
        sx={{
          borderRadius: "10px",
          padding: "1rem",
          marginTop: "1rem",
          marginBottom: activeElement !== 1 ? "1.5rem" : "0",
        }}
      >
        {activeElement === 1
          ? borrowValues.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <Typography
                  sx={{
                    color: "#8E9BAE",
                  }}
                  variant="body1"
                >
                  {item.key}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </Box>
            ))
          : repayValues.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <Typography
                  sx={{
                    color: "#8E9BAE",
                  }}
                  variant="body1"
                >
                  {item.key}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </Box>
            ))}
      </Box>

      {/* {activeElement === 1 ? (
        <Typography variant="body1" sx={{ color: "red", marginTop: "1rem" }}>
          Note: Stake LP tokens to earn & make Minting fee 0%{" "}
          <a
            href="https://app.uniswap.org/#/add/ETH/0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb"
            target="_blank"
          >
            learn more
          </a>
        </Typography>
      ) : (
        <div></div>
      )} */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          borderRadius: "10px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "100%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
            transition: "0.5s",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "165% 0",
              transition: "0.7s",
            },
            "&:hover:after": {
              backgroundPosition: "-20% 0",
            },
            "&:hover": {
              boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-5px)",
            },
            "&:active": {
              transform: "translateY(0)",
              border: "2px solid rgba(152, 250, 250, 0.5)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            },
            "&.activeBtn": {
              background:
                "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
            },
          }}
          onClick={handleWithdraw}
        >
          {activeElement === 1 ? "Withdraw" : "Repay"}
        </Box>
      </Box>
    </Box>
  );
};

export default Debt;
