import { Box } from "@mui/material";
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
    <Box>
      {items.map((item) => (
        <VaultCard
          title={item.title}
          para={item.para}
          borrowRate={item.borrowRate}
        />
      ))}
    </Box>
  );
};

export default HomePage;
