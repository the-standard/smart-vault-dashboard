import { Box, Typography } from "@mui/material";
import React from "react";

interface HistoryGridProps {
  props: any;
  TruncatedTableCell: any;
  formatDate: any;
}

const HistoryGrid: React.FC<HistoryGridProps> = ({
  props,
  TruncatedTableCell,
  formatDate,
}) => {
  return (
    <>
      {props ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "90%",
            borderCollapse: "collapse",
            // backdropFilter: "blur(10px)",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            //  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            // border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "#afafaf",
            padding: "1rem",
            marginBlock: "1rem",
            background: " rgba(0, 0, 0, 0.4)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(13.9px)",
            WebkitBackdropFilter: "blur(13.9px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "white" }}>
              {" "}
              Vault{" "}
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              {props.token_id}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "white" }}>
              {" "}
              From{" "}
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              <TruncatedTableCell value={props.from_address} length={12} />
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "white" }}>
              {" "}
              To{" "}
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              <TruncatedTableCell value={props.to_address} length={12} />
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "white" }}>
              {" "}
              Block Number{" "}
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              <TruncatedTableCell value={props.block_number} length={12} />
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "white" }}>
              {" "}
              Date{" "}
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              {formatDate(props.block_timestamp)}
              {/* <TruncatedTableCell value={props.block_timestamp} length={12} /> */}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>loading</Box>
      )}
    </>
  );
};

export default HistoryGrid;
