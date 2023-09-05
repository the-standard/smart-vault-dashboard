import { Box, Grid } from "@mui/material";
import LoginCard from "../LoginCard.tsx";

const HomePub = () => {
  return (
    <Box>
      <Grid
        sx={{
          padding: "0 12%",
          margin: "1.5rem 0",
          minHeight: "50vh",
        }}
        container
        spacing={2}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            width: "100%",
            gap: "2rem",
            marginRight: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <LoginCard />
        </Box>
      </Grid>
    </Box>
  );
};

export default HomePub;