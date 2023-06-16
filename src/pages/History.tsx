import {
  Box,
  Pagination,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "../styles/historyStyle.css";
// import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import abi from "../abis/vaultManager.ts";
// import axios from "axios";
import HistoryGridSmallScreens from "../components/dataGrid/HistoryGridSmallScreens.tsx";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {
  useVaultManagerAbiStore,
  useContractAddressStore,
} from "../store/Store.ts";

const runApp = async () => {
  await Moralis.start({
    apiKey: import.meta.env.VITE_MORALIS_API_KEY,
  });
};

runApp();

const History = () => {
  const [matchedTransactions, setMatchedTransactions] = useState<unknown[]>([]);
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { contractAddress } = useContractAddressStore();
  // const [userInput, setUserInput] = useState("");

  const getVaults = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      vaultManagerAbi,
      signer
    );
    const vaults = await contract.vaults();
    console.log("vaults", vaults);
    // setMyVaults(vaults);
    getVaultTransactions(vaults);
    return vaults;
  };

  const getVaultTransactions = async (vaults: any) => {
    try {
      const transactions = await Promise.all(
        vaults.map(async (vault: any) => {
          const vaultTransactions =
            await Moralis.EvmApi.transaction.getWalletTransactions({
              chain: EvmChain.SEPOLIA,
              address: vault[1],
            });
          return vaultTransactions.raw.result;
        })
      );
      //  setVaultTransactions(transactions);
      const flattenedTransactions = transactions.flat();
      console.log(flattenedTransactions);

      matchTransactions(flattenedTransactions, vaults);
    } catch (error) {
      console.log(error);
    }
  };

  const matchTransactions = async (_transactions: any, _vaults: any) => {
    try {
      const matchedObjects: any[] = [];
      _transactions.map((transaction: any) => {
        if (_vaults) {
          _vaults.map((nft: any) => {
            // console.log(nft);
            // console.log(nft.vaultAddress.toLowerCase());
            // console.log(transaction);
            if (
              transaction.to_address.toLowerCase() ===
                nft.vaultAddress.toLowerCase() ||
              transaction.from_address.toLowerCase() ===
                nft.vaultAddress.toLowerCase()
            ) {
              const matchedObject = {
                ...transaction,
                vaultType: ethers.utils
                  .parseBytes32String(nft[5][6])
                  .toString(),
                token_id: ethers.BigNumber.from(nft[0]).toString(),
              };
              console.log(ethers.BigNumber.from(nft[0]).toString());
              console.log(
                ethers.utils.parseBytes32String(nft[5][6]).toString()
              );
              console.log(matchedObject);

              matchedObjects.push(matchedObject);
            }
          });
        }
      });
      console.log(matchedObjects);
      console.log(matchedObjects.length);
      setMatchedTransactions(matchedObjects);
    } catch (error) {
      console.log(error);
    }
  };

  // const filteredMatches = matchedTransactions.filter((_transaction: any) => {
  //   if (
  //     _transaction.token_id.toLowerCase().includes(userInput.toLowerCase()) ||
  //     _transaction.from_address
  //       .toLowerCase()
  //       .includes(userInput.toLowerCase()) ||
  //     _transaction.to_address.toLowerCase().includes(userInput.toLowerCase()) ||
  //     _transaction.block_hash.toLowerCase().includes(userInput.toLowerCase()) ||
  //     _transaction.block_number
  //       .toString()
  //       .toLowerCase()
  //       .includes(userInput.toLowerCase()) ||
  //     _transaction.block_timestamp
  //       .toLowerCase()
  //       .includes(userInput.toLowerCase())
  //   ) {
  //     return true;
  //   }

  //   return false;
  // });

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };

    return date.toLocaleString("en-US", options);
  }

  const returnNewDataGrid = () => {
    const paginatedMatches = matchedTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <>
        {paginatedMatches.map((match: any) => (
          <HistoryGridSmallScreens
            key={match.block_number}
            props={match}
            TruncatedTableCell={TruncatedTableCell}
            formatDate={formatDate}
          />
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-page.Mui-selected": {
                color: "white",
              },
            }}
          />
        </Box>
      </>
    );
  };

  const truncateValue = (value: string, length: number) => {
    if (value.length <= length) {
      return value;
    }

    const prefixLength = Math.floor(length / 3);
    const suffixLength = length - prefixLength - 3;
    const truncatedValue = `${value.substring(
      0,
      prefixLength
    )}...${value.substring(value.length - suffixLength)}`;
    return truncatedValue;
  };

  interface TruncatedTableCellProps {
    value: string; // Specify the type of the 'value' prop as string
    length: number;
  }

  const TruncatedTableCell: React.FC<TruncatedTableCellProps> = ({
    value,
    length,
  }) => {
    const truncatedValue = truncateValue(value, length);

    return (
      <td data-label={value}>
        <Tooltip title={value}>
          <Typography
            sx={{
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {truncatedValue}
          </Typography>
        </Tooltip>
      </td>
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(matchedTransactions.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      returnNewDataGrid();
    }
  }, [isMobile]);

  useEffect(() => {
    getVaults();
    console.log("I fire once");
  }, []);

  return (
    <Box
      sx={{
        // margin: "3% 12%",
        // padding: "3%",
        // // marginTop: "50px",
        // background:
        //   "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        // border: "1px solid rgba(52, 52, 52, 0.3)",
        // boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        // borderRadius: "10px 10px 0px 0px",
        // height: "100%",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {isMobile ? (
        returnNewDataGrid()
      ) : (
        <Box>
          <table>
            <thead>
              {/* <input
                style={{
                  background: "transparent",
                  width: "100%",
                  height: "1.5rem",
                  color: "white",
                }}
                type="text"
                placeholder="Search"
                onChange={(e) => setUserInput(e.target.value)}
              /> */}
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vault</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">BlockHash</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {matchedTransactions
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((match: any, index: number) => (
                  <tr key={index}>
                    <td data-label="#">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <TruncatedTableCell value={match.token_id} length={8} />
                    <TruncatedTableCell
                      value={match.from_address}
                      length={12}
                    />
                    <TruncatedTableCell value={match.to_address} length={12} />
                    <TruncatedTableCell value={match.block_hash} length={12} />

                    <td data-label="Time">
                      {formatDate(match.block_timestamp)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-page.Mui-selected": {
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default History;
