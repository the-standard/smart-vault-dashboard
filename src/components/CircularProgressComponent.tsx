import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCircularProgressStore } from "../store/Store";
import { useEffect } from "react";
import withdrawLottie from "../lotties/withdrawal.json";
import depositLottie from "../lotties/deposit.json";
import newVaultLottie from "../lotties/newVault.json";
import Lottie from "lottie-react";

const CircularProgressComponent = () => {
  const { circularProgress, progressType } = useCircularProgressStore();
  console.log(circularProgress);
  // const zIndexValue = circularProgress ? 9999 : -9999;

  useEffect(() => {
    console.log(circularProgress);
  }, []);

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
              alignItems: "flex-end",
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
                <Lottie animationData={newVaultLottie} />{" "}
              </Box>
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
            {" "}
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
