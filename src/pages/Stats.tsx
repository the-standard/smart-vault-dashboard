import { Box, Typography } from "@mui/material";
import statsbg from "../assets/statsbg.png";

import Card from "../components/Card";

const Stats = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1440px",
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },
        height: "100%",
      }}
    >
      <Card
        sx={{
          padding: "1%",
          minHeight: "100vh",
          height: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            '&:before': {
              content: '""',
              display: "block",
              position: "absolute",
              left: "0",
              top: "0",
              width: "100%",
              height: "100%",
              opacity: "0.3",
              backgroundImage: `url(${statsbg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(1.5) saturate(1.3)",
              zIndex: "-1",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                md: "1.2rem",
                lg: "2.5rem",
              },
              textAlign: "center",
            }}
            variant="h4"
          >
            Statistics and Epic Data Dashboard
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "4rem",
                lg: "5rem",
              },
            }}
            variant="h1"
          >
            COMING SOON
          </Typography>
        </Box>
      </Card>
    </Box>

  );
};

export default Stats;
