import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCircularProgressStore } from "../store/Store";
import { useEffect } from "react";

const CircularProgressComponent = () => {
  const { circularProgress } = useCircularProgressStore();
  console.log(circularProgress);
  // const zIndexValue = circularProgress ? 9999 : -9999;

  useEffect(() => {
    console.log(circularProgress);
  }, []);

  return (
    <Box>
      {circularProgress ? (
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
        <Box> </Box>
      )}
    </Box>
  );
};

export default CircularProgressComponent;
