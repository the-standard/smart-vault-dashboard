import { useEffect, useState, useLayoutEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getNetwork } from "@wagmi/core";
import moment from 'moment';

import Button from "../../components/Button";

type RouteParams = {
  vaultId: string;
};

interface StakingHistoryProps {
  stakingHistoryData: Array<any>;
  stakingHistoryLoading: boolean;
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

const StakingHistory: React.FC<StakingHistoryProps> = ({
  stakingHistoryData,
  stakingHistoryLoading
}) => {  const { chain } = getNetwork();
  const { vaultId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [totalRows, setTotalRows] = useState<any>(undefined);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const colData = [
    {
      minWidth: 90,
      flex: 1,
      field: 'staking_position',
      headerName: 'Staking Positions',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return (
          <span style={{textTransform: 'capitalize'}}>
            {params.row.stake || ''} {params.row.symbol || ''}
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
        return (
          <span style={{textTransform: 'capitalize'}}>
            {params.row.reward || ''} {params.row.rewardSymbol || ''}
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
        const maturity = moment(parseInt(params.row.maturity)*1000);
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
        return (
          <Button
            sx={{
              padding: "5px 10px",
              fontSize: "0.8rem",
            }}
            lighter
            clickFunction={() => console.log(123123123)}
          >
            WIP
          </Button>
        )
      },
    },
  ];

  const columns: GridColDef[] = colData;
  const rows = stakingHistoryData || [];

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
    <StyledDataGrid
      slots={{
        noRowsOverlay: NoDataOverlay,
      }}
      columns={columns}
      rowCount={totalRows || 0}
      rows={rows || []}
      getRowId={(row) => `${row?.address}${row?.maturity}`}
      disableRowSelectionOnClick
      pageSizeOptions={[5, 10, 15, 20]}
      paginationMode="server"
      loading={stakingHistoryLoading}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
    />
  )
};

export default StakingHistory;
