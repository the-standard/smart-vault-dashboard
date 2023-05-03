import { Box } from "@mui/material";
import React from "react";
import instagramLogo from "../assets/instagramlogo.svg";
import twitterLogo from "../assets/twitterlogo.svg";
import facebooklogo from "../assets/facebooklogo.svg";
import linkedinlogo from "../assets/linkedinlogo.svg";
import redditlogo from "../assets/redditlogo.svg";
import youtubelogo from "../assets/youtubelogo.svg";
import discordlogo from "../assets/discordlogo.svg";

const links = [
  { name: "Home", link: "/" },
  { name: "The Standard Protocol", link: "/standard-protocol" },
  { name: "Ecosystem", link: "/ecosystem" },
  { name: "Careers", link: "/careers" },
  { name: "FAQ", link: "/faq" },
  { name: "Shitepaper", link: "/shitepaper" },
  { name: "Blog", link: "/blog" },
];

const icons = [
  {
    logo: instagramLogo,
    link: "https://www.instagram.com/standardprotocol/",
  },
  {
    logo: twitterLogo,
    link: "https://twitter.com/StandardBSC",
  },
  {
    logo: facebooklogo,
    link: "https://www.facebook.com/StandardProtocol",
  },
  {
    logo: linkedinlogo,
    link: "https://www.linkedin.com/company/standardprotocol",
  },
  {
    logo: redditlogo,
    link: "https://www.reddit.com/r/StandardProtocol/",
  },

  {
    logo: youtubelogo,
    link: "https://www.youtube.com/channel/UCQ6V4hWJUx4J5HfX6pWzYFQ",
  },
  {
    logo: discordlogo,
    link: "https://discord.gg/standardprotocol",
  },
];

const Footer = () => {
  return (
    <Box>
      <Box></Box>
    </Box>
  );
};

export default Footer;
