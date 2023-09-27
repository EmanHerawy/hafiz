"use client";
import "../styles/globals.css";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import Container from "@mui/material/Container";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { filecoin, filecoinCalibration } from "wagmi/chains";

import AppNavbar from "../components/AppNavbar";
import darkTheme from "../styles/theme/darkTheme";
import font from "../styles/theme/font";

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const chains = [filecoin, filecoinCalibration];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  return (
    <html lang="en">
      <body className={font.className}>
        {ready ? (
          <WagmiConfig config={wagmiConfig}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Box style={{ position: "relative" }}>
                <Box style={boxStyles}></Box>
                <AppNavbar />
                <Container sx={{ pt: 10, pb: 10 }}>{children}</Container>
              </Box>
            </ThemeProvider>
          </WagmiConfig>
        ) : null}
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeVariables={{
            "--w3m-z-index": "90000",
          }}
        />
      </body>
    </html>
  );
}

const boxStyles = {
  top: 0,
  left: 0,
  position: "absolute" as const,
  backgroundImage: "url('imgs/waves.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% auto",
  backgroundPosition: "center center",
  width: "100%",
  height: "100%",
  zIndex: "-1",
  opacity: "0.2",
};
