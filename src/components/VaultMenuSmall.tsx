import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "./Button";
import {Button as MuiButton} from '@mui/material';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function VaultMenuSmall(props: any) {  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState('Collateral');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const query = useQuery();
  const vaultView = query.get("view");

  useEffect(() => {
    if (vaultView && (vaultView === '2')) {
      setCurrentPage('Borrow/Repay')
    } else {
      setCurrentPage('Collateral')
    }
    if (window.location.href.indexOf("history") != -1) {
      setCurrentPage('History')
    }
  }, [vaultView]);

  const handleLinkClick = (link: any) => {
    if (link === 'Collateral') {
      navigate(`../Collateral/${props.vaultId}`);
    }
    if (link === 'Borrow/Repay') {
      navigate(`../Collateral/${props.vaultId}?view=2`);
    }
    if (link === 'History') {
      navigate('history');
    }
    handleClose();
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        marginBottom: "1rem",
        marginTop: { xs: "1rem", sm: "0px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Button
          sx={{
            "&:after": {
              backgroundSize: "300% 100%",
            }
          }}
          clickFunction={() => navigate('/')}
        >
          <ArrowBackIosNewIcon />
        </Button>
        <MuiButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            padding: "10px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
            WebkitBackdropFilter: "blur(8px)",
            cursor: "pointer",
            borderRadius: "10px",
            transition: "0.5s",
            position: "relative",
            overflow: "hidden",
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
            textTransform: "initial",
            fontWeight: "400",
            lineHeight: "inherit",
            minWidth: "180px"
          }}
        >
          {currentPage}
        </MuiButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {currentPage === 'Collateral' ? (null) : (
            <MenuItem
              onClick={() => handleLinkClick('Collateral')}
            >
              Collateral
            </MenuItem>
          )}
          {currentPage === 'Borrow/Repay' ? (null) : (
            <MenuItem
              onClick={() => handleLinkClick('Borrow/Repay')}
            >
              Borrow/Repay
            </MenuItem>
          )}
          {currentPage === 'History' ? (null) : (
            <MenuItem
              onClick={() => handleLinkClick('History')}
            >
              History
            </MenuItem>
          )}
        </Menu>
      </Box>
      {/* right side of the upper column */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      ></Box>
    </Box>
  )
}

export default VaultMenuSmall;