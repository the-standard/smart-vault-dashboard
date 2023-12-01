import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCircularProgressStore } from "../store/Store";
// import { useEffect } from "react";
import withdrawLottie from "../lotties/withdrawal.json";
import depositLottie from "../lotties/deposit.json";
import newVaultLottie from "../lotties/newVault.json";
import Lottie from "lottie-react";

import Card from "../components/Card";

const CircularProgressComponent = () => {
  const { circularProgress, progressType } = useCircularProgressStore();
  // const zIndexValue = circularProgress ? 9999 : -9999;
  // let progressType = 5;
  // let circularProgress = true;
  // useEffect(() => {
  //   console.log(circularProgress);
  // }, []);

  return (
    <Box>
      {circularProgress ? (
        progressType === 1 ? (
          <Box
            sx={{
              position: "fixed", // Change this line
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
            }}
          >
            {" "}
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Withdrawing from your blockchain smart vault{" "}
                </Typography>
                <Lottie animationData={withdrawLottie} />{" "}
              </Box>
            </Card>
          </Box>
        ) : progressType === 2 ? (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
              //  marginTop: "500px",
            }}
          >
            {" "}
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Depositing to your blockchain smart vault
                </Typography>
                <Lottie animationData={depositLottie} />{" "}
              </Box>
            </Card>
          </Box>
        ) : progressType === 3 ? (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
            }}
          >
            {" "}
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Creating your blockchain smart vault{" "}
                </Typography>
                <Lottie animationData={newVaultLottie} />{" "}
              </Box>
            </Card>
          </Box>
        ) : // moved this one to debt.tsx
        progressType === 5 ? (
          <Box sx={{}}>
            {" "}
            <Box sx={{}}>
              {/* <Box
                sx={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <Lottie animationData={depositLottie} />{" "}
              </Box> */}
            </Box>
          </Box>
        ) : progressType === 'SWAP' ? (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
              //  marginTop: "500px",
            }}
          >
            {" "}
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Swapping Your Asset
                </Typography>
                <Lottie animationData={depositLottie} />{" "}
              </Box>
            </Card>
          </Box>
        ) : progressType === 'STAKE_DEPOSIT' ? (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
            }}
          >
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Increasing Your Stake
                </Typography>
                <Lottie animationData={depositLottie} />
              </Box>
            </Card>
          </Box>
        ) : progressType === 'STAKE_CLAIM' ? (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
            }}
          >
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Claiming Your Rewards
                </Typography>
                <Lottie animationData={withdrawLottie} />
              </Box>
            </Card>
          </Box>
        ) : progressType === 'STAKE_WITHDRAW' ? (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
            }}
          >
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                width: "450px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="body2"
                >
                  Decreasing Your Stake
                </Typography>
                <Lottie animationData={withdrawLottie} />
              </Box>
            </Card>
          </Box>
        ) : (
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "transparent",
              zIndex: 9999,
            }}
          >
            <CircularProgress />
          </Box>
        )
      ) : (
        <Box> </Box>
      )}
    </Box>
  );
};

export default CircularProgressComponent;
