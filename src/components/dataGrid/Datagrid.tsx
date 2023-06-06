import Box from "@mui/material/Box";
// import SliderComponent from "../SliderComponent";
import "../../styles/buttonStyle.css";
import { ethers } from "ethers";
import abi from "../../abis/vaultManager.ts";
import { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
// import ManageSteps from "../ManageSteps.tsx";
import ManageSteps from "../listNFTModal/ManageSteps.tsx";
// import { useAccount, useConnect } from "wagmi";
import { Link } from "react-router-dom";
import {
  useVaultIdStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
} from "../../store/Store.ts";
import {
  Button,
  Pagination,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "../../styles/progressBarStyle.css";
import ProgressBar from "../ProgressBar.tsx";

interface DataGridComponentProps {
  vaults: any[];
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({ vaults }) => {
  const [tokenToId, setTokenToId] = useState<any[]>([]);
  const [resolved, setResolved] = useState(false);
  const tokenToNFTMap = useRef(new Map());
  const tokenMap = useRef(new Map());
  //store values
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { contractAddress } = useContractAddressStore();
  //modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal child state
  const [modalChildState, setModalChildState] = useState();

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

  //get this contract and abi from store
  async function getNFT(vault: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      vaultManagerAbi,
      signer
    );
    const tokenURI = await contract.tokenURI(vault[0]);
    const tokenDecoded = JSON.parse(atob(tokenURI.split(",")[1]));
    // console.log(tokenDecoded.image);
    // console.log(tokenDecoded);

    tokenToNFTMap.current.set(
      ethers.BigNumber.from(vault[0]).toString(),
      tokenDecoded.image
    );

    tokenMap.current.set(
      ethers.BigNumber.from(vault[0]).toString(),
      tokenDecoded
    );
    return {
      tokenId: ethers.BigNumber.from(vault[0]).toString(),
      image: tokenDecoded.image,
    };
  }
  // alert(
  //   parseFloat(
  //     Number(ethers.BigNumber.from(vaults[0][5][0])) /
  //       Number(ethers.BigNumber.from(vaults[0][5][1]))
  //   ).toString() * 100
  // );

  useEffect(() => {
    async function fetchNFTs() {
      const tokenToIds = await Promise.all(
        vaults.map((vault) => getNFT(vault))
      );
      const uniqueTokenToIds = tokenToIds.filter(
        (tokenToId, index, arr) =>
          arr.findIndex((t) => t.tokenId === tokenToId.tokenId) === index
      );
      setTokenToId(uniqueTokenToIds);
      console.log("tokenToId", uniqueTokenToIds);
    }
    fetchNFTs();
  }, [vaults]);

  useEffect(() => {
    console.log("tokenToId real", tokenToId);
    if (tokenToId.length > 0) {
      setResolved(true);
      console.log(resolved);
    }
    console.log(tokenToNFTMap);
  }, [tokenToId]);

  console.log("vaults", vaults);
  // console.log("vault sth", ethers.BigNumber.from(vaults[0][1]).toNumber());

  // const renderSlider = (step: number) => {
  //   return (
  //     <Box>
  //       <SliderComponent step={step} />
  //     </Box>
  //   );
  // };

  const renderActions = (params: any) => {
    const handleManageClick = () => {
      console.log(params.vaultID);
      setModalChildState(params.vaultID);
      const { getVaultID } = useVaultIdStore.getState();
      getVaultID(params.vaultID);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "0",
          padding: "0",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to="Collateral"
          onClick={handleManageClick}
        >
          <Button
            sx={{
              cursor: "pointer",
              marginRight: "2rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "4rem", md: "8rem" },
            }}
            className="myBtn"
          >
            <Typography
              variant="body2"
              sx={{ color: "#fff", fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Manage
            </Typography>
          </Button>
        </Link>
        <Button
          sx={{
            cursor: "pointer",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "4rem", md: "8rem" },
            padding: 0,
            margin: 0,
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
              color: "#fff",
              textAlign: "center",
              width: "100%",
              fontSize: { xs: "0.8rem", md: "1rem" },
            }}
          >
            Sell NFT
          </Typography>
        </Button>
      </Box>
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(vaults.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      // returnNewDataGrid();
    }
  }, [isMobile]);

  return (
    <Box
      sx={
        {
          // margin: "3% 12%",
          // padding: "3%",
          // background:
          //   "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
          // border: "1px solid rgba(52, 52, 52, 0.3)",
          // boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
          // borderRadius: "10px 10px 0px 0px",
          // border: "2px solid red",
        }
      }
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
        {/* small screen table */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Debt Range</th>
                {/* width is not actually 20px, but it makes the table look good */}
                <th style={{ width: "20px" }} scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vaults
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((vault: any, index: number) => (
                  <tr key={index}>
                    <td>
                      {/* returns NaN */}
                      <ProgressBar
                        progressValue={
                          (Number(ethers.BigNumber.from(vault[5][0])) /
                            Number(ethers.BigNumber.from(vault[5][1]))) *
                          100
                        }
                      />
                    </td>
                    <td style={{}}>
                      {" "}
                      {renderActions({
                        vaultID: ethers.BigNumber.from(vault[0]).toString(),
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>{" "}
        </Box>
        {/* medium screen table */}
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "none" },
          }}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Vault NFT</th>
                <th scope="col">Vault ID</th>

                <th scope="col">Debt Range</th>
                {/* width is not actually 20px, but it makes the table look good */}
                <th style={{ width: "20px" }} scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vaults
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((vault: any, index: number) => (
                  <tr key={index}>
                    {/* <td data-label="#">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td> */}
                    <td>
                      {tokenToNFTMap.current.has(
                        ethers.BigNumber.from(vault[0]).toString()
                      ) ? (
                        <img
                          src={tokenToNFTMap.current.get(
                            ethers.BigNumber.from(vault[0]).toString()
                          )}
                          alt="NFT"
                          width={50}
                          height={50}
                        />
                      ) : null}
                    </td>
                    <td>{ethers.BigNumber.from(vault[0]).toString()}</td>

                    <td>
                      {/* returns NaN */}
                      <ProgressBar
                        progressValue={
                          (Number(ethers.BigNumber.from(vault[5][0])) /
                            Number(ethers.BigNumber.from(vault[5][1]))) *
                          100
                        }
                      />
                    </td>
                    <td style={{}}>
                      {" "}
                      {renderActions({
                        vaultID: ethers.BigNumber.from(vault[0]).toString(),
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>{" "}
        </Box>
        {/* big screen table */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
          }}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Vault NFT</th>
                <th scope="col">Vault ID</th>
                <th scope="col">Ratio</th>
                <th scope="col">Debt</th>
                <th scope="col">Debt Range</th>
                {/* width is not actually 20px, but it makes the table look good */}
                <th style={{ width: "20px" }} scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vaults
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((vault: any, index: number) => (
                  <tr key={index}>
                    {/* <td data-label="#">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td> */}
                    <td>
                      {tokenToNFTMap.current.has(
                        ethers.BigNumber.from(vault[0]).toString()
                      ) ? (
                        <img
                          src={tokenToNFTMap.current.get(
                            ethers.BigNumber.from(vault[0]).toString()
                          )}
                          alt="NFT"
                          width={50}
                          height={50}
                        />
                      ) : null}
                    </td>
                    <td>{ethers.BigNumber.from(vault[0]).toString()}</td>
                    <TruncatedTableCell
                      value={ethers.BigNumber.from(vault[5][2]).toString()}
                      length={12}
                    />

                    <td>{ethers.BigNumber.from(vault[5][0]).toString()}</td>
                    <td>
                      {/* returns NaN */}
                      <ProgressBar
                        progressValue={
                          (Number(ethers.BigNumber.from(vault[5][0])) /
                            Number(ethers.BigNumber.from(vault[5][1]))) *
                          100
                        }
                      />
                    </td>
                    <td style={{}}>
                      {" "}
                      {renderActions({
                        vaultID: ethers.BigNumber.from(vault[0]).toString(),
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>{" "}
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
              bgcolor: "#0C0C0C",
              border: "2px solid #000",
              boxShadow: 24,
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
