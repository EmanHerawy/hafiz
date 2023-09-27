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
import { useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
 
import {EjazahDAO,EjazahNFT} from "../assets/data/contracts.json";
 
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
const {data : ejazahBalance} = useContractRead({
       address: EjazahNFT.address  as Address,
    abi:EjazahNFT.abi,
        functionName:"balanceOf",
        watch: true
})
const {data : isDAOMember} = useContractRead({
       address: EjazahDAO.address  as Address,
    abi:EjazahDAO.abi,
  functionName: "members",
  args: [address],
  watch: true
        
})

   const {
    config,
    refetch,
    error,
  }  = usePrepareContractWrite({
    address: EjazahDAO.address as Address,
    abi: EjazahDAO.abi,
    functionName: "joinDAO",
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
            Congrats! You have joined Hafiz DAO 
          </Typography>
          <Box sx={{ display: "flex", gap: 10 }}>
            <Button
              variant="outlined"
              size="large"
              href={`https://calibration.filscan.io/tx/${data?.hash}`}
              target="_blank"
            >
              Etherscan
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
       {isConnected?( <Box sx={backdropStyle}>
          <Card>
      
            <CardContent>
                       
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {isConnected ? (
                <Button
                  onClick={handleHirePropoal}
                  variant="contained"
                  size="large"
                >
                 Join DAO
                </Button>
              ) : (
                <ConnectWallet />
              )}
            </CardActions>
          </Card>
        </Box>) : ( <Typography variant="body2" color="text.secondary">
You are already a mamber              </Typography>)}
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
