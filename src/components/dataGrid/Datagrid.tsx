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
import ManageSteps from "../modal/ManageSteps.tsx";

interface DataGridDemoProps {
  vaults: any[];
}

const DataGridDemo: React.FC<DataGridDemoProps> = ({ vaults }) => {
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

  async function getNFT(vault: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xbF615e590EC00140d522A721251645c65642de58",
      abi,
      signer
    );
    const tokenURI = await contract.tokenURI(vault[0]);
    const tokenDecoded = JSON.parse(atob(tokenURI.split(",")[1]));
    console.log(tokenDecoded.image);
    console.log(tokenDecoded);

    tokenToNFTMap.current.set(
      ethers.BigNumber.from(vault[0]).toNumber(),
      tokenDecoded.image
    );

    tokenMap.current.set(
      ethers.BigNumber.from(vault[0]).toNumber(),
      tokenDecoded
    );
    return {
      tokenId: ethers.BigNumber.from(vault[0]).toNumber(),
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
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            height: "2rem",
            width: "10rem",
            margin: "0 1rem",
          }}
          className="glowingCard"
        >
          Manage
        </button>
        <button
          style={{
            height: "2rem",
            width: "10rem",
            margin: "0 1rem",
          }}
          className="glowingCardRed"
          onClick={() => {
            handleManageClick();
            handleOpen();
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

  const styles = `
    .no-border .MuiDataGrid-cell {
      border: none;
    }
    .css-wop1k0-MuiDataGrid-footerContainer{
      border: none;
    }
    .css-1iyq7zh-MuiDataGrid-columnHeaders{
      border: none;
    }
    .css-wop1k0-MuiDataGrid-footerContainer{
      background:#0C0C0C !important;
    }
    .css-levciy-MuiTablePagination-displayedRows{
      color:white !important;

    }
    .MuiTablePagination-actions{
      color:white !important;
    }
    .css-ptiqhd-MuiSvgIcon-root{
      color:white !important;
    }
    .MuiDataGrid-root{
      background:#0C0C0C !important;
      color:white !important;
    }
    .MuiDataGrid-row{
      margin-bottom:15px !important;
    }
    .MuiDataGrid-root{
      border: none;
  
    }
  `;

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    {
      field: "vaultNFT",
      headerName: "vaultNFT",
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
      editable: true,
    },
    {
      field: "ratio",
      headerName: "Ratio",
      // type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "debt",
      headerName: "Debt",
      width: 160,
    },

    {
      field: "debtRange",
      headerName: "Debt Range",
      width: 250,
      renderCell: (params: GridRenderCellParams) =>
        renderSlider(params, params.row.step),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      renderCell: (params: GridRenderCellParams) => renderActions(params),
    },
  ];

  const myRows = vaults.map((vault, index) => {
    return {
      id: index + 1,
      vaultNFT: tokenToNFTMap.current.get(
        ethers.BigNumber.from(vault[0]).toNumber()
      ),
      vaultID: ethers.BigNumber.from(vault[0]).toNumber(),
      ratio: vault[1],
      debt: vault[2],
      step: vault[3],
    };
  });

  return (
    <Box
      sx={{
        padding: "0 12%",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        {" "}
        <style>{styles}</style>
        <DataGrid
          sx={
            {
              // backgroundColor: "#0C0C0C",
              // color: "white",
              // border: "transparent",
            }
          }
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
          disableRowSelectionOnClick
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

export default DataGridDemo;
