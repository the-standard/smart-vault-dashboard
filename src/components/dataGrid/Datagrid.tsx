import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { Slider } from "@mui/material";
import SliderComponent from "../SliderComponent";
import "../../styles/buttonStyle.css";
import { ethers } from "ethers";
import abi from "../../abis/vaultManager.ts";
import { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
// import ManageSteps from "../ManageSteps.tsx";
import ManageSteps from "../listNFTModal/ManageSteps.tsx";
import { styles } from "../../styles/dataGridStyles.ts";
// import { useAccount, useConnect } from "wagmi";
import { Link } from "react-router-dom";
import { useVaultIdStore } from "../../store/Store.ts";
import { Button, Pagination, Typography, useMediaQuery } from "@mui/material";
// import "../../styles/historyStyle.css";
// import Decimal from "decimal.js";

interface DataGridComponentProps {
  vaults: any[];
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({ vaults }) => {
  const [tokenToId, setTokenToId] = useState<any[]>([]);
  const [resolved, setResolved] = useState(false);
  const tokenToNFTMap = useRef(new Map());
  const tokenMap = useRef(new Map());

  //modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal child state
  const [modalChildState, setModalChildState] = useState();

  //get this contract and abi from store
  async function getNFT(vault: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
      abi,
      signer
    );
    const tokenURI = await contract.tokenURI(vault[0]);
    const tokenDecoded = JSON.parse(atob(tokenURI.split(",")[1]));
    // console.log(tokenDecoded.image);
    // console.log(tokenDecoded);

    tokenToNFTMap.current.set(
      ethers.BigNumber.from(vault[0]).toString(),
      tokenDecoded.image
    );

    tokenMap.current.set(
      ethers.BigNumber.from(vault[0]).toString(),
      tokenDecoded
    );
    return {
      tokenId: ethers.BigNumber.from(vault[0]).toString(),
      image: tokenDecoded.image,
    };
  }

  useEffect(() => {
    async function fetchNFTs() {
      const tokenToIds = await Promise.all(
        vaults.map((vault) => getNFT(vault))
      );
      const uniqueTokenToIds = tokenToIds.filter(
        (tokenToId, index, arr) =>
          arr.findIndex((t) => t.tokenId === tokenToId.tokenId) === index
      );
      setTokenToId(uniqueTokenToIds);
      console.log("tokenToId", uniqueTokenToIds);
    }
    fetchNFTs();
  }, [vaults]);

  useEffect(() => {
    console.log("tokenToId real", tokenToId);
    if (tokenToId.length > 0) {
      setResolved(true);
      console.log(resolved);
    }
    console.log(tokenToNFTMap);
  }, [tokenToId]);

  console.log("vaults", vaults);
  // console.log("vault sth", ethers.BigNumber.from(vaults[0][1]).toNumber());

  const renderSlider = (step: number) => {
    return (
      <Box>
        <SliderComponent step={step} />
      </Box>
    );
  };

  const renderActions = (params: any) => {
    const handleManageClick = () => {
      console.log(params.vaultID);
      setModalChildState(params.vaultID);
      const { getVaultID } = useVaultIdStore.getState();
      getVaultID(params.vaultID);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to="Collateral"
          onClick={handleManageClick}
        >
          <button
            style={{
              cursor: "pointer",
              marginRight: "2rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="myBtn"
          >
            <Typography variant="body2" sx={{ color: "#fff" }}>
              Manage
            </Typography>
          </button>
        </Link>
        <button
          style={{
            cursor: "pointer",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "8rem",
            padding: 0, // Add this line to remove padding
          }}
          className="myBtn"
          onClick={() => {
            handleOpen();
            handleManageClick();
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              textAlign: "center", // Add this line to center the text horizontally
              width: "100%", // Add this line to fill the available width
            }}
          >
            Sell NFT
          </Typography>
        </button>
      </Box>
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(vaults.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      // returnNewDataGrid();
    }
  }, [isMobile]);

  return (
    <Box
      sx={{
        margin: "3% 12%",
        padding: "3%",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        border: "2px solid red",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <table>
          <thead>
            <input
              style={{
                background: "transparent",
                width: "100%",
                height: "1.5rem",
                color: "white",
              }}
              type="text"
              placeholder="Search"
              // onChange={(e) => setUserInput(e.target.value)}
            />
            <tr>
              <th scope="col">Vault NFT</th>
              <th scope="col">Vault ID</th>
              <th scope="col">Ratio</th>
              <th scope="col">Debt</th>
              <th scope="col">Debt Range</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaults
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((vault: any, index: number) => (
                <tr key={index}>
                  {/* <td data-label="#">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td> */}
                  <td>
                    {tokenToNFTMap.current.has(
                      ethers.BigNumber.from(vault[0]).toString()
                    ) ? (
                      <img
                        src={tokenToNFTMap.current.get(
                          ethers.BigNumber.from(vault[0]).toString()
                        )}
                        alt="NFT"
                        width={50}
                        height={50}
                      />
                    ) : null}
                  </td>
                  <td>{ethers.BigNumber.from(vault[0]).toString()}</td>
                  <td>{ethers.BigNumber.from(vault[5][2]).toString()}</td>
                  <td>{ethers.BigNumber.from(vault[5][0]).toString()}</td>
                  <td>
                    {renderSlider(
                      (Number(ethers.BigNumber.from(vault[5][0])) /
                        Number(ethers.BigNumber.from(vault[5][1]))) *
                        100
                    )}
                  </td>
                  <td>
                    {" "}
                    {renderActions({
                      vaultID: ethers.BigNumber.from(vault[0]).toString(),
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>{" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-page.Mui-selected": {
                color: "white",
              },
            }}
          />
        </Box>
      </Box>
      {/* modal */}
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: { xs: "absolute" as const, md: "" },
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "60%",
                sm: "50%",
                md: "40%",
              },
              bgcolor: "#0C0C0C",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              maxHeight: {
                xs: "80vh",
                sm: "80vh",
              },
              overflowY: "auto",
            }}
            className="modal-content" // add class name to modal content box
          >
            <ManageSteps
              modalChildState={modalChildState}
              tokenMap={tokenMap.current}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default DataGridComponent;
