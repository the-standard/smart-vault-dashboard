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
  const { type, message, getSnackBar } = useSnackBarStore();

  //snackbar config
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(true);
    const timer = setTimeout(() => {
      setSnackbarOpen(false);
      getSnackBar('', '');
    }, 2000);
    return () => clearTimeout(timer);
  }, [type, message]);

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        {type === 'SUCCESS' ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <Box>
              {message ? (
                `${message}`
              ) : (
                `Success!`
              )}
            </Box>
          </Alert>
        ) : type === 'ERROR' ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            <Box>
              {message ? (
                `${message}`
              ) : (
                `There was an error!`
              )}
            </Box>
          </Alert>
        ) : type === 'WARNING' && message ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            <Box>
              {message ? (
                `${message}`
              ) : (null)}
            </Box>
          </Alert>
        ) : type === 'INFO' && message ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="info"
            sx={{ width: "100%" }}
          >
            <Box>
              {message ? (
                `${message}`
              ) : (null)}
            </Box>
          </Alert>
        ) : (
          <Box></Box>
        )}
      </Snackbar>
    </Box>
  );
};

export default SnackbarComponent;
