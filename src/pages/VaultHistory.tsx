import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from "@mui/material/CircularProgress";
import {
  useReadContract,
  useChainId,
  useWatchBlockNumber,
} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { formatUnits, formatEther } from "viem";
import moment from 'moment';
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import {
  useVaultIdStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
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
  const chainId = useChainId();
  const { arbitrumSepoliaContractAddress, arbitrumContractAddress } = useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { vaultId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { getVaultID } = useVaultIdStore();

  const [historyLoading, setHistoryLoading] = useState<any>(true);
  const [historyData, setHistoryData] = useState<any>(undefined);
  const [totalRows, setTotalRows] = useState<any>(undefined);
  const [vaultsLoading, setVaultsLoading] = useState(true);

  useEffect(() => {
    // fixes flashing "no vault found" on first load
    setVaultsLoading(true);
    setTimeout(() => {
      setVaultsLoading(false);
    }, 1000);
  }, []);

  const vaultManagerAddress = chainId === arbitrumSepolia.id ?
      arbitrumSepoliaContractAddress :
      arbitrumContractAddress;

  const { data: vaultData, refetch } = useReadContract({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaultData",
    args: [vaultId as any],
  });

  useWatchBlockNumber({
    onBlockNumber() {
      refetch();
    },
  })

  const currentVault: any = vaultData;

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    getVaultID(vaultId);
  }, []);

  useEffect(() => {
    if (currentVault && !vaultsLoading) {
      getHistoryData();
    }
  }, [paginationModel, currentVault, vaultsLoading]);

  if (vaultsLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",  
          color: "#8E9BAE",
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
          minHeight: "100vh",
          height: "100%",
        }}
      >
        {/* divide into 2 columns */}
        {/*  column 1 */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            marginBottom: "1rem",
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
              isDisabled
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Button
              clickFunction={() => navigate(`../Collateral/${vaultId}`)}
              isDisabled
            >
              Collateral
            </Button>
            <Button
              clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
              isDisabled
            >
              Borrow/Repay
            </Button>
            <Button
              isActive={true}
              clickFunction={() => navigate('history')}
              isDisabled
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

        <VaultMenuSmall
          vaultId={vaultId}
          isDisabled
        />

        <Box
          sx={{
            display: { xs: "flex", lg: "grid" },
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Card
            sx={{
              alignItems: "center",
              padding: "1.5rem",
              width: {xs: "100%", sm: "auto"},
              minHeight: "50vh",
              marginTop: "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                background: "transparent",
                zIndex: 9999,
              }}
            >
              <CircularProgress />
            </Box>
          </Card>
        </Box>
      </Box>
    )
  }

  if (!currentVault) {
    // vault not found
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",  
          color: "#ffffff",
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            marginBottom: "1rem",
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
              isDisabled
            >
              Collateral
            </Button>
            <Button
              clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
              isDisabled
            >
              Borrow/Repay
            </Button>
            <Button
              isActive={true}
              clickFunction={() => navigate('history')}
              isDisabled
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

        <VaultMenuSmall
          vaultId={vaultId}
          isDisabled
        />

        <Box
          sx={{
            display: { xs: "flex", lg: "grid" },
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Card
            sx={{
              alignItems: "center",
              padding: "1.5rem",
              width: {xs: "100%", sm: "auto"},
              minHeight: "50vh",
              marginTop: "0.5rem",
            }}
          >
            Vault Not Found
          </Card>
        </Box>
      </Box>
    );
  }

  const { vaultAddress } = currentVault.status;

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

  const columns: GridColDef[] = colData;
  const rows = historyData || [];

  const handleEtherscanLink = (txRef: string) => {
    // const arbiscanUrl = `https://arbiscan.io/tx/${txRef}`;
    const arbiscanUrl = chainId === arbitrumSepolia.id
      ? `https://sepolia.arbiscan.io/tx/${txRef}`
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
        width: "100%",
        maxWidth: "1440px",
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },
        minHeight: "100vh",
        height: "100%",
      }}
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
