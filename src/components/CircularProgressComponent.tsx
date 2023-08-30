import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCircularProgressStore } from "../store/Store";
// import { useEffect } from "react";
import withdrawLottie from "../lotties/withdrawal.json";
import depositLottie from "../lotties/deposit.json";
import newVaultLottie from "../lotties/newVault.json";
import Lottie from "lottie-react";

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
            <Box
              sx={{
                background:
                  "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
                borderRadius: "10px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(13.9px)",
                WebkitBackdropFilter: "blur(13.9px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    width: "450px",
                  }}
                  variant="body2"
                >
                  Withdrawing from your blockchain smart vault{" "}
                </Typography>
                <Lottie animationData={withdrawLottie} />{" "}
              </Box>
            </Box>
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
            <Box
              sx={{
                background:
                  "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
                borderRadius: "10px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(13.9px)",
                WebkitBackdropFilter: "blur(13.9px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    width: "450px",
                  }}
                  variant="body2"
                >
                  Depositing to your blockchain smart vault
                </Typography>
                <Lottie animationData={depositLottie} />{" "}
              </Box>
            </Box>
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
            <Box
              sx={{
                background:
                  "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
                borderRadius: "10px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(13.9px)",
                WebkitBackdropFilter: "blur(13.9px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    width: "450px",
                  }}
                  variant="body2"
                >
                  Creating your blockchain smart vault{" "}
                </Typography>
                <Lottie animationData={newVaultLottie} />{" "}
              </Box>
            </Box>
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
