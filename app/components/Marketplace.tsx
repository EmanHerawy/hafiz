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
 
import EjazahModal from "./EjazahModal";

function excerpt(description) {
  const maxLength = 100;
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
}

export default function Marketplace() {
  const [isEjazahModalOpen, setIsEjazahModalOpen] = useState(false);
  const [selectedEjazah, setSelectedEjazah] = useState(ejazah[0]);

  const handleOpenEjazahModal = (ejazah) => {
    setSelectedEjazah(ejazah);
    setIsEjazahModalOpen(true);
  };
  const handleCloseEjazahModal = () => {
    setIsEjazahModalOpen(false);
  };
  return (
    <Box>
              <Typography sx={titleStyle}>
        Explore our current Ejazah holders and hire your trusted shikh today to get yours!</Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {ejazah.map((c, indx) => (
          <Grid item key={indx} xs={12} md={4}>
            <Card onClick={() => handleOpenEjazahModal(c)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="500"
                  // sx={{ height: 140 }}
                  src={`/imgs/${c.img}`}
                  alt={c.name}
                />
                  {/* "img": "Ejaza02.jpg",
    "rewaya": "Hafs",
    "hourRate":5,
    "issueTime": "22/12/2010",
    "issuedIjazah": 20 */}
                <CardContent>
                  {/* <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "inherit" }}
                  >
                   Certified in 
                    {c.rewaya}  Recitation
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "inherit" }}
                  >
                    Certified in  {c.issuedIjazah} 
                  
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "inherit" }}
                  >
                    Certified by {c.issuedBy} 
                  
                  </Typography> */}
                    <Typography gutterBottom variant="h5" component="div">
          {c.name} 
        </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "inherit" }}
                  > Hour rate :  
                    {c.hourRate} $/h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Issued {excerpt(c.issuedIjazah)} Ejazah
                  </Typography>
                </CardContent>
                 <CardActions>
        <Button size="small">Chat</Button>
        <Button size="small">Hire</Button>
      </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        <EjazahModal
          open={isEjazahModalOpen}
          data={selectedEjazah}
          onClose={handleCloseEjazahModal}
        />
      </Grid>
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