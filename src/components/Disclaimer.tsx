import { useState, useEffect } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom'

import Card from "./Card";
import Button from "./Button";

const Disclaimer = () => {
  const cookies = new Cookies();
  const [terms, setTerms] = useState<any>(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const termsCookie = cookies.get('_ibcotv1');
    if (!termsCookie) {
      setTerms(false);
    }
  }, [terms]);

  const handleAccept = () => {
    const now = Math.floor(Date.now() / 1000);
    const day = 86400;
    const then = new Date((now + (day * 30)) * 1000);
    cookies.set('_ibcotv1', now, { path: '/', expires: then });
    setTerms(true);
  };

  const location = useLocation();

  const handleHideDisclaimer = () => {
    switch (location?.pathname) {
      case '/termsofuse':
        return true;
      default:
        return false;
    }  
  };

  const noDisclaimer = handleHideDisclaimer();


  if (noDisclaimer) {
    return (<></>);
  }

  return (
    <>
      <Modal
        open={terms === false}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            position: { xs: "absolute" as const, md: "" },
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "80%",
              sm: "80%",
              md: "70%",
            },
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
          }}
          className="modal-content"
        >
          <Box sx={{
            height: "100%",
            overflowY: "scroll",
          }}>
            <Box>
              <Typography variant="h4" sx={{marginBottom: "1rem"}}>
                Disclaimer
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{marginBottom: "1rem", opacity:"0.8"}}>
                The Standard is a fully decentralized stablecoin. No representation or warranty is made concerning any aspect of the The Standard.io, including its suitability, quality, availability, accessibility, accuracy or safety. As more fully explained in the
                <a
                  href="/termsofuse"
                  rel="noreferrer"
                  target="_blank"
                  style={{
                    color: "rgba(255,255,255,1)",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  &nbsp;Terms of Use
                </a>
                , your access to and use of the The Standard.io and smart contracts through this interface is entirely at your own risk and could lead to substantial losses. You take full responsibility for your use of the interface, and acknowledge that you use it on the basis of your own enquiry, without solicitation or inducement by Contributors (as defined in the
                  <a
                  href="/termsofuse"
                  rel="noreferrer"
                  target="_blank"
                  style={{
                    color: "rgba(255,255,255,1)",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  &nbsp;Terms of Use
                </a>).
              </Typography>
              <Typography variant="body1" sx={{marginBottom: "1rem", opacity:"0.8"}}>
                This interface is not available to residents of Belarus, the Central African Republic, the Democratic Republic of Congo, the Democratic People&apos;s Republic of Korea, the Crimea region of Ukraine, Cuba, Iran, Libya, Somalia, Sudan, South Sudan, Syria, the USA, Yemen, and Zimbabwe or any other jurisdiction in which accessing or using The Standard.io is prohibited (“Prohibited Jurisdictions”). In using this interface, you confirm that you are not located in, incorporated or otherwise established in, or a citizen or resident of, a Prohibited Jurisdiction.
              </Typography>
            </Box>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
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
                      I confirm that I have read, understood and accept the&nbsp;
                      <a
                        href="/termsofuse"
                        rel="noreferrer"
                        target="_blank"
                        style={{
                          color: "rgba(255,255,255,1)",
                          fontWeight: "bold",
                          textDecoration: "none"
                        }}
                      >
                        Terms of Use
                      </a>
                    </>
                  }
                  sx={{
                    color: 'rgba(255,255,255,0.5',
                  }}
                />
              </FormGroup>
            </Box>
            <Box>
              <Button
                isDisabled={!checked}
                clickFunction={handleAccept}
                sx={{
                  padding: "12px",
                  marginTop: "1rem",
                }}
              >
                <Typography
                  sx={{
                    color: "#f1fbfa",
                    fontFamily: "Poppins",
                    fontSize: { xs: "1rem", md: "0.8rem", lg: "1rem" },
                  }}
                >
                  Continue
                </Typography>
              
              </Button>
            </Box>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default Disclaimer;
