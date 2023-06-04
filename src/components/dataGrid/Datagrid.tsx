import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { Slider } from "@mui/material";
import SliderComponent from "../SliderComponent";
import "../../styles/glowingRed.css";
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
// import Decimal from "decimal.js";

interface DataGridComponentProps {
  vaults: any[];
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({ vaults }) => {
  const [tokenToId, setTokenToId] = useState<any[]>([]);
  const [resolved, setResolved] = useState(false);
  const tokenToNFTMap = useRef(new Map());
  const tokenMap = useRef(new Map());
  const [userInput, setUserInput] = useState("");

  //modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal child state
  const [modalChildState, setModalChildState] = useState();

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

  const renderSlider = (_params: GridRenderCellParams, step: number) => {
    return (
      <Box>
        <SliderComponent step={step} />
      </Box>
    );
  };

  const renderActions = (params: GridRenderCellParams) => {
    const handleManageClick = () => {
      console.log(params.row.vaultID);
      setModalChildState(params.row.vaultID);
      const { getVaultID } = useVaultIdStore.getState();
      getVaultID(params.row.vaultID);
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
          }}
          to="Collateral"
          onClick={handleManageClick}
        >
          <button
            style={{
              height: "2rem",
              width: "10rem",
              margin: "0 1rem",
              cursor: "pointer",
            }}
            className="glowingCard"
          >
            Manage
          </button>
        </Link>
        <button
          style={{
            height: "2rem",
            width: "10rem",
            margin: "0 1rem",
            cursor: "pointer",
          }}
          className="glowingCardRed"
          onClick={() => {
            handleOpen();
            handleManageClick();
          }}
        >
          Sell NFT
        </button>
      </Box>
    );
  };

  const getRowClassName = (_params: any) => {
    return "no-border";
  };

  const columns: GridColDef[] = [
    {
      field: "vaultNFT",
      headerName: "Vault NFT",
      editable: false,
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.vaultNFT}
          alt="Product"
          style={{ width: "100%", height: "80px" }}
        />
      ),
    },
    {
      field: "vaultID",
      headerName: "Vault ID",
      width: 150,
      editable: false,
    },
    {
      field: "ratio",
      headerName: "Ratio",
      // type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "debt",
      headerName: "Debt",
      width: 160,
      editable: false,
    },

    {
      field: "debtRange",
      headerName: "Debt Range",
      editable: false,
      width: 250,
      renderCell: (params: GridRenderCellParams) =>
        renderSlider(params, params.row.step),
    },
    {
      field: "actions",
      headerName: "Actions",
      editable: false,
      width: 500,
      renderCell: (params: GridRenderCellParams) => renderActions(params),
    },
  ];
  const filteredVaults = vaults.filter((vault) => {
    if (
      ethers.BigNumber.from(vault[0])
        .toString()
        .includes(userInput.toString()) ||
      ethers.BigNumber.from(vault[5][0])
        .toString()
        .includes(userInput.toString()) ||
      ethers.BigNumber.from(vault[5][2])
        .toString()
        .includes(userInput.toString())
    ) {
      return true;
    }

    return false;
  });

  console.log("filteredVaults", filteredVaults);

  const myRows = filteredVaults.map((vault, index) => {
    console.log(Number(ethers.BigNumber.from(vault[5][0]).toString()));
    console.log(Number(ethers.BigNumber.from(vault[5][1]).toString()));
    console.log(
      (
        (Number(ethers.BigNumber.from(vault[5][0]).toString()) /
          Number(ethers.BigNumber.from(vault[5][1]).toString())) *
        100
      ).toFixed(18)
    );
    // const result = new Decimal(vault[5][0].toString())
    //   .dividedBy(vault[5][1].toString())
    //   .toNumber();

    return {
      id: index + 1,
      vaultNFT: tokenToNFTMap.current.get(
        ethers.BigNumber.from(vault[0]).toString()
      ),
      vaultID: ethers.BigNumber.from(vault[0]).toString(),
      ratio: ethers.BigNumber.from(vault[5][2]).toString(),
      debt: ethers.BigNumber.from(vault[5][0]).toString(),
      // step: new Decimal(vault[5][0].toString())
      //   .dividedBy(vault[5][1].toString())
      //   .toNumber(),
      step:
        (Number(ethers.BigNumber.from(vault[5][0]).toString()) /
          Number(ethers.BigNumber.from(vault[5][1]).toString())) *
        100,
      // step:
      // ethers.BigNumber.from(vault[5][2]).toNumber() /
      // ethers.BigNumber.from(vault[5][1]).toNumber(),
    };
  });

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
      }}
    >
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          style={{
            background: "transparent",
            width: "100%",
            height: "1.5rem",
            color: "white",
          }}
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        {" "}
        <style>{styles}</style>
        <DataGrid
          sx={{}}
          rows={myRows}
          columns={columns}
          getRowClassName={getRowClassName}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick={true}
          disableVirtualization={true}
        />
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
