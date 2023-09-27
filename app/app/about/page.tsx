"use client";
import { Box, Typography, } from "@mui/material";

 import Marketplace from "../../components/Marketplace";
import HomeLinks from "../../components/HomeLinks";

export default function Marketplace() {
  return (
    <main>
   
       <Box sx={{ textAlign: "center", mb: 10, mt: 10 }}>

        {/* <Typography sx={titleStyle}>Hafiz</Typography> */}
        <Box
component="img"
// sx={{
// height: 233,
// width: 350,
// maxHeight: { xs: 233, md: 167 },
// maxWidth: { xs: 350, md: 250 },
// }}
 src="/imgs/title.png"
/>
      </Box>

      <HomeLinks />
    </main>
  );
}
