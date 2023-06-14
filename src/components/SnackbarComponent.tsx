import { Alert, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackBarStore } from "../store/Store";

const SnackbarComponent = () => {
  const { snackBar, getSnackBar } = useSnackBarStore();

  //snackbar config
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(true);
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
            <Box>Transaction successful!</Box>
          </Alert>
        ) : snackBar === 1 ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            <Box>There was an error!</Box>
          </Alert>
        ) : (
          <Box></Box>
        )}
      </Snackbar>
    </Box>
  );
};

export default SnackbarComponent;
