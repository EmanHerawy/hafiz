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
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";

 import lighthouse from '@lighthouse-web3/sdk'
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

 
export default function SubmitDAOProposalModal({ open, data, onClose }) {
   const [offer, setOffer] = useState({});
   const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
// const {data : ejazahBalance} = useContractRead({
//        address: EjazahNFT.address  as Address,
//     abi:EjazahNFT.abi,
//         functionName:"balanceOf",
//         watch: true
// })
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
    functionName: "propose",
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
  const uploadFile = async (file) => {
   /** if (this.state.image_file !== null){

            let formData = new FormData();
            formData.append('customFile', this.state.image_file);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                this.custom_file_upload_url,
                formData,
                {
                    headers: {
                        "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                        "Content-type": "multipart/form-data",
                    },                    
                }
            )
            .then(res => {
                console.log(`Success` + res.data);
            })
            .catch(err => {
                console.log(err);
            })
        } */
     let formData = new FormData();
            formData.append('file', file);
 fetch("http://localhost:1337/api/uploadFile", {
      mode: 'no-cors',
      method: "POST",
      body: formData
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });

   }
 
  function renderContent() {
    if (isLoading) return <Loader />;
    if (isSuccess)
      return (
        <>
          <Typography variant="h2" sx={{ fontFamily: "inherit", mb: 2 }}>
            Congrats! You have submitted a proposal 
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
       {isConnected&& !isDAOMember?( <Box sx={backdropStyle}>
         <Card>
            <CardMedia
              component="img"
              height="400"
              src={`/imgs/${data.img}`}
              alt={data.title}
            />
            <CardContent>
                  <input onChange={e=>uploadFile(e.target.files[0])} type="file" />
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
/** function propose(
        bytes memory pieceCid,
        bytes memory cid,
        address to,
        uint256 parentCertId,
        uint64 size,
        Recitations rewaya
    ) */