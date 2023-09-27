import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
  CardActions,
  TextField,
  Autocomplete,
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
  import {EjazahDAO,EjazahNFT, lighthouse} from "../assets/data/contracts.json";
 
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
  const [cid, setCID] = useState("");
  const [to, setTo] = useState("")
  const [rewaya, setRewaya] = useState(0)
  const [parentCertId, setParentCertId] = useState(0)

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
    args: [cid, to, parentCertId,  rewaya],
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
/**    enum Recitations {
        Hafs_3an_Aasem,
        Warash_3an_Nafi3,
        Qalun_3an_Nafi3,
        Aldawriu_3an_Abi_Amr,
        Abi_alharith_3an_Alkisaaiy,
        Aldawri_3an_Alkisaaiy,
        Shoo3ba_3an_Aasem,
        Qunbul_3an_Abn_Katheer,
        Albizi_3an_Abn_Katheer,
        Alsuwsi_3an_Abi_Amr
    } */
 
const recitation = [
  { label: 'Hafs 3an Aasem', id: 0 },
  { label: 'Warash 3an Nafi3', id: 1 },
  { label: 'Qalun_3an_Nafi3', id: 2 },
  { label: 'Aldawriu 3an Abi Amr', id: 3},
  { label: 'Abi alharith 3an Alkisaaiy', id: 4},
  { label: 'Aldawri 3an Alkisaaiy', id: 5},
  { label: 'Shoo3ba 3an Aasem', id: 6},
  { label: 'Qunbul 3an Abn Katheer', id: 7},
  { label: 'Albizi 3an Abn Katheer', id: 8 },
    { label: 'Alsuwsi 3an Abi Amr', id: 9 }
]
 
 

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
       let formData = new FormData();
            formData.append('file', file);
 fetch("http://localhost:1337/api/uploadFile", {
      mode: 'no-cors',
      method: "POST",
      body: formData
    }).then(function (res) {
      if (res.ok) {
        // set cid 
        setCID(res.cid)

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
            {/* <CardMedia
              component="img"
              height="400"
              src={`/imgs/${data.img}`}
              alt={data.title}
            /> */}
            <CardContent>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                 <input onChange={e => uploadFile(e.target.files[0])} type="file" />
              <TextField fullWidth label="fullWidth" id="fullWidth" value={cid} label="CID"/>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <TextField fullWidth label="fullWidth" id="fullWidth" value={to} label="To" onChange={e=>setTo(e.target.value)} />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <TextField fullWidth label="fullWidth" id="fullWidth"  value={parentCertId} label="Your Ejazah id" onChange={e=>setParentCertId(e.target.value)}/>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={recitation}
                  sx={{ width: 300 }}
                  onChange={e=>setRewaya(e.target.value)}
  renderInput={(params) => <TextField {...params} label="Recitation"  />}
/>
              </Box>
              
                         </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {isConnected ? (
                <Button
                  onClick={handleHirePropoal}
                  variant="contained"
                  size="large"
                >
                 Send
                </Button>
              ) : (
                <ConnectWallet />
              )}
            </CardActions>
          </Card>
        </Box>) : ( <ConnectWallet />)}
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