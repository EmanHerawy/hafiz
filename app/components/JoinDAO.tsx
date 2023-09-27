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

import ejazah from "../assets/data/ejazah.holders.json";
 
import JoinDAOModal from "./JoinDAOModal";

function excerpt(description) {
  const maxLength = 100;
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
}

export default function JoinDAO() {
  const [isJoinDAOModalOpen, setIsJoinDAOModalOpen] = useState(false);
  const [selectedEjazah, setSelectedEjazah] = useState(0);

  const handleOpenJoinDAOModal = (ejazah) => {
    setSelectedEjazah(ejazah);
    setIsJoinDAOModalOpen(true);
  };
  const handleCloseJoinDAOModal = () => {
    setIsJoinDAOModalOpen(false);
  };
  return (
    <Box>
          <Button onClick={handleOpenJoinDAOModal} >
        Join DAO 
      </Button>
       <JoinDAOModal
          open={isJoinDAOModalOpen}
          data={selectedEjazah}
          onClose={handleCloseJoinDAOModal}
        />
    </Box>
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