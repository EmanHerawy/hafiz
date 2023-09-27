import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button
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
 import JoinDAOModal from "./JoinDAOModal";

 import ConnectWallet from "./ConnectWallet";
import Loader from "./Loader";
function excerpt(description) {
  const maxLength = 100;
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
}

export default function JoinDAO() {
  type Address = `0x${string}`;
  const { address, isConnected } = useAccount();

  const [isJoinDAOModalOpen, setIsJoinDAOModalOpen] = useState(false);
  const [selectedEjazah, setSelectedEjazah] = useState(0);
const {data : ejazahBalance} = useContractRead({
       address: EjazahNFT.address  as Address,
    abi:EjazahNFT.abi,
  functionName: "balanceOf",
        args: [address],
        watch: true
})
const {data : isDAOMember} = useContractRead({
       address: EjazahDAO.address  as Address,
    abi:EjazahDAO.abi,
  functionName: "members",
  args: [address],
  watch: true
        
})
  const handleOpenJoinDAOModal = (ejazah) => {
    setSelectedEjazah(ejazah);
    setIsJoinDAOModalOpen(true);
  };
  const handleCloseJoinDAOModal = () => {
    setIsJoinDAOModalOpen(false);
  };
  return (
    <>
      {isConnected ? (
        <Box>
      
      {ejazahBalance > 0 ? (
      <div>  
        <Typography variant="body2" color="text.secondary">
                Mashaa Allah, You are Ejazah holder. You are most welcome to join Hafiz DAO
        </Typography>
        <Button onClick={handleOpenJoinDAOModal} >
        Join DAO 
              </Button>
            
              <JoinDAOModal
          open={isJoinDAOModalOpen}
          data={selectedEjazah}
          onClose={handleCloseJoinDAOModal}
        />
            </div>
      ) : (<Typography variant="body2" color="text.secondary">
                Sorry you don not have any Ejazah, The DAO is only for Ejazah holder
              </Typography>)} 
              
              
          
        
     
    </Box>
      ) : (<><Typography variant="body2" color="text.secondary">
               You need to connect your wallet to join DAO
              </Typography><ConnectWallet /></>)
    
    }
    </>
   
  );
}
const titleStyle = {
  fontFamily: "inherit",
  fontSize: { xs: "30px", md: "60px" },
  // fontWeight: "bold",
  color: "var(--yellow)",
  // textShadow: {
  //   xs: [-1, 2, 3].map((val) => `${val}px ${val}px var(--orange)`).join(", "),
  //   md: [-1, 2, 3, 4, 5, 6, 7, 8]
  //     .map((val) => `${val}px ${val}px var(--orange)`)
  //     .join(", "),
  // },
  letterSpacing: "2px",
  // lineHeight: "1.5",
  marginBottom: { xs: "20px", md: "50px" },
};