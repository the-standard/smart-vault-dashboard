import { useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  usePositionStore,
} from "../../store/Store.ts";

import { arbitrum } from "wagmi/chains";

import Card from "../Card.tsx";
import Button from "../Button.tsx";
import Exchange from "../Exchange.tsx";

const StakingStake = () => {
  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);
  const [learnMore, setLearnMore] = useState(false);

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
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1rem",
          gridAutoColumns: "1fr",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            justifyContent: "normal"
          }}
        >
          <Card
            sx={{
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
              Let's get you started.
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <input
                  style={{
                    background: "rgba(18, 18, 18, 0.5)",
                    border: "1px solid #8E9BAE",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    fontFamily: "Poppins",
                    height: "2.5rem",
                    width: "100%",
                    borderRadius: "10px",
                    paddingLeft: "0.5rem",
                    boxSizing: "border-box",
                    MozBoxSizing: "border-box",
                    WebkitBoxSizing: "border-box",
                  }}
                  placeholder="TST Amount"
                  type="number"
                  onChange={() => console.log(123123)}
                  // autoFocus
                  // ref={inputRef}
                />
                <Button
                  sx={{
                    marginLeft: "0.5rem",
                    padding: "0px 5px",
                    minWidth: "60px",
                    height: "2.5rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    MozBoxSizing: "border-box",
                    WebkitBoxSizing: "border-box",
                  }}
                  clickFunction={() => console.log(123123)}
                >
                  Max
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <input
                  style={{
                    background: "rgba(18, 18, 18, 0.5)",
                    border: "1px solid #8E9BAE",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    fontFamily: "Poppins",
                    height: "2.5rem",
                    width: "100%",
                    borderRadius: "10px",
                    paddingLeft: "0.5rem",
                    boxSizing: "border-box",
                    MozBoxSizing: "border-box",
                    WebkitBoxSizing: "border-box",
                  }}
                  placeholder="EUROs Amount"
                  type="number"
                  // onChange={handleAmount}
                  // autoFocus
                  // ref={inputRef}
                />
                <Button
                  sx={{
                    marginLeft: "0.5rem",
                    padding: "5px",
                    minWidth: "60px",
                    height: "2.5em",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    MozBoxSizing: "border-box",
                    WebkitBoxSizing: "border-box",
                  }}
                  // clickFunction={() => handleInputMax()}
                >
                  Max
                </Button>
              </Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      onChange={() => console.log(123123)}
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        '&.Mui-checked': {
                          color: 'rgb(56, 142, 60)',
                        },
                      }}
                    />
                  }
                  label={
                    <>
                      Auto Trade liquidated assets to EUROs and compound
                      <span style={{opacity: "0.5"}}> (Recommended)</span>
                    </>
                  }
                  sx={{
                    color: 'rgba(255,255,255,0.5',
                  }}
                />
              </FormGroup>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
              >
                Let&apos;s Stake
              </Button>
            </Box>
          </Card>
          {learnMore ? (
            <>
              <Card sx={{
                marginTop: "1rem",
                padding: "1.5rem",
              }}>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: {
                      xs: "1.2rem",
                      md: "1.5rem",
                    },
                    opacity: "0.9",
                    fontWeight: "400",
                  }}
                >
                  Learn More
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  Enter the amount of TST you would like to stake. This does two things:
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  1 - The amount of TST you stake here will represent the share of the TST pool. If you stake 3% of the pool then you will recieve 3% of all fees collected. 
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  2 - The amount of TST you stake here represents the maximum amount of EUROs you will spend to buy up liquidated assets at up to a 10% discount.
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  300 TST = 300 EUROs even if you have 500 EUROs staked. This means you should always try to have more QTST tokens in the pool as EUROs
                </Typography>
                <Button
                  sx={{
                    padding: "5px",
                    textAlign: "center",
                    width: "150px",
                    marginLeft: "auto",
                    marginTop: "1rem",
                  }}
                  lighter
                  clickFunction={() => setLearnMore(!learnMore)}
                >
                  Hide
                  <ExpandMoreIcon
                    sx={{
                      marginLeft: "6px",
                      marginRight: "-6px",
                      transform: "rotate(180deg)"
                    }}
                  />
                </Button>
              </Card>
            </>
          ) : (
            <>
              <Button
                sx={{
                  padding: "5px",
                  textAlign: "center",
                  width: "150px",
                  marginLeft: "auto",
                  marginTop: "1rem",
                }}
                clickFunction={() => setLearnMore(!learnMore)}
              >
                Learn More
                <ExpandMoreIcon
                  sx={{
                    marginLeft: "6px",
                    marginRight: "-6px",
                  }}
                />
              </Button>
            </>
          )}
        </Box>
        <Box
          sx={{
            justifyContent: "normal"
          }}
        >
          <Card
            sx={{
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
              Need TST or EUROs?
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
              You can easily buy it here in our cross chain DEX.
            </Typography>
            <Exchange toChain={arbitrum.id} toToken='0xf5A27E55C748bCDdBfeA5477CB9Ae924f0f7fd2e' />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default StakingStake;