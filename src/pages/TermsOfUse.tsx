import { useLayoutEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import {
  usePositionStore,
} from "../store/Store.ts";

import Card from "../components/Card";

const TermsOfUse = () => {

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

  return (
    <Box
    >
      <Card
        sx={{
          margin: {
            xs: "3% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
          padding: "1.5rem",
        }}
        ref={rectangleRef}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h4" 
              sx={{
                color: "#fff",
                fontSize: {
                  xs: "1.8rem",
                  md: "2.125rem"
                }
              }}
            >
              Terms of Service for TheStandard.io
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              sx={{
                // marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              Last Updated: [5.NOV.2023]
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              1. Introduction
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              Welcome to TheStandard.io. This website provides a decentralized finance (DeFi) lending platform through which users can interact with various blockchain-based smart contracts and interfaces. By using TheStandard.io, you agree to be bound by these Terms of Service and acknowledge that you have read and understood them.
            </Typography>

            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              2. Acceptance of Risk
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              As a user of TheStandard.io, you acknowledge and agree that:
              <br/><br/>
              2.1. Risk of Blockchain and Smart Contracts: Dealing with blockchain technology and smart contracts involves several risks. The technology is relatively new and may have undiscovered vulnerabilities. You understand that this could expose you to risks of hacks, code vulnerabilities, and unforeseen events in the blockchain network.
              <br/><br/>
              2.2. Responsibility for Decisions: You are solely responsible for all decisions made and actions taken in relation to your use of TheStandard.io and its smart contracts and interfaces.
              <br/><br/>
              2.3. No Liability for Losses: TheStandard.io, its developers, team members, or affiliates shall not be liable for any losses you may incur as a result of using our platform. This includes, but is not limited to, losses due to smart contract vulnerabilities, hacks, technical failures, or fluctuations in cryptocurrency value.
              <br/><br/>
              2.4. Absence of Guarantees: The platform does not guarantee any profits or protection from losses. Your use of TheStandard.io is at your own risk, and you should only commit assets that you are prepared to lose entirely.
            </Typography>

            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              3. Acknowledgment of Risks
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              By using TheStandard.io, you acknowledge that:
              <br/><br/>
              3.1. Potential for Losses: You understand and accept the risk that comes with the use of blockchain technology and smart contracts, which could result in total loss of your assets.
              <br/><br/>
              3.2. No Recourse: In the event of any losses, including those resulting from vulnerabilities, hacks, or any other security issues in the smart contracts, you agree that you have no recourse against TheStandard.io, its developers, team members, or affiliates.
              <br/><br/>
              3.3. Due Diligence: You have the necessary knowledge and experience in blockchain technology and understand the risks involved. You are also responsible for conducting your own due diligence regarding your transactions.
            </Typography>

            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              4. No Liability
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              TheStandard.io shall not be liable for any of the following:
              <br/><br/>
              4.1. Technical Failures: Any technical malfunction, breakdown, delay, or failure of the website or the underlying blockchain network.
              <br/><br/>
              4.2. Market Risks: Changes in market conditions that affect the value of cryptocurrencies or assets used on the platform.
              <br/><br/>
              4.3. Regulatory Changes: Any loss due to changes in regulatory status, legal challenges, or other external factors affecting the use of cryptocurrencies or blockchain technology.
              <br/><br/>
              4.4.1 You acknowledge and understand that the smart contracts used by TheStandard.io are experimental computer programs that may contain unforeseen vulnerabilities or errors. These vulnerabilities or errors could potentially lead to the loss of your assets.
              <br/><br/>
              4.4.2 By using TheStandard.io smart contracts, you expressly acknowledge and accept these inherent risks. You further acknowledge and accept that you, the user, bear sole responsibility for any losses that may occur as a result of using TheStandard.io smart contracts, regardless of the cause of such losses.
              <br/><br/>
              4.4.3 Under no circumstances shall TheStandard.io's developers, TST token holders, or other users of the platform be liable for any losses you may incur as a result of using TheStandard.io smart contracts.
              <br/><br/>
              4.4.4 YOU USE THE STANDARD.IO SMART CONTRACTS AT YOUR OWN RISK.
            </Typography>

            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              5. Amendments to Terms
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              TheStandard.io reserves the right to modify or amend these Terms of Service at any time. Your continued use of the platform after any such changes constitutes your acceptance of the new Terms of Service.
            </Typography>

            <Typography
              sx={{
                marginBottom: "1rem",
                marginTop: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                fontWeight: "bold",
              }}
            >
              6. Contact Information
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              If you have any questions regarding these Terms of Service, please contact us on discord which is linked from TheStandard.io website.
            </Typography>


          </Box>
        </Box>
      </Card>

    </Box>
  );
};

export default TermsOfUse;