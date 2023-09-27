import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { getNetwork } from "@wagmi/core";
import { useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
 
import {EjazahMarketplace} from "../assets/data/contracts.json";
 
import ConnectWallet from "./ConnectWallet";
import Loader from "./Loader";

const backdropStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "500px",
  boxShadow: 24,
  overflowY: "auto",
  maxHeight: "100vh",
};

type Address = `0x${string}`;

 
export default function EjazahModal({ open, data, onClose }) {
   const [offer, setOffer] = useState({});
   const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { address, isConnected } = useAccount();




   const {
    config,
    refetch,
    error,
  }  = usePrepareContractWrite({
    address: EjazahMarketplace.address as Address,
    abi: EjazahMarketplace.abi,
    functionName: "submitOffer",
    args: [offer],
  });

 

 const action = useContractWrite(config);
    const {
    isLoading,
    isSuccess,
    error: transactionError,
  }=useWaitForTransaction({
    hash: action.data?.hash,
    onSuccess() {
      refetch().then(() => console.log("refetched"));
    },
  });

 

 

  const getErrors = () => {
    return (
     error  || transactionError
    )?.message;
  };

  const handleOpenInfoModal = () => {
    setIsInfoModalOpen(true);
  };
  const handleCloseInfoModal = () => {
    if (isLoading) return;
    setIsInfoModalOpen(false);
  };

  const handleHirePropoal = async () => {
    handleOpenInfoModal();
   action.write?.();
  };

  function renderContent() {
    if (isLoading) return <Loader />;
    if (isSuccess)
      return (
        <>
          <Typography variant="h2" sx={{ fontFamily: "inherit", mb: 2 }}>
            Successfully minted your NFT!
          </Typography>
          <Box sx={{ display: "flex", gap: 10 }}>
            <Button
              variant="outlined"
              size="large"
              href={`https://goerli-optimism.etherscan.io/tx/${data?.hash}`}
              target="_blank"
            >
              Etherscan
            </Button>
            <Button variant="outlined" size="large" href={`/user`}>
              View
            </Button>
          </Box>
        </>
      );
    if (getErrors())
      return (
        <Typography variant="h5" sx={{ fontFamily: "inherit" }}>
          Error: {getErrors()}
        </Typography>
      );
    return <Loader />;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={backdropStyle}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              src={`/imgs/${data.img}`}
              alt={data.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontFamily: "inherit" }}
              >
                {data.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.description}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {isConnected ? (
                <Button
                  onClick={handleHirePropoal}
                  variant="contained"
                  size="large"
                >
                 Hire
                </Button>
              ) : (
                <ConnectWallet />
              )}
            </CardActions>
          </Card>
        </Box>
      </Modal>

      <Modal
        open={isInfoModalOpen}
        onClose={handleCloseInfoModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={backdropStyle}>
          <Box
            sx={{
              p: 5,
              width: "100%",
              background: "var(--yellow)",
              color: "#000",
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
