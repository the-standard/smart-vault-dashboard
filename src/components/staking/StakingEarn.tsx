import { useLayoutEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import {
  usePositionStore,
} from "../../store/Store.ts";

import Card from "../Card.tsx";
import Button from "../Button.tsx";

const StakingEarn = () => {
  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  useLayoutEffect(() => {
    function updatePosition() {
      if (rectangleRef.current) {
        const { right, top } = rectangleRef.current.getBoundingClientRect();
        setPosition({ right, top });
      }
    }
    window.addEventListener("resize", updatePosition);
    updatePosition();
    return () => window.removeEventListener("resize", updatePosition);
  }, [setPosition]);


  return (
    <Box
      ref={rectangleRef}
    >

      <Card
        sx={{
          marginBottom: "1rem",
          padding: "1.5rem",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            margin: "1rem 0",
            marginTop: "0",
            fontSize: {
              xs: "1.5rem",
              md: "2.125rem"
            }
          }}
          variant="h4"
        >
          Earn From Fees and Liquidations
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: "column",
              sm: "row",
            }
          }}
        >
          <Box
            sx={{
              flex: "1",
              display: 'flex',
              flexDirection: {
                xs: "column",
              },
            }}
          >
            <Box sx={{width: "100%", marginBottom: "2rem"}}>
              <Typography
                sx={{
                  color: "#fff",
                  margin: "1rem 0",
                  marginTop: "0",
                  fontSize: {
                    xs: "1.2rem",
                    md: "1.8rem"
                  }
                }}
                variant="h4"
              >
                Staking
              </Typography>
              <Typography
                sx={{
                  marginBottom: "1rem",
                  fontSize: {
                    xs: "1rem",
                    md: "1.2rem",
                  },
                  opacity: "0.9",
                  fontWeight: "300",
                }}
              >
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
              </Typography>
              <Button
                sx={{
                  width: "100%",
                  maxWidth: "120px",
                }}
                lighter
              >
                <Typography
                  sx={{
                    color: "#f1fbfa",
                    fontFamily: "Poppins",
                    fontSize: { xs: "1rem", md: "0.8rem", lg: "1rem" },
                  }}
                >
                  Learn More
                </Typography>
              </Button>
            </Box>
            <Box sx={{width: "100%", marginBottom: "2rem"}}>
              <Typography
                sx={{
                  color: "#fff",
                  margin: "1rem 0",
                  marginTop: "0",
                  fontSize: {
                    xs: "1.2rem",
                    md: "1.8rem"
                  }
                }}
                variant="h4"
              >
                Earning
              </Typography>
              <Typography
                sx={{
                  marginBottom: "1rem",
                  fontSize: {
                    xs: "1rem",
                    md: "1.2rem",
                  },
                  opacity: "0.9",
                  fontWeight: "300",
                }}
              >
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
              </Typography>
              <Button
                sx={{
                  width: "100%",
                  maxWidth: "120px",
                }}
                lighter
              >
                <Typography
                  sx={{
                    color: "#f1fbfa",
                    fontFamily: "Poppins",
                    fontSize: { xs: "1rem", md: "0.8rem", lg: "1rem" },
                  }}
                >
                  Learn More
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: "1",
              display: 'flex',
              flexDirection: {
                xs: "column",
              },
            }}
          >
            <Box sx={{width: "100%", marginBottom: "2rem"}}>
              <Typography
                sx={{
                  color: "#fff",
                  margin: "1rem 0",
                  marginTop: "0",
                  fontSize: {
                    xs: "1.2rem",
                    md: "1.8rem"
                  }
                }}
                variant="h4"
              >
                Claiming
              </Typography>
              <Typography
                sx={{
                  marginBottom: "1rem",
                  fontSize: {
                    xs: "1rem",
                    md: "1.2rem",
                  },
                  opacity: "0.9",
                  fontWeight: "300",
                }}
              >
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
              </Typography>
            </Box>
            <Box sx={{width: "100%"}}>
              {/* TODO Placeholder */}
              <Box sx={{
                height: "300px",
                width: "100%",
                background: "rgb(0,0,0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: "0.5",
              }}>
                [VIDEO] How to earn from liquidation and fees
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default StakingEarn;