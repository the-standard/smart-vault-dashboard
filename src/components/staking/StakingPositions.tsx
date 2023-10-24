import { useState } from "react";

import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatEther } from "viem";
import moment from 'moment';

import Button from "../../components/Button";
import ClaimingModal from "./ClaimingModal";

interface StakingPositionsProps {
  stakingPositionsData: Array<any>;
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

const StakingPositions: React.FC<StakingPositionsProps> = ({
  stakingPositionsData,
}) => {

  const [selectedPosition, setSelectedPosition] = useState<any>(undefined);
  const [open, setOpen] = useState(false);

  const handleOpenModal = (position: any) => {
    setSelectedPosition(position);
    setOpen(true)
  };

  const handleCloseModal = () => {
    setOpen(false)
    setSelectedPosition(undefined);
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const colData = [
    {
      minWidth: 90,
      flex: 1,
      field: 'stake',
      headerName: 'Staked Amount',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        let useAmount: any = 0;
        if (params.row.stake) {
          useAmount = formatEther(params.row.stake.toString());
        }
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useAmount || ''} TST
          </span>
        );
      },
    },
    {
      minWidth: 90,
      flex: 1,
      field: 'reward',
      headerName: 'Reward',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        let useReward: any = 0;
        if (params.row.stake) {
          useReward = formatEther(params.row.reward.toString());
        }
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useReward || ''} EUROs
          </span>
        );
      },
    },
    {
      minWidth: 90,
      flex: 1,
      field: 'maturity',
      headerName: 'Staked Until',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const unixDate = Number(params.row.maturity);
        const maturity = moment.unix(unixDate);
        return (
          <span style={{textTransform: 'capitalize'}}>
            {maturity.format('ll') || ''}
          </span>
        );
      },
    },
    {
      minWidth: 90,
      flex: 1,
      field: 'action',
      headerName: 'Status',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const unixDate = Number(params.row.maturity);
        const maturity = moment.unix(unixDate);
        if (params.row.burned) {
          return (
            <span style={{opacity: 0.5}}>
              Claimed
            </span>
          )
        } else if (moment().isAfter(maturity)) {
          return (
            <Button
              sx={{
                padding: "5px 10px",
                fontSize: "0.8rem",
              }}
              lighter
              clickFunction={() => handleOpenModal(params.row)}
            >
              Claim
            </Button>
          )
        } else {
          return (
            <span style={{opacity: 0.5}}>
              Maturing
            </span>
          )
        }
      },
    },
  ];

  const activeData = stakingPositionsData?.filter((position: any) =>
    Number(position.nonce) > 0
  ) || [];

  const columns: GridColDef[] = colData;
  const rows = activeData || [];

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
      minHeight: "350px",
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
        getRowId={(row) => `${row?.address}${row?.maturity}`}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 15, 20]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        hideFooter={true}
      />
      <ClaimingModal
        stakingPosition={selectedPosition}
        handleCloseModal={handleCloseModal}
        isOpen={open}
      />
    </>
  )
};

export default StakingPositions;
