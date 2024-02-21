import { useState } from "react";

import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatEther } from "viem";

import Button from "../Button";
import WithdrawModal from "./WithdrawModal";
import ethereumlogo from "../../assets/ethereumlogo.svg";
import wbtclogo from "../../assets/wbtclogo.svg";
import linklogo from "../../assets/linklogo.svg";
import paxglogo from "../../assets/paxglogo.svg";
import arblogo from "../../assets/arblogo.svg";
import seurologo from "../../assets/EUROs.svg";
import tstlogo from "../../assets/standardiologoicon.svg";


interface StakingStakedAssetsProps {
  stakingPositionsData: Array<any>;
  positions: any;
  pending: any;
}

function NoDataOverlay() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ mt: 1, color: "white" }}>No Data</Box>
    </Box>
  );
}

const StakingStakedAssets: React.FC<StakingStakedAssetsProps> = ({
  positions,
  pending,
}) => {
  const [open, setOpen] = useState(false);

  const tstAmount = positions['TST'] || 0;
  const eurosAmount = positions['EUROs'] || 0;

  const useRows = [
    {
      asset: 'TST',
      amount: tstAmount || 0
    },
    {
      asset: 'EUROs',
      amount: eurosAmount || 0
    },
  ]

  const handleCloseModal = () => {
    setOpen(false)
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const colData = [
    {
      minWidth: 90,
      flex: 1,
      field: 'asset',
      headerName: 'Asset',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const symbol = params?.row?.asset || '';
        return (
          <Box
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: "100%",
            }}
          >
            <Box sx={{
              display: "flex",
              alignItems: "center",
            }}>
              {symbol === "ETH" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={ethereumlogo}
                  alt="ethereum logo"
                />
              ) : symbol === "TST" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={tstlogo}
                  alt="TST logo"
                />  
              ) : symbol === "EUROs" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={seurologo}
                  alt="EUROs logo"
                />  
              ) : symbol === "WBTC" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={wbtclogo}
                  alt="wbtc logo"
                />
              ) : symbol === "LINK" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={linklogo}
                  alt="link logo"
                />
              ) : symbol === "ARB" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={arblogo}
                  alt="arb logo"
                />
              ) : symbol === "PAXG" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={paxglogo}
                  alt="paxg logo"
                />
              ) : (
                <Box sx={{height: "2rem", width: "2rem"}}>
                </Box>
              )}
            </Box>
            <Box sx={{
              display: "flex",
              alignItems: "center",
            }}>
              <Typography variant="body2" sx={{marginLeft: "8px"}}>
                {symbol || ''}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      minWidth: 90,
      flex: 1,
      field: 'amount',
      headerName: 'Amount',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        let useAmount: any = 0;
        if (params.row.amount) {
          useAmount = formatEther(params.row.amount.toString());
        }
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useAmount || '0'}
          </span>
        );
      },
    },
    // {
    //   minWidth: 90,
    //   flex: 1,
    //   field: 'action',
    //   headerName: '',
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params: any) => {
    //     const useAmount = Number(params.row.amount);
    //     return (
    //       <Button
    //         sx={{
    //           padding: "5px 10px",
    //           fontSize: "0.8rem",
    //         }}
    //         lighter
    //         clickFunction={() => handleOpenModal(params.row)}
    //         isDisabled={!(useAmount > 0)}
    //       >
    //         Withdraw
    //       </Button>
    //     )
    //   },
    // },
  ];

  const columns: GridColDef[] = colData;
  const rows = useRows || [];

  let noRewards = true;
  if (rows.some(e => e.amount > 0)) {
    noRewards = false;
  }

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    fontFamily: [
      '"Poppins"',
      'sans-serif',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? 'red' : 'green',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-row': {
      backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 1px",
      backgroundPosition: "center bottom",
    },
    '& .MuiDataGrid-row, & .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnsContainer, .MuiDataGrid-cell, & .MuiDataGrid-footerContainer': {
      border: "none",
    },
    '& .MuiDataGrid-cell': {
      color: 'rgba(255,255,255,0.9)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    "& .MuiTablePagination-selectLabel, & .MuiDataGrid-menuIconButton, & .MuiDataGrid-sortIcon, & .MuiTablePagination-displayedRows, & .MuiTablePagination-actions, & .MuiIconButton-root": {
      opacity: 1,
      color: "white",
    },
    "& .Mui-disabled": {
      opacity: 0.4,
    },
    '& .MuiDataGrid-menuList': {
      backgroundColor: 'pink',

      '& .MuiMenuItem-root': {
        fontSize: 26,
      },
    },
    "& .MuiSelect-select, & .MuiSelect-icon, & .MuiSvgIcon-root-MuiSelect-icon": {
      fill: "white",
    },
    "& .MuiTablePagination-select, & .MuiInputBase-root-MuiTablePagination-select": {
      color: "white",
    },
    "& .MuiDataGrid-overlay": {
      background: "rgba(0, 0, 0, 0.38)",
    },
    "& .MuiDataGrid-virtualScroller": {
      minHeight: "120px",
    },
  }));

  return (
    <>
      <StyledDataGrid
        slots={{
          noRowsOverlay: NoDataOverlay,
        }}
        columns={columns}
        // rowCount={totalRows || 0}
        rows={rows || []}
        getRowId={(row) => `${row?.asset}${row?.amount}`}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 15, 20]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        hideFooter={true}
      />
      <Box sx={{
        display: "flex",
        justifyContent: {
          xs: "normal",
          sm: "end",
        }
      }}>
        <Button
          lighter
          sx={{
            width: {
              xs: "100%",
              sm: "unset"
            }
          }}
          clickFunction={() => setOpen(true)}
          isDisabled={noRewards}
        >
          Withdraw
        </Button>
      </Box>
      <WithdrawModal
        stakedPositions={rows}
        pending={pending}
        handleCloseModal={handleCloseModal}
        isOpen={open}
      />
    </>
  )
};

export default StakingStakedAssets;
