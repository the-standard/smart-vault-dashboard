import { Box } from "@mui/material";
import twitterLogo from "../assets/twitterlogo.svg";
import linkedinlogo from "../assets/linkedinlogo.svg";
import youtubelogo from "../assets/youtubelogo.svg";
import discordlogo from "../assets/discordlogo.svg";
import telegramlogo from "../assets/telegramlogo.svg";
import githublogo from "../assets/githublogo.svg";

const links = [
  { name: "Home", link: "https://TheStandard.io" },
  // { name: "The Standard Protocol", link: "/standard-protocol" },
  // { name: "Ecosystem", link: "/ecosystem" },
  // { name: "Careers", link: "/careers" },
  { name: "FAQ", link: "https://www.thestandard.io/faq" },
  { name: "Whitepaper", link: "https://www.thestandard.io/whitepaper" },
  { name: "Blog", link: "https://blog.thestandard.io/" },
  { name: "Terms of Use", link: "/termsofuse" },
];

const icons = [
  {
    logo: discordlogo,
    link: "https://discord.gg/THWyBQ4RzQ",
  },
  {
    logo: linkedinlogo,
    link: "https://www.linkedin.com/company/the-standard-io",
  },
  {
    logo: twitterLogo,
    link: "https://twitter.com/thestandard_io",
  },
  {
    logo: youtubelogo,
    link: "https://www.youtube.com/@TheStandard_io",
  },
  {
    logo: telegramlogo,
    link: "https://t.me/TheStandard_io",
  },
  {
    logo: githublogo,
    link: "https://github.com/the-standard",
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
        background: "linear-gradient(141deg, rgba(26,26,26,1) 32%, rgba(0,0,0,1) 100%)",
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
              target="_blank"
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
              // background: " rgba(104, 104, 104, 0.2)",
              borderRadius: "16px",
              // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              // backdropFilter: "blur(5px)",
              // WebkitBackdropFilter: "blur(5px)",
              // -webkit-backdrop-filter: blur(5px),
              // border: "1px solid rgba(255, 255, 255, 0.3)",
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
            <a
              href={icon.link}
              target="_blank" // Open link in a new tab
              rel="noopener noreferrer" // Recommended for security
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "25px",
                  height: "25px",
                }}
                src={icon.logo}
                alt="icon"
              />
            </a>{" "}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
