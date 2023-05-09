import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";

interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalChildState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenMap: any;
}

const Modal2: React.FC<ModalProps> = ({ modalChildState, tokenMap }) => {
  return (
    <div>
      {" "}
      <Box sx={{}}>
        <Box sx={{}}>
          <img style={{}} src={tokenMap.get(modalChildState).image} alt="NFT" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: {
                xs: "14px",
                sm: "24px",
              },
              lineHeight: "27px",
            }}
            variant="h6"
            component="div"
          >
            {tokenMap.get(modalChildState).name}
          </Typography>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: {
                xs: "12px",
                sm: "16px",
              },
              lineHeight: "141.5%",
              textAlign: "right",
              color: "#8E9BAE",
            }}
            variant="body2"
            component="div"
          >
            Smart Vault type:{" "}
            <span
              style={{
                color: "white",
              }}
            >
              {tokenMap.get(modalChildState).attributes[8].value}
            </span>
          </Typography>
        </Box>
        {/* bg color different */}
        <Box>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "141.5%",
              color: "#8E9BAE",
              margin: "25px 0 10px 0",
            }}
            variant="body2"
            component="div"
          >
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
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[4].trait_type}
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
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
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[5].trait_type}
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
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
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[6].trait_type}
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
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
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                Total value
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[6].value}
              </Typography>
            </CardContent>
          </Card>
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "141.5%",
              color: "#8E9BAE",
              margin: "25px 0 10px 0",
            }}
            variant="body2"
            component="div"
          >
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
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[4].trait_type}
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
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
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[5].trait_type}
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[5].value}
              </Typography>
            </CardContent>{" "}
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
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                  lineHeight: "141.5%",
                  color: "#8E9BAE",
                }}
                gutterBottom
              >
                Total value minus debt
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
                gutterBottom
              >
                {tokenMap.get(modalChildState).attributes[6].value}
              </Typography>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "24px",
                color: "#8E9BAE",
                margin: "20px 0 10px 0",
              }}
              variant="body2"
              component="div"
            >
              Whoever controls this NFT controls the smart vault.<br></br> If
              you need liquidity, you can sell your smart Vault NFT and the
              owner can pay down the debt and unlock the collateral.
            </Typography>
            <Button
              sx={{
                background:
                  "linear-gradient(119.96deg, rgba(255, 255, 255, 0.1) 26.6%, rgba(255, 255, 255, 0) 64.62%)",
                border: "1px solid rgba(70, 205, 235, 0.3)",
                borderRadius: "3.88576px",
                // margin: "4rem 0 0.8rem 0",
                width: "100%",
              }}
              className="glowingCard"
              // onClick={() => write?.()}
            >
              <Typography
                sx={{
                  color: "#00FFF0",
                }}
              >
                List on opensea
              </Typography>
            </Button>{" "}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default Modal2;
