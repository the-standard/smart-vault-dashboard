import Box from "@mui/material/Box";
import "../../styles/buttonStyle.css";
import { BigNumber, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import ManageSteps from "../listNFTModal/ManageSteps.tsx";
import { Link } from "react-router-dom";
import {
  useVaultIdStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
  useVaultForListingStore,
  useVaultStore,
  useVaultAddressStore,
  useCurrentPageStore,
} from "../../store/Store.ts";
import {
  Button,
  Pagination,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "../../styles/progressBarStyle.css";
import "../../styles/datagridStyles.css";

import ProgressBar from "../ProgressBar.tsx";
import { formatEther, formatUnits } from "viem";
// import { getNetwork } from "@wagmi/core";
import { useContractReads, useNetwork } from "wagmi";
import { arbitrumGoerli } from "wagmi/chains";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

interface DataGridComponentProps {
  vaults: any[];
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({ vaults }) => {
  const tokenToNFTMap = useRef(new Map());
  const tokenMap = useRef(new Map());
  //store values
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { arbitrumGoerliContractAddress, arbitrumContractAddress } =
    useContractAddressStore();
  const { getVaultID } = useVaultIdStore();
  const { getVaultForListing } = useVaultForListingStore();
  const { getVaultStore } = useVaultStore();
  const { getVaultAddress } = useVaultAddressStore();
  const { getCurrentPage, currentPage } = useCurrentPageStore();
  //modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal child state
  const [modalChildState, setModalChildState] = useState();

  const { chain } = useNetwork();
  const vaultManagerAddress =
    chain?.id === arbitrumGoerli.id
      ? arbitrumGoerliContractAddress
      : arbitrumContractAddress;

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
              // maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {truncatedValue}
          </Typography>
        </Tooltip>
      </td>
    );
  };

  const contractFunction = {
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "tokenURI",
  };

  const { data: NFTsMetadata } = useContractReads({
    contracts: vaults.map((vault) => {
      return { ...contractFunction, args: [vault.tokenId] };
    }),
    watch: true,
  });

  NFTsMetadata?.forEach((data, index) => {
    const decodable = data.result?.toString().split(",")[1];
    if (decodable) {
      const decoded = atob(decodable);
      const parsed = JSON.parse(decoded);
      tokenToNFTMap.current.set(
        ethers.BigNumber.from(vaults[index].tokenId).toString(),
        parsed.image_data
      );
      tokenMap.current.set(
        ethers.BigNumber.from(vaults[index].tokenId).toString(),
        parsed
      );
    }
  });

  const sortedVaults = [...vaults].sort((a, b) => {
    const idA = BigNumber.from(a.tokenId);
    const idB = BigNumber.from(b.tokenId);
    if (idA.lt(idB)) {
      return 1;
    } else if (idB.lt(idA)) {
      return -1;
    } else {
      return 0;
    }
  });

  //the same function as below, but for NFT thumbnails
  const handleNFTClick = (params: any) => {
    setModalChildState(params.vaultID);
    getVaultID(params.vaultID);
    getVaultForListing(params.smartVault);
    getVaultStore(params.smartVault);
    getVaultAddress(params.smartVault.status.vaultAddress);
  };

  const renderActions = (params: any) => {
    const handleManageClick = () => {
      setModalChildState(params.vaultID);
      getVaultID(params.vaultID);
      getVaultForListing(params.smartVault);
      getVaultStore(params.smartVault);
      getVaultAddress(params.smartVault.status.vaultAddress);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to={`Collateral/${params.vaultID}`}
          onClick={handleManageClick}
        >
          <Button
            sx={{
              cursor: "pointer",
              marginRight: "0.7rem",
              height: "2.4rem",
              width: { xs: "5.2rem", md: "7rem" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              marginLeft: "0.5rem",
            }}
            className="myBtn"
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: { xs: "0.8rem", md: "1rem" },
                color: "#f1fbfa",
                fontFamily: "Poppins",
                fontWeight: 300,
              }}
            >
              Manage
            </Typography>
          </Button>
        </Link>
        <Button
          sx={{
            cursor: "pointer",
            height: "2.4rem",
            width: { xs: "5.2rem", md: "7rem" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            marginRight: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
          className="myBtn"
          onClick={() => {
            handleOpen();
            handleManageClick();
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              width: "100%",
              fontSize: { xs: "0.8rem", md: "1rem" },
              color: "#f1fbfa",
              fontFamily: "Poppins",
              fontWeight: 300,
            }}
          >
            Sell NFT
          </Typography>
        </Button>
      </Box>
    );
  };

  // const [currentPage, getCurrentPage] = useState<any>(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(vaults.length / itemsPerPage);

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

  const isMobile = useMediaQuery("(max-width:600px)");

  const computeProgressBar = (totalDebt: any, totalCollateralValue: any) => {
    // return ((totalDebt / (totalDebt * 1.1)) * 100).toFixed(2);
    const ratio =
      Number(formatUnits(totalDebt, 18)) /
      Number(formatUnits(totalCollateralValue, 18));
    const returnVal = (ratio * 100).toFixed(2);
    if (isNaN(Number(returnVal))) {
      return "0.00";
    } else {
      return (ratio * 100).toFixed(2);
    }
  };

  function truncateToTwoDecimals(num: any) {
    const withTwoDecimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/);
    return withTwoDecimals ? withTwoDecimals[0] : num;
  }

  useEffect(() => {
    if (isMobile) {
      // returnNewDataGrid();
    }
  }, [isMobile]);

  const sanitizedNFTs = sortedVaults.map((vault) => {
    const nft = tokenToNFTMap.current.get(
      ethers.BigNumber.from(vault.tokenId).toString()
    );
    const NFTPurified = DOMPurify.sanitize(nft);
    return {
      ...vault,
      NFTPurified,
    };
  });

  return (
    <Box
      sx={{
        color: "#f1fbfa",
        fontFamily: "Poppins",
        fontWeight: 300,
        fontSize: "1rem",
      }}
    >
      {/* responsive table container */}
      <Box
        sx={
          {
            // height: 400,
            // width: "100%",
          }
        }
      >
        {" "}
        <Box>
          <table
            style={{
              width: "76%",
              margin: "40px auto",
              alignItems: "center",
              overflow: "hidden",
              paddingLeft: "1rem",
            }}
          >
            <thead>
              <tr>
                <th>NFT</th>
                <th>Vault ID</th>
                <th>Collateral</th>
                <th>Debt</th>
                <th>Ratio</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sanitizedNFTs
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .sort((a, b) =>
                  ethers.BigNumber.from(b.tokenId)
                    .sub(ethers.BigNumber.from(a.tokenId))
                    .toNumber()
                )
                .map((vault, index) => (
                  <tr key={index}>
                    <td>
                      {tokenToNFTMap.current.has(
                        ethers.BigNumber.from(vault.tokenId).toString()
                      ) ? (
                        <div
                          style={{
                            borderRadius: "5px",
                            overflow: "hidden",
                            objectFit: "contain",
                            // border: "1px solid red",
                            //  width: "70px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            handleOpen();
                            handleNFTClick({
                              vaultID: ethers.BigNumber.from(
                                vault.tokenId
                              ).toString(),
                              smartVault: vault,
                            });
                          }}
                        >
                          {parse(vault.NFTPurified)}
                        </div>
                      ) : null}
                    </td>
                    <td>{ethers.BigNumber.from(vault.tokenId).toString()}</td>{" "}
                    <TruncatedTableCell
                      value={truncateToTwoDecimals(
                        ethers.utils.formatEther(
                          ethers.BigNumber.from(
                            vault.status.totalCollateralValue
                          ).toString()
                        )
                      )}
                      length={12}
                    />{" "}
                    <td>
                      {truncateToTwoDecimals(
                        formatEther(vault.status.minted.toString())
                      )}
                    </td>{" "}
                    <td>
                      {vault.status.liquidated ? (
                        <Typography sx={{ color: "white" }}>
                          Vault Liquidated
                        </Typography>
                      ) : (
                        <ProgressBar
                          progressValue={computeProgressBar(
                            Number(ethers.BigNumber.from(vault.status.minted)),
                            Number(
                              ethers.BigNumber.from(
                                vault.status.totalCollateralValue
                              )
                            )
                          )}
                        />
                      )}
                    </td>
                    <td
                      style={{
                        // border: "5px solid white",

                        width: "50px",
                        height: "auto",
                      }}
                    >
                      {" "}
                      {renderActions({
                        vaultID: ethers.BigNumber.from(
                          vault.tokenId
                        ).toString(),
                        smartVault: vault,
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
        {/* big screen table ends */}
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
      {/* modal */}
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: { xs: "absolute" as const, md: "" },
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "60%",
                sm: "50%",
                md: "40%",
              },
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              borderRadius: "10px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

              border: "1px solid rgba(255, 255, 255, 0.3)",

              p: 4,
              maxHeight: {
                xs: "80vh",
                sm: "80vh",
              },
              overflowY: "auto",
            }}
            className="modal-content" // add class name to modal content box
          >
            <ManageSteps
              modalChildState={modalChildState}
              tokenMap={tokenMap.current}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default DataGridComponent;
