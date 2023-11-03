import { useEffect, useState, useLayoutEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getNetwork } from "@wagmi/core";
import { useAccount, useContractRead } from "wagmi";
import { arbitrumGoerli } from "wagmi/chains";
import { formatUnits, formatEther } from "viem";
import moment from 'moment';
import axios from "axios";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import {
  useVaultIdStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
  usePositionStore,
} from "../store/Store.ts";

import Card from "../components/Card";
import Button from "../components/Button";
import VaultMenuSmall from "../components/VaultMenuSmall";

type RouteParams = {
  vaultId: string;
};

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

const VaultHistory = () => {
  const { chain } = getNetwork();
  const { address } = useAccount();
  const { arbitrumGoerliContractAddress, arbitrumContractAddress } = useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { vaultId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { getVaultID } = useVaultIdStore();

  const [historyLoading, setHistoryLoading] = useState<any>(true);
  const [historyData, setHistoryData] = useState<any>(undefined);
  const [totalRows, setTotalRows] = useState<any>(undefined);

  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  useLayoutEffect(() => {
    function updatePosition() {
      if (rectangleRef.current) {
        const { right, top } = rectangleRef.current.getBoundingClientRect();
        setPosition({ right, top });
      }
    }

    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => window.removeEventListener("resize", updatePosition);
  }, [setPosition]);

  const vaultManagerAddress =
    chain?.id === arbitrumGoerli.id
      ? arbitrumGoerliContractAddress
      : arbitrumContractAddress;
  const { data: vaults } = useContractRead({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaults",
    account: address,
    watch: false
  });
  const currentVault: any = vaults?.filter(
    (vault: any) => vault.tokenId.toString() === vaultId
  )[0];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    getVaultID(vaultId);
  }, []);

  const { vaultAddress } = currentVault.status;

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
      minWidth: 180,
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
      renderHeader: () => (
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
        const useTotalCollateralValue = Number(formatEther(totalCollateralValue)).toFixed(2);
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
        const txHash = params.row.txHash;
        return (
          <Button
            sx={{
              // margin: "2px",
              padding: "5px 10px",
              fontSize: "0.8rem",
            }}
            lighter
            clickFunction={() => handleEtherscanLink(txHash)}
          >
            View
          </Button>
        );
      },
    },
  ];

  const getHistoryData = async () => {
    try {
      setHistoryLoading(true);
      const limit = paginationModel.pageSize;
      const page = paginationModel.page + 1;
      const response = await axios.get(
        `https://smart-vault-api.thestandard.io/transactions/${vaultAddress}?page=${page}&limit=${limit}`
      );
      const data = response.data.data;
      const rows = response.data.pagination.totalRows;
      setHistoryData(data);
      setTotalRows(rows);
      setHistoryLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoryData();
  }, [paginationModel]);

  const columns: GridColDef[] = colData;
  const rows = historyData || [];

  const handleEtherscanLink = (txRef: string) => {
    const arbiscanUrl = `https://arbiscan.io/tx/${txRef}`;
      // chain?.id === arbitrumGoerli.id
      //   ? `https://goerli.arbiscan.io/tx/${txRef}`
      //   : `https://arbiscan.io/tx/${txRef}`;
      
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
    <Box
      sx={{
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },
        minHeight: "100vh",
        height: "100%",
      }}
      ref={rectangleRef}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          marginTop: { xs: "1rem", sm: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Button
            sx={{
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
            clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
          >
            Borrow/Repay
          </Button>
          <Button
            isActive={true}
            clickFunction={() => null}
          >
            History
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        ></Box>
      </Box>

      <VaultMenuSmall
        vaultId={vaultId}
      />

      <Card
        sx={{
          padding: "1rem",
        }}
      >      
        <StyledDataGrid
          slots={{
            noRowsOverlay: NoDataOverlay,
          }}
          columns={columns}
          rowCount={totalRows || 0}
          rows={rows || []}
          getRowId={(row) => `${row?.txRef}${row?.timestamp}`}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 15, 20]}
          paginationMode="server"
          loading={historyLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </Box>
  )
};

export default VaultHistory;
