import { useState, useEffect, useRef } from "react";
import { Box, Modal, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useChainId,
  useWatchBlockNumber
} from "wagmi";
import { formatEther, parseEther } from "viem";
import moment from 'moment';
import { arbitrumSepolia } from "wagmi/chains";

import {
  useTstAddressStore,
  useErc20AbiStore,
  useStakingAbiStore,
  useSnackBarStore,
} from "../../../store/Store";

import Button from "../../../components/Button";

interface StakingModalProps {
  stakingContract: any;
  isOpen: boolean;
  handleCloseModal: any;
}

const StakingModal: React.FC<StakingModalProps> = ({
  stakingContract,
  isOpen,
  handleCloseModal,
}) => {
  const chainId = useChainId();
  const [stakeAmount, setStakeAmount] = useState(0);
  const {
    arbitrumTstAddress,
    arbitrumSepoliaTstAddress
  } = useTstAddressStore();
  const { erc20Abi } = useErc20AbiStore();
  const { stakingAbi } = useStakingAbiStore();
  const { getSnackBar } = useSnackBarStore();
  const { address: accountAddress } = useAccount();

  const [approveLoading, setApproveLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stage, setStage] = useState('');

  const inputRef: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStakeAmount(0);
    setSuccess(false);
  }, [isOpen]);

  const tstAddress = chainId === arbitrumSepolia.id ?
  arbitrumSepoliaTstAddress :
  arbitrumTstAddress ;

  const amountInWei = parseEther(stakeAmount.toString());

  const stakingAddress = stakingContract?.address;
  const stakingMaturity = stakingContract?.maturity;
  const stakingWindowEnd = stakingContract?.windowEnd;
  const maturityUnix = Number(stakingMaturity);
  const maturity = moment.unix(maturityUnix);
  const windowEndUnix = Number(stakingWindowEnd);
  const windowEnd = moment.unix(windowEndUnix);

  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  const handleApprovePayment = async () => {
    setStage('APPROVE_PAYMENT');
    try {
      writeContract({
        abi: erc20Abi,
        address: tstAddress as any,
        functionName: "approve",
        args: [stakingAddress as any, amountInWei],
      });

      getSnackBar('SUCCESS', 'Success!');
    } catch (error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    }
  };

  const {data: rewardAmount}: any = useReadContract({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: "calculateReward",
    args: [amountInWei]
  });

  const tstContract = {
    address: tstAddress,
    abi: erc20Abi,
  }

  const { data: tstData, refetch } = useReadContracts({
    contracts: [{
      ... tstContract,
      functionName: "allowance",
      args: [accountAddress as any, stakingAddress]
    },{
      ... tstContract,
      functionName: "balanceOf",
      args: [accountAddress as any]
    }],
  });

  useWatchBlockNumber({
    onBlockNumber() {
      refetch();
    },
  })

  const existingAllowance: any = tstData && tstData[0].result;
  const tstBalance: any = tstData && tstData[1].result;

  let useRewardAmount: any = 0;
  if (rewardAmount) {
    useRewardAmount = formatEther(rewardAmount.toString());
  }

  let rewardRate;
  if (stakingContract && stakingContract.SI_RATE) {
    rewardRate = Number(stakingContract.SI_RATE) / 1000;
  }

  const handleMintPosition = async () => {
    setStage('MINT_POSITION');
    try {
      writeContract({
        abi: stakingAbi,
        address: stakingAddress as any,
        functionName: "mint",
        args: [amountInWei],
      });

      getSnackBar('SUCCESS', 'Success!');
    } catch (error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    }
  };

  useEffect(() => {
    if (stage === 'APPROVE_PAYMENT') {
      if (isPending) {
        setApproveLoading(true);
      } else if (isSuccess) {
        setApproveLoading(false);
        handleMintPosition();
        setStage('');
      } else if (isError) {
        setApproveLoading(false);
        handleCloseModal();
        setStage('');
      }
    }
    if (stage === 'MINT_POSITION') {
      if (isPending) {
        setMintLoading(true);
        setSuccess(false);
      } else if (isSuccess) {
        setMintLoading(false);
        setSuccess(true);
        setStage('');
      } else if (isError) {
        setMintLoading(false);
        setSuccess(false);
        setStage('');
      }
    }
  }, [
    isPending,
    isSuccess,
    isError,
  ]);


  const handleAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setStakeAmount(Number(e.target.value));
    }
  };

  const handleInputMax = () => {
    const formatBalance = formatEther(tstBalance);
    inputRef.current.value = formatBalance;
    handleAmount({target: {value: formatBalance}});
  }

  const handleStaking = async () => {
    // const { write } = existingAllowance >= amountInWei ?
    // handleMintPosition : handleApprovePayment;
    // write();  
    if (existingAllowance >= amountInWei) {
      handleMintPosition();
    } else {
      handleApprovePayment();
    }
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
              sm: "50%",
              md: "40%",
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
            }}
          >
            {approveLoading || mintLoading ? (
              <>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {approveLoading ? ('Setting Spending Cap') : null}
                  {mintLoading ? ('Approving Minting') : null}
                </Typography>
                <Box
                sx={{
                  minHeight: "250px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                >
                  <CircularProgress size="8rem" />
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}                
                  >
                    {success ? (
                      'TST Staked Successfully 🎉'
                      ) : (
                      'Stake TST'
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      opacity: "0.8"
                    }}
                  >
                    {success ? (
                      <>
                        Congratulations on securing your {rewardRate}% TST reward!
                      </>
                    ) : (
                      <>
                        Input the amount of TST you wish to stake below and find out how much EUROs you&apos;ll be rewarded with at the end of the maturity period.
                      </>
                    )}
                  </Typography>
                  <Box sx={{
                    marginTop: "1rem",
                    width: "100%",
                    height: "2px",
                    backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 1px",
                    backgroundPosition: "center bottom",                    
                  }}/>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      marginRight: "0.5rem",
                      minWidth: "120px",
                    }}
                  >
                    Closing Date:
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    {windowEnd.format('ll') || ''}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      marginRight: "0.5rem",
                      minWidth: "120px",
                    }}
                  >
                    Maturity Date:
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    {maturity.format('ll') || ''}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      marginRight: "0.5rem",
                      minWidth: "120px",
                    }}
                  >
                    Stake Amount:
                  </Typography>
                  {success ? (
                    <>
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          width: "100%",
                        }}
                      >
                        {stakeAmount} TST
                      </Typography>
                    </>
                  ) : (
                    <>
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
                          width: "100%",
                        }}
                        placeholder="TST Stake Amount"
                        type="number"
                        onChange={handleAmount}
                        autoFocus
                        ref={inputRef}
                      />
                      <Button
                        sx={{
                          margin: "0.5rem",
                          padding: "5px",
                          minWidth: "3rem",
                          height: "1.5rem",
                          fontSize: "1rem",
                        }}
                        clickFunction={() => handleInputMax()}
                      >
                        Max
                      </Button>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      marginRight: "0.5rem",
                      minWidth: "120px",
                    }}
                  >
                    Reward:
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    {useRewardAmount} EUROs
                  </Typography>
                </Box>
                {success ? (
                  <>
                    <Box sx={{
                      marginBottom: "1rem",
                      width: "100%",
                      height: "2px",
                      backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 1px",
                      backgroundPosition: "center bottom",                    
                    }}/>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        width: "100%",
                        opacity: "0.8",
                        marginBottom: "1rem",
                      }}                
                    >
                      If you have more TST and would like to earn even more EUROs, you can still increase your stake while the window is open!
                    </Typography>
                  </>
                ) : null}
                {success ? (
                  <Button
                    sx={{
                      padding: "5px",
                      height: "1.5rem",
                    }}
                    clickFunction={handleCloseModal}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    sx={{
                      padding: "5px",
                      height: "1.5rem",
                    }}
                    clickFunction={handleStaking}
                    isDisabled={!stakeAmount || !rewardAmount}
                  >
                    Stake
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
};

export default StakingModal;
