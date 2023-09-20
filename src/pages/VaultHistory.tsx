import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getNetwork } from "@wagmi/core";
import { arbitrumGoerli } from "wagmi/chains";
import moment from 'moment';
import { formatUnits, formatEther } from "viem";

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
      minWidth: 120,
      // flex: 1,
      field: 'type',
      headerName: 'Type',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const useType = params.row.type;
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useType.toLowerCase() || ''}
          </span>
        );
      },
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'timestamp',
      headerName: 'Time',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const useTimestamp = params.row.timestamp;
        const useDate = moment.unix(useTimestamp).format("D/MMM/YYYY HH:mm:ss");
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useDate || ''}
          </span>
        );
      },
    },
    {
      minWidth: 100,
      // flex: 1,
      field: 'asset',
      headerName: 'Asset',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const useAsset = params.row.asset;
        return (
          <span style={{textTransform: 'capitalize'}}>
            {useAsset || ''}
          </span>
        );
      },
    },
    {
      minWidth: 100,
      flex: 1,
      field: 'amount',
      headerName: 'Amount',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const amount = params.row.amount;
        const assetDec = params.row.assetDec;
        const useAmount = formatUnits(amount.toString(), assetDec);
        return (
          <span>
            {useAmount.toString()}
          </span>
        );
      },
    },
    {
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
      field: 'minted',
      headerName: 'Minted (EUROs)',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const minted = params.row.minted;
        const useMinted = formatEther(minted.toString());
        return (
          <span>
            {useMinted.toString()}
          </span>
        );
      },
    },
    {
      maxWidth: 150,
      minWidth: 150,
      flex: 1,
      field: 'totalCollateralValue',
      sortable: false,
      disableColumnMenu: true,
      renderHeader: (params: any) => (
        <span style={{
          fontWeight: 500,
          lineHeight: "1.3rem",
          wordBreak: "break-word",
          whiteSpace: "break-spaces"
        }}>
          Total Collateral Value (€)
        </span>
      ),
      headerName: 'Total Collateral Value (€)',
      renderCell: (params: any) => {
        const totalCollateralValue = params.row.totalCollateralValue;
        const useTotalCollateralValue = formatEther(totalCollateralValue.toString());
        return (
          <span style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}>
            {useTotalCollateralValue.toString()}
          </span>
        );
      }
    },
    // {
    //   minWidth: 100,
    //   flex: 1,
    //   field: 'blockNo',
    //   headerName: 'Block'
    // },
    {
      minWidth: 100,
      field: 'txRef',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
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

  const rowData = [{
  	"timestamp": 1692090304,
  	"type": "liquidation",
  	"txHash": "0x601a27d4b6742211f3a1ae27d399c515869c9b90fe5f1921b54ad2776351922c",
  	"blockNo": "121582763",
  	"asset": "n/a",
  	"amount": "0",
  	"assetDec": "0",
  	"minted": "0",
  	"totalCollateralValue": "0"
  }, {
  	"timestamp": 1692090303,
  	"type": "pre-liquidation",
  	"txHash": "0x",
  	"blockNo": "121582762",
  	"asset": "n/a",
  	"amount": "0",
  	"assetDec": "0",
  	"minted": "15316000000000000000",
  	"totalCollateralValue": "16845516275588173391"
  }, {
  	"timestamp": 1692047284,
  	"type": "borrow",
  	"txHash": "0xd6199b8b86c5c0383ca3e7c070be06f854393282dc2504bd9a2c016dcdfa075e",
  	"blockNo": "121427204",
  	"asset": "EUROs",
  	"amount": "900000000000000000",
  	"assetDec": "18",
  	"minted": "15316000000000000000",
  	"totalCollateralValue": "16900929217861727489"
  }, {
  	"timestamp": 1692047258,
  	"type": "borrow",
  	"txHash": "0xcb9392c141d71917974c3201ce01394c11a4169e8850f1e1086a475e0eb88baf",
  	"blockNo": "121427135",
  	"asset": "EUROs",
  	"amount": "7000000000000000000",
  	"assetDec": "18",
  	"minted": "14411500000000000000",
  	"totalCollateralValue": "16900929217861727489"
  }, {
  	"timestamp": 1692043318,
  	"type": "repay",
  	"txHash": "0xd96962d07132e1306b09ed70211279a0a19bdd2b0a73887ffcdc62d35c01fda9",
  	"blockNo": "121413291",
  	"asset": "EUROs",
  	"amount": "8000000000000000000",
  	"assetDec": "18",
  	"minted": "7376500000000000000",
  	"totalCollateralValue": "16930459856375075664"
  }, {
  	"timestamp": 1691680546,
  	"type": "repay",
  	"txHash": "0x327f3889b4c16c8a4d553fa6ddd824ead4a90f9c11e9794df77a86cdd9a68acd",
  	"blockNo": "120070658",
  	"asset": "EUROs",
  	"amount": "5025000000000000000",
  	"assetDec": "18",
  	"minted": "0",
  	"totalCollateralValue": "16835649538231156691"
  }, {
  	"timestamp": 1691680465,
  	"type": "borrow",
  	"txHash": "0x835632f5c81896babc60eb477f86a4d1c411dd1619020cee2f03ab62e84586c8",
  	"blockNo": "120070340",
  	"asset": "EUROs",
  	"amount": "5000000000000000000",
  	"assetDec": "18",
  	"minted": "5025000000000000000",
  	"totalCollateralValue": "16835649538231156691"
  }, {
  	"timestamp": 1691599715,
  	"type": "creation",
  	"txHash": "0xbc328aa53e35d6d194788fa6261fc831f586cce6b3cb8e03d2399ddebc66edf0",
  	"blockNo": "119762960",
  	"asset": "n/a",
  	"amount": "0",
  	"assetDec": "0",
  	"minted": "0",
  	"totalCollateralValue": "0"
  }]

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
          getRowId={(row) => `${row?.txRef}${row?.timestamp}`}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
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
