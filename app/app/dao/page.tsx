"use client";

import { Box, Typography, } from "@mui/material";

import  SubmitDAOProposal from "../../components/SubmitDAOProposal";
import JoinDAO from "../../components/JoinDAO";
import HomeLinks from "../../components/HomeLinks";

export default function DAO() {
  return (
    <main>
   
 <SubmitDAOProposal/>
<JoinDAO/>
      
      <HomeLinks />
    </main>
  );
}

const titleStyle = {
  fontFamily: "inherit",
  fontSize: { xs: "60px", md: "100px" },
  fontWeight: "bold",
  color: "var(--yellow)",
  textShadow: {
    xs: [-1, 2, 3].map((val) => `${val}px ${val}px var(--orange)`).join(", "),
    md: [-1, 2, 3, 4, 5, 6, 7, 8]
      .map((val) => `${val}px ${val}px var(--orange)`)
      .join(", "),
  },
  letterSpacing: "4px",
  lineHeight: "1.5",
  marginBottom: { xs: "20px", md: "50px" },
};
