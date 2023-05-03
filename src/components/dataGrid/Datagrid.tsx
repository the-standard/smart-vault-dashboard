import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeBasicNode,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Slider } from "@mui/material";
import SliderComponent from "../SliderComponent";

export default function DataGridDemo() {
  const renderSlider = (params: GridRenderCellParams, step: number[]) => {
    return (
      <Box>
        <SliderComponent step={step} />
      </Box>
    );
  };

  const renderActions = (params: GridRenderCellParams) => {
    const handleManageClick = () => {
      console.log(params.row.vaultNFT);
    };

    return (
      <Box>
        <button onClick={handleManageClick}>Manage</button>
        <button>Sell NFT</button>
      </Box>
    );
  };

  const getRowClassName = (params: any) => {
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
      width: 150,
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
      step: [5, 30],
    },
    {
      id: 2,
      vaultID: "Lannister",
      vaultNFT: "Cersei",
      ratio: "42",
      debt: "1000",
      step: [50, 30],
    },
    {
      id: 3,
      vaultID: "Lannister",
      vaultNFT: "Jaime",
      ratio: "45",
      step: [10, 5],
    },
    { id: 4, vaultID: "Stark", vaultNFT: "Arya", ratio: "16", step: [20, 10] },
    {
      id: 5,
      vaultID: "Targaryen",
      vaultNFT: "Daenerys",
      ratio: null,
      step: [5, 1],
    },
    {
      id: 6,
      vaultID: "Melisandre",
      vaultNFT: null,
      ratio: "150",
      step: [30, 10],
    },
    {
      id: 7,
      vaultID: "Clifford",
      vaultNFT: "Ferrara",
      ratio: "44",
      step: [10, 5],
    },
    {
      id: 8,
      vaultID: "Frances",
      vaultNFT: "Rossini",
      ratio: "36",
      step: [5, 1],
    },
    {
      id: 9,
      vaultID: "Roxie",
      vaultNFT: "Harvey",
      ratio: "65",
      step: [50, 10],
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
          style={{
            backgroundColor: "#0C0C0C",
            color: "white",
            border: "transparent",
          }}
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
}
