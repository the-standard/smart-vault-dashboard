import { Box } from "@mui/material";
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
  { name: "Whitepaper", link: "/whitepaper" },
  { name: "Blog", link: "/blog" },
];

const icons = [
  {
    logo: instagramLogo,
    link: "https://www.instagram.com/standardprotocol/",
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
    logo: discordlogo,
    link: "https://discord.gg/standardprotocol",
  },
  {
    logo: redditlogo,
    link: "https://www.reddit.com/r/StandardProtocol/",
  },
  {
    logo: twitterLogo,
    link: "https://twitter.com/StandardBSC",
  },

  {
    logo: youtubelogo,
    link: "https://www.youtube.com/channel/UCQ6V4hWJUx4J5HfX6pWzYFQ",
  },
];

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "0 12%",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #8E9BAE",
        marginTop: "20rem",
        paddingBlock: "1rem",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",

        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(13.9px)",
        WebkitBackdropFilter: "blur(13.9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: {
            xs: "center",
            md: "flex-start",
          },
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        {links.map((link) => (
          <Box key={link.name}>
            <a
              style={{
                color: "#8E9BAE",
                textDecoration: "none",
                marginRight: "1rem",
                fontSize: "0.8rem",
              }}
              href={link.link}
            >
              {link.name}
            </a>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: {
            xs: "center",
            md: "flex-end",
          },
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        {icons.map((icon) => (
          <Box
            sx={{
              /* From https://css.glass */
              background: " rgba(104, 104, 104, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              // -webkit-backdrop-filter: blur(5px),
              border: "1px solid rgba(255, 255, 255, 0.3)",
              width: "50px",
              height: "50px",
              margin: {
                xs: "0.5rem",
                md: "0 0 0 1rem",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            key={icon.logo}
          >
            <img src={icon.logo} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
