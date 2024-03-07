import LiFiExchange from "../components/LiFiExchange.tsx";
import Card from "../components/Card";

const Dex = () => {
  return (
    <Card
      sx={{
        margin: { xs: "3% 3%", sm: "3% 12%" },
        padding: "5%",
        minHeight: "300px",
        height: "100%",
      }}
    >
      <LiFiExchange />
    </Card>
  );
};

export default Dex;
