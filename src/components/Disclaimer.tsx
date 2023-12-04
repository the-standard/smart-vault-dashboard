import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { stack as Menu } from "react-burger-menu";
import NavbarMenu from "./NavbarMenu";
import logo from "../assets/standardiologo.svg";
import logoIcon from "../assets/standardiologoicon.svg";
import { useNetwork } from "wagmi";
import Modal from "@mui/material/Modal";
import Cookies from 'universal-cookie';
import Card from "./Card";

const Disclaimer = () => {
  const cookies = new Cookies();
  const [checked, setChecked] = useState(false);

  const handleAccept = () => {
    const now = Math.floor(Date.now() / 1000);
    const day = 86400;
    const then = new Date((now + (day * 30)) * 1000);
    cookies.set('_ibcotv1', now, { path: '/', expires: then });
  };

  const disclaimerAccepted = cookies.get('_ibcotv1');

  return (
    <>
      <Modal
        open={!disclaimerAccepted}
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
              xs: "90%",
              sm: "80%",
              md: "70%",
            },
            // bgcolor: "#0C0C0C",
            // border: "2px solid #000",
            // boxShadow: 24,
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
            overflowY: "auto",
          }}
          className="modal-content" // add class name to modal content box
        >
          <Typography variant="h4" sx={{marginBottom: "1rem"}}>
            Disclaimer
          </Typography>
          <Typography variant="body1" sx={{marginBottom: "1rem"}}>
            The Standard is a fully decentralized stablecoin. No representation or warranty is made concerning any aspect of the The Standard.io, including its suitability, quality, availability, accessibility, accuracy or safety. As more fully explained in the Terms of Use, your access to and use of the The Standard.io and smart contracts through this interface is entirely at your own risk and could lead to substantial losses. You take full responsibility for your use of the interface, and acknowledge that you use it on the basis of your own enquiry, without solicitation or inducement by Contributors (as defined in the Terms of Use).
          </Typography>
          <Typography variant="body1" sx={{marginBottom: "1rem"}}>
            This interface is not available to residents of Belarus, the Central African Republic, the Democratic Republic of Congo, the Democratic People&apos;s Republic of Korea, the Crimea region of Ukraine, Cuba, Iran, Libya, Somalia, Sudan, South Sudan, Syria, the USA, Yemen, and Zimbabwe or any other jurisdiction in which accessing or using The Standard.io is prohibited (“Prohibited Jurisdictions”). In using this interface, you confirm that you are not located in, incorporated or otherwise established in, or a citizen or resident of, a Prohibited Jurisdiction.
          </Typography>
          <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </label>
            &nbsp; I confirm that I have read, understood and accept the <a href="https://www.thestandard.io/termsofuse" rel="noreferrer" target="_blank">Terms of Use</a>

        </Card>
      </Modal>
    </>
  );
};

export default Disclaimer;
