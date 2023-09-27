"use client";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useState } from "react";
import { useAccount,useEnsAvatar ,useEnsName} from "wagmi";
import SubmitDAOProposal from "../components/SubmitDAOProposal";
import JoinDAO from "../components/JoinDAO";

import ConnectWallet from "./ConnectWallet";
import NetworkSelector from "./NetworkSelector";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NextLink href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
             Hafiz
            </Typography>
            
          </NextLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isConnected && (
                <MenuItem>
                 
                  <NetworkSelector />
                </MenuItem>
              )}
              <MenuItem>
                <ConnectWallet />
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Hafiz
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          {/* <Box sx={{   display: { xs: "none", md: "flex" } }}>  <NextLink href="/dao" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
             Marketplace
            </Typography></Box> */}
          <Box sx={{  display: { xs: "none", md: "flex" } }}>
            
            <NextLink href="/dao" passHref>
           <Button>DAO</Button>
            
          </NextLink>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            
            <NextLink href="/marketplace" passHref>
           <Button>Marketplace</Button>
            
          </NextLink>
          </Box>
          
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isConnected &&  <NetworkSelector />}
            <ConnectWallet />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
