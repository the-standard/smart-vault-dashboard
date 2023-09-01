import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Box)({
  padding: "10px 10px",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  background: `linear-gradient(
    110.28deg,
    rgba(26, 26, 26, 0.2) 0.2%,
    rgba(0, 0, 0, 0.4) 101.11%)
  `,
  boxShadow: `
    0 5px 15px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2)
  `,
  fontFamily: '"Poppins", sans-serif',
  color: "#ffffff",
  fontSize: "1rem",
  letterSpacing: "1px",
  backdropFilter: "blur(8px)",
  cursor: "pointer",
  borderRadius: "10px",
  transition: "0.5s",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    background:
      `linear-gradient(
        45deg,
        transparent 50%,
        rgba(255, 255, 255, 0.03) 58%, 
        rgba(255, 255, 255, 0.16) 67%,
        transparent 68%
      )`,
    backgroundSize: "200% 100%",
    backgroundPosition: "165% 0",
    transition: "0.7s",
  },
  "&:hover:after": {
    backgroundPosition: "-20% 0",
  },
  "&:hover": {
    boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
    transform: "translateY(-5px)",
  },
  "&:active": {
    transform: "translateY(0)",
    border: "2px solid rgba(152, 250, 250, 0.5)",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
  },
  "&.activeBtn": {
    background:
      `linear-gradient(
        110.28deg,
        rgba(0, 0, 0, 0.156) 0.2%,
        rgba(14, 8, 8, 0.6) 101.11%
      )`,
    border: "1px solid white",
    boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
  },
});

interface ButtonProps {
  sx?: object;
  isActive?: boolean;
  clickFunction?: () => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
  ref?:React.Ref<HTMLDivElement>;
}

export function Button(props: ButtonProps) {
  if (props.isDisabled) {
    return (
      <StyledButton
        sx={props.sx}
        className={props.isActive ? "activeBtn" : ""}
      >
        {props.children}
      </StyledButton>
    )  
  }
  return (
    <StyledButton
      sx={props.sx}
      className={props.isActive ? "activeBtn" : ""}
      onClick={props.clickFunction}
      ref={props.ref}
    >
      {props.children}
    </StyledButton>
  )
}

export default Button;