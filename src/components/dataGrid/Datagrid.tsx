import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { Slider } from "@mui/material";
import SliderComponent from "../SliderComponent";
import "../../styles/glowingRed.css";
import { ethers } from "ethers";
import abi from "../../abis/vaultManager.ts";
import { useEffect, useState } from "react";

interface DataGridDemoProps {
  vaults: any[];
}

const DataGridDemo: React.FC<DataGridDemoProps> = ({ vaults }) => {
  const [tokenToId, setTokenToId] = useState<any[]>([]);
  const [resolved, setResolved] = useState(false);

  async function getNFT(vault: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xbE70d41FB3505385c01429cbcCB1943646Db344f",
      abi,
      signer
    );
    const tokenURI = await contract.tokenURI(vault[0]);
    const tokenDecoded = JSON.parse(atob(tokenURI.split(",")[1]));
    console.log(tokenDecoded.image);

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
    }
  }, [tokenToId]);

  console.log("vaults", vaults);

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
          onClick={handleManageClick}
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
          onClick={() => console.log("sell")}
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
  `;

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    {
      field: "vaultNFT",
      headerName: "Vault NFT",
      width: 150,
      editable: true,
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

  const rows = [
    {
      id: 1,
      vaultID: "Snow",
      vaultNFT: "Jon",
      ratio: "35%",
      debt: "1000",
      step: 5,
    },
    {
      id: 2,
      vaultID: "Lannister",
      vaultNFT: "Cersei",
      ratio: "42",
      debt: "1000",
      step: 50,
    },
    {
      id: 3,
      vaultID: "Lannister",
      vaultNFT: "Jaime",
      ratio: "45",
      step: 10,
    },
    { id: 4, vaultID: "Stark", vaultNFT: "Arya", ratio: "16", step: 20 },
    {
      id: 5,
      vaultID: "Targaryen",
      vaultNFT: "Daenerys",
      ratio: null,
      step: 5,
    },
    {
      id: 6,
      vaultID: "Melisandre",
      vaultNFT: null,
      ratio: "150",
      step: 30,
    },
    {
      id: 7,
      vaultID: "Clifford",
      vaultNFT: "Ferrara",
      ratio: "44",
      step: 10,
    },
    {
      id: 8,
      vaultID: "Frances",
      vaultNFT: "Rossini",
      ratio: "36",
      step: 5,
    },
    {
      id: 9,
      vaultID: "Roxie",
      vaultNFT: "Harvey",
      ratio: "65",
      step: 50,
    },
  ];

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
          rows={rows}
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
    </Box>
  );
};

export default DataGridDemo;
