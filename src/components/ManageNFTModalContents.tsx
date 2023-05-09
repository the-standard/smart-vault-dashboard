import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalChildState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenMap: any;
}

const ManageNFTModalContents: React.FC<ModalProps> = ({
  modalChildState,
  tokenMap,
}) => {
  console.log(modalChildState);
  console.log(tokenMap.get(modalChildState));
  //modal styles
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    // bgcolor:
    //   "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%);",
    bgcolor: "#0C0C0C",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      {" "}
      <Box sx={style}>
        <img style={{}} src={tokenMap.get(modalChildState).image} alt="NFT" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            {tokenMap.get(modalChildState).name}
          </Typography>
          <Typography variant="body2" component="div">
            Smart Vault type:{" "}
            {tokenMap.get(modalChildState).attributes[8].value}
          </Typography>
        </Box>
        {/* bg color different */}
        <Box>
          <Typography variant="body2" component="div">
            Collateral
          </Typography>
          <Card
            sx={{
              background: "#121212",
              boxShadow:
                "0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "6.47627px",
              color: "#FFFFFF",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[4].trait_type}
              </Typography>{" "}
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[4].value}
              </Typography>
            </CardContent>{" "}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[5].trait_type}
              </Typography>{" "}
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[5].value}
              </Typography>
            </CardContent>{" "}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[6].trait_type}
              </Typography>{" "}
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[6].value}
              </Typography>
            </CardContent>
            <div
              style={{
                height: "1px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "90%",
                  background: "#8E9BAE",
                }}
              ></div>
            </div>
          </Card>
          <Typography variant="body2" component="div">
            Debt
          </Typography>
          <Card
            sx={{
              background: "#121212",
              boxShadow:
                "0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "6.47627px",
              color: "#FFFFFF",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[4].trait_type}
              </Typography>{" "}
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[4].value}
              </Typography>
            </CardContent>{" "}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[5].trait_type}
              </Typography>{" "}
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[5].value}
              </Typography>
            </CardContent>{" "}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[6].trait_type}
              </Typography>{" "}
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {tokenMap.get(modalChildState).attributes[6].value}
              </Typography>
            </CardContent>
            <div
              style={{
                height: "1px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "90%",
                  background: "#8E9BAE",
                }}
              ></div>
            </div>
          </Card>
          <button>click</button>
        </Box>
      </Box>
    </div>
  );
};

export default ManageNFTModalContents;
