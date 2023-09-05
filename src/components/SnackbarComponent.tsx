import { Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackBarStore } from "../store/Store";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

//for snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
  const { snackBar, getSnackBar } = useSnackBarStore();

  //snackbar config
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(true);
    const timer = setTimeout(() => {
      setSnackbarOpen(false);
      getSnackBar(55);
    }, 2000);
    return () => clearTimeout(timer);
  }, [snackBar]);

  //   const handleSnackbarClick = () => {
  //     setSnackbarOpen(true);
  //   };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box>
      {" "}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        {snackBar === 0 ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <Box>Success!</Box>
          </Alert>
        ) : snackBar === 1 ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            <Box>There was an error!</Box>
          </Alert>
        ) : snackBar === 2 ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            <Box>Please change to Arbitrum network!</Box>
          </Alert>
        ) : (
          <Box></Box>
        )}
      </Snackbar>
    </Box>
  );
};

export default SnackbarComponent;
