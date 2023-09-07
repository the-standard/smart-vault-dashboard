import {
  Box,
  Pagination,
} from "@mui/material";
import { useEffect } from "react";
import { getNetwork } from "@wagmi/core";
import { arbitrumGoerli } from "wagmi/chains";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Theme, styled } from '@mui/material/styles';

import {
  useCurrentPageStore,
} from "../../store/Store.ts";

import Button from "../../components/Button";

interface DataGridComponentProps {
  rowData: any[];
  colData: any[];
}

const History: React.FC<DataGridComponentProps> = () => {

  const colData = [
    {
      flex: 1,
      field: 'type',
      headerName: 'Type'},
    {
      flex: 1,
      field: 'createdAt',
      headerName: 'Created'},
    {
      flex: 1,
      field: 'updatedAt',
      headerName: 'Updated'},
    {
      flex: 1,
      field: 'asset',
      headerName: 'Asset'},
    {
      flex: 1,
      field: 'status',
      headerName: 'Status'},
    {
      flex: 1,
      field: 'amount',
      headerName: 'Amount'},
    {
      flex: 1,
      field: 'balance',
      headerName: 'New Balance'},
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
  ]  



// const History: React.FC<DataGridComponentProps> = ({colData, rowData}) => {
  const { getCurrentPage, currentPage } = useCurrentPageStore();
  const { chain } = getNetwork();

  const columns: GridColDef[] = colData;
  const rows = rowData;

  const itemsPerPage = 5;

  const totalPages = Math.ceil(rowData.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    getCurrentPage(page);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem("currentPage", currentPage);
    };
  }, [currentPage]);

  useEffect(() => {
    const page = localStorage.getItem("currentPage");
    if (page) {
      getCurrentPage(Number(page));
    }
  }, []);

  const handleEtherscanLink = (txRef: string) => {
    const arbiscanUrl =
      chain?.id === arbitrumGoerli.id
        ? `https://goerli.arbiscan.io/tx/${txRef}`
        : `https://arbiscan.io/tx/${txRef}`;
      
    window.open(arbiscanUrl, "_blank");
  };

  // return (
  //   <Box>
  //     <Box>
  //       <table
  //         style={{
  //           width: '100%'
  //         }}
  //         className="table"
  //       >
  //         <thead>
  //           <tr>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               Type
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               Created
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               Updated
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               Asset
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               Status
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               Amount
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //               New Balance
  //             </th>
  //             <th
  //               style={{textAlign: 'start'}}
  //             >
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {demoHistoryData
  //             .map((item, index) => (
  //               <tr key={index}>
  //                 <td
  //                   style={{
  //                     textTransform: 'capitalize'
  //                   }}
  //                 >
  //                   {item.type.toLowerCase() || ''}
  //                 </td>
  //                 <td>
  //                   {item.createdAt || ''}
  //                 </td>
  //                 <td>
  //                   {item.updatedAt || ''}
  //                 </td>
  //                 <td>
  //                   {item.asset || ''}
  //                 </td>
  //                 <td>
  //                   {item.status || ''}
  //                 </td>
  //                 <td>
  //                   {item.amount || ''}
  //                 </td>
  //                 <td>
  //                   {item.balance || ''}
  //                 </td>
  //                 <td>
  //                   {item.txRef ? (
  //                     <Button
  //                       sx={{
  //                         margin: "2px",
  //                         padding: "5px",
  //                       }}
  //                       clickFunction={() => handleEtherscanLink(item.txRef)}
  //                     >
  //                       View
  //                     </Button>
  //                   ) : null}
  //                 </td>
  //               </tr>
  //             ))}
  //         </tbody>
  //       </table>
  //     </Box>
  //     {/* big screen table ends */}
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Pagination
  //         count={totalPages}
  //         page={currentPage}
  //         onChange={handlePageChange}
  //         sx={{
  //           "& .MuiPaginationItem-page.Mui-selected": {
  //             color: "white",
  //           },
  //         }}
  //       />
  //     </Box>
  //   </Box>
  // );

  // return (
  //   <TableContainer >
  //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Type</TableCell>
  //           <TableCell>Created</TableCell>
  //           <TableCell>Updated</TableCell>
  //           <TableCell>Asset</TableCell>
  //           <TableCell>Status</TableCell>
  //           <TableCell>Amount</TableCell>
  //           <TableCell>New Balance</TableCell>
  //           <TableCell></TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {demoHistoryData.map((item, index) => (
  //           <TableRow
  //             key={index}
  //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //           >
  //             <TableCell>
  //               {item.type.toLowerCase() || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.createdAt || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.updatedAt || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.asset || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.status || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.amount || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.balance || ''}
  //             </TableCell>
  //             <TableCell>
  //               {item.txRef ? (
  //                 <Button
  //                   sx={{
  //                     margin: "2px",
  //                     padding: "5px",
  //                   }}
  //                   clickFunction={() => handleEtherscanLink(item.txRef)}
  //                 >
  //                   View
  //                 </Button>                    
  //               ) : null}
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // )

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
    <StyledDataGrid
      getRowId={(row) => row?.txRef}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      // pageSizeOptions={[5, 10]}
    />
  )
};

export default History;
