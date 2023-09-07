import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getNetwork } from "@wagmi/core";
import { arbitrumGoerli } from "wagmi/chains";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import {
  useVaultIdStore,
  useCurrentPageStore,
} from "../store/Store.ts";

import Card from "../components/Card";
import Button from "../components/Button";

interface DataGridComponentProps {
  rowData: any[];
  colData: any[];
}

type RouteParams = {
  vaultId: string;
};

const VaultHistory: React.FC<DataGridComponentProps> = () => {

  const colData = [
    {
      minWidth: 100,
      flex: 1,
      field: 'type',
      headerName: 'Type',
      renderCell: (params: any) => {
        const useType = params.row.type;
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useType.toLowerCase()}
          </span>
        );
      },
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'createdAt',
      headerName: 'Created'
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'updatedAt',
      headerName: 'Updated'
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'asset',
      headerName: 'Asset'
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: any) => {
        const useStatus = params.row.status;
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useStatus.toLowerCase()}
          </span>
        );
      },
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'amount',
      headerName: 'Amount'
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'balance',
      headerName: 'New Balance'
    },
    {
      flex: 1,
      field: 'txRef',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      // renderCell: ({ row }: Partial<GridRowParams>) =>
      //   <Button onClick={() => yourActionFunction(row)}>
      //     Action
      //   </Button>,
      renderCell: (params: any) => {
        const txRef = params.row.txRef;
        return (
          <Button
            sx={{
              // margin: "2px",
              padding: "5px 10px",
              fontSize: "0.8rem",
            }}
            lighter
            clickFunction={() => handleEtherscanLink(txRef)}
          >
            View
          </Button>
        );
      },
    },
  ];
  
  const rowData = [
    {
      type: 'DEPOSIT',
      createdAt: 1629890728,
      updatedAt: 1629890728,
      asset: 'BTC',
      status: 'VALID',
      amount: '0.14597110',
      balance: '1.14597110',
      txRef: '123123',
    },
    {
      type: 'WITHDRAW',
      createdAt: 1629890728,
      updatedAt: 1629890728,
      asset: 'BTC',
      status: 'VALID',
      amount: '0.14597110',
      balance: '1.14597110',
      txRef: '234234',
    },
    {
      type: 'BORROW',
      createdAt: 1629890728,
      updatedAt: 1629890728,
      asset: 'BTC',
      status: 'VALID',
      amount: '0.14597110',
      balance: '1.14597110',
      txRef: '345345',
    },
    {
      type: 'REPAY',
      createdAt: 1629890728,
      updatedAt: 1629890728,
      asset: 'BTC',
      status: 'VALID',
      amount: '0.14597110',
      balance: '1.14597110',
      txRef: '456456',
    },
  ];

// const History: React.FC<DataGridComponentProps> = ({colData, rowData}) => {
  const { vaultId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { chain } = getNetwork();
  const { getVaultID } = useVaultIdStore();

  useEffect(() => {
    getVaultID(vaultId);
  }, []);

  const columns: GridColDef[] = colData;
  const rows = rowData;

  const handleEtherscanLink = (txRef: string) => {
    const arbiscanUrl =
      chain?.id === arbitrumGoerli.id
        ? `https://goerli.arbiscan.io/tx/${txRef}`
        : `https://arbiscan.io/tx/${txRef}`;
      
    window.open(arbiscanUrl, "_blank");
  };

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
    '.MuiDataGrid-menuList': {
      backgroundColor: 'pink',

      '& .MuiMenuItem-root': {
        fontSize: 26,
      },
    },
  }));

  return (
    <Box
      sx={{
        margin: { xs: "0% 2%", sm: "3% 12%" },
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: { xs: "1rem", sm: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Button
            sx={{
              marginRight: "10px",
              "&:after": {
                backgroundSize: "300% 100%",
              }
            }}
            clickFunction={() => navigate('/')}
          >
            <ArrowBackIosNewIcon />
          </Button>
          <Button
            clickFunction={() => navigate(`../Collateral/${vaultId}`)}
          >
            Collateral
          </Button>
          <Button
            sx={{marginLeft: "10px"}}
            clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
          >
            Borrow/Repay
          </Button>
          <Button
            sx={{marginLeft: "10px"}}
            isActive={true}
            clickFunction={() => null}
          >
            History
          </Button>
        </Box>
        {/* right side of the upper column */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        ></Box>
      </Box>

      <Card
        sx={{
          padding: "1rem",
        }}
      >      
        <StyledDataGrid
          getRowId={(row) => row?.txRef}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          // columnVisibilityModel={{
          //   updatedAt: false,
          // }}
          // pageSizeOptions={[5, 10]}
        />
      </Card>
    </Box>
  )
};

export default VaultHistory;
