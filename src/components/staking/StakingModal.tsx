import { useState, useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useContractWrite } from "wagmi";
import { getNetwork } from "@wagmi/core";
import { arbitrumGoerli } from "wagmi/chains";
import {
  useTstAddressStore,
  useErc20AbiStore,
  useStakingAbiStore,
  useSnackBarStore,
} from "../../store/Store";
import Button from "../../components/Button";

interface StakingModalProps {
  stakingAddress: any;
  isOpen: boolean;
  handleCloseModal: any;
}

const StakingModal: React.FC<StakingModalProps> = ({
  stakingAddress,
  isOpen,
  handleCloseModal,
}) => {
  const { chain } = getNetwork();
  const [stakeAmount, setStakeAmount] = useState(0);
  const {
    arbitrumTstAddress,
    arbitrumGoerliTstAddress
  } = useTstAddressStore();
  const { erc20Abi } = useErc20AbiStore();
  const { stakingAbi } = useStakingAbiStore();
  const { getSnackBar } = useSnackBarStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const tstAddress = chain?.id === arbitrumGoerli.id ?
  arbitrumTstAddress :
  arbitrumGoerliTstAddress;

  const approvePayment = useContractWrite({
    address: tstAddress as any,
    abi: erc20Abi,
    functionName: "approve",
    args: [stakingAddress as any, stakeAmount],
  });

  useEffect(() => {
    const { isLoading, isSuccess, isError } = approvePayment;

    if (isLoading) {
      setLoading(true);
      // handleOpen();
      // getCircularProgress(true);
    } else if (isSuccess) {
      setLoading(false);
      handleMintPosition();
      // getCircularProgress(false);
      // incrementCounter();
      getSnackBar(0);
      // inputRef.current.value = "";
      // inputRef.current.focus();
      // getGreyBarUserInput(0);
    } else if (isError) {
      setLoading(false);
      handleCloseModal();
      // getCircularProgress(false);
      getSnackBar(1);
      // inputRef.current.value = "";
      // inputRef.current.focus();
      // getGreyBarUserInput(0);
    }
  }, [
    approvePayment.isLoading,
    approvePayment.isSuccess,
    approvePayment.data,
    approvePayment.isError,
  ]);

  const handleMintPosition = async () => {
    const { write } = mintPosition;
    write();
  };

  const mintPosition = useContractWrite({
    address: "0xda81118Ad13a2f83158333D7B7783b33e388E183",
    abi: stakingAbi,
    functionName: "mint",
    args: [stakeAmount],
  });

  useEffect(() => {
    const { isLoading, isSuccess, isError } = mintPosition;
    if (isLoading) {
      setLoading(true);
      // setModalStep(2);
      // getCircularProgress(true);
    } else if (isSuccess) {
      setLoading(false);
      setSuccess(true);
      // handleClose();
      // setModalStep(1);
      // getProgressType(2);
      // getCircularProgress(false);
      // incrementCounter();
      getSnackBar(0);
      // inputRef.current.value = "";
      // inputRef.current.focus();
      // getGreyBarUserInput(0);
    } else if (isError) {
      setLoading(false);
      // setModalStep(1);
      // getCircularProgress(false);
      getSnackBar(1);
      // inputRef.current.value = "";
      // inputRef.current.focus();
      // getGreyBarUserInput(0);
      // console.log(isError);
    }
  }, [
    mintPosition.isLoading,
    mintPosition.isSuccess,
    mintPosition.data,
    mintPosition.isError,
  ]);

  const handleAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setStakeAmount(Number(e.target.value));
    }
  };

  const handleApprovePayment = async () => {
    const { write } = approvePayment;
    write();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          handleCloseModal();
        }}
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
              xs: "70%",
              sm: "60%",
              md: "50%",
            },
            background:
              "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
            borderRadius: "10px",
            padding: "0",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(13.9px)",
            WebkitBackdropFilter: "blur(13.9px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
            overflowY: "auto",
          }}
          className="modal-content"
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            {loading ? (
              <>
                <Typography>
                  TEMP LOADER...
                </Typography>
              </>
            ) : (
              <>
                <Typography>
                  Stake TST
                </Typography>
                <input
                  style={{
                    background: " rgba(18, 18, 18, 0.5)",
                    border: "1px solid #8E9BAE",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    fontFamily: "Poppins",
                    height: "2rem",
                    borderRadius: "10px",
                    paddingLeft: "0.5rem",
                    marginTop: "1rem",
                  }}
                  placeholder="Amount of TST to stake"
                  type="number"
                  onChange={handleAmount}
                  autoFocus
                />
                <Button
                  sx={{
                    padding: "5px",
                    height: "1.5rem",
                    marginTop: "1rem",
                  }}
                  clickFunction={handleApprovePayment}
                >
                  Stake
                </Button>
              </>
            )}
            {success ? (
              <Typography>
                GREAT SUCCESS
              </Typography>
            ) : (null)}
          </Box>
        </Box>
      </Modal>
    </>
  )
};

export default StakingModal;
