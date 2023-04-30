import { Box, Grid } from "@mui/material";
import VaultCard from "../components/vaultCard/VaultCard";

const items = [
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
];

const HomePage = () => {
  return (
    <Grid
      sx={{
        padding: "0 7%",
        margin: "5rem 0",
      }}
      container
      spacing={2}
    >
      {items.map((item) => (
        <Grid item xs={12} sm={6} key={item.title}>
          <VaultCard
            title={item.title}
            para={item.para}
            borrowRate={item.borrowRate}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
