import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCircularProgressStore } from "../store/Store";
import { useEffect } from "react";
import withdrawLottie from "../lotties/withdrawal.json";
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
        progressType === 2 ? (
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
            <CircularProgress />
          </Box>
        ) : (
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
                width: "100px",
                height: "100px",
              }}
            >
              <Lottie animationData={withdrawLottie} />{" "}
            </Box>
          </Box>
        )
      ) : (
        <Box> </Box>
      )}
    </Box>
  );
};

export default CircularProgressComponent;
